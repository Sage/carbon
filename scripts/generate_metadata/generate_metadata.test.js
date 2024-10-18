import fs from "fs";
import fetch from "jest-fetch-mock";
import { generateMetadata, writeFile } from "./generate_metadata";

jest.mock("fs");
const mockedFs = jest.mocked(fs);

const mockNpmVersions = {
  versions: {
    "98.0.0": {},
    "99.0.0": {},
    "100.1.1": {},
    "100.2.1": {},
    "101.0.0": {},
    "102.0.0": {},
  },
};

const mockMetadata = {
  versions: {
    "v102.0.0": "https://carbon.sage.com/v/102.0.0/index.html",
    "v101.0.0": "https://carbon.sage.com/v/101.0.0/index.html",
    "v100.2.1": "https://carbon.sage.com/v/100.2.1/index.html",
  },
};

beforeEach(() => {
  jest.spyOn(global.console, "log").mockImplementation(() => {});
  jest.spyOn(global.console, "error").mockImplementation(() => {});

  fetch.mockResponse(JSON.stringify(mockNpmVersions));

  mockedFs.mkdirSync = jest.fn((path, options, callback) => {
    callback();
  });
  mockedFs.writeFileSync = jest.fn((path, json, callback) => {
    callback();
  });
});

afterEach(() => {
  jest.resetAllMocks();
  fetch.resetMocks();
});

test("creates a metadata.json file in a metadata directory", async () => {
  await generateMetadata();

  expect(mockedFs.mkdirSync).toHaveBeenCalledWith(
    "metadata",
    {},
    expect.any(Function)
  );

  expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
    "metadata/metadata.json",
    JSON.stringify(mockMetadata),
    expect.any(Function)
  );
});

test("throws an error, when unable to create the metadata directory", () => {
  mockedFs.mkdirSync = jest.fn((path, options, callback) => {
    callback(new Error("An error occurred."));
  });

  expect(() => writeFile()).toThrow("An error occurred.");
});

test("throws an error, when unable to create the metadata.json file", () => {
  mockedFs.writeFileSync = jest.fn((path, json, callback) => {
    callback(new Error("An error occurred."));
  });

  expect(() => writeFile()).toThrow("An error occurred.");
});

describe("when unable to fetch carbon data from npm", () => {
  it("logs error with http status code", async () => {
    fetch.mockResponse(JSON.stringify(mockNpmVersions), {
      status: 500,
      ok: false,
    });

    await generateMetadata();

    expect(global.console.error).toHaveBeenCalledWith(
      new Error("Failed to fetch from npm with HTTP error code 500")
    );
  });

  it("does not attempt to write metadata.json file", async () => {
    fetch.mockResponse(JSON.stringify(mockNpmVersions), {
      status: 500,
      ok: false,
    });

    await generateMetadata();

    expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
  });
});
