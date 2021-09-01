import unicodes from "./icon-unicodes";

test("the unicodes have not changed", () => {
  const codes = Object.keys(unicodes).sort();
  const result = codes.reduce((p, code) => {
    p[code] = unicodes[code];
    return p;
  }, {});

  expect(result).toMatchSnapshot();
});
