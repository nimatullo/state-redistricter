#!/usr/bin/env python
# coding: utf-8

# In[45]:


import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt
from gerrychain import Graph, Partition, Election, MarkovChain, proposals, updaters, constraints, accept, GeographicPartition
from gerrychain.updaters import Tally, cut_edges
from gerrychain.proposals import recom
from functools import partial
from gerrychain.metrics import polsby_popper
import os


# In[46]:


PROCESSED_SHAPEFILE_PATH = os.path.join(os.getcwd(), "..", "data", "processed")
NC_PATH = os.path.join(PROCESSED_SHAPEFILE_PATH, "utah", "UTAH_VTDs.shp")
EXPORT_PATH = os.path.join(PROCESSED_SHAPEFILE_PATH, "utah")
ITERATIONS = 100
SAFE_SEAT_THRESHOLD = 0.66
MINORITY_POP_THRESHOLD = 0.4
RACE_WINNER_THRESHOLD = 0.5
TOTAL_DISTRICTS = 4


# In[47]:


UT_graph = Graph.from_file(NC_PATH, ignore_errors=True)


# In[48]:


UT_election = Election("CongressionalRace" , {"Democratic": "D_VOTES", "Republican": "R_VOTES"})


# In[49]:


initial_partition = GeographicPartition(
    UT_graph,
    assignment="CD",
    updaters={
        "population": Tally("TOTPOP", alias="population"),
        "white": Tally("NH_WHITE", alias="white"),
        "black": Tally("NH_BLACK", alias="black"),
        "asian": Tally("NH_ASIAN", alias="asian"),
        "hisp": Tally("HISP", alias="hisp"),
        "other": Tally("NH_OTHER", alias="other"),
        "cut_edges": cut_edges,
        "CongressionalRace": UT_election
    }
)
initial_partition.plot()


# In[50]:


ideal_pop = sum(initial_partition["population"].values()) / len(initial_partition)
proposal = partial(recom, pop_col="TOTPOP", pop_target=ideal_pop, epsilon=.02, node_repeats=2)
compactness = constraints.UpperBound(
    lambda p: len(p["cut_edges"]),
    2*len(initial_partition["cut_edges"])
)
pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.02)


# In[51]:


chain = MarkovChain(
    proposal=proposal,
    constraints=[
        compactness,
        pop_constraint
    ],
    accept=accept.always_accept,
    initial_state=initial_partition,
    total_steps=ITERATIONS
)


# In[52]:


# Supress user warnings
import warnings
warnings.filterwarnings('ignore')

OPPORTUNITY_REP_COUNT = int(TOTAL_DISTRICTS * 0.25)
print(f"OPPORTUNITY_REP_COUNT: {OPPORTUNITY_REP_COUNT}")
print(f"Running chain for {ITERATIONS} iterations.")

# Calculate polsby popper score, republican and democratic split
polsby_popper_scores = pd.DataFrame()
dem_splits = pd.DataFrame()
rep_splits = pd.DataFrame()
# rep_total_count = pd.DataFrame()
rep_total_count = [0] * (TOTAL_DISTRICTS + 1)
black_pop = pd.DataFrame()
asian_pop = pd.DataFrame()
hisp_pop = pd.DataFrame()
white_pop = pd.DataFrame()
total_pop = pd.DataFrame()
equal_pop = pd.DataFrame()
opportunity_reps_count = pd.DataFrame()

unique_plans = {}


indexes = [1,2,3,4]

for partition in chain:
    blk = pd.Series(partition["black"], index=indexes)
    asn = pd.Series(partition["asian"], index=indexes)
    hsp = pd.Series(partition["hisp"], index=indexes)
    wt = pd.Series(partition["white"], index=indexes)
    tot = pd.Series(partition["population"], index=indexes)
    eq_pop = pd.Series(max(partition["population"].values()) - min(partition["population"].values()))
    minority_pop = blk + asn + hsp
    minority_pop_percentage = minority_pop / tot
    opp_reps = pd.Series(minority_pop_percentage[minority_pop_percentage > MINORITY_POP_THRESHOLD].count())
    
    dem = pd.Series(partition["CongressionalRace"].percents("Democratic"), index=indexes)
    rep = pd.Series(partition["CongressionalRace"].percents("Republican"), index=indexes)

    # rep_count = pd.Series(partition["CongressionalRace"].wins("Republican"))
    rep_count = partition["CongressionalRace"].wins("Republican")
    
    polsby_popper_scores = polsby_popper_scores.append(pd.Series(polsby_popper(partition), index=indexes), ignore_index=True)
    black_pop = black_pop.append(blk, ignore_index=True)
    asian_pop = asian_pop.append(asn, ignore_index=True)
    hisp_pop = hisp_pop.append(hsp, ignore_index=True)
    white_pop = white_pop.append(wt, ignore_index=True)
    total_pop = total_pop.append(tot, ignore_index=True)
    opportunity_reps_count = opportunity_reps_count.append(opp_reps, ignore_index=True)
    
    
    equal_pop = equal_pop.append(eq_pop.values[0] / tot, ignore_index=True)
    
    dem_splits = dem_splits.append(dem, ignore_index=True)
    rep_splits = rep_splits.append(rep, ignore_index=True)
    # rep_total_count = rep_total_count.append(rep_count, ignore_index=True)
    rep_total_count[rep_count] += 1
    
    dem_seat_share_percentage = dem[dem > 0.5].count() / TOTAL_DISTRICTS
    dem_vote_share_percentage = dem.mean()

    # For a plan to be unique, it must meet any of the following criteria:
	# 1. > 80% Republican split
	# 2. > 80% Democratic split
	# 3. A district where the minority population is > 40% 
	# 4. Over 50 opporunity representatives within the partition
	# 5. Seat share and vote share are within 5% of each other

    if dem.max() > 0.9:
        unique_plans["High Democrat Concentration In District"] = partition
        
    if rep.max() > 0.9:
        unique_plans["High Republican Concentration In District"] = partition
        
    if minority_pop_percentage[minority_pop_percentage > MINORITY_POP_THRESHOLD].count().sum() >= OPPORTUNITY_REP_COUNT:
        unique_plans["High Opportunity Representative Count"] = partition
        
    if abs(dem_seat_share_percentage - dem_vote_share_percentage) > 0.15:
        unique_plans["Large Difference Between Democrat Vote Share and Seat Share"] = partition
        
    if abs((1-dem_seat_share_percentage) - (1-dem_vote_share_percentage)) > 0.15:
        unique_plans["Large Difference Between Republican Vote Share and Seat Share"] = partition
        
        
display(f"Number of unique plans: {len(unique_plans)}")

rep_safe_districts = rep_splits[rep_splits > SAFE_SEAT_THRESHOLD].count(axis=1)
dem_safe_districts = dem_splits[dem_splits > SAFE_SEAT_THRESHOLD].count(axis=1)
minority_pop = black_pop + asian_pop + hisp_pop

dem_seat_share = dem_splits[dem_splits > RACE_WINNER_THRESHOLD].count(axis=1)
dem_seat_share_percentage = dem_seat_share / TOTAL_DISTRICTS

rep_seat_share = rep_splits[rep_splits > RACE_WINNER_THRESHOLD].count(axis=1)
rep_seat_share_percentage = rep_seat_share / TOTAL_DISTRICTS
    


# In[53]:


# create dict that's 0 indexed with the number of districts as the key
rep_total_count = {i: rep_total_count[i] for i in range(0, len(rep_total_count))}
rep_total_count


# In[54]:


dis1 = pd.Series()
dis2 = pd.Series()
dis3 = pd.Series()
dis4 = pd.Series()
opportunity_reps = pd.DataFrame()
for plan in chain:
    for district, pop in plan["population"].items():
        district = int(district)
        minority_pop_dist = plan["black"][district] + plan["asian"][district] + plan["hisp"][district]
        if minority_pop_dist > MINORITY_POP_THRESHOLD * pop:
            if district == 1:
                dis1 = dis1.append(pd.Series(1))
            elif district == 2:
                dis2 = dis2.append(pd.Series(1))
            elif district == 3:
                dis3 = dis3.append(pd.Series(1))
            elif district == 4:
                dis4 = dis4.append(pd.Series(1))
        else:
            if district == 1:
                dis1 = dis1.append(pd.Series(0))
            elif district == 2:
                dis2 = dis2.append(pd.Series(0))
            elif district == 3:
                dis3 = dis3.append(pd.Series(0))
            elif district == 4:
                dis4 = dis4.append(pd.Series(0))


# add the series to the dataframe
opportunity_reps[0] = dis1
opportunity_reps[1] = dis2
opportunity_reps[2] = dis3
opportunity_reps[3] = dis4


opportunity_reps.sum(axis=0)


# # Polsby Popper Scores

# In[55]:


polsby_popper_scores


# # Republican Party Splits

# In[56]:


rep_splits.mean()


# # Republican Safe Districts

# In[57]:


rep_splits[rep_splits > SAFE_SEAT_THRESHOLD].count()


# # Democrat Party Splits

# In[58]:


dem_splits.mean()


# # Democrat Safe Districts

# In[59]:


dem_splits[dem_splits > SAFE_SEAT_THRESHOLD].count()


# # Majority-minority districts

# In[60]:


minority_pop[minority_pop > MINORITY_POP_THRESHOLD * total_pop].count()


# In[61]:


opportunity_reps.sum(axis=0)


# # Vote Share Seat Share
# ## Democrat

# In[62]:


dem_vote_share_percentage


# # Box & Whisker for Population & Dem/Rep splits

# In[63]:


black_pop_box_data = pd.DataFrame(black_pop.describe().loc[["min", "25%", "50%", "mean", "75%", "max"]])
asian_pop_box_data = pd.DataFrame(asian_pop.describe().loc[["min", "25%", "50%", "mean", "75%", "max"]])
hispanic_pop_box_data = pd.DataFrame(hisp_pop.describe().loc[["min", "25%", "50%", "mean", "75%", "max"]])
white_pop_box_data = pd.DataFrame(white_pop.describe().loc[["min", "25%", "50%", "mean", "75%", "max"]])
total_pop_box_data = pd.DataFrame(total_pop.describe().loc[["min", "25%", "50%", "mean", "75%", "max"]])

dem_split_box_data = pd.DataFrame(dem_splits.describe().loc[["min", "25%", "50%", "mean", "75%", "max"]])
rep_split_box_data = pd.DataFrame(rep_splits.describe().loc[["min", "25%", "50%", "mean", "75%", "max"]])


# In[64]:


dem_split_box_data


# # Export Time

# ## Unique Plan District

# In[65]:


for reason in unique_plans:
    plan = unique_plans[reason]
    r_split = pd.DataFrame(pd.Series(plan["CongressionalRace"].percents("Republican"), index=indexes))
    r_split.columns = ["R_votes"]


    gdf = gpd.GeoDataFrame({"assignment": plan.assignment.to_series()}, geometry=plan.graph.geometry)
    district_shapes = gdf.dissolve(by='assignment', aggfunc='sum') # Combine the precincts to form districts
    district_shapes = district_shapes.to_crs(epsg="4326")
    district_shapes = district_shapes.join(r_split)
    district_shapes["R_votes"] = district_shapes["R_votes"].apply(lambda x: "R" if x > 0.5 else "D")
    district_shapes = district_shapes.rename(columns={"R_votes": "party"})
#     district_shapes.to_file(f"{EXPORT_PATH}/unique plans/{reason}.geojson", driver='GeoJSON')


# In[66]:


import json

unique_plan_data = {}

for reason in unique_plans:
    plan = unique_plans[reason]
    blk = pd.Series(plan["black"], index=indexes)
    asn = pd.Series(plan["asian"], index=indexes)
    hsp = pd.Series(plan["hisp"], index=indexes)
    wt = pd.Series(plan["white"], index=indexes)
    tot = pd.Series(plan["population"], index=indexes)
    minority_population = blk + asn + hsp
    minority_pop_percentage = minority_population / tot
    
    dem = pd.Series(plan["CongressionalRace"].percents("Democratic"), index=indexes)
    rep = pd.Series(plan["CongressionalRace"].percents("Republican"), index=indexes)
    
    safe_districts = dem[dem > SAFE_SEAT_THRESHOLD].count() + rep[rep > SAFE_SEAT_THRESHOLD].count()
    unique_plan_opportunity_reps = minority_population[minority_population > (MINORITY_POP_THRESHOLD * tot)].count()
    pp_scores = pd.Series(polsby_popper(partition), index=indexes)
    

    
    unique_plan_data[reason] = {
        "blk_pop": blk.to_dict(),
        "asn_pop": asn.to_dict(),
        "hsp_pop": hsp.to_dict(),
        "wt_pop": wt.to_dict(),
        "tot_pop": tot.to_dict(),
        "minority_pop": minority_population.to_dict(),
        "dem_split": dem.to_dict(),
        "rep_split": rep.to_dict(),
        "safe_districts": int(safe_districts),
        "opportunity_reps": int(unique_plan_opportunity_reps),
        "polsby_popper_scores": pp_scores.to_dict()
    }


# In[68]:


# # Export everything I've done so far to a JSON file

import json
data = {}

data["thresholds"] = {
    "SAFE_SEAT_THRESHOLD": SAFE_SEAT_THRESHOLD,
    "MINORITY_POP_THRESHOLD": MINORITY_POP_THRESHOLD, 
    "RACE_WINNER_THRESHOLD": RACE_WINNER_THRESHOLD,
    "OPPORTUNITY_REP_COUNT": OPPORTUNITY_REP_COUNT
}
data["polsby_popper_scores"] = polsby_popper_scores.mean().to_dict()
data["rep_splits"] = rep_splits.mean().to_dict()
data["dem_splits"] = dem_splits.mean().to_dict()
data["black_pop"] = black_pop.mean().to_dict()
data["asian_pop"] = asian_pop.mean().to_dict()
data["hispanic_pop"] = hisp_pop.mean().to_dict()
data["white_pop"] = white_pop.mean().to_dict()
data["total_pop"] = total_pop.mean().to_dict()
data["minority_pop"] = minority_pop.mean().to_dict()
data["opportunity_reps"] = float(opportunity_reps_count.mean())
data["equal_pop"] = equal_pop.mean().mean()
data["dem_seat_share_percentage"] = dem_seat_share_percentage.mean()
data["dem_vote_share_percentage"] = dem_splits.mean().mean()
data["dem_split_box_data"] = dem_split_box_data.to_dict()
data["rep_seat_share_percentage"] = rep_seat_share_percentage.mean()
data["rep_vote_share_percentage"] = rep_splits.mean().mean()
data["rep_split_box_data"] = rep_split_box_data.to_dict()
data["black_pop_box_data"] = black_pop_box_data.to_dict()
data["asian_pop_box_data"] = asian_pop_box_data.to_dict()
data["hispanic_pop_box_data"] = hispanic_pop_box_data.to_dict()
data["white_pop_box_data"] = white_pop_box_data.to_dict()
data["total_pop_box_data"] = total_pop_box_data.to_dict()
data["unique_plans_data"] = unique_plan_data
data["bar_data"] = {
    "opportunity_reps": opportunity_reps.sum(axis=0).to_dict(),
    "rep_total_count": rep_total_count
}

with open(f'{EXPORT_PATH}/data.json', 'w') as outfile:
    json.dump(data, outfile)
