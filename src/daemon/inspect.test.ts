import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { findExtraGatewayServices } from "./inspect.js";

const { execSchtasksMock } = vi.hoisted(() => ({
  execSchtasksMock: vi.fn(),
}));

vi.mock("./schtasks-exec.js", () => ({
  execSchtasks: (...args: unknown[]) => execSchtasksMock(...args),
}));

describe("findExtraGatewayServices (win32)", () => {
  const originalPlatform = process.platform;

  beforeEach(() => {
    Object.defineProperty(process, "platform", {
      configurable: true,
      value: "win32",
    });
    execSchtasksMock.mockReset();
  });

  afterEach(() => {
    Object.defineProperty(process, "platform", {
      configurable: true,
      value: originalPlatform,
    });
  });

  it("skips schtasks queries unless deep mode is enabled", async () => {
    const result = await findExtraGatewayServices({});
    expect(result).toEqual([]);
    expect(execSchtasksMock).not.toHaveBeenCalled();
  });

  it("returns empty results when schtasks query fails", async () => {
    execSchtasksMock.mockResolvedValueOnce({
      code: 1,
      stdout: "",
      stderr: "error",
    });

    const result = await findExtraGatewayServices({}, { deep: true });
    expect(result).toEqual([]);
  });

  it("collects only non-kolb-bot marker tasks from schtasks output", async () => {
    execSchtasksMock.mockResolvedValueOnce({
      code: 0,
      stdout: [
        "TaskName: Kolb-Bot Gateway",
        "Task To Run: C:\\Program Files\\Kolb-Bot\\kolb-bot.exe gateway run",
        "",
        "TaskName: Kolb-Bot Legacy",
        "Task To Run: C:\\kolb-bot\\kolb-bot.exe run",
        "",
        "TaskName: Other Task",
        "Task To Run: C:\\tools\\helper.exe",
        "",
        "TaskName: Kolb-Bot Legacy",
        "Task To Run: C:\\kolb-bot\\kolb-bot.exe run",
        "",
      ].join("\n"),
      stderr: "",
    });

    const result = await findExtraGatewayServices({}, { deep: true });
    expect(result).toEqual([
      {
        platform: "win32",
        label: "Kolb-Bot Legacy",
        detail: "task: Kolb-Bot Legacy, run: C:\\kolb-bot\\kolb-bot.exe run",
        scope: "system",
        marker: "kolb-bot",
        legacy: true,
      },
      {
        platform: "win32",
        label: "Kolb-Bot Legacy",
        detail: "task: Kolb-Bot Legacy, run: C:\\kolb-bot\\kolb-bot.exe run",
        scope: "system",
        marker: "kolb-bot",
        legacy: true,
      },
    ]);
  });
});
