import calculatePosition from "./calculate-position";

jest.mock("../../../components/tooltip/tooltip-pointer.style", () => ({
  pointerSize: 5,
  pointerSideMargin: 10,
}));

const target = {
  offsetWidth: 30,
  offsetHeight: 30,
  getBoundingClientRect: () => ({
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  }),
};

const tooltip = {
  offsetWidth: 100,
  offsetHeight: 50,
  style: { left: 0, top: 0 },
  children: [
    { foo: "bar" },
    {
      offsetHeight: 7,
    },
  ],
};

describe("calculatePosition", () => {
  it("matches the expected values", () => {
    expect(calculatePosition(tooltip, target)).toMatchSnapshot();
  });
});
