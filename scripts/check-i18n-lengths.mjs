#!/usr/bin/env node
/**
 * Audits every t(lang, <no>, <en>) call with plain string arguments and fails
 * if an English string is longer (in characters) than its Norwegian source.
 * Layout boxes across the site are sized for the Norwegian copy, so English
 * must always be the same length or shorter.
 *
 * JSX arguments (t(lang, <>…</>, <>…</>)) can't be measured here — keep those
 * pairs short-or-equal by hand.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "lib"];

/**
 * English strings allowed to exceed their Norwegian pair, each verified to sit
 * in a container with ample slack (auto-width menus, wide headings, wrapping
 * chip rows) so no overflow is possible. Keep this list short.
 */
const ALLOWED = new Map([
  ["Birthday", "menu item / card title; container min-width far exceeds text"],
  ["From 100 kr.", "display heading in a half-width grid column"],
  ["Get", "single heading word before a CountUp figure"],
  ["as the tour.", "h2 second line; the full heading is equal length"],
  ["Practice", "wrapping chip; the chip row total is shorter than Norwegian"],
  ["Theory", "step-card title; card width is set by far longer siblings"],
  ["Pre-party", "occasion grid cell; cell width sized by 10-char Norwegian max"],
  ["Get 2 800.", "hero h1 line; the English block is narrower than the Norwegian"],
  ["Close", "aria-label only — never rendered"],
  ["Birthday — INNE Golf Bergen", "browser-tab <title>, no layout box"],
  ["Sending…", "transient submit-button label; buttons auto-size"],
]);

/** NNBSP/THIN → plain space so allow-list keys can be written with spaces. */
const normalize = (s) => s.replace(/[  ]/g, " ");

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx|ts)$/.test(name)) files.push(path);
  }
};
ROOTS.forEach(walk);

// Template-literal placeholders used for typographic spaces — each is 1 char.
const substitute = (raw) =>
  raw
    .replaceAll("${NNBSP}", " ")
    .replaceAll("${THIN}", " ")
    .replaceAll("${MINUS}", "−");

function parseStringArg(src, i) {
  while (/\s/.test(src[i])) i++;
  const quote = src[i];
  if (quote !== '"' && quote !== "'" && quote !== "`") return null;
  let out = "";
  i++;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "\\") {
      out += src[i + 1];
      i += 2;
      continue;
    }
    if (ch === quote) return { value: quote === "`" ? substitute(out) : out, next: i + 1 };
    out += ch;
    i++;
  }
  return null;
}

let checked = 0;
let allowedHits = 0;
const violations = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const re = /(?<![\w.])t\(\s*lang\s*,/g;
  let m;
  while ((m = re.exec(src))) {
    const first = parseStringArg(src, m.index + m[0].length);
    if (!first) continue; // JSX or non-literal arg — audited by hand
    let i = first.next;
    while (/\s/.test(src[i])) i++;
    if (src[i] !== ",") continue;
    const second = parseStringArg(src, i + 1);
    if (!second) continue;
    checked++;
    const no = first.value;
    const en = second.value;
    if (en.length > no.length) {
      if (ALLOWED.has(normalize(en))) {
        allowedHits++;
        continue;
      }
      violations.push({ file, no, en });
    }
  }
}

console.log(`Checked ${checked} t() string pairs (${allowedHits} on the allow-list).`);
if (violations.length) {
  console.error(`\n${violations.length} English string(s) LONGER than Norwegian:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}`);
    console.error(`    NO (${v.no.length}): ${v.no}`);
    console.error(`    EN (${v.en.length}): ${v.en}\n`);
  }
  process.exit(1);
}
console.log("OK — every English string is the same length or shorter.");
