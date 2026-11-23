// ---------------------------------------------------------------------------
// iPSC Zoo: protocol key.  Generated 2026-11-11, nothing typed by hand.
//
// name / type  <- Leah's sheet, verbatim:
//     Shared/iPSC-Zoo/shared_annotations/261109_sample_metadata.xlsx
//     (protocol_ID / protocol_name / protocol_type), joined to the RNA samples
//     on sample_name_matrix, then sample_name_RNA.
// url / note   <- Lucas's protocol annotations, verbatim:
//     Shared/iPSC-Zoo/RNA/260121_protocol_annotations.csv
//     ("PMID (most recent)" -> a PubMed link; "Summary of protocol" -> note).
//
// 29 of 33 have a PubMed link. The four without: p00 (K562 control, no entry in
// the annotations file) and p01 / p02 / p26, which are proprietary Fujifilm
// iCell products with a catalogue number instead of a PMID - their note carries
// the product and catalogue number.
//
// Where sample rows disagreed on a code, the row whose protocol_ID matched the
// code won: p00 cellLine (also saw canals), p01 fujifilm (also saw zhang),
// p06c TCW_iMGL (also saw TCW_iHPC), p16a canals (also saw cellLine). Those are
// sample-level naming issues, still open with Leah - no sample was changed.
//
// Hand-added fields (from the annotation file's Protocol column, 2026-11-16):
//   kind: "product"  a purchasable cell product, with vendor / product / cat
//   kind: "source"   a starting cell state, not a differentiation protocol
//
// Add `pdf: "protocols/<file>.pdf"` to any entry to attach a local document;
// it takes precedence over the PubMed link for the download button.
//
// Protocol names are UNPUBLISHED - keep this file inside the lab.
// ---------------------------------------------------------------------------
window.ZOO_PROTOCOLS = {
  "00": { name: "cellLine", type: "immortalized" , kind: "source", kindnote: "Control cell line, not a differentiation protocol"},
  "01": { name: "fujifilm", type: "TFinduced", note: "proprietary (iCell Neuron Media) \u2014 Fujifilm iCell Induced Excitatory Neurons, 01279; Cat#R1246" , kind: "product", vendor: "FUJIFILM Cellular Dynamics", product: "iCell Induced Excitatory Neurons, 01279", cat: "R1246", url: "https://fujifilmcdi.com"},
  "02": { name: "fujifilm", type: "proprietary", note: "proprietary (iCell Astrocyte Media) \u2014 Fujifilm iCell Astrocytes 2.0, 01279; Cat#R1240" , kind: "product", vendor: "FUJIFILM Cellular Dynamics", product: "iCell Astrocytes 2.0, 01279", cat: "R1240", url: "https://fujifilmcdi.com"},
  "03": { name: "bertucci", type: "directedSort", url: "https://pubmed.ncbi.nlm.nih.gov/37564277/", note: "sorted with CD31+ or VE-cadherin at day 5-8, directed differentation" },
  "04": { name: "leng", type: "TFinducedSort", url: "https://pubmed.ncbi.nlm.nih.gov/36303069/", note: "proprietary (ScienCell Astrocyte Media) from NPCs that were dox-induced (NFIA-SOX9) and sorted for CD133+/CD271" },
  "05": { name: "drager", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/35953545/", note: "dox-induced (PU.1, CEBP\u03b2 and IRF5 in CLYBL safe-harbor locus; MAFB, CEBP\u03b1 and IRF8 in the AAVS1 safe-harbor locus" },
  "06b": { name: "TCW_iAstro", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/35750033/", note: "proprietary (ScienCell Astrocyte Media) from NPCs that came from dual-SMAD inhibition" },
  "06c": { name: "TCW_iMGL", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/35750033/", note: "directed differentation with small molecules through the HSC stage and hematopoetic lineage committment but without use of a proprietary media" },
  "06d": { name: "TCW_iHPC", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/35750033/", note: "HPCs", kind: "source", kindnote: "Haematopoietic progenitor stage of the TCW iMGL protocol" },
  "07a": { name: "fibroblast", type: "fibroblast", url: "https://pubmed.ncbi.nlm.nih.gov/35659876/", note: "fibroblasts" , kind: "source", kindnote: "Starting fibroblasts, not a differentiation protocol"},
  "08": { name: "bertucci", type: "directedSort", url: "https://pubmed.ncbi.nlm.nih.gov/34591294/", note: "sort with VE-cadherin MACS at day 6 only, directed differentation" },
  "09": { name: "zhouYang", type: "conversion", url: "https://pubmed.ncbi.nlm.nih.gov/34324181/", note: "direct conversion to iNs from fibroblasts using NGN2 and ASCL1 under the UbC promoter" },
  "10": { name: "garciaLeon", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/32962164/", note: "dox-induced with SOX10" },
  "11": { name: "cates", type: "conversion", url: "https://pubmed.ncbi.nlm.nih.gov/32961143/", note: "motor neurons, direct conversion to mNs from fibroblasts using microRNAs (miR-9/9\u2217 and miR-124 (miR-9/9\u2217-124)) and ISL1/LHX3 driven by the EF1\u03b1 promoter" },
  "12a": { name: "iPSC", type: "immortalized", url: "https://pubmed.ncbi.nlm.nih.gov/31189096/", note: "iPSC" , kind: "source", kindnote: "Undifferentiated iPSC, not a differentiation protocol"},
  "12b": { name: "neal", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/31189096/", note: "not sorted, directed differentation and serum free" },
  "13": { name: "bowles", type: "directedSort", url: "https://pubmed.ncbi.nlm.nih.gov/30917153/", note: "dual-SMAD inhibtion through the rossette stage and MACS purification at the NPC stage for CD271 depletion, followed by CD133 selection" },
  "14": { name: "mcquade", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/30577865/", note: "directed differentation with small molecules through the HSC stage and hematopoetic lineage committment using a propriety media (StemCell Hematopoetic)" },
  "15": { name: "perriot", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/30409508/", note: "directed differentation through the rossette/NPC stage with small molecules" },
  "16a": { name: "canals", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/30127505/", note: "dox-induced (Nfia, Nfib, and Sox9) in tetO-FUW" },
  "16b": { name: "canals", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/30127505/", note: "dox-induced (NGN2) in tetO promoter for iNs and dox-induced (Nfia, Nfib, and Sox9) in tetO-FUW for astros" },
  "16c": { name: "canals", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/30127505/", note: "dox-induced (NGN2) in tetO promoter for iNs and dox-induced (Nfia, Nfib, and Sox9) in tetO-FUW for astros" },
  "17": { name: "fernandopulle", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/29924488/", note: "dox-induced (NGN2) in tetO promoter" },
  "18": { name: "TCW_iAstro", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/28757165/", note: "proprietary (ScienCell Astrocyte Media) from NPCs that came from dual-SMAD inhibition or proprietary Neural Induction Media (StemCell Technologies)" },
  "19": { name: "takata", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/28723550/", note: "directed differentiation with small molecules with hematopoetic lineage committment, some mention of EBs" },
  "20": { name: "haenseler", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/28591653/", note: "directed differentiation with small molecules with hematopoetic lineage committment , EBs are used here" },
  "21": { name: "yang", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/28504679/", note: "dox-induced (Ascl1/ Dlx2) in tetO for inhibitory neurons" },
  "22": { name: "abud", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/28426964/", note: "directed differentation with small molecules through the HSC stage and hematopoetic lineage committment using a propriety media (StemCell Hematopoetic)" },
  "23": { name: "zhang", type: "TFinduced", url: "https://pubmed.ncbi.nlm.nih.gov/23764284/", note: "dox-induced (NGN2) in tetO promoter" },
  "24a": { name: "iPSC", type: "immortalized", url: "https://pubmed.ncbi.nlm.nih.gov/22976355/", note: "iPSC" , kind: "source", kindnote: "Undifferentiated iPSC, not a differentiation protocol"},
  "24b": { name: "shi", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/22976355/", note: "dual SMAD inhibition through rosettes by only in 2D" },
  "24c": { name: "shi", type: "directed", url: "https://pubmed.ncbi.nlm.nih.gov/22976355/", note: "dual SMAD inhibition through rosettes by only in 2D" },
  "25": { name: "yoo", type: "conversion", url: "https://pubmed.ncbi.nlm.nih.gov/21753754/", note: "motor neurons, direct conversion to iNs from fibroblasts using microRNAs (miR-9/9\u2217 and miR-124 (miR-9/9\u2217-124)) driven by the EF1\u03b1 promoter" },
  "26": { name: "fujifilm", type: "directed", note: "proprietary (iCell Microglia Media) \u2014 Fujifilm iCell Microglia Kit, 01279; Cat#R1131" , kind: "product", vendor: "FUJIFILM Cellular Dynamics", product: "iCell Microglia Kit, 01279", cat: "R1131", url: "https://fujifilmcdi.com"},
};
