import React from "react";
import { shallow } from "enzyme";
import useUniqueId from ".";
import createGuid from "../../../__internal__/utils/helpers/guid";

const guid = "guid-12345";

jest.mock("../../../__internal__/utils/helpers/guid");

(createGuid as jest.MockedFunction<typeof createGuid>).mockImplementation(
  () => guid
);

interface Props {
  id?: string;
  name?: string;
}

const MockComponent = (props: Props = {}): JSX.Element => {
  const [id, name] = useUniqueId(props.id, props.name);
  return <input id={id} name={name} />;
};

describe("useUniqueId hook", () => {
  it("provides unique id and name when no values passed in", () => {
    const wrapper = shallow(<MockComponent />);
    expect(wrapper.find("input").prop("id")).toEqual(guid);
    expect(wrapper.find("input").prop("name")).toEqual(guid);
  });

  it("does not provide unique id when values is passed in", () => {
    const wrapper = shallow(<MockComponent id="foo" />);
    expect(wrapper.find("input").prop("id")).toEqual("foo");
    expect(wrapper.find("input").prop("name")).toEqual(guid);
  });

  it("does not provide unique name when values is passed in", () => {
    const wrapper = shallow(<MockComponent name="foo" />);
    expect(wrapper.find("input").prop("id")).toEqual(guid);
    expect(wrapper.find("input").prop("name")).toEqual("foo");
  });

  it("does not provide unique id or name when values are passed in", () => {
    const wrapper = shallow(<MockComponent id="foo" name="bar" />);
    expect(wrapper.find("input").prop("id")).toEqual("foo");
    expect(wrapper.find("input").prop("name")).toEqual("bar");
  });
});
