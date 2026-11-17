export const SITE_URL = "https://www.briheet.com";
export const AUTHOR_NAME = "Briheet Singh Yadav";

export const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR_NAME,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/output.jpg`,
  jobTitle: "Software Engineer",
  knowsAbout: [
    "Systems engineering",
    "Infrastructure",
    "Rust",
    "Go",
    "KVM",
    "Virtualization",
    "GPUs",
    "AI inference",
    "Nix",
  ],
  sameAs: [
    "https://github.com/briheet",
    "https://www.linkedin.com/in/briheet-singh-yadav/",
    "https://x.com/brsy_10",
  ],
};

export const personRef = { "@id": `${SITE_URL}/#person` };
