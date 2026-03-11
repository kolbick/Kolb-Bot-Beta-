import chalk, { Chalk } from "chalk";
import { PIRATE_PALETTE } from "./palette.js";

const hasForceColor =
  typeof process.env.FORCE_COLOR === "string" &&
  process.env.FORCE_COLOR.trim().length > 0 &&
  process.env.FORCE_COLOR.trim() !== "0";

const baseChalk = process.env.NO_COLOR && !hasForceColor ? new Chalk({ level: 0 }) : chalk;

const hex = (value: string) => baseChalk.hex(value);

export const theme = {
  accent: hex(PIRATE_PALETTE.accent),
  accentBright: hex(PIRATE_PALETTE.accentBright),
  accentDim: hex(PIRATE_PALETTE.accentDim),
  info: hex(PIRATE_PALETTE.info),
  success: hex(PIRATE_PALETTE.success),
  warn: hex(PIRATE_PALETTE.warn),
  error: hex(PIRATE_PALETTE.error),
  muted: hex(PIRATE_PALETTE.muted),
  heading: baseChalk.bold.hex(PIRATE_PALETTE.accent),
  command: hex(PIRATE_PALETTE.accentBright),
  option: hex(PIRATE_PALETTE.warn),
} as const;

export const isRich = () => Boolean(baseChalk.level > 0);

export const colorize = (rich: boolean, color: (value: string) => string, value: string) =>
  rich ? color(value) : value;
