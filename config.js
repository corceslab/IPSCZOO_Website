// ---------------------------------------------------------------------------
// iPSC Zoo website settings - the only file to edit when going from lab-only to public
// mode: "lab"    = unpublished data, lab members only (shows a lab-only tag, asks search engines not to index)
//       "public" = after publication (shows the citation and data links below)
// ---------------------------------------------------------------------------
window.ZOO_CONFIG = {
  mode: "lab",
  citation: "",   // e.g. "DeFlitch L, Kampman L, ..., Corces MR. Title. Journal (Year)."
  paperUrl: "",   // DOI link to the paper or preprint
  dataUrl: "",    // public data deposit, e.g. GEO accession link
  contact: "",    // e.g. lab email for questions

  // "Contribute samples" section on the About tab.
  // Nothing here is shown until `contact` below is filled in - check the wording with
  // Leah and Ryan first, since it commits the lab to accepting samples.
  contribute: {
    show: true,              // false hides the section completely
    contact: "",             // email that contributions go to (required - section stays a placeholder until set)
    lead: "",                // e.g. "Leah DeFlitch" - who to address it to
    uploadUrl: "",           // where files go: a Google Drive / Dropbox / Box folder that accepts uploads
    uploadLabel: "",         // optional button text, e.g. "Upload to the iPSC Zoo Drive folder"
    formUrl: "",             // optional: a separate sample-information form
    note: "",                // optional: one extra line, e.g. a current intake deadline
  },

  // "Acknowledgements" section on the About tab.
  // Only names you are sure about - contributing labs are anonymised while the data
  // is unpublished, so list them only once they have agreed to be named.
  acknowledge: {
    show: true,
    team: [],                // leave empty to just say "the Corces Lab"; or list people as
                             // { name: "...", role: "..." } and they replace that line
    labs: "",                // optional: a free-text line instead of the per-lab table below

    // The contributing labs, by lab code (the number after "lab" in a sample name).
    // Every lab in the data gets a row on the About tab whether or not it is named here -
    // fill a name in and it replaces the code. Only add a lab once it has agreed to be named.
    //   "02": "Jane Smith Lab, UCSF"
    labNames: {},
    funding: "",             // optional: grant numbers
    site: "",                // optional: who built this site
    note: "",                // optional: anything else
  },
};
