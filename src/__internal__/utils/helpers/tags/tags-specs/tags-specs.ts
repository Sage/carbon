import { ReactWrapper, ShallowWrapper } from "enzyme";

export const elementsTagTest = (
  wrapper: ReactWrapper | ShallowWrapper,
  elements: string[]
) => {
  elements.forEach((element) => {
    it(`include 'data-element="${element}"'`, () => {
      expect(wrapper.find({ "data-element": element }).length).toEqual(1);
    });
  });
};

export const rootTagTest = (
  rootNode: ReactWrapper | ShallowWrapper,
  comp: string,
  elem?: string,
  role?: string
) => {
  expect(rootNode.prop("data-component")).toEqual(comp);
  expect(rootNode.prop("data-element")).toEqual(elem);
  expect(rootNode.prop("data-role")).toEqual(role);
};
