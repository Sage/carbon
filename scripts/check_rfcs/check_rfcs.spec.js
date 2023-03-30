const ci = require("ci-info");
const nock = require("nock");
const checkRfcs = require("./check_rfcs");

const dataWithRFCLabels = [
  {
    labels: [{ name: "RFC" }, { name: "Foo" }, { name: "Bar" }],
    title: "Title: Item One",
    html_url: "item_one_url",
  },
  {
    labels: [{ name: "Foo" }, { name: "Bar" }],
    title: "Title: Item Two",
    html_url: "item_two_url",
  },
  {
    labels: [{ name: "RFC" }, { name: "Foo" }],
    title: "Title: Item Three",
    html_url: "item_three_url",
  },
];

const dataWithoutRFCLabels = [
  {
    labels: [{ name: "Foo" }, { name: "Bar" }],
    title: "Title: Item One",
    html_url: "item_one_url",
  },
  {
    labels: [{ name: "Foo" }, { name: "Bar" }],
    title: "Title: Item Two",
    html_url: "item_two_url",
  },
  {
    labels: [{ name: "Foo" }],
    title: "Title: Item Three",
    html_url: "item_three_url",
  },
];

describe("checkRfcs script", () => {
  let consoleLogMock;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
    nock.cleanAll();
  });

  it("should not run the script when being run in CI", async () => {
    const OLD_ENV = process.env.NODE_ENV;

    ci.isCI = true;
    process.env.NODE_ENV = "NOT-TEST";
    await checkRfcs();

    expect(consoleLogMock).not.toHaveBeenCalled();
    process.env.NODE_ENV = OLD_ENV;
  });

  describe("when not being run in CI", () => {
    it("if script retrieves pull request data, should run and call console log once", async () => {
      nock("https://api.github.com")
        .get("/repos/sage/carbon/pulls")
        .query({})
        .reply(200, dataWithRFCLabels);

      await checkRfcs();
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });

    it("if script retrieves pull requests but none have a RFC label, should run but not call console log", async () => {
      nock("https://api.github.com")
        .get("/repos/sage/carbon/pulls")
        .query({})
        .reply(200, dataWithoutRFCLabels);

      await checkRfcs();
      expect(consoleLogMock).not.toHaveBeenCalled();
    });

    it("if script fails to retrieve pull requests, should still resolve and call console log once", async () => {
      nock("https://api.github.com")
        .get("/repos/sage/carbon/pulls")
        .query({})
        .reply(403, { message: "API rate limit exceeded" });

      await expect(checkRfcs()).resolves.toBeUndefined();
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });
  });
});
