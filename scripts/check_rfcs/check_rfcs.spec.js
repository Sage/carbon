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

  // configure nock to intercept the octakit request
  nock("https://api.github.com")
    .persist()
    .get("/repos/sage/carbon/pulls")
    .query({})
    .reply(200, dataWithRFCLabels);

  beforeAll(() => {
    consoleLogMock = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
    nock.cleanAll();
  });

  describe("when not being run in CI", () => {
    it("should run and call console log", async () => {
      jest.resetModules();
      const OLD_ENV = process.env.NODE_ENV;
      process.env.NODE_ENV = "test";
      await checkRfcs();

      expect(consoleLogMock).toHaveBeenCalled();

      process.env.NODE_ENV = OLD_ENV;
    });

    it("should run but not console log if there are no items with RFC labels", async () => {
      nock("https://api.github.com")
        .persist()
        .get("/repos/sage/carbon/pulls")
        .query({})
        .reply(200, dataWithoutRFCLabels);

      await checkRfcs();

      expect(consoleLogMock).not.toHaveBeenCalled();
    });
  });

  it("should not run the script when being run in CI", async () => {
    ci.isCI = true;
    const OLD_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = "NOT-TEST";
    await checkRfcs();

    expect(consoleLogMock).not.toHaveBeenCalled();

    process.env.NODE_ENV = OLD_ENV;
  });
});
