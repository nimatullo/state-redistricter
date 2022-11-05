from gerrychain import Graph, Partition, Election
from gerrychain.updaters import Tally, cut_edges
import os

graph_path = os.path.join(os.getcwd(), "PA_test.json")
graph = Graph.from_json(graph_path)
election = Election("Sen16", {"Dem": "SEN16D", "Rep": "SEN16R"})

initial_partition = Partition(
	graph,
	assignment="CD_2011",
	updaters={
		"population": Tally("TOTPOP", alias="population"),
		"cut_edges": cut_edges,
		"Sen16": election
	}
)

for district, pop in initial_partition["population"].items():
	print("District {} has population {}".format(district, pop))
print(initial_partition.graph.nodes[0])