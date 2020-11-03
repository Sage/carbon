import serialize from "./serialize";

describe("serialize", () => {
  it("converts empty object to empty string", () => {
    expect(serialize({})).toEqual("");
  });

  it("converts flat object into string", () => {
    let obj = {
      foo: "abc",
      bar: "xyz",
    };

    expect(serialize(obj)).toEqual("foo=abc&bar=xyz");
  });

  it("converts nested object into string", () => {
    let obj = {
      foo: "abc",
      bar: {
        one: "hello",
        two: "bye",
      },
    };

    expect(serialize(obj)).toEqual(
      "foo=abc&bar%5Bone%5D=hello&bar%5Btwo%5D=bye"
    );
  });
});
