import { Box, Text, render, useApp } from "ink";
import React, { useEffect, useState } from "react";
import { PIRATE_PALETTE } from "../terminal/palette.js";

// --- Wave animation data ---

const WAVE_PATTERNS = [
  "  ≈~≈~~≈~≈  ~~≈~≈~~≈  ≈~~≈~≈~~  ~~≈~~≈~≈  ≈~≈~~≈~",
  "  ~≈~~≈~≈~  ~≈~~≈~≈~  ~~≈~≈~≈~  ~≈~~≈~≈~  ~~≈~~≈~",
  "  ~~≈~≈~~≈  ≈~~≈~≈~~  ~≈~~≈~≈~  ≈~~≈~≈~~  ~≈~~≈~≈",
  "  ≈~~≈~≈~≈  ~~≈~~≈~≈  ≈~≈~~≈~≈  ~~≈~≈~~≈  ≈~~≈~≈~",
];

const ANIMATION_FRAMES = 12;
const FRAME_INTERVAL_MS = 160;

function getWave(frame: number, row: number): string {
  return WAVE_PATTERNS[(frame + row) % WAVE_PATTERNS.length]!;
}

// --- Ship components ---

function Flag() {
  return <Text>{"                         🏴‍☠️"}</Text>;
}

function MastTop() {
  return <Text color={PIRATE_PALETTE.mast}>{"                         ║"}</Text>;
}

function SailRow({ leftPad, innerPad }: { leftPad: number; innerPad: number }) {
  const pad = " ".repeat(leftPad);
  const inner = " ".repeat(innerPad);
  return (
    <Text>
      {pad}
      <Text color={PIRATE_PALETTE.mast}>│</Text>
      <Text color={PIRATE_PALETTE.sail}>{"╲"}</Text>
      <Text color={PIRATE_PALETTE.sail}>{inner}</Text>
      <Text color={PIRATE_PALETTE.mast}>║</Text>
      <Text color={PIRATE_PALETTE.sail}>{inner}</Text>
      <Text color={PIRATE_PALETTE.sail}>{"╱"}</Text>
      <Text color={PIRATE_PALETTE.mast}>│</Text>
    </Text>
  );
}

function Sails() {
  return (
    <Box flexDirection="column">
      {/* Sail yard / top spar */}
      <Text>
        {"                "}
        <Text color={PIRATE_PALETTE.mast}>{"┌─────────"}</Text>
        <Text color={PIRATE_PALETTE.mast}>{"║"}</Text>
        <Text color={PIRATE_PALETTE.mast}>{"─────────┐"}</Text>
      </Text>
      <SailRow leftPad={16} innerPad={8} />
      <SailRow leftPad={16} innerPad={7} />
      <SailRow leftPad={16} innerPad={6} />
      <SailRow leftPad={16} innerPad={5} />
      <SailRow leftPad={16} innerPad={4} />
      <SailRow leftPad={16} innerPad={3} />
    </Box>
  );
}

function HullTop() {
  return (
    <Text>
      {"        "}
      <Text color={PIRATE_PALETTE.hull}>{"┌────────┴──────"}</Text>
      <Text color={PIRATE_PALETTE.mast}>{"║"}</Text>
      <Text color={PIRATE_PALETTE.hull}>{"──────┴────────┐"}</Text>
    </Text>
  );
}

function HullBody() {
  return (
    <Box flexDirection="column">
      <Text>
        {"        "}
        <Text color={PIRATE_PALETTE.hull}>{"│"}</Text>
        <Text color={PIRATE_PALETTE.hullDark}>{"░░░░░░░"}</Text>
        <Text color={PIRATE_PALETTE.info} bold>
          {" K O L B - B O T "}
        </Text>
        <Text color={PIRATE_PALETTE.hullDark}>{"░░░░░░░"}</Text>
        <Text color={PIRATE_PALETTE.hull}>{"│"}</Text>
      </Text>
      <Text>
        {"        "}
        <Text color={PIRATE_PALETTE.hull}>{"╰─────┬───────────────────────┬─────╯"}</Text>
      </Text>
      <Text>
        {"              "}
        <Text color={PIRATE_PALETTE.hull}>{"╰───────────────────────╯"}</Text>
      </Text>
    </Box>
  );
}

function Waves({ frame }: { frame: number }) {
  return (
    <Box flexDirection="column">
      <Text color={PIRATE_PALETTE.ocean}>{getWave(frame, 0)}</Text>
      <Text color={PIRATE_PALETTE.oceanDark}>{getWave(frame, 1)}</Text>
      <Text color={PIRATE_PALETTE.ocean}>{getWave(frame, 2)}</Text>
    </Box>
  );
}

function Title() {
  return (
    <Box justifyContent="center" marginTop={1}>
      <Text>
        {"🏴‍☠️ "}
        <Text color={PIRATE_PALETTE.info} bold>
          Kolb-Bot
        </Text>
        {" 🏴‍☠️"}
      </Text>
    </Box>
  );
}

// --- Main animated component ---

function PirateShip() {
  const { exit } = useApp();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => {
        const next = f + 1;
        if (next >= ANIMATION_FRAMES) {
          clearInterval(interval);
          setTimeout(() => exit(), 50);
        }
        return next;
      });
    }, FRAME_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [exit]);

  return (
    <Box flexDirection="column" paddingTop={1}>
      <Flag />
      <MastTop />
      <Sails />
      <HullTop />
      <HullBody />
      <Waves frame={frame} />
      <Title />
    </Box>
  );
}

/**
 * Render the animated pirate ship banner using Ink.
 * The ship displays with animated ocean waves for ~2 seconds,
 * then unmounts, leaving the final frame in the terminal.
 */
export async function renderAnimatedBanner(): Promise<void> {
  const instance = render(<PirateShip />, {
    exitOnCtrlC: false,
  });

  await instance.waitUntilExit();
}
