import { loadConfig } from "../config/config.js";
import { resolveCommitHash } from "../infra/git-commit.js";
import { visibleWidth } from "../terminal/ansi.js";
import { isRich, theme } from "../terminal/theme.js";
import { hasRootVersionAlias } from "./argv.js";
import { pickTagline, type TaglineMode, type TaglineOptions } from "./tagline.js";

type BannerOptions = TaglineOptions & {
  argv?: string[];
  commit?: string | null;
  columns?: number;
  richTty?: boolean;
};

let bannerEmitted = false;

const graphemeSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function splitGraphemes(value: string): string[] {
  if (!graphemeSegmenter) {
    return Array.from(value);
  }
  try {
    return Array.from(graphemeSegmenter.segment(value), (seg) => seg.segment);
  } catch {
    return Array.from(value);
  }
}

const hasJsonFlag = (argv: string[]) =>
  argv.some((arg) => arg === "--json" || arg.startsWith("--json="));

const hasVersionFlag = (argv: string[]) =>
  argv.some((arg) => arg === "--version" || arg === "-V") || hasRootVersionAlias(argv);

function parseTaglineMode(value: unknown): TaglineMode | undefined {
  if (value === "random" || value === "default" || value === "off") {
    return value;
  }
  return undefined;
}

function resolveTaglineMode(options: BannerOptions): TaglineMode | undefined {
  const explicit = parseTaglineMode(options.mode);
  if (explicit) {
    return explicit;
  }
  try {
    return parseTaglineMode(loadConfig().cli?.banner?.taglineMode);
  } catch {
    // Fall back to default random behavior when config is missing/invalid.
    return undefined;
  }
}

export function formatCliBannerLine(version: string, options: BannerOptions = {}): string {
  const commit =
    options.commit ?? resolveCommitHash({ env: options.env, moduleUrl: import.meta.url });
  const commitLabel = commit ?? "unknown";
  const tagline = pickTagline({ ...options, mode: resolveTaglineMode(options) });
  const rich = options.richTty ?? isRich();
  const title = "🏴‍☠️ Kolb-Bot";
  const prefix = "🏴‍☠️ ";
  const columns = options.columns ?? process.stdout.columns ?? 120;
  const plainBaseLine = `${title} ${version} (${commitLabel})`;
  const plainFullLine = tagline ? `${plainBaseLine} — ${tagline}` : plainBaseLine;
  const fitsOnOneLine = visibleWidth(plainFullLine) <= columns;
  if (rich) {
    if (fitsOnOneLine) {
      if (!tagline) {
        return `${theme.heading(title)} ${theme.info(version)} ${theme.muted(`(${commitLabel})`)}`;
      }
      return `${theme.heading(title)} ${theme.info(version)} ${theme.muted(
        `(${commitLabel})`,
      )} ${theme.muted("—")} ${theme.accentDim(tagline)}`;
    }
    const line1 = `${theme.heading(title)} ${theme.info(version)} ${theme.muted(
      `(${commitLabel})`,
    )}`;
    if (!tagline) {
      return line1;
    }
    const line2 = `${" ".repeat(prefix.length)}${theme.accentDim(tagline)}`;
    return `${line1}\n${line2}`;
  }
  if (fitsOnOneLine) {
    return plainFullLine;
  }
  const line1 = plainBaseLine;
  if (!tagline) {
    return line1;
  }
  const line2 = `${" ".repeat(prefix.length)}${tagline}`;
  return `${line1}\n${line2}`;
}

// Plain-text pirate ship (used when colors are unavailable).
const PIRATE_SHIP_PLAIN = [
  "                         🏴‍☠️",
  "                      .___|___.",
  "                      |\\   |  /|",
  "                      | \\  | / |",
  "                      |  \\ |/  |",
  "                      |   \\|/  |",
  "               _______|___/|\\__|_______",
  "              |    K O L B - B O T     |",
  "       ~~~~~~ |________________________| ~~~~~~",
  "     ~~~~~~~~\\__________________________/~~~~~~~~",
  "   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "      ~~~~~~~~  ~~~~~~~~  ~~~~~~~~  ~~~~~~~~",
  "   ~~~~~~~~  ~~~~~~~~  ~~~~~~~~  ~~~~~~~~  ~~~~~",
  "                 🏴‍☠️ Kolb-Bot 🏴‍☠️",
  " ",
];

// Structured pirate ship for rich color rendering.
// Each line is tagged with a section for per-line coloring.
type ShipSection = "flag" | "mast" | "sail" | "hull" | "name" | "wave" | "title" | "blank";
const PIRATE_SHIP_RICH: Array<{ section: ShipSection; text: string }> = [
  { section: "flag", text: "                         🏴‍☠️" },
  { section: "mast", text: "                      .___|___." },
  { section: "sail", text: "                      |\\   |  /|" },
  { section: "sail", text: "                      | \\  | / |" },
  { section: "sail", text: "                      |  \\ |/  |" },
  { section: "sail", text: "                      |   \\|/  |" },
  { section: "hull", text: "               _______|___/|\\__|_______" },
  { section: "name", text: "              |    K O L B - B O T     |" },
  { section: "wave", text: "       ~~~~~~ |________________________| ~~~~~~" },
  { section: "wave", text: "     ~~~~~~~~\\__________________________/~~~~~~~~" },
  { section: "wave", text: "   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" },
  { section: "wave", text: "      ~~~~~~~~  ~~~~~~~~  ~~~~~~~~  ~~~~~~~~" },
  { section: "wave", text: "   ~~~~~~~~  ~~~~~~~~  ~~~~~~~~  ~~~~~~~~  ~~~~~" },
  { section: "title", text: "                 🏴‍☠️ Kolb-Bot 🏴‍☠️" },
  { section: "blank", text: " " },
];

function colorShipLine(section: ShipSection, text: string): string {
  switch (section) {
    case "flag":
      return text; // emoji renders natively
    case "mast":
      return theme.mast(text);
    case "sail": {
      // Color the sail fabric white, mast lines tan
      return splitGraphemes(text)
        .map((ch) => {
          if (ch === "|" || ch === "/" || ch === "\\") {
            return theme.mast(ch);
          }
          return theme.sail(ch);
        })
        .join("");
    }
    case "hull": {
      return splitGraphemes(text)
        .map((ch) => {
          if (ch === "_" || ch === "|" || ch === "/" || ch === "\\") {
            return theme.hull(ch);
          }
          return theme.hullDark(ch);
        })
        .join("");
    }
    case "name": {
      // Ship hull with gold name text
      return splitGraphemes(text)
        .map((ch) => {
          if (ch === "|") {
            return theme.hull(ch);
          }
          if (ch === " ") {
            return ch;
          }
          return theme.info(ch);
        })
        .join("");
    }
    case "wave": {
      // Alternate between bright and dark ocean blue for wave motion effect
      let waveIdx = 0;
      return splitGraphemes(text)
        .map((ch) => {
          if (ch === "~" || ch === "≈") {
            waveIdx++;
            return waveIdx % 3 === 0 ? theme.oceanDark(ch) : theme.ocean(ch);
          }
          if (ch === "|" || ch === "/" || ch === "\\" || ch === "_") {
            return theme.hull(ch);
          }
          return ch;
        })
        .join("");
    }
    case "title": {
      // Center title with colored branding
      if (text.includes("Kolb-Bot")) {
        const parts = text.split("Kolb-Bot");
        return theme.muted(parts[0]!) + theme.info("Kolb-Bot") + theme.muted(parts[1] ?? "");
      }
      return theme.muted(text);
    }
    case "blank":
      return text;
  }
}

export function formatCliBannerArt(options: BannerOptions = {}): string {
  const rich = options.richTty ?? isRich();
  if (!rich) {
    return PIRATE_SHIP_PLAIN.join("\n");
  }

  return PIRATE_SHIP_RICH.map((line) => colorShipLine(line.section, line.text)).join("\n");
}

export async function emitCliBanner(version: string, options: BannerOptions = {}) {
  if (bannerEmitted) {
    return;
  }
  const argv = options.argv ?? process.argv;
  if (!process.stdout.isTTY) {
    return;
  }
  if (hasJsonFlag(argv)) {
    return;
  }
  if (hasVersionFlag(argv)) {
    return;
  }
  bannerEmitted = true;

  // Use animated Ink banner when the terminal supports rich output
  const rich = options.richTty ?? isRich();
  const hideBanner = process.env.KOLB_BOT_HIDE_BANNER === "1";
  if (rich && !hideBanner) {
    try {
      const { renderAnimatedBanner } = await import("./banner-art.js");
      await renderAnimatedBanner();
    } catch {
      // Fall back to static output if Ink rendering fails
      process.stdout.write(`\n${formatCliBannerArt(options)}\n`);
    }
  }

  const line = formatCliBannerLine(version, options);
  process.stdout.write(`\n${line}\n\n`);
}

export function hasEmittedCliBanner(): boolean {
  return bannerEmitted;
}
