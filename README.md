# iPSC Zoo website

Live at **https://corceslab.github.io/IPSCZOO_Website/** (password-gated; ask the lab).

Look up a gene and see its expression (bulk RNA-seq, TPM) in every iPSC Zoo sample,
by cell type, protocol, iPSC line and lab. Compare several genes at once, and choose
which cell types to show. The site shows the data; it does not recommend a protocol.

Unpublished lab data: keep it local / inside the lab.

## Open it
Use the link above, or double-click `index.html` locally (works offline; no server needed).

## How this site was built
Claude Enterprise was used to prompt and help build the website - the page code, the layout and the
data-packaging scripts. All data, analysis and interpretation are Corces Lab generated: the RNA-seq was
produced and processed in the lab, and nothing shown on the site is model-generated data.

## Files
- `index.html` - the whole website (page, styles, code)
- `config.js` - settings: `mode: "lab"` (unpublished, lab only) or `"public"`, plus citation / paper / data links
- `data/core.js` - samples + gene list; `data/expr/cNNN.js` - expression values, loaded per gene on demand
- `data/iPSCZoo_RNA_TPM.csv.gz` - full table behind the "Download" link
- `build_rna_data.py` - builds the data files from the RNA-seq gene TPM table + `data/genes.json`
- `update_data.sh` - copies the latest TPM table from CoreHPC and rebuilds (needs `ssh corehpc`)
- `package_site.sh` - puts only the site files in `site/` + `iPSCZoo_site.zip`; `--lab` also copies to the lab drive

## Updating the live site
Edit, then `git add -A && git commit -m "..." && git push`. GitHub Pages redeploys on its own, usually
within a minute. The repo root is the site, so no packaging step is needed for the hosted copy.

Note the repo is public (GitHub Pages cannot serve a private repo on the free plan), so every file here
is readable by anyone who finds it. The password on the landing page is a deterrent, not access control.

## Sharing with lab members (offline copy)
`bash package_site.sh --lab` copies the site to
`/gladstone/corces/lab/users/jhota/projects/ipsc-zoo-web/site/` (lab group read-only, nobody outside the lab).
Lab members copy that folder (or get `iPSCZoo_site.zip`) and double-click `index.html`. No server, nothing online.

## Going public (at publication, after Leah / Ryan sign-off)
1. Edit `config.js`: `mode: "public"`, fill in `citation`, `paperUrl`, `dataUrl` (GEO), `contact`.
2. Remove the password gate from the top of `index.html` (the block marked "Simple access gate").
3. Archive the same `site/` folder + data on Zenodo for a permanent DOI.
Links to a gene can be shared: `.../index.html#gene=TREM2` or `#genes=TREM2,GFAP`.

## Where the data comes from
CoreHPC, `/gladstone/corces/lab/Shared/iPSC-Zoo/RNA/nextflow-out/260213_full_run/star_salmon/salmon.merged.gene_tpm.tsv`
(nf-core/rnaseq, STAR + Salmon; Lucas Kampman / Leah DeFlitch). 182 samples, 11 cell types.
Sample info (cell type, protocol, lab, line, batch) is read from the sample names.
Sample sheets: `Shared/iPSC-Zoo/shared_annotations/` (protocol key with Leah; site shows codes).

## Notes
- Genes: GENCODE protein-coding; rows with the same gene name are summed.
- exNiAst / inNiAst = NFIB/SOX9-induced astrocyte variants (sample sheet: exc/inh).
- Older ATAC-based version (test processing run) is retired.

## Protocol key and documents
- Protocol names, types and references go in `data/protocols.js` (codes stay anonymised until filled in).
  Placeholder types are marked on the Protocols tab until the real ones are added.
- Protocol PDFs go in `protocols/`; add `pdf: "protocols/<file>.pdf"` to the entry in `data/protocols.js`
  and the download links appear on their own.
