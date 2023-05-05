import React from "react";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { shade } from "polished";

import Pill, { PillProps } from "./pill.component";
import StyledPill from "./pill.style";
import styleConfig from "./pill.style.config";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
  expectConsoleOutput as expectError,
} from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import {
  aegeanTheme,
  baseTheme,
  mintTheme,
  sageTheme,
} from "../../style/themes";
import { toColor } from "../../style/utils/color";

const modernStyleTypes = [
  "neutral",
  "negative",
  "positive",
  "warning",
] as const;

describe("Pill", () => {
  const renderPillComponent = (props?: PillProps) => (
    <Pill {...props}>My Text</Pill>
  );

  it("has required styles", () => {
    const wrapper = mount(renderPillComponent());

    assertStyleMatch(
      {
        whiteSpace: "nowrap",
      },
      wrapper
    );
  });

  describe("when the children prop is passed to the component", () => {
    let wrapper: ReactWrapper;
    let pill: ReactWrapper;
    beforeEach(() => {
      wrapper = mount(
        renderPillComponent({
          children: "My Text",
        })
      );
      pill = wrapper.find(StyledPill);
    });

    it("renders with the given children", () => {
      expect(pill.find(StyledPill).text()).toEqual("My Text");
    });

    it("does not render a close icon", () => {
      expect(pill.find(IconButton).exists()).toBe(false);
    });
  });

  describe("when the removeButtonAriaLabel prop is passed to the component", () => {
    let wrapper: ReactWrapper;
    const customRemoveButtonAriaLabel = "remove custom pill";

    beforeEach(() => {
      wrapper = mount(
        renderPillComponent({
          children: "My Text",
          onDelete: () => {},
          ariaLabelOfRemoveButton: customRemoveButtonAriaLabel,
        })
      );
    });

    it("renders with the given children", () => {
      expect(wrapper.find(IconButton).prop("aria-label")).toEqual(
        customRemoveButtonAriaLabel
      );
    });
  });

  describe("when the component is deletable", () => {
    describe('onDelete adds "close" icon to component', () => {
      let wrapper: ReactWrapper | ShallowWrapper;
      let icon;
      const spy = jest.fn();

      beforeEach(() => {
        wrapper = mount(
          renderPillComponent({ onDelete: spy, children: "My Text" })
        );
      });

      it('includes "close" icon when onDelete prop passed', () => {
        icon = wrapper.find(IconButton);
        expect(icon.exists()).toBeTruthy();
        expect(icon.length).toEqual(1);
      });

      it("triggers the click when the icon is clicked", () => {
        wrapper.find(IconButton).first().simulate("click");
        expect(spy).toHaveBeenCalled();
      });

      it('does not include "close" icon when onDelete prop not passed', () => {
        wrapper = shallow(renderPillComponent());
        icon = wrapper.find('[data-element="close"]');
        expect(icon.exists()).toBeFalsy();
        expect(icon.length).toEqual(0);
      });
    });

    it("adds a click handler to the component", () => {
      const spy = jest.fn();
      const wrapper = mount(
        renderPillComponent({
          children: "My Text",
          onClick: spy,
        })
      );
      const pill = wrapper.find(StyledPill);

      pill.simulate("click");
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("when there are custom tags on the component", () => {
    const wrapper = shallow(
      renderPillComponent({
        "data-element": "bar",
        "data-role": "baz",
        children: "My Text",
      })
    );

    it("includes correct component, element and role data tags", () => {
      rootTagTest(wrapper, "pill", "bar", "baz");
    });
  });
  describe("custom colors", () => {
    const correctColors = [
      "red",
      "slateShade50",
      "rgb(0,123,100)",
      "hsl(0,100%,50%)",
      "#123456",
    ];
    describe.each(correctColors)(
      "when borderColor prop is provided",
      (color) => {
        it("takes precedence over colorVariant and renders properly colored pill", () => {
          const wrapper = mount(
            renderPillComponent({
              borderColor: color,
              fill: true,
              children: "My Text",
            })
          );
          assertStyleMatch(
            {
              border: `2px solid ${toColor(baseTheme, color)}`,
              backgroundColor: toColor(baseTheme, color),
            },
            wrapper
          );
        });

        it("renders properly colored pill delete button when hovered or focused", () => {
          const wrapper = mount(
            renderPillComponent({
              borderColor: color,
              onDelete: () => {},
              children: "My Text",
            })
          );
          assertStyleMatch(
            {
              backgroundColor: shade(0.2, toColor(baseTheme, color)),
            },
            wrapper,
            { modifier: "button:hover" }
          );

          assertStyleMatch(
            {
              backgroundColor: shade(0.2, toColor(baseTheme, color)),
            },
            wrapper,
            { modifier: "button:focus" }
          );
        });
      }
    );

    const wrongColors = ["rgb(0,0)", "#ff", "test"];
    describe.each(wrongColors)("when wrong color prop is provided", (color) => {
      it("throws an error", () => {
        const errorMessage =
          "Error: Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.";

        const assert = expectError(errorMessage);

        mount(<Pill borderColor={color}>My Text</Pill>);
        assert();
      });
    });

    describe("content color", () => {
      const darkColor = "var(--colorsUtilityYin090)";
      const lightColor = "var(--colorsUtilityYang100)";

      it.each([
        ["black", lightColor],
        ["white", darkColor],
        ["red", lightColor],
      ])(
        "renders properly colored content to meet contrast guidelines",
        (color, result) => {
          const wrapper = mount(
            <Pill borderColor={color} fill onDelete={() => {}}>
              My Text
            </Pill>
          );
          assertStyleMatch(
            {
              color: result,
            },
            wrapper
          );
        }
      );
    });
  });

  describe("modern themes", () => {
    describe.each([baseTheme, mintTheme, aegeanTheme, sageTheme])(
      "when the pill is rendered",
      (theme) => {
        describe(`${theme.name} theme`, () => {
          describe("when the component size is small", () => {
            it("matches the expected styles for a small pill", () => {
              const wrapper = mount(
                renderPillComponent({ children: "My Text", size: "S" })
              );
              assertStyleMatch(
                {
                  fontSize: "10px",
                  minHeight: "16px",
                  lineHeight: "16px",
                  padding: "0 7px",
                },
                wrapper
              );
            });
          });

          describe("when the component size is medium", () => {
            it("matches the expected styles for a medium pill", () => {
              const wrapper = mount(
                renderPillComponent({ children: "My Text", size: "M" })
              );
              assertStyleMatch(
                {
                  fontSize: "12px",
                  minHeight: "20px",
                  lineHeight: "20px",
                  padding: "0 11px",
                },
                wrapper
              );
            });
          });

          describe("when the component size is large", () => {
            it("matches the expected styles for a large pill", () => {
              const wrapper = mount(
                renderPillComponent({ children: "My Text", size: "L" })
              );
              assertStyleMatch(
                {
                  fontSize: "14px",
                  minHeight: "24px",
                  lineHeight: "24px",
                  padding: "0 15px",
                },
                wrapper
              );
            });
          });

          describe("when the component size is extra large", () => {
            it("matches the expected styles for an extra large pill", () => {
              const wrapper = mount(
                renderPillComponent({ children: "My Text", size: "XL" })
              );
              assertStyleMatch(
                {
                  fontSize: "16px",
                  minHeight: "26px",
                  lineHeight: "26px",
                  padding: "0 19px",
                },
                wrapper
              );
            });
          });

          describe("when pillRole is status", () => {
            const pillRole = "status";
            const styleSet = styleConfig()[pillRole];
            it(`matches the expected styles for a default ${theme.name} pill`, () => {
              const wrapper = mount(
                renderPillComponent({
                  children: "My Text",
                  theme,
                })
              );
              assertStyleMatch(
                {
                  fontWeight: "600",
                  position: "relative",
                  padding: "0 11px",
                  textAlign: "center",
                },
                wrapper
              );
            });

            describe("when the component is deletable", () => {
              it("matches the expected styles for a deletable pill", () => {
                const wrapper = mount(
                  renderPillComponent({
                    children: "My Text",
                    onDelete: jest.fn(),
                    theme,
                  })
                );
                assertStyleMatch(
                  {
                    padding: "0 32px 0 11px",
                  },
                  wrapper
                );

                assertStyleMatch(
                  {
                    borderRadius: "var(--borderRadius000)",
                  },
                  wrapper,
                  { modifier: "button" }
                );

                assertStyleMatch(
                  {
                    borderRadius:
                      "var(--borderRadius000) var(--borderRadius025) var(--borderRadius025) var(--borderRadius000)",
                  },
                  wrapper,
                  { modifier: "button:focus" }
                );
              });

              describe("when the component is in a filled state", () => {
                describe("when the style is not warning", () => {
                  const style = "neutral";
                  const fillWrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      onDelete: jest.fn(),
                      colorVariant: style,
                      pillRole,
                      fill: true,
                      theme,
                    })
                  );

                  it(`matches the expected filled styling for ${style}`, () => {
                    assertStyleMatch(
                      {
                        backgroundColor: styleSet[style].varietyColor,
                        color: styleSet[style].content,
                      },
                      fillWrapper
                    );
                  });
                });

                describe("when the style is warning", () => {
                  const style = "warning";
                  const fillWrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      onDelete: jest.fn(),
                      colorVariant: style,
                      pillRole,
                      fill: true,
                      theme,
                    })
                  );

                  it(`matches the expected filled styling for ${style}`, () => {
                    assertStyleMatch(
                      {
                        backgroundColor: styleSet[style].varietyColor,
                        color: styleSet[style].content,
                      },
                      fillWrapper
                    );
                  });
                });
              });

              describe("when the component size is small", () => {
                it("matches the expected styles for a small deletable pill", () => {
                  const wrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      onDelete: jest.fn(),
                      size: "S",
                      theme,
                    })
                  );
                  assertStyleMatch(
                    {
                      padding: "0 24px 0 7px",
                      minHeight: "16px",
                      height: "auto",
                      lineHeight: "16px",
                      borderRadius: "var(--borderRadius025)",
                    },
                    wrapper
                  );
                });
              });

              describe("when the component size is medium", () => {
                it("matches the expected styles for a medium deletable pill", () => {
                  const wrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      onDelete: jest.fn(),
                      size: "M",
                      theme,
                    })
                  );
                  assertStyleMatch(
                    {
                      fontSize: "12px",
                      padding: "0 32px 0 11px",
                      borderRadius: "var(--borderRadius025)",
                      minHeight: "20px",
                      height: "auto",
                      lineHeight: "20px",
                    },
                    wrapper
                  );
                });
              });

              describe("when the component size is large", () => {
                it("matches the expected styles for a large deletable pill", () => {
                  const wrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      onDelete: jest.fn(),
                      size: "L",
                      theme,
                    })
                  );
                  assertStyleMatch(
                    {
                      fontSize: "14px",
                      padding: "0 36px 0 15px",
                      borderRadius: "var(--borderRadius025)",
                      minHeight: "24px",
                      height: "auto",
                      lineHeight: "24px",
                    },
                    wrapper
                  );
                });
              });

              describe("when the component size is extra large", () => {
                it("matches the expected styles for a extra large deletable pill", () => {
                  const wrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      onDelete: jest.fn(),
                      size: "XL",
                      theme,
                    })
                  );
                  assertStyleMatch(
                    {
                      fontSize: "16px",
                      padding: "0 41px 0 19px",
                      borderRadius: "var(--borderRadius025)",
                      minHeight: "26px",
                      height: "auto",
                      lineHeight: "26px",
                    },
                    wrapper
                  );
                });
              });
            });

            describe.each(modernStyleTypes)(
              'when the pill style is set as "%s"',
              (style) => {
                describe("when storybook supplies the correct theme", () => {
                  const wrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      colorVariant: style as keyof PillProps["colorVariant"],
                      theme,
                      pillRole,
                    })
                  );

                  it(`matches the expected styling for ${style}`, () => {
                    assertStyleMatch(
                      {
                        border: `2px solid ${styleSet[style].varietyColor}`,
                      },
                      wrapper
                    );
                  });
                });

                describe("when the component is in a filled state", () => {
                  const fillWrapper = mount(
                    renderPillComponent({
                      children: "My Text",
                      colorVariant: style as keyof PillProps["colorVariant"],
                      fill: true,
                      theme,
                      pillRole,
                    })
                  );

                  it(`matches the expected filled styling for ${style}`, () => {
                    assertStyleMatch(
                      {
                        backgroundColor: styleSet[style].varietyColor,
                      },
                      fillWrapper
                    );
                  });
                });
              }
            );
          });
          describe("when pillRole is tag", () => {
            const pillRole = "tag";
            const styleSet = styleConfig()[pillRole];

            describe("when the component is deletable", () => {
              describe("when the component is in a filled state", () => {
                const style = "primary";
                const fillWrapper = mount(
                  renderPillComponent({
                    children: "My Text",
                    onDelete: jest.fn(),
                    pillRole,
                    fill: true,
                    theme,
                  })
                );

                it(`matches the expected filled styling for ${style}`, () => {
                  assertStyleMatch(
                    {
                      backgroundColor: styleSet[style].varietyColor,
                    },
                    fillWrapper
                  );
                });
              });
            });
          });
        });
      }
    );
  });

  describe("wrapText", () => {
    it("applies the expected styling and overrides truncate if set", () => {
      const wrapper = mount(
        renderPillComponent({
          wrapText: true,
          maxWidth: "40px",
          children: "My Text",
        })
      );

      assertStyleMatch(
        {
          maxWidth: "40px",
          whiteSpace: "break-spaces",
          hyphens: "auto",
        },
        wrapper.find(StyledPill)
      );
    });
  });

  describe("styled system", () => {
    testStyledSystemMargin((props) => <Pill {...props}>test content</Pill>);
  });
});
