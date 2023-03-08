import addFormSpacing from ".";

describe("addFormSpacing", () => {
  it("does not set mb and mt if passed props is empty object and no form spacing value is passed", () => {
    expect(addFormSpacing({})).toEqual({});
  });

  it("sets mb and mt if passed props is empty object", () => {
    expect(addFormSpacing({}, "5px")).toEqual({ mb: "5px", mt: 0 });
  });

  it.each(["mx", "marginX", "ml", "marginLeft", "mr", "marginRight"])(
    "sets mb and mt if %s passed in props",
    (marginProp) => {
      expect(addFormSpacing({ [marginProp]: "10px" }, "5px")).toEqual({
        [marginProp]: "10px",
        mb: "5px",
        mt: 0,
      });
    }
  );

  it.each(["mt", "marginTop"])(
    "does not set mt if %s passed in props",
    (marginProp) => {
      expect(addFormSpacing({ [marginProp]: "10px" }, "5px")).toEqual({
        [marginProp]: "10px",
        mb: "5px",
      });
    }
  );

  it.each(["mb", "marginBottom"])(
    "does not set mb if %s passed in props",
    (marginProp) => {
      expect(addFormSpacing({ [marginProp]: "10px" }, "5px")).toEqual({
        [marginProp]: "10px",
        mt: 0,
      });
    }
  );

  it.each(["my", "marginY", "m", "margin"])(
    "does not set mb or mt if %s passed in props",
    (marginProp) => {
      expect(addFormSpacing({ [marginProp]: "10px" }, "5px")).toEqual({
        [marginProp]: "10px",
      });
    }
  );
});
