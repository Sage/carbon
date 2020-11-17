import React from "react";
import { mount } from "enzyme";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import baseTheme from "../../../../style/themes/base";
import Counter from "./editor-counter.component";
import { StyledCounter } from "./editor-counter.style";
import ValidationIcon from "../../../validations";

const render = (props = {}, renderer = mount) => {
  return renderer(<Counter {...props} />);
};

describe("EditorCounter", () => {
  it("has the expected styles", () => {
    const wrapper = render();
    assertStyleMatch(
      {
        margin: "16px 16px 0px 4px",
        minWidth: "40px",
        height: "21px",
        float: "right",
        textAlign: "right",
        alignItems: "center",
      },
      wrapper
    );

    assertStyleMatch(
      {
        color: baseTheme.editor.counter,
        width: "100%",
      },
      wrapper.find(StyledCounter)
    );
  });

  it("displays the correct value for permitted characters when the default `limit` is used", () => {
    const wrapper = render({ count: 10 });

    expect(wrapper.find("div").text()).toEqual("2990");
  });

  it("displays the correct value for permitted characters when the `limit` prop is passed a value of `10`", () => {
    const wrapper = render({ count: 10, limit: 10 });

    expect(wrapper.find("div").text()).toEqual("0");
  });

  describe("with validation", () => {
    it("does not render the icon by default", () => {
      expect(render().find(ValidationIcon).exists()).toEqual(false);
    });

    it.each([{ error: "error" }, { warning: "warning" }, { info: "info" }])(
      "renders the icon when a message is provided",
      (msg) => {
        expect(
          render({ ...msg })
            .find(ValidationIcon)
            .exists()
        ).toEqual(true);
      }
    );

    it("has expected styling overrides applied when there is an error", () => {
      const wrapper = render({ error: "error" });

      assertStyleMatch(
        {
          color: baseTheme.colors.error,
        },
        wrapper.find(StyledCounter)
      );
    });
  });
});
