const ci = require("ci-info");
const checkCarbonVersion = require("./check_carbon_version");

jest.mock("ci-info");
jest.mock("../../package.json", () => ({
  version: "100.0.1",
}));

const mockLatestMoreThanOneAhead = {
  "dist-tags": {
    latest: "109.0.0",
  },
};

const mockLatestLessThanOneAhead = {
  "dist-tags": {
    latest: "100.0.2",
  },
};

describe("checkCarbonVersion script", () => {
  let consoleLogMock;

  beforeAll(() => {
    consoleLogMock = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
  });

  describe("when not being run in Bitrise CI", () => {
    it("should run and call console log", () => {
      fetch.mockResponse(JSON.stringify(mockLatestMoreThanOneAhead));
      checkCarbonVersion();

      // this flag is set when run in Carbon's CI pipeline so test fails
      expect(consoleLogMock).toHaveBeenCalled();
    });

    it("should run but not console log if the version numbers are less than 1 apart", () => {
      fetch.mockResponse(JSON.stringify(mockLatestLessThanOneAhead));
      checkCarbonVersion();

      expect(consoleLogMock).not.toHaveBeenCalled();
    });
  });

  it("should not run the script when being run in Bitrise CI", () => {
    fetch.mockResponse(JSON.stringify(mockLatestMoreThanOneAhead));
    ci.BITRISE = true;
    checkCarbonVersion();

    expect(consoleLogMock).not.toHaveBeenCalled();
  });
});
