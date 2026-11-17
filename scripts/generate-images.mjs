// Generates public/og-default.png, public/favicon.svg, public/apple-touch-icon.png
// and small webp copies of the home page photo (public/images/output.jpg is
// 4032x3024 / 2.9 MB but is shown at about 171x128).
// Run with: bun scripts/generate-images.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const BG = "#18181b"; // zinc-900, the site background
const FG = "#ffffff";
const MUTED = "#a1a1aa"; // zinc-400
const FONT = "-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <text x="96" y="300" font-family="${FONT}" font-size="76" font-weight="600" fill="${FG}">Briheet Singh Yadav</text>
  <text x="96" y="370" font-family="${FONT}" font-size="34" fill="${MUTED}">Systems &amp; infrastructure · Rust · Go · KVM · GPUs · Nix</text>
  <text x="96" y="540" font-family="${FONT}" font-size="30" fill="${MUTED}">briheet.com</text>
</svg>`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <text x="32" y="47" text-anchor="middle" font-family="${FONT}" font-size="46" font-weight="700" fill="${FG}">b</text>
</svg>
`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile("public/og-default.png");
await writeFile("public/favicon.svg", favicon);
await sharp(Buffer.from(favicon), { density: 300 })
  .resize(180, 180)
  .flatten({ background: BG })
  .png({ compressionLevel: 9 })
  .toFile("public/apple-touch-icon.png");

for (const height of [128, 256]) {
  await sharp("public/images/output.jpg")
    .rotate()
    .resize({ height })
    .webp({ quality: 80 })
    .toFile(`public/images/output-${height}.webp`);
}

console.log("wrote og-default.png, favicon.svg, apple-touch-icon.png, images/output-{128,256}.webp");
