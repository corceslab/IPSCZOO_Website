#!/bin/bash
# iPSC Zoo website: package only the files the site needs into site/ (+ a zip), and
# optionally copy it to the lab drive for lab-only sharing.
# Usage: bash package_site.sh          -> site/ and iPSCZoo_site.zip here
#        bash package_site.sh --lab    -> also copies site/ to the lab drive (needs an open CoreHPC login)
set -e
cd "$(dirname "$0")"
LAB=/gladstone/corces/lab/users/jhota/projects/ipsc-zoo-web/site
rm -rf site iPSCZoo_site.zip
mkdir -p site/data
cp index.html config.js site/
[ -d protocols ] && cp -R protocols site/ || true
cp -R data/core.js data/protocols.js data/lines.js data/expr data/iPSCZoo_RNA_TPM.csv.gz site/data/
cat > site/HOW_TO_OPEN.txt <<'TXT'
iPSC Zoo (unpublished, Corces Lab only - please do not share outside the lab)
Open index.html in Chrome, Safari or Firefox (double-click). Keep the whole folder together.
TXT
zip -qr iPSCZoo_site.zip site
echo "site/ $(du -sh site | cut -f1), iPSCZoo_site.zip $(du -sh iPSCZoo_site.zip | cut -f1)"
if [[ $1 == --lab ]]; then
  ssh corehpc "mkdir -p $LAB"
  rsync -a --delete site/ corehpc:$LAB/
  ssh corehpc "chmod -R g+rX,o-rwx $LAB && ls $LAB"
  echo "copied to $LAB"
fi
