export type ExtensionPackageJson = {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  "kolb-bot"?: {
    install?: {
      npmSpec?: string;
    };
    releaseChecks?: {
      rootDependencyMirrorAllowlist?: string[];
    };
  };
};

export type BundledExtension = { id: string; packageJson: ExtensionPackageJson };
export type BundledExtensionMetadata = BundledExtension & {
  npmSpec?: string;
  rootDependencyMirrorAllowlist: string[];
};

export function normalizeBundledExtensionMetadata(
  extensions: BundledExtension[],
): BundledExtensionMetadata[] {
  return extensions.map((extension) => ({
    ...extension,
    npmSpec:
      typeof extension.packageJson["kolb-bot"]?.install?.npmSpec === "string"
        ? extension.packageJson["kolb-bot"].install.npmSpec.trim()
        : undefined,
    rootDependencyMirrorAllowlist:
      extension.packageJson["kolb-bot"]?.releaseChecks?.rootDependencyMirrorAllowlist?.filter(
        (entry): entry is string => typeof entry === "string" && entry.trim().length > 0,
      ) ?? [],
  }));
}

export function collectBundledExtensionManifestErrors(extensions: BundledExtension[]): string[] {
  const errors: string[] = [];

  for (const extension of extensions) {
    const install = extension.packageJson["kolb-bot"]?.install;
    if (
      install &&
      (!install.npmSpec || typeof install.npmSpec !== "string" || !install.npmSpec.trim())
    ) {
      errors.push(
        `bundled extension '${extension.id}' manifest invalid | kolb-bot.install.npmSpec must be a non-empty string`,
      );
    }

    const allowlist =
      extension.packageJson["kolb-bot"]?.releaseChecks?.rootDependencyMirrorAllowlist;
    if (allowlist === undefined) {
      continue;
    }
    if (!Array.isArray(allowlist)) {
      errors.push(
        `bundled extension '${extension.id}' manifest invalid | kolb-bot.releaseChecks.rootDependencyMirrorAllowlist must be an array of non-empty strings`,
      );
      continue;
    }
    for (const entry of allowlist) {
      if (typeof entry !== "string" || !entry.trim()) {
        errors.push(
          `bundled extension '${extension.id}' manifest invalid | each entry in kolb-bot.releaseChecks.rootDependencyMirrorAllowlist must be a non-empty string`,
        );
        break;
      }
    }
  }

  return errors;
}
