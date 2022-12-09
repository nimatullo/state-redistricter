# Write a script that will profile a python file in this directory
# It will measure metrics such as time, CPU and memory usage. It	will
# output this information to a file called {filename}-profile.txt
# Usage: profile.py {filename}

import cProfile
import pstats
import sys
import os

filename = sys.argv[1]

cProfile.run('exec(open(filename).read())', filename + '-profile.txt')

with open(filename + '-proc.txt', 'w') as f:
    p = pstats.Stats(filename + '-profile.txt', stream=f)
    results = p.sort_stats('cumulative').print_stats(10)

os.remove(filename + '-profile.txt')
