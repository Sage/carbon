import React from "react";
import { mount } from "enzyme";
import DismissibleBox, {
  DismissibleBoxProps,
} from "./dismissible-box.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import StyledIcon from "../icon/icon.style";
import IconButton from "../icon-button";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

const onCloseMock = jest.fn();

const renderDismissibleBox = ({
  children,
  ...rest
}: Partial<DismissibleBoxProps>) =>
  mount(
    <DismissibleBox {...rest} onClose={onCloseMock}>
      {children}
    </DismissibleBox>
  );

describe("DismissibleBox", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  describe("styling", () => {
    it("matches the expected as default for light variant", () => {
      const wrapper = renderDismissibleBox({});

      assertStyleMatch(
        {
          border: "1px solid var(--colorsUtilityMajor100)",
          borderLeft: "none",
          wordBreak: "break-word",
          boxShadow: "-4px 0 0 0 var(--colorsUtilityMajor400)",
          padding: "20px 24px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--borderRadius100)",
        },
        wrapper
      );

      assertStyleMatch(
        {
          color: "var(--colorsActionMinor600)",
        },
        wrapper,
        { modifier: `${StyledIcon}:hover` }
      );
    });

    it("matches the expected as default for dark variant", () => {
      const wrapper = renderDismissibleBox({ variant: "dark" });

      assertStyleMatch(
        {
          border: "1px solid var(--colorsUtilityMajor100)",
          borderLeft: "none",
          wordBreak: "break-word",
          boxShadow: "-4px 0 0 0 var(--colorsUtilityMajor400)",
          padding: "20px 24px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "var(--colorsUtilityMajor050)",
        },
        wrapper
      );
    });

    it("supports overriding the width", () => {
      assertStyleMatch(
        {
          width: "650px",
        },
        renderDismissibleBox({ width: "650px" })
      );
    });

    it("matches the expected styling when hasBorderLeftHighlight is false", () => {
      const wrapper = renderDismissibleBox({ hasBorderLeftHighlight: false });

      assertStyleMatch(
        {
          border: "1px solid var(--colorsUtilityMajor100)",
          boxShadow: undefined,
        },
        wrapper
      );
    });
  });

  describe("close icon button", () => {
    it("calls the onClose callback when clicked", () => {
      renderDismissibleBox({}).find(IconButton).simulate("click");

      expect(onCloseMock).toHaveBeenCalledWith(
        expect.objectContaining({ type: "click" })
      );
    });
  });
});
