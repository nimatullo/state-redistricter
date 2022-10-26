from gerrychain import Graph
import json
import geopandas as gpd

dual_graph = Graph.from_file("./NC_VTD.shp")
df = gpd.read_file("./NC_VTD.shp")
dual_graph2 = Graph.from_geodataframe(df)
dual_graph.to_json("./NC_graph.json")
dual_graph3 = Graph.from_json("./NC_graph.json")