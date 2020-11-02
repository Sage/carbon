import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-test-renderer";
import AdvancedColorPicker from "./advanced-color-picker.component";
import Dialog from "../dialog/dialog.component";
import { SimpleColor } from "../../__experimental__/components/simple-color-picker";
import guid from "../../utils/helpers/guid";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

jest.mock("../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

describe("AdvancedColorPicker", () => {
  const element = document.createElement("div");
  const htmlElement = document.body.appendChild(element);
  const defaultColor = "#EBAEDE";
  const demoColors = [
    { value: "#FFFFFF", label: "white" },
    { value: "transparent", label: "transparent" },
    { value: "#000000", label: "black" },
    { value: "#A3CAF0", label: "blue" },
    { value: "#FD9BA3", label: "pink" },
    { value: "#B4AEEA", label: "purple" },
    { value: "#ECE6AF", label: "goldenrod" },
    { value: "#EBAEDE", label: "orchid" },
    { value: "#EBC7AE", label: "desert" },
    { value: "#AEECEB", label: "turquoise" },
    { value: "#AEECD6", label: "mint" },
  ];

  const requiredProps = {
    name: "advancedPicker",
    availableColors: demoColors,
    defaultColor,
  };

  let wrapper;

  function render(props = {}) {
    wrapper = mount(<AdvancedColorPicker {...props} />, {
      attachTo: htmlElement,
    });
  }

  function getElements() {
    const closeIcon = document.querySelector('button[data-element="close"]');
    const defaultSimpleColor = document.querySelector(
      `input[value="${defaultColor}"]`
    );
    const simpleColors = document.querySelectorAll(
      '[data-component="simple-color"] > input'
    );

    return { closeIcon, defaultSimpleColor, simpleColors };
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  const aKey = new KeyboardEvent("keydown", {
    which: 65,
    keyCode: 65,
    key: "a",
  });
  const spaceKey = new KeyboardEvent("keydown", {
    which: 32,
    keyCode: 32,
    key: "Space",
  });
  const enterKey = new KeyboardEvent("keydown", {
    which: 13,
    keyCode: 13,
    key: "Enter",
  });
  const tabKey = new KeyboardEvent("keydown", {
    which: 9,
    keyCode: 9,
    key: "Tab",
  });
  const shiftTabKey = new KeyboardEvent("keydown", {
    keyCode: 9,
    key: "Tab",
    shiftKey: true,
  });

  describe("when uncontrolled", () => {
    it("should render internal composition to match uncontrolled snapshot", () => {
      expect(
        shallow(<AdvancedColorPicker {...requiredProps} />)
      ).toMatchSnapshot();
    });
  });

  describe("when controlled", () => {
    describe("when dialog is open", () => {
      describe("handleFocus focus trap callback", () => {
        describe("when key other than tab pressed", () => {
          it("should not change the focus", () => {
            render({ ...requiredProps, open: true });
            const { defaultSimpleColor } = getElements();

            expect(document.activeElement).toBe(defaultSimpleColor);
            document.dispatchEvent(aKey);
            expect(document.activeElement).toBe(defaultSimpleColor);
          });
        });

        describe("when tab key pressed on the close button", () => {
          it("should switch focus to the selected color input", () => {
            render({ ...requiredProps, open: true });
            const { closeIcon, defaultSimpleColor } = getElements();

            closeIcon.focus();
            expect(document.activeElement).toBe(closeIcon);
            document.dispatchEvent(tabKey);
            expect(document.activeElement).toBe(defaultSimpleColor);
          });
        });

        describe("when shift tab keys pressed on the selected color input", () => {
          it("should switch focus to the close button", () => {
            render({ ...requiredProps, open: true });
            const { closeIcon, defaultSimpleColor } = getElements();

            expect(document.activeElement).toBe(defaultSimpleColor);
            document.dispatchEvent(shiftTabKey);
            expect(document.activeElement).toBe(closeIcon);
          });
        });
      });

      describe("for focus event", () => {
        describe("when activeElement is not selectedColor", () => {
          it("renders transparent color", () => {
            const extraProps = {
              name: "advancedPicker",
              availableColors: [{ value: "transparent", label: "transparent" }],
              defaultColor: "transparent",
              open: true,
            };

            render(extraProps);

            const { simpleColors } = getElements();

            expect(document.activeElement).toBe(simpleColors[0]);

            const simpleColor = wrapper.find(SimpleColor).at(0);
            const colorPreviewCell = simpleColor
              .find("ColorSampleBox")
              .first()
              .find("div")
              .first();
            expect(document.activeElement.getAttribute("value")).toBe(
              wrapper.find(SimpleColor).at(0).prop("value")
            );
            assertStyleMatch(
              {
                backgroundColor: "#eeeeee",
                backgroundImage: "url()",
                backgroundSize: "14px 14px",
              },
              colorPreviewCell
            );
          });
        });
      });
    });

    describe("onChange event", () => {
      describe("onClick event", () => {
        describe("when onChange is provided", () => {
          it("changes selection and triggers onChange callback", () => {
            const onChange = jest.fn();
            const extraProps = {
              ...requiredProps,
              open: true,
              onChange,
            };

            render(extraProps);

            const { simpleColors } = getElements();

            expect(document.activeElement).toBe(simpleColors[7]);

            const color = wrapper.find(SimpleColor).at(8);
            color.find("input").first().getDOMNode().click();

            expect(onChange).toHaveBeenCalled();
            expect(document.activeElement.getAttribute("value")).toBe(
              wrapper.find(SimpleColor).at(8).prop("value")
            );
          });
        });

        describe("when onChange is not provided", () => {
          it("changes selection, does not trigger onChange callback", () => {
            const onChange = jest.fn();
            const extraProps = {
              ...requiredProps,
              open: true,
            };

            render(extraProps);

            const { simpleColors } = getElements();

            expect(document.activeElement).toBe(simpleColors[7]);
            const color = wrapper.find(SimpleColor).at(8);

            color.find("input").first().getDOMNode().click();

            expect(onChange).not.toHaveBeenCalled();
            expect(document.activeElement.getAttribute("value")).toBe(
              wrapper.find(SimpleColor).at(8).prop("value")
            );
          });
        });

        it("changes selection and triggers onChange callback", () => {
          const onBlur = jest.fn();
          const extraProps = {
            ...requiredProps,
            open: true,
            onBlur,
          };

          render(extraProps);

          const { simpleColors } = getElements();

          expect(document.activeElement).toBe(simpleColors[7]);

          const color = wrapper.find(SimpleColor).at(8);
          color.find("input").first().getDOMNode().click();

          expect(onBlur).toHaveBeenCalled();
          expect(document.activeElement.getAttribute("value")).toBe(
            wrapper.find(SimpleColor).at(8).prop("value")
          );
        });
      });
    });

    describe("SimpleColor onKeyDown event triggers", () => {
      const keyDownEvents = [
        ["Enter", true, true, enterKey],
        ["Space", true, true, spaceKey],
        ["a", false, false, aKey],
      ];

      const extraProps = {
        ...requiredProps,
        open: true,
      };

      test.each(keyDownEvents)(
        "on %p key dialog`s isOpen is: %p",
        (name, result, expectedResult, key) => {
          render(extraProps);
          act(() => {
            wrapper
              .find(SimpleColor)
              .at(8)
              .find("input")
              .first()
              .simulate("keydown", { which: key.keyCode });
          });
          expect(result).toEqual(expectedResult);
        }
      );
    });

    describe("dialog", () => {
      const props = [
        [undefined, false],
        [false, false],
        [true, true],
      ];

      test.each(props)(
        "when `open` prop is: %p, dialog`s isOpen is: %p",
        (result, expectedResult) => {
          render({
            ...requiredProps,
            open: result,
          });
          expect(wrapper.find(Dialog).first().prop("open")).toEqual(
            expectedResult
          );
        }
      );

      describe("when dialog is closed", () => {
        it("uses defaultColor when selectedColor is not provided", () => {
          render({ ...requiredProps });
          expect(
            wrapper.find(AdvancedColorPicker).first().prop("defaultColor")
          ).toBe(defaultColor);
        });

        it("uses selectedColor when provided", () => {
          const selectedColor = "#aeecd6";
          render({ ...requiredProps, selectedColor });
          expect(
            wrapper.find(AdvancedColorPicker).first().prop("selectedColor")
          ).toBe(selectedColor);
        });

        describe("when focused on picker cell", () => {
          let colorPickerCell;

          beforeEach(() => {
            render({ ...requiredProps });
            colorPickerCell = wrapper
              .find('[data-element="color-picker-cell"]')
              .first();
            colorPickerCell.getDOMNode().focus();
          });

          it("color picker cell is focused", () => {
            expect(document.activeElement).toBe(colorPickerCell.getDOMNode());
          });

          const keyDownEvents = [
            ["Enter", true, true, enterKey],
            ["Space", true, true, spaceKey],
            ["a", false, false, aKey],
          ];

          test.each(keyDownEvents)(
            "on %p key dialog`s isOpen is: %p",
            (name, result, expectedResult, key) => {
              act(() => {
                colorPickerCell.simulate("keydown", { which: key.keyCode });
              });
              expect(result).toEqual(expectedResult);
            }
          );

          describe("onOpen callback function is proivided", () => {
            describe("when open prop is uncontrolled", () => {
              it("opens color picker and calls onOpen callback function", () => {
                const onOpen = jest.fn();
                wrapper.setProps({ onOpen });
                wrapper.update();
                colorPickerCell = wrapper
                  .find('[data-element="color-picker-cell"]')
                  .first();
                colorPickerCell.getDOMNode().focus();

                act(() => {
                  colorPickerCell.simulate("click");
                });

                const dialog = wrapper.find(Dialog).first();
                expect(dialog.prop("open")).toBeTruthy();
                expect(onOpen).toBeCalledTimes(1);
              });
            });
          });

          describe("when onClose event", () => {
            it("closes color picker and calls onClose callback function", () => {
              const onClose = jest.fn();

              wrapper.setProps({ onClose });
              wrapper.update();

              act(() => {
                colorPickerCell.simulate("click");
              });

              expect(wrapper.find(Dialog).first().prop("open")).toBeTruthy();

              const closeButton = wrapper
                .find('[data-element="close"]')
                .first();

              act(() => {
                closeButton.simulate("click");
              });

              wrapper.update();

              expect(onClose).toBeCalledTimes(1);
              expect(wrapper.find(Dialog).first().prop("open")).toBeFalsy();
            });

            it("when callback function is not proivided", () => {
              const onClose = jest.fn();

              act(() => {
                colorPickerCell.simulate("click");
              });

              expect(wrapper.find(Dialog).first().prop("open")).toBeTruthy();

              const closeButton = wrapper
                .find('[data-element="close"]')
                .first();

              act(() => {
                closeButton.simulate("click");
              });

              wrapper.update();

              expect(onClose).toBeCalledTimes(0);
              expect(wrapper.find(Dialog).first().prop("open")).toBeFalsy();
            });
          });
        });
      });
    });
  });
});
