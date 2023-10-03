import { ReactWrapper, ShallowWrapper } from "enzyme";

const elementsTagTest = (
  wrapper: ReactWrapper | ShallowWrapper,
  elements: string[]
) => {
  elements.forEach((element) => {
    it(`include 'data-element="${element}"'`, () => {
      expect(wrapper.find({ "data-element": element }).length).toEqual(1);
    });
  });
};

const rootTagTest = (
  rootNode: ReactWrapper | ShallowWrapper,
  comp: string,
  elem?: string,
  role?: string
) => {
  expect(rootNode.prop("data-component")).toEqual(comp);
  expect(rootNode.prop("data-element")).toEqual(elem);
  expect(rootNode.prop("data-role")).toEqual(role);
};

const rootTagTestRtl = (
  element: HTMLElement,
  comp: string,
  elem?: string,
  role?: string
) => {
  expect(element.getAttribute("data-component")).toBe(comp);
  expect(element.getAttribute("data-element")).toBe(elem);
  expect(element.getAttribute("data-role")).toBe(role);
};

export { elementsTagTest, rootTagTest, rootTagTestRtl };
