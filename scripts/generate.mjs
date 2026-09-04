import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(projectDir, "data/resources.json");
const certificatesPath = path.join(projectDir, "data/certificates.json");
const readmePath = path.join(projectDir, "README.md");
const checkOnly = process.argv.includes("--check");

const resources = JSON.parse(await readFile(dataPath, "utf8"));
const certificates = JSON.parse(await readFile(certificatesPath, "utf8"));

const compare = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" });
const groupBy = (items, field) => {
  const groups = new Map();
  for (const item of items) {
    const key = item[field];
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return groups;
};
const assertUnique = (items, field, dataset) => {
  const values = new Set();
  for (const item of items) {
    const value = item[field];
    if (!value || values.has(value)) {
      throw new Error(dataset + " has a missing or duplicate " + field + ": " + (value ?? "(missing)"));
    }
    values.add(value);
  }
};
const certificateIds = new Set(certificates.map((certificate) => certificate.ID));
assertUnique(resources, "ID", "resources");
assertUnique(resources, "Slug", "resources");
assertUnique(certificates, "ID", "certificates");
for (const resource of resources) {
  if (!resource["Capability ID"] || !resource.Capability) {
    throw new Error("Resource " + resource.Slug + " must include Capability ID and Capability.");
  }
  if (!Array.isArray(resource["Certificate IDs"])) {
    throw new Error("Resource " + resource.Slug + " must include Certificate IDs as an array.");
  }
  for (const certificateId of resource["Certificate IDs"]) {
    if (!certificateIds.has(certificateId)) {
      throw new Error("Resource " + resource.Slug + " references unknown certificate " + certificateId + ".");
    }
  }
}
const slug = (value) => value
  .toLowerCase()
  .replace(/[’']/g, "")
  .replace(/&/g, "and")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const clean = (value) => String(value ?? "").replace(/\|/g, "\\|").trim();
const yearMonth = (value) => {
  const normalized = clean(value || "Unknown");
  const match = normalized.match(/^(\d{4})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : normalized;
};

const categoryOrder = [
  "Official Vendors",
  "Official Conference Channel",
  "Established Educational Providers",
  "Major Universities",
  "Creator’s Official Website"
];
const categoryRank = new Map(categoryOrder.map((category, index) => [category, index]));
const providerLogoAliases = {
  "AWS re:Invent": "aws",
  "Code with Claude": "anthropic",
  "Data + AI Summit": "databricks",
  "GitHub Universe": "github",
  "Google I/O": "google",
  "Google Cloud Next": "google",
  "Microsoft Build": "microsoft",
  "MIT OpenCourseWare": "mit",
  "NVIDIA GTC": "nvidia",
  "OpenAI DevDay": "openai",
  "PyTorch Conference": "pytorch",
  "Stanford University": "stanford",
  "Harvard University": "harvard"
};
const providerLogo = (provider) => providerLogoAliases[provider] ?? slug(provider);
const availableLogos = new Set(await readdir(path.join(projectDir, "assets/provider-logos")));
const categories = [...groupBy(resources, "Primary Category")].sort(([a], [b]) =>
  (categoryRank.get(a) ?? Number.MAX_SAFE_INTEGER) - (categoryRank.get(b) ?? Number.MAX_SAFE_INTEGER)
  || compare(a, b)
);
const lines = [
  '<a id="readme-top"></a>',
  "# Awesome Free Highscore AI Learning Resources",
  "",
  "Awesome free highscore AI learning resources for artificial intelligence, machine learning, LLM applications, agents, AI coding, and related topics.",
  "",
  `**${resources.length} resources** from official vendors, universities, established education providers, conference channels, and independent creators.`,
  "",
  "> This README is generated from [`data/resources.json`](data/resources.json).",
  "",
  "**[Quick Submit via GitHub Issue](https://github.com/highscore-ai/awesome-free-ai-learning-courses/issues/new?template=resource-submission.md)**",
  "",
  "<p align=\"left\"><img src=\"assets/high-score-banner.png\" alt=\"Awesome Free Highscore AI Learning Resources\" width=\"300\"></p>",
  "",
  "## Contents",
  ""
];

for (const [category, categoryItems] of categories) {
  lines.push(`- [${category} (${categoryItems.length})](#${slug(category)})`);
}
lines.push("- [Official AI Certificates (" + certificates.length + ")](#official-ai-certificates)");

lines.push("", "---", "");

for (const [category, categoryItems] of categories) {
  lines.push(`<a id="${slug(category)}"></a>`, `## ${category}`, "");
  const providers = [...groupBy(categoryItems, "Primary Provider")].sort(
    ([providerA, resourcesA], [providerB, resourcesB]) =>
      resourcesB.length - resourcesA.length || compare(providerA, providerB)
  );
  for (const [provider, providerItems] of providers) {
    const logo = providerLogo(provider);
    const logoFile = ["png", "svg"].map((extension) => `${logo}.${extension}`)
      .find((file) => availableLogos.has(file));
    const providerHeading = logoFile
      ? `<img src="assets/provider-logos/${logoFile}" alt="${provider} logo" width="28" height="28"> ${provider}`
      : provider;
    lines.push(
      `<a id="${slug(`${category}-${provider}`)}"></a>`,
      `### ${providerHeading}`,
      ""
    );
    lines.push("| Resource | Level | Duration | Release / Update | Focus |", "|---|---|---|---|---|");
    for (const resource of [...providerItems].sort((a, b) => compare(a["Course Title"], b["Course Title"]))) {
      const focus = resource.Capability;
      const title = `[${clean(resource["Course Title"])}](${resource["Official URL"]})`;
      const releaseDate = resource["Release or Update Date"] || resource["Release Date"] || "Unknown";
      lines.push(`| ${title} | ${clean(resource.Level)} | ${clean(resource["Estimated Duration"])} | ${yearMonth(releaseDate)} | ${clean(focus)} |`);
    }
    lines.push("");
  }
  lines.push("[Back to top](#readme-top)", "", "---", "");
}

const mappedCoursesByCertificate = new Map(certificates.map((certificate) => [certificate.ID, []]));
for (const resource of resources) {
  for (const certificateId of resource["Certificate IDs"]) {
    mappedCoursesByCertificate.get(certificateId).push(resource);
  }
}
const certificatesWithPreparation = [...mappedCoursesByCertificate.values()]
  .filter((mappedCourses) => mappedCourses.length > 0).length;
lines.push(
  "<a id=\"official-ai-certificates\"></a>",
  "## Official AI Certificates",
  "",
  "These are official credentials from their issuers. The linked preparation courses are free learning resources; certification exams, registrations, and credentials may have separate fees or requirements.",
  "",
  "**" + certificates.length + " certificates**; **" + certificatesWithPreparation + "** have mapped free preparation courses.",
  "",
  "| Certificate | Issuer / Credential | Mapped free preparation courses |",
  "|---|---|---|"
);
for (const certificate of [...certificates].sort((a, b) =>
  compare(a.Issuer, b.Issuer) || compare(a["Certificate Title"], b["Certificate Title"])
)) {
  const mappedCourses = [...mappedCoursesByCertificate.get(certificate.ID)]
    .sort((a, b) => compare(a["Course Title"], b["Course Title"]));
  const preparation = mappedCourses.length
    ? mappedCourses.map((course) => "[" + clean(course["Course Title"]) + "](" + course["Official URL"] + ")").join("; ")
    : "No mapped free preparation course yet.";
  const title = "[" + clean(certificate["Certificate Title"]) + "](" + certificate["Official URL"] + ")";
  const details = clean(certificate.Issuer) + " · " + clean(certificate["Credential Type"]);
  lines.push("| " + title + " | " + details + " | " + preparation + " |");
}
lines.push("", "[Back to top](#readme-top)", "", "---", "");

lines.push(
  "## Open-Source Philosophy and License",
  "",
  "In the age of AI, high-quality learning resources should belong to everyone who wants to learn—not be locked behind paywalls accessible to only a few.",
  "",
  "This project is open source because we want more people to have access to structured AI knowledge and to help foster a stronger culture of learning across the industry. We believe that the more freely knowledge flows, the higher the entire industry rises—and that benefits everyone.",
  "",
  "Open source, however, does not mean the work should be exploited. **The one thing we do not want to see is learning content intended for everyone being repackaged as a paid course or closed-source product and resold for profit.** Doing so betrays the trust of the open-source community and undermines the learning ecosystem we are building together.",
  "",
  "This project is therefore released under the **[AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html)**:",
  "",
  "- ✅ Anyone may **use, learn from, and improve** this project free of charge.",
  "- 🔄 Modified or derivative versions **must remain open source**, allowing improvements to flow back to the community.",
  "- 📌 Whether deploying the website or redistributing the collection, **you must preserve attribution to the original authors**.",
  "- ❌ **This project may not be incorporated into a closed-source commercial product.**",
  "",
  "> The AGPL-3.0 applies to this repository's code and original collection material. Linked courses and third-party materials remain subject to their respective owners' licenses and terms.",
  "",
  "## Acknowledgements",
  "",
  "Thanks to the educators, institutions, vendors, conference organizers, and independent creators who make these learning materials freely available.",
  ""
);

const readme = `${lines.join("\n")}\n`;
const data = `${JSON.stringify(resources, null, 2)}\n`;

if (checkOnly) {
  const currentReadme = await readFile(readmePath, "utf8").catch(() => "");
  const currentData = await readFile(dataPath, "utf8").catch(() => "");
  if (currentReadme !== readme || currentData !== data) {
    console.error("Generated files are out of date. Run: npm run generate");
    process.exit(1);
  }
  console.log(`Generated files are current (${resources.length} resources).`);
} else {
  await mkdir(path.dirname(dataPath), { recursive: true });
  await Promise.all([
    writeFile(readmePath, readme, "utf8"),
    writeFile(dataPath, data, "utf8")
  ]);
  console.log(`Generated README.md and data/resources.json with ${resources.length} resources.`);
}
