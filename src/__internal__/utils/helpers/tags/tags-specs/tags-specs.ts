import { ReactWrapper, ShallowWrapper } from "enzyme";

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

export default rootTagTest;
