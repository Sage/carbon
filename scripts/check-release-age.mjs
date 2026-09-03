import fs from "node:fs/promises";

const DEFAULT_REGISTRY = "https://registry.npmjs.org";
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const MAX_CONCURRENT_REQUESTS = 20;
const MAX_FAILURES_TO_PRINT = 25;

async function readMinReleaseAge() {
  if (process.env.MIN_RELEASE_AGE) {
    return Number.parseInt(process.env.MIN_RELEASE_AGE, 10);
  }

  let npmrc;
  try {
    npmrc = await fs.readFile(".npmrc", "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("min-release-age not set in .npmrc");
    }
    throw error;
  }

  const age = npmrc
    .split("\n")
    .map((line) => line.replace(/[ \t\r]/g, ""))
    .filter((line) => /^min-release-age=[0-9]+$/.test(line))
    .at(-1)
    ?.split("=")[1];

  if (!age) {
    throw new Error("min-release-age not set in .npmrc");
  }

  return Number.parseInt(age, 10);
}

function getPackageNameFromLockEntry(packagePath, packageInfo) {
  if (packageInfo.name) {
    return packageInfo.name;
  }

  const pathAfterNodeModules = packagePath.slice(
    packagePath.lastIndexOf("node_modules/") + "node_modules/".length,
  );
  const [firstSegment, secondSegment] = pathAfterNodeModules.split("/");

  return firstSegment.startsWith("@")
    ? `${firstSegment}/${secondSegment}`
    : firstSegment;
}

async function readLockedPackages() {
  const lockfile = JSON.parse(await fs.readFile("package-lock.json", "utf8"));

  if (!lockfile.packages) {
    throw new Error("package-lock.json does not contain a packages map");
  }

  const lockedPackages = new Map();

  for (const [packagePath, packageInfo] of Object.entries(lockfile.packages)) {
    if (
      !packagePath.includes("node_modules/") ||
      packageInfo.link ||
      !packageInfo.version
    ) {
      continue;
    }

    const name = getPackageNameFromLockEntry(packagePath, packageInfo);
    lockedPackages.set(`${name}@${packageInfo.version}`, {
      name,
      version: packageInfo.version,
    });
  }

  return [...lockedPackages.values()];
}

function getPackageUrl(registry, packageName) {
  const encodedPackageName = encodeURIComponent(packageName);
  return `${registry.replace(/\/$/, "")}/${encodedPackageName}`;
}

async function fetchPackageTimes(registry, packageName) {
  const response = await fetch(getPackageUrl(registry, packageName), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Could not fetch ${packageName} metadata: ${response.status} ${response.statusText}`,
    );
  }

  const packageMetadata = await response.json();

  if (!packageMetadata.time) {
    throw new Error(`Registry metadata for ${packageName} does not include time`);
  }

  return packageMetadata.time;
}

async function runConcurrently(items, worker) {
  const results = [];
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex]);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(MAX_CONCURRENT_REQUESTS, items.length) },
      runWorker,
    ),
  );

  return results;
}

function formatAge(ageInMilliseconds) {
  return `${(ageInMilliseconds / MILLISECONDS_IN_DAY).toFixed(2)} days`;
}

async function main() {
  const minReleaseAge = await readMinReleaseAge();

  if (!Number.isInteger(minReleaseAge) || minReleaseAge < 0) {
    throw new Error("MIN_RELEASE_AGE must be a non-negative integer");
  }

  const registry =
    process.env.NPM_CONFIG_REGISTRY ||
    process.env.npm_config_registry ||
    DEFAULT_REGISTRY;
  const lockedPackages = await readLockedPackages();
  const packageNames = [...new Set(lockedPackages.map(({ name }) => name))];
  const packageTimes = new Map();

  console.log(
    `Checking ${lockedPackages.length} locked package releases against min-release-age=${minReleaseAge} days`,
  );

  await runConcurrently(packageNames, async (packageName) => {
    packageTimes.set(packageName, await fetchPackageTimes(registry, packageName));
  });

  const now = Date.now();
  const minimumAgeInMilliseconds = minReleaseAge * MILLISECONDS_IN_DAY;
  const tooNewPackages = lockedPackages
    .map(({ name, version }) => {
      const publishedAt = packageTimes.get(name)[version];

      if (!publishedAt) {
        throw new Error(`No publish time found for ${name}@${version}`);
      }

      const publishedAtTime = new Date(publishedAt).getTime();
      const ageInMilliseconds = now - publishedAtTime;

      return {
        name,
        version,
        publishedAt,
        ageInMilliseconds,
        isTooNew: ageInMilliseconds < minimumAgeInMilliseconds,
      };
    })
    .filter(({ isTooNew }) => isTooNew)
    .sort((a, b) => a.ageInMilliseconds - b.ageInMilliseconds);

  if (tooNewPackages.length > 0) {
    console.error(
      `::error::${tooNewPackages.length} locked package release(s) do not meet min-release-age=${minReleaseAge} days`,
    );

    tooNewPackages
      .slice(0, MAX_FAILURES_TO_PRINT)
      .forEach(({ name, version, publishedAt, ageInMilliseconds }) => {
        console.error(
          `- ${name}@${version} was published at ${publishedAt} (${formatAge(ageInMilliseconds)} old)`,
        );
      });

    if (tooNewPackages.length > MAX_FAILURES_TO_PRINT) {
      console.error(
        `...and ${tooNewPackages.length - MAX_FAILURES_TO_PRINT} more package release(s)`,
      );
    }

    process.exit(1);
  }

  console.log("All locked package releases meet the configured release age.");
}

main().catch((error) => {
  console.error(`::error::${error.message}`);
  process.exit(1);
});