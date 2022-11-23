import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Textbox, { TextboxProps } from ".";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import { Input } from "../../__internal__/input";
import InputPresentation from "../../__internal__/input/input-presentation.component";
import FormField from "../../__internal__/form-field";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import StyledPrefix from "./__internal__/prefix.style";
import Label from "../../__internal__/label";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import CharacterCount from "../../__internal__/character-count";
import I18nProvider from "../i18n-provider";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";
import createGuid from "../../__internal__/utils/helpers/guid";
import { ErrorBorder, StyledHintText } from "./textbox.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

const mockedGuid = "mocked-guid";
jest.mock("../../__internal__/utils/helpers/guid");

(createGuid as jest.MockedFunction<typeof createGuid>).mockReturnValue(
  mockedGuid
);

describe("Textbox", () => {
  testStyledSystemMargin(
    (props) => <Textbox {...props} />,
    undefined,
    (component) => component.find(FormFieldStyle),
    { modifier: "&&&" }
  );

  it("renders a counter", () => {
    const wrapper = mount(<Textbox value="test string" characterLimit={100} />);

    expect(wrapper.find(CharacterCount).text()).toBe("11/100");
  });

  it("renders a counter with an over limit warning", () => {
    const wrapper = mount(
      <Textbox
        value="test string"
        characterLimit="10"
        enforceCharacterLimit={false}
        warnOverLimit
      />
    );

    assertStyleMatch(
      {
        color: "var(--colorsSemanticNegative500)",
      },
      wrapper.find(CharacterCount)
    );
  });

  it("sets max length", () => {
    const wrapper = mount(<Textbox value="test string" characterLimit={100} />);

    expect(wrapper.find(CharacterCount).text()).toBe("11/100");
    expect(wrapper.find("input").prop("maxLength")).toBe(100);
  });

  it.each([
    {
      inputIcon: "search",
    },
    {
      error: "error",
    },
    {
      warning: "warning",
    },
    {
      info: "info",
    },
  ] as const)(
    "pass hasIcon to InputPresentation when an icon is present inside",
    (props: Partial<TextboxProps>) => {
      const wrapper = mount(<Textbox value="test string" {...props} />);
      expect(wrapper.find(InputPresentation).props().hasIcon).toBe(true);
    }
  );
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
        expect(wrapper.find(InputPresentation).props().hasIcon).toBe(true);
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
        expect(wrapper.find(InputPresentation).props().hasIcon).toBe(false);
      }
    );

    describe("overriding the tooltip position", () => {
      it.each([
        ["top", true],
        ["bottom", true],
        ["left", true],
        ["top", false],
        ["bottom", false],
        ["left", false],
      ] as const)(
        "should pass the expected value rather than the default ('right')",
        (tooltipPosition, onLabel) => {
          const wrapper = mount(
            <Textbox
              label="Label"
              error="Message"
              validationOnLabel={onLabel}
              tooltipPosition={tooltipPosition}
            />
          );

          const { position } = wrapper.find(Tooltip).props();

          expect(position).toEqual(tooltipPosition);
        }
      );
    });
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
    let wrapper: ReactWrapper;

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

  describe("i18n", () => {
    it.each([
      ["en-GB", "0/1,000,000"],
      ["fr-FR", "0/1 000 000"],
    ])("displays %s format", (locale, limit) => {
      const wrapper = mount(<Textbox value="" characterLimit={1000000} />, {
        wrappingComponent: I18nProvider,
        wrappingComponentProps: {
          locale: {
            locale: () => locale,
          },
        },
      });

      expect(wrapper.find(CharacterCount).text()).toBe(limit);
    });
  });

  describe("aria attributes", () => {
    describe("label help", () => {
      it("passes the expected values to the help component", () => {
        const text = "foo";
        const wrapper = mount(
          <Textbox
            value=""
            label={text}
            labelHelp={text}
            helpAriaLabel={text}
          />
        );

        expect(wrapper.find(StyledHelp).prop("aria-label")).toEqual(text);
      });
    });

    describe("label", () => {
      describe("when no value is passed in", () => {
        it("does not set the labelId", () => {
          const wrapper = mount(<Textbox id="foo" />);

          expect(wrapper.find(Input).prop("aria-labelledby")).toBe("");
        });
      });

      describe("when labelId is not set", () => {
        it("uses the label to create a labelId value on the input", () => {
          const wrapper = mount(<Textbox id="foo" label="bar" />);

          expect(wrapper.find(Input).prop("aria-labelledby")).toBe("foo-label");
        });
      });

      describe("when labelId is set", () => {
        it("overrides the labelId value on the input", () => {
          const wrapper = mount(
            <Textbox id="foo" label="bar" labelId="override-bar" />
          );

          expect(wrapper.find(Input).prop("aria-labelledby")).toBe(
            "override-bar"
          );
        });
      });
    });

    describe("when id", () => {
      describe.each([
        ["is present", true, "foo"],
        ["is not present", false, mockedGuid],
      ])("%s", (_, isPresent, id) => {
        const commonProps = {
          label: "bar",
          ...(isPresent && { id: "foo" }),
        };

        describe("and label is present", () => {
          it("passes aria-labelledby", () => {
            const wrapper = mount(<Textbox {...commonProps} />);

            expect(wrapper.find(Input).prop("aria-labelledby")).toBe(
              `${id}-label`
            );
          });
        });

        describe.each(["info", "warning", "error"])(
          "and %s are present",
          (validationType) => {
            const wrapper = mount(
              <Textbox {...commonProps} {...{ [validationType]: "test" }} />
            );
            it('should render a valid "aria-describedby"', () => {
              expect(wrapper.find(Input).prop("aria-describedby")).toBe(
                `${id}-validation-icon`
              );
            });
          }
        );

        describe("and fieldHelp props are present", () => {
          it("should render a valid 'aria-describedby'", () => {
            const wrapper = mount(<Textbox {...commonProps} fieldHelp="baz" />);
            expect(wrapper.find(Input).prop("aria-describedby")).toBe(
              `${id}-field-help`
            );
          });

          it("should pass fieldHelpId to FormField", () => {
            const wrapper = mount(<Textbox {...commonProps} fieldHelp="baz" />);
            expect(wrapper.find(FormField).prop("fieldHelpId")).toBe(
              `${id}-field-help`
            );
          });

          it.each(["info", "warning", "error"])(
            "and %s is present too",
            (validationType) => {
              const wrapper = mount(
                <Textbox
                  {...commonProps}
                  fieldHelp="baz"
                  {...{ [validationType]: "test" }}
                />
              );

              expect(wrapper.find(Input).prop("aria-describedby")).toBe(
                `${id}-field-help ${id}-validation-icon`
              );
            }
          );
        });
      });
    });
  });

  describe("new validations", () => {
    const renderWithNewValidations = ({
      error,
      warning,
    }: {
      error?: string;
      warning?: string;
    }) =>
      mount(
        <CarbonProvider validationRedesignOptIn>
          <Textbox
            labelHelp="Example hint text"
            error={error}
            warning={warning}
            labelAlign="left"
            labelInline
            labelWidth={100}
            reverse
          />
        </CarbonProvider>
      );

    describe("label width and align props", () => {
      it("default to undefined", () => {
        const wrapper = renderWithNewValidations({});
        const { labelAlign, labelInline, reverse, labelWidth } = wrapper
          .find(FormField)
          .props();

        expect(labelAlign).toEqual(undefined);
        expect(labelInline).toEqual(undefined);
        expect(reverse).toEqual(undefined);
        expect(labelWidth).toEqual(undefined);
      });
    });

    describe("hint/ labelHelp", () => {
      it("is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({});
        expect(wrapper.find(StyledHintText).text()).toEqual(
          "Example hint text"
        );
      });

      it("applies the expected styling", () => {
        const wrapper = renderWithNewValidations({});

        assertStyleMatch(
          {
            fontSize: "14px",
            marginTop: "0px",
            marginBottom: "8px",
            color: "var(--colorsUtilityYin055)",
          },
          wrapper.find(StyledHintText)
        );
      });
    });

    describe("new validation design", () => {
      it("error message is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({ error: "error" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });

      it("warning message is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({ warning: "warning" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });
    });
  });
});
