import { describe, expect, it } from "vitest";
import { buildPlatformRuntimeLogHints, buildPlatformServiceStartHints } from "./runtime-hints.js";

describe("buildPlatformRuntimeLogHints", () => {
  it("renders launchd log hints on darwin", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "darwin",
        env: {
          KOLB_BOT_STATE_DIR: "/tmp/kolb-bot-state",
          KOLB_BOT_LOG_PREFIX: "gateway",
        },
        systemdServiceName: "kolb-bot-gateway",
        windowsTaskName: "Kolb-Bot Gateway",
      }),
    ).toEqual([
      "Launchd stdout (if installed): /tmp/kolb-bot-state/logs/gateway.log",
      "Launchd stderr (if installed): /tmp/kolb-bot-state/logs/gateway.err.log",
    ]);
  });

  it("renders systemd and windows hints by platform", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "linux",
        systemdServiceName: "kolb-bot-gateway",
        windowsTaskName: "Kolb-Bot Gateway",
      }),
    ).toEqual(["Logs: journalctl --user -u kolb-bot-gateway.service -n 200 --no-pager"]);
    expect(
      buildPlatformRuntimeLogHints({
        platform: "win32",
        systemdServiceName: "kolb-bot-gateway",
        windowsTaskName: "Kolb-Bot Gateway",
      }),
    ).toEqual(['Logs: schtasks /Query /TN "Kolb-Bot Gateway" /V /FO LIST']);
  });
});

describe("buildPlatformServiceStartHints", () => {
  it("builds platform-specific service start hints", () => {
    expect(
      buildPlatformServiceStartHints({
        platform: "darwin",
        installCommand: "kolb-bot gateway install",
        startCommand: "kolb-bot gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.kolb-bot.gateway.plist",
        systemdServiceName: "kolb-bot-gateway",
        windowsTaskName: "Kolb-Bot Gateway",
      }),
    ).toEqual([
      "kolb-bot gateway install",
      "kolb-bot gateway",
      "launchctl bootstrap gui/$UID ~/Library/LaunchAgents/com.kolb-bot.gateway.plist",
    ]);
    expect(
      buildPlatformServiceStartHints({
        platform: "linux",
        installCommand: "kolb-bot gateway install",
        startCommand: "kolb-bot gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.kolb-bot.gateway.plist",
        systemdServiceName: "kolb-bot-gateway",
        windowsTaskName: "Kolb-Bot Gateway",
      }),
    ).toEqual([
      "kolb-bot gateway install",
      "kolb-bot gateway",
      "systemctl --user start kolb-bot-gateway.service",
    ]);
  });
});
