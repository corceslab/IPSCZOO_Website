#!/bin/bash
# iPSC Zoo website: copy the latest RNA-seq gene TPM table from CoreHPC and rebuild data.js
# (needs an open CoreHPC login). Usage: bash update_data.sh
set -e
cd "$(dirname "$0")"
mkdir -p data/rna
scp -q corehpc:/gladstone/corces/lab/Shared/iPSC-Zoo/RNA/nextflow-out/260213_full_run/star_salmon/salmon.merged.gene_tpm.tsv data/rna/
python3 build_rna_data.py
