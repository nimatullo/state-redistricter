#!/bin/bash

#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH -p short-40core
#SBATCH --time 02:00:00
#SBATCH --job-name north-carolina-smd
#SBATCH --output nc-%J.log

# load modules or conda environments here
module load gerrychain

# Run Jupyter
cd /gpfs/home/snimatullo/gerrychain/bin
python3 profiler.py nc.py
