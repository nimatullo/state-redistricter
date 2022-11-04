from gerrychain import Graph, Partition, Election
from gerrychain.updaters import Tally, cut_edges
import os

# grab NC_VTD.json from shapefiles/processed/north carolina/NC_VTD.json
NC_path = os.path.join(os.getcwd(), "shapefiles/processed/florida")
path = os.path.join(NC_path, "FL_VTDs.shp")
graph = Graph.from_file(path)
print(graph.nodes[0])
