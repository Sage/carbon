import fs from "node:fs/promises";
import {
  fetchPackageTimes,
  formatAge,
  getPackageNameFromLockEntry,
  getPackageUrl,
  readLockedPackages,
  readMinReleaseAge,
  runConcurrently,
} from "./check-release-age.mjs";

jest.mock("node:fs/promises", () => ({
  readFile: jest.fn(),
}));

const originalFetch = global.fetch;
const originalEnv = process.env;

beforeEach(() => {
  process.env = { ...originalEnv };
  delete process.env.MIN_RELEASE_AGE;
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
  fs.readFile.mockReset();
  process.env = originalEnv;
  global.fetch = originalFetch;
});

describe("getPackageNameFromLockEntry", () => {
  it("uses an explicit name from the lock entry when present", () => {
    expect(
      getPackageNameFromLockEntry("node_modules/aliased", {
        name: "real-name",
      }),
    ).toBe("real-name");
  });

  it("derives an unscoped name from the package path", () => {
    expect(getPackageNameFromLockEntry("node_modules/lodash", {})).toBe(
      "lodash",
    );
  });

  it("derives a scoped name from the package path", () => {
    expect(
      getPackageNameFromLockEntry("node_modules/@sage/design-tokens", {}),
    ).toBe("@sage/design-tokens");
  });

  it("resolves the name from the deepest node_modules segment", () => {
    expect(
      getPackageNameFromLockEntry("node_modules/a/node_modules/b", {}),
    ).toBe("b");
  });
});

describe("getPackageUrl", () => {
  it("encodes scoped package names", () => {
    expect(
      getPackageUrl("https://registry.npmjs.org", "@sage/design-tokens"),
    ).toBe("https://registry.npmjs.org/%40sage%2Fdesign-tokens");
  });

  it("strips a trailing slash from the registry", () => {
    expect(getPackageUrl("https://registry.npmjs.org/", "lodash")).toBe(
      "https://registry.npmjs.org/lodash",
    );
  });
});

describe("formatAge", () => {
  it("formats an age in milliseconds as a number of days", () => {
    expect(formatAge(86400000)).toBe("1.00 days");
    expect(formatAge(129600000)).toBe("1.50 days");
  });
});

describe("readMinReleaseAge", () => {
  it("prefers the MIN_RELEASE_AGE environment variable", async () => {
    process.env.MIN_RELEASE_AGE = "7";

    await expect(readMinReleaseAge()).resolves.toBe(7);
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  it("reads the value from .npmrc when the env var is absent", async () => {
    fs.readFile.mockResolvedValue("ignore-scripts=true\nmin-release-age=3\n");

    await expect(readMinReleaseAge()).resolves.toBe(3);
    expect(fs.readFile).toHaveBeenCalledWith(".npmrc", "utf8");
  });

  it("uses the last matching line in .npmrc", async () => {
    fs.readFile.mockResolvedValue("min-release-age=3\nmin-release-age=9\n");

    await expect(readMinReleaseAge()).resolves.toBe(9);
  });

  it("throws when .npmrc does not set min-release-age", async () => {
    fs.readFile.mockResolvedValue("ignore-scripts=true\n");

    await expect(readMinReleaseAge()).rejects.toThrow(
      "min-release-age not set in .npmrc",
    );
  });

  it("throws a helpful error when .npmrc is missing", async () => {
    fs.readFile.mockRejectedValue(
      Object.assign(new Error("nope"), { code: "ENOENT" }),
    );

    await expect(readMinReleaseAge()).rejects.toThrow(
      "min-release-age not set in .npmrc",
    );
  });

  it("rethrows unexpected errors while reading .npmrc", async () => {
    fs.readFile.mockRejectedValue(
      Object.assign(new Error("disk on fire"), { code: "EACCES" }),
    );

    await expect(readMinReleaseAge()).rejects.toThrow("disk on fire");
  });
});

describe("readLockedPackages", () => {
  it("collects versioned dependencies and de-duplicates them", async () => {
    fs.readFile.mockResolvedValue(
      JSON.stringify({
        packages: {
          "": { name: "carbon-react", version: "1.0.0" },
          "node_modules/lodash": { version: "4.17.21" },
          "node_modules/@sage/design-tokens": { version: "4.17.0" },
          "node_modules/a/node_modules/lodash": { version: "4.17.21" },
        },
      }),
    );

    await expect(readLockedPackages()).resolves.toEqual([
      { name: "lodash", version: "4.17.21" },
      { name: "@sage/design-tokens", version: "4.17.0" },
    ]);
  });

  it("skips linked and version-less entries", async () => {
    fs.readFile.mockResolvedValue(
      JSON.stringify({
        packages: {
          "node_modules/linked": { version: "1.0.0", link: true },
          "node_modules/no-version": {},
          "node_modules/real": { version: "2.0.0" },
        },
      }),
    );

    await expect(readLockedPackages()).resolves.toEqual([
      { name: "real", version: "2.0.0" },
    ]);
  });

  it("throws when the lockfile has no packages map", async () => {
    fs.readFile.mockResolvedValue(JSON.stringify({ dependencies: {} }));

    await expect(readLockedPackages()).rejects.toThrow(
      "package-lock.json does not contain a packages map",
    );
  });
});

describe("fetchPackageTimes", () => {
  it("returns the time map for a successful response", async () => {
    const time = { "1.0.0": "2020-01-01T00:00:00.000Z" };
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ time }) });

    await expect(
      fetchPackageTimes("https://registry.npmjs.org", "lodash"),
    ).resolves.toBe(time);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://registry.npmjs.org/lodash",
      expect.objectContaining({ headers: { Accept: "application/json" } }),
    );
  });

  it("throws when the response is not ok", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Server Error",
    });

    await expect(
      fetchPackageTimes("https://registry.npmjs.org", "lodash"),
    ).rejects.toThrow("Could not fetch lodash metadata: 500 Server Error");
  });

  it("throws a timeout-specific error when the request aborts", async () => {
    global.fetch.mockRejectedValue(
      Object.assign(new Error("aborted"), { name: "TimeoutError" }),
    );

    await expect(
      fetchPackageTimes("https://registry.npmjs.org", "lodash"),
    ).rejects.toThrow("Timed out fetching lodash metadata after 30 seconds");
  });

  it("rethrows unexpected network errors", async () => {
    global.fetch.mockRejectedValue(new Error("ECONNRESET"));

    await expect(
      fetchPackageTimes("https://registry.npmjs.org", "lodash"),
    ).rejects.toThrow("ECONNRESET");
  });

  it("throws when the registry metadata has no time field", async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    await expect(
      fetchPackageTimes("https://registry.npmjs.org", "lodash"),
    ).rejects.toThrow("Registry metadata for lodash does not include time");
  });
});

describe("runConcurrently", () => {
  it("runs the worker for every item and preserves order", async () => {
    const results = await runConcurrently(
      [1, 2, 3],
      async (value) => value * 2,
    );

    expect(results).toEqual([2, 4, 6]);
  });
});
