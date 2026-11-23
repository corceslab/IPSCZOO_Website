# ---------------------------------------------------------------------------
# iPSC Zoo website: build the site's data files from the iPSC Zoo bulk RNA-seq (gene TPM)
# Contributors: Jigisha Hota
# Input (copied from CoreHPC by update_data.sh):
#   data/rna/salmon.merged.gene_tpm.tsv  - nf-core/rnaseq star_salmon gene TPM
#     (Shared/iPSC-Zoo/RNA/nextflow-out/260213_full_run/star_salmon/)
#   data/genes.json                      - protein-coding genes with chrom + TSS (GENCODE)
# Output:
#   data/core.js            - window.ZOO = {built, source, samples, genes, expr: {unit, samples, chunk}}
#   data/expr/cNNN.js       - window.ZOO_CHUNK(k, rows): TPM for genes k*chunk .. (k+1)*chunk-1,
#                             loaded on demand so the page opens fast (works offline and hosted)
#   data/iPSCZoo_RNA_TPM.csv.gz - full gene x sample table for the download link
#   Sample info is parsed from the names: <cellType>_p<protocol>_lab<lab>_<line>_batch<batch>_<n>
#   Genes = protein-coding; rows sharing a gene name are summed.
# Usage: python3 build_rna_data.py
# ---------------------------------------------------------------------------
import csv
import datetime
import glob
import gzip
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
TPM = os.path.join(HERE, "data/rna/salmon.merged.gene_tpm.tsv")
SOURCE = "Shared/iPSC-Zoo/RNA/nextflow-out/260213_full_run/star_salmon/salmon.merged.gene_tpm.tsv"
CHUNK = 100


def parse(name):
    m = re.match(r"^([A-Za-z0-9]+)_p([0-9a-z]+)_lab(\d+)_((?:line|unk)\w*?)_batch(\d+)_(\d+)$", name)
    ct, prot, lab, line, batch, _ = m.groups()
    line = line[4:] if line.startswith("line") else line  # "unk04" = line not reported
    return {"sample": name, "cell_type": ct, "protocol": prot, "lab": lab, "line": line, "batch": batch}


# protein-coding genes, one entry per name (first TSS)
genes, seen = [], set()
for g in json.load(open(os.path.join(HERE, "data/genes.json"))):
    if g["gene"] not in seen:
        seen.add(g["gene"])
        genes.append({**{k: g[k] for k in ("gene", "chrom", "tss", "strand")}, "type": "protein_coding"})
gi = {g["gene"]: i for i, g in enumerate(genes)}

rows = csv.reader(open(TPM), delimiter="\t")
raw_samples = next(rows)[2:]
# The TPM matrix is keyed by sample_name_matrix, but the Zoo sample sheet's
# sample_name_final column carries the corrected cell type and identity
# (neuron subtypes split, exNiAst/inNiAst folded into iAstro, the batch29 swap
# fixed, and two iMGL corrected to iHPC). Prefer it wherever it exists.
FINAL = os.path.join(HERE, "data/final_names.json")
final_map = json.load(open(FINAL)) if os.path.exists(FINAL) else {}
samples = [final_map.get(s, s) for s in raw_samples]
renamed = sum(1 for a, b in zip(raw_samples, samples) if a != b)
vals = [[0.0] * len(samples) for _ in genes]
for r in rows:
    i = gi.get(r[1])
    if i is None:
        continue
    for j, x in enumerate(r[2:]):
        vals[i][j] += float(x)


def rnd(v):  # keep the files small: 2 decimals below 10 TPM, 1 below 100, else whole
    return 0 if v < 0.005 else round(v, 2) if v < 10 else round(v, 1) if v < 100 else round(v)


vals = [[rnd(v) for v in row] for row in vals]
out = os.path.join(HERE, "data")
os.makedirs(f"{out}/expr", exist_ok=True)
for f in glob.glob(f"{out}/expr/c*.js"):
    os.remove(f)
nchunks = (len(genes) + CHUNK - 1) // CHUNK
for k in range(nchunks):
    with open(f"{out}/expr/c{k:03d}.js", "w") as f:
        f.write(f"window.ZOO_CHUNK({k},")
        json.dump(vals[k * CHUNK:(k + 1) * CHUNK], f, separators=(",", ":"))
        f.write(");\n")

zoo = {"built": datetime.date.today().isoformat(), "source": SOURCE,
       "samples": [parse(s) for s in samples], "genes": genes,
       "expr": {"unit": "TPM", "samples": samples, "chunk": CHUNK, "nchunks": nchunks}}
with open(f"{out}/core.js", "w") as f:
    f.write("window.ZOO = ")
    json.dump(zoo, f, separators=(",", ":"))
    f.write(";\n")

with gzip.open(f"{out}/iPSCZoo_RNA_TPM.csv.gz", "wt", newline="") as f:
    w = csv.writer(f)
    w.writerow(["gene"] + samples)
    for g, row in zip(genes, vals):
        w.writerow([g["gene"]] + row)

old = os.path.join(HERE, "data.js")  # single-file data from earlier versions
if os.path.exists(old):
    os.remove(old)
size = lambda p: os.path.getsize(p) / 1e6
print(f"renamed from sample_name_final: {renamed}/{len(samples)}")
print(f"core.js {size(f'{out}/core.js'):.1f} MB; {nchunks} gene chunks of {CHUNK}; "
      f"download table {size(f'{out}/iPSCZoo_RNA_TPM.csv.gz'):.1f} MB; {len(samples)} samples, {len(genes)} genes")
