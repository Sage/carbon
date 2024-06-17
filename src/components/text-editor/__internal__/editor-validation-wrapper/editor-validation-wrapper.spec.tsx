import React from "react";
import { mount } from "enzyme";
import { assertStyleMatch } from "../../../../__spec_helper__/__internal__/test-utils";
import ValidationWrapper, {
  EditorValidationWrapperProps,
} from "./editor-validation-wrapper.component";
import ValidationIcon from "../../../../__internal__/validations";

const render = (props: EditorValidationWrapperProps = {}, renderer = mount) => {
  return renderer(<ValidationWrapper {...props} />);
};

describe("EditorValidationWrapper", () => {
  it("has the expected styles", () => {
    const wrapper = render();
    assertStyleMatch(
      {
        margin:
          "var(--spacing200) var(--spacing200) var(--spacing000) var(--spacing050)",
        minWidth: "var(--sizing500)",
        height: "var(--sizing275)",
        float: "right",
        alignItems: "center",
      },
      wrapper
    );
  });

  describe("with validation", () => {
    it.each([
      { error: "error" },
      { warning: "warning" },
      { info: "info" },
    ] as const)("renders the icon when a message is provided", (msg) => {
      expect(
        render({ ...msg })
          .find(ValidationIcon)
          .exists()
      ).toEqual(true);
    });
  });
});
