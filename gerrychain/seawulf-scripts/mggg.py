import geopandas as gpd
from gerrychain import Graph, Partition, Election, MarkovChain
from gerrychain.constraints import single_flip_contiguous 
from gerrychain.proposals import propose_random_flip
from gerrychain.accept import always_accept
from gerrychain.updaters import Tally, cut_edges
import os

graph_path = os.path.join(os.getcwd(), "shapefiles", "processed", "north carolina", "precinct_level_w_election.shp")
# df = gpd.read_file(graph_path)
# print(df.columns)

graph = Graph.from_file(graph_path, ignore_errors=True)
election = Election("SEN16", {"Democratic": "SEN16D", "Republican": "SEN16R"})

initial_partition = Partition(
	graph,
	assignment="CD",
	updaters={
		"population": Tally("TOTPOP", alias="population"),
		"cut_edges": cut_edges,
		"SEN16": election
	}
)

chain = MarkovChain(
	proposal=propose_random_flip,
	constraints=[single_flip_contiguous],
	accept=always_accept,
	initial_state=initial_partition,
	total_steps=10
)

# print one partition
for partition in chain:
	print(partition.assignment)

