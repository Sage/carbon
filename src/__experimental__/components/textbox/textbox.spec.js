import React from "react";
import { shallow, mount } from "enzyme";
import Textbox from ".";
import InputIconToggle from "../input-icon-toggle";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../../__spec_helper__/test-utils";
import FormField from "../form-field";
import InputPresentation from "../input/input-presentation.component";
import StyledValidationIcon from "../../../components/validations/validation-icon.style";
import StyledPrefix from "./__internal__/prefix.style";
import Label from "../label";
import FormFieldStyle from "../form-field/form-field.style";

jest.mock("../../../utils/helpers/guid", () => () => "mocked-guid");

describe("Textbox", () => {
  it("renders with InputPresentation and Input and correct props passed to Input", () => {
    const wrapper = shallow(
      <Textbox value="foobar" leftChildren="southpaw children">
        normal children
      </Textbox>
    )
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it("supports a separate onClick handler passing for the icon", () => {
    const onClick = jest.fn();
    const iconOnClick = jest.fn();

    const wrapper = mount(
      <Textbox
        value="foobar"
        inputIcon="search"
        onClick={onClick}
        iconOnClick={iconOnClick}
      >
        normal children
      </Textbox>
    );
    const icon = wrapper.find(InputIconToggle);
    icon.simulate("click");
    expect(iconOnClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  describe("validation icon", () => {
    const validationTypes = ["error", "warning", "info"];
    it.each(validationTypes)(
      "when %s prop passed as string render proper validation icon by the input",
      (type) => {
        const wrapper = mount(
          <Textbox label="Label" {...{ [type]: "Message" }} />
        );
        expect(
          wrapper.find(InputPresentation).find(StyledValidationIcon).exists()
        ).toBe(true);
      }
    );
    it.each(validationTypes)(
      `when %s prop passed as string and validationOnLabel
     as true render proper validation icon on the label`,
      (type) => {
        const wrapper = mount(
          <Textbox label="Label" {...{ [type]: "Message" }} validationOnLabel />
        );
        expect(
          wrapper.find(FormField).find(StyledValidationIcon).exists()
        ).toBe(true);
      }
    );
  });

  describe("when the prefix prop is set", () => {
    it("then a StyledPrefix should be rendered with this prop value", () => {
      const prefixValue = "bar";
      const wrapper = mount(<Textbox value="foo" prefix={prefixValue} />);
      expect(wrapper.find(StyledPrefix).exists()).toBe(true);
      expect(wrapper.find(StyledPrefix).text()).toBe(prefixValue);
    });
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<Textbox value="foo" label="Required" required />);
    });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("input");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("Prefix", () => {
    it("should have expected styles", () => {
      assertStyleMatch(
        {
          alignSelf: "center",
          fontWeight: "900",
          marginRight: "8px",
        },
        mount(<StyledPrefix>abc</StyledPrefix>)
      );
    });
  });

  describe("positionedChildren", () => {
    it("passes positionedChildren prop to the InputPresentation component", () => {
      const Component = () => <div />;
      const wrapper = mount(<Textbox positionedChildren={<Component />} />);
      expect(
        wrapper.find(InputPresentation).props().positionedChildren
      ).toEqual(<Component />);
    });
  });

  testStyledSystemSpacing(
    (props) => <Textbox {...props} />,
    undefined,
    (wrapper) => wrapper.find(FormFieldStyle),
    { modifier: "&&&" }
  );
});
