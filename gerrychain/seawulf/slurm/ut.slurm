#!/bin/bash

#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH -p short-40core
#SBATCH --time 04:00:00
#SBATCH --job-name utah-smd
#SBATCH --output ut-%J.log

# load modules or conda environments here
module load gerrychain

# Run Jupyter
cd /gpfs/home/snimatullo/gerrychain/bin
python3 profiler.py ut.py

