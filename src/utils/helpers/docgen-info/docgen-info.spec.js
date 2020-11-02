import getDocGenInfo from "./docgen-info";

const Aardvark = {};
const dgiUndefined = undefined;
const dgiInvalid = {
  some: "rubbish",
};
const docgenInfo = {
  "src/utils/helpers/docgen-info/spec-component/aardvark.component.js": [
    {
      description: "",
      displayName: "Aardvark",
      methods: [],
      props: {
        shellcolour: {
          type: {
            name: "string",
          },
          required: false,
          description: "Set the shellcolour of the Aardvark",
          defaultValue: {
            value: "'green'",
            computed: false,
          },
        },
      },
    },
  ],
};

describe("docgenInfo Helper", () => {
  describe("when no docgenInfo file", () => {
    it("__docgenInfo is null", () => {
      Aardvark.__docgenInfo = getDocGenInfo(
        dgiUndefined,
        /aardvark\.component(?!spec)/
      );
      expect(Aardvark.__docgenInfo).toBeNull();
    });
  });

  describe("when an invalid docgenInfo file", () => {
    it("__docgenInfo is null", () => {
      Aardvark.__docgenInfo = getDocGenInfo(
        dgiInvalid,
        /aardvark\.component(?!spec)/
      );
      expect(Aardvark.__docgenInfo).toBeNull();
    });
  });

  describe("when a valid docgenInfo file", () => {
    beforeAll(() => {
      Aardvark.__docgenInfo = getDocGenInfo(
        docgenInfo,
        /aardvark\.component(?!spec)/
      );
    });

    it("appends a __docgenInfo object", () => {
      expect(Aardvark).toHaveProperty("__docgenInfo");
    });

    it("__docgenInfo has a description", () => {
      expect(Aardvark.__docgenInfo.props.shellcolour.description).toEqual(
        "Set the shellcolour of the Aardvark"
      );
    });
  });
});
