import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt
from gerrychain import Graph, Partition, Election, MarkovChain
from gerrychain.constraints import single_flip_contiguous 
from gerrychain.proposals import propose_random_flip
from gerrychain.accept import always_accept
from gerrychain.updaters import Tally, cut_edges
import os

iterations = 100

default = os.path.join(os.getcwd(), "shapefiles", "processed")

NC_graph_path = os.path.join(default, "north carolina", "precinct_level_w_election.shp")
FL_graph_path = os.path.join(default, "florida", "precinct_level_w_election.shp")
UT_graph_path = os.path.join(default, "utah", "UTAH_VTDs.shp")

FL_graph = Graph.from_file(FL_graph_path, ignore_errors=True)
election_FL = Election("SEN", {"Democratic": "D_VOTES", "Republican": "R_VOTES"})

UT_graph = Graph.from_file(UT_graph_path, ignore_errors=True)
election_UT = Election("PRES16", {"Democratic": "PRES16D", "Republican": "PRES16R"})

NC_graph = Graph.from_file(NC_graph_path, ignore_errors=True)
election_NC = Election("SEN", {"Democratic": "EL08G_USS_", "Republican": "EL08G_US_1"})

initial_partition_NC = Partition(
	NC_graph,
	assignment="CD",
	updaters={
		"population": Tally("TOTPOP", alias="population"),
		"cut_edges": cut_edges,
		"SEN": election_NC
	}
)

initial_partition_FL = Partition(
	FL_graph,
	assignment="CONG_DIST",
	updaters={
		"population": Tally("TOTPOP", alias="population"),
		"cut_edges": cut_edges,
		"SEN": election_FL
	}
)

initial_partition_UT = Partition(
	UT_graph,
	assignment="CD",
	updaters={
		"population": Tally("TOTPOP", alias="population"),
		"cut_edges": cut_edges,
		"PRES16": election_UT
	}
)

chain_NC = MarkovChain(
	proposal=propose_random_flip,
	constraints=[single_flip_contiguous],
	accept=always_accept,
	initial_state=initial_partition_NC,
	total_steps=iterations
)

chain_FL = MarkovChain(
	proposal=propose_random_flip,
	constraints=[single_flip_contiguous],
	accept=always_accept,
	initial_state=initial_partition_FL,
	total_steps=iterations
)

chain_UT = MarkovChain(
	proposal=propose_random_flip,
	constraints=[single_flip_contiguous],
	accept=always_accept,
	initial_state=initial_partition_UT,
	total_steps=iterations
)

data_NC = pd.DataFrame(
	sorted(partition["SEN"].percents("Democratic")) for partition in chain_NC
)

data_FL = pd.DataFrame(
	sorted(partition["SEN"].percents("Democratic")) for partition in chain_FL
)

data_UT = pd.DataFrame(
	sorted(partition["PRES16"].percents("Democratic")) for partition in chain_UT
)

data_NC.to_csv("state_data/NC.csv")
data_FL.to_csv("state_data/FL.csv")
data_UT.to_csv("state_data/UT.csv")
