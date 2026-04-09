import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./switch.component";
import I18nProvider from "../../../../components/i18n-provider";
import useMediaQuery from "../../../../hooks/useMediaQuery";

jest.mock(
  "../../../../__internal__/utils/helpers/guid",
  () => () => "guid-123",
);
jest.mock("../../../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

beforeEach(() => {
  mockUseMediaQuery.mockReturnValue(true);
});

const renderSwitch = (props = {}) =>
  render(<Switch checked={false} onChange={() => {}} {...props} />);

describe("Switch", () => {
  describe("rendering", () => {
    it("renders an accessible checkbox with role=switch", () => {
      renderSwitch();
      const input = screen.getByRole("switch");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "checkbox");
    });

    it("renders a visible label when the label prop is set", () => {
      renderSwitch({ label: "Toggle me" });
      expect(screen.getByText("Toggle me")).toBeInTheDocument();
    });

    it("associates the label with the input via htmlFor", () => {
      renderSwitch({ label: "Toggle me", id: "my-switch" });
      expect(screen.getByLabelText("Toggle me")).toHaveAttribute(
        "id",
        "my-switch",
      );
    });

    it("does not render a label element when label prop is omitted", () => {
      renderSwitch();
      expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });

    it("applies data-component='switch' to the outer wrapper", () => {
      renderSwitch({ "data-role": "switch-wrapper" });
      expect(screen.getByTestId("switch-wrapper")).toHaveAttribute(
        "data-component",
        "switch",
      );
    });
  });

  describe("On/Off state text", () => {
    it("renders OFF and ON text outside the track when not loading", () => {
      renderSwitch();
      expect(screen.getByText(/^(ON|OFF)$/i)).toBeInTheDocument();
    });

    it("uses locale text for On/Off labels", () => {
      const ControlledSwitch = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <I18nProvider
            locale={{
              locale: () => "en-US",
              switch: {
                on: () => "Yes",
                off: () => "No",
                processingLabel: () => "Processing...",
              },
            }}
          >
            <Switch checked={checked} onChange={() => setChecked((c) => !c)} />
          </I18nProvider>
        );
      };
      render(<ControlledSwitch />);
      expect(screen.getByText("No")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("switch"));
      expect(screen.getByText("Yes")).toBeInTheDocument();
    });
  });

  describe("checked state", () => {
    it("sets aria-checked=false when unchecked", () => {
      renderSwitch({ checked: false });
      expect(screen.getByRole("switch")).not.toBeChecked();
    });

    it("sets aria-checked=true when checked", () => {
      renderSwitch({ checked: true });
      expect(screen.getByRole("switch")).toBeChecked();
    });
  });

  describe("onChange", () => {
    it("calls onChange when the input is clicked", () => {
      const onChange = jest.fn();
      renderSwitch({ onChange });
      fireEvent.click(screen.getByRole("switch"));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("disabled", () => {
    it("disables the input when disabled prop is true", () => {
      renderSwitch({ disabled: true });
      expect(screen.getByRole("switch")).toBeDisabled();
    });

    it("applies disabled colour to the label when disabled", () => {
      renderSwitch({ label: "Toggle me", disabled: true });
      expect(screen.getByText("Toggle me")).toHaveStyleRule(
        "color",
        "var(--input-labelset-label-disabled,rgba(0,0,0,0.42))",
      );
    });

    it("applies disabled+checked background to the track when disabled and checked", () => {
      renderSwitch({ checked: true, disabled: true });
      const track = screen.getByTestId("switch-track");
      expect(track).toHaveStyleRule(
        "background-color",
        "var(--input-switch-bg-disabled,rgba(0,0,0,0.3))",
      );
    });

    it("renders a required asterisk on the label ::after pseudo-element when required", () => {
      renderSwitch({ label: "Toggle me", required: true });
      expect(screen.getByText("Toggle me")).toHaveStyleRule("content", '"*"', {
        modifier: "::after",
      });
    });
  });

  describe("loading state", () => {
    it("hides On/Off state text when loading", () => {
      renderSwitch({ loading: true });
      expect(screen.queryByText(/^(ON|OFF)$/i)).not.toBeInTheDocument();
    });

    it("renders a loader element when loading", () => {
      renderSwitch({ loading: true });
      expect(screen.getByTestId("switch-loader")).toBeInTheDocument();
    });

    it("renders the default processing label 'Processing...' when loading", () => {
      renderSwitch({ loading: true });
      expect(screen.getByText("Processing...")).toBeInTheDocument();
    });

    it("uses locale text for the default processing label", () => {
      render(
        <I18nProvider
          locale={{
            locale: () => "en-US",
            switch: {
              on: () => "ON",
              off: () => "OFF",
              processingLabel: () => "En cours...",
            },
          }}
        >
          <Switch checked={false} onChange={() => {}} loading />
        </I18nProvider>,
      );
      expect(screen.getByText("En cours...")).toBeInTheDocument();
    });

    it("renders a custom processingLabel when provided", () => {
      renderSwitch({ loading: true, processingLabel: "Saving changes..." });
      expect(screen.getByText("Saving changes...")).toBeInTheDocument();
    });

    it("disables the input when loading", () => {
      renderSwitch({ loading: true });
      expect(screen.getByRole("switch")).toBeDisabled();
    });

    it("renders the processing row with column direction when processingLabelBelowSwitch is true", () => {
      renderSwitch({
        loading: true,
        processingLabelBelowSwitch: true,
      });
      expect(screen.getByText("Processing...")).toBeInTheDocument();
      expect(screen.getByTestId("switch-processing-row")).toHaveStyle({
        flexDirection: "column",
      });
    });

    it("renders the processing row with row direction by default", () => {
      renderSwitch({ loading: true });
      expect(screen.getByTestId("switch-processing-row")).toHaveStyle({
        flexDirection: "row",
      });
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref as a ref object to the hidden input", () => {
      const ref = { current: null };
      render(<Switch ref={ref} checked={false} onChange={() => {}} />);
      expect(ref.current).toBe(screen.getByRole("switch"));
    });

    it("forwards ref as a ref callback to the hidden input", () => {
      const ref = jest.fn();
      render(<Switch ref={ref} checked={false} onChange={() => {}} />);
      expect(ref).toHaveBeenCalledWith(screen.getByRole("switch"));
    });
  });

  describe("size prop", () => {
    it("renders without error for size='small'", () => {
      expect(() => renderSwitch({ size: "small" })).not.toThrow();
    });

    it("renders without error for size='large'", () => {
      expect(() => renderSwitch({ size: "large" })).not.toThrow();
    });

    it("passes size='extra-small' to the Loader when switch size is 'small' (default)", () => {
      renderSwitch({ loading: true });
      expect(screen.getByRole("presentation")).toHaveStyleRule(
        "height",
        "20px",
      );
    });

    it("passes size='small' to the Loader when switch size is 'large'", () => {
      renderSwitch({ loading: true, size: "large" });
      expect(screen.getByRole("presentation")).toHaveStyleRule(
        "height",
        "32px",
      );
    });

    it("translates the thumb by 32px when checked and size is 'large'", () => {
      render(<Switch checked onChange={() => {}} size="large" />);
      const thumb = screen.getByTestId("switch-thumb");
      expect(thumb).toHaveStyleRule("transform", "translateX(32px)");
    });

    it("applies activateDisabled background to thumb when checked and disabled", () => {
      render(<Switch checked onChange={() => {}} disabled />);
      const thumb = screen.getByTestId("switch-thumb");
      expect(thumb).toHaveStyleRule(
        "background-color",
        "var(--input-switch-fg-activateDisabled,#fff)",
      );
    });

    it("translates the loader wrapper by 32px when checked, loading and size is 'large'", () => {
      render(<Switch checked onChange={() => {}} loading size="large" />);
      const loaderWrapper = screen.getByTestId("switch-loader-wrapper");
      expect(loaderWrapper).toHaveStyleRule("transform", "translateX(32px)");
    });

    it("translates the loader wrapper by 15px when checked, loading and size is 'small'", () => {
      render(<Switch checked onChange={() => {}} loading size="small" />);
      const loaderWrapper = screen.getByTestId("switch-loader-wrapper");
      expect(loaderWrapper).toHaveStyleRule("transform", "translateX(15px)");
    });
  });

  describe("labelInline", () => {
    it("uses the default margin-right when labelInline is true and labelSpacing is not set", () => {
      renderSwitch({ label: "Toggle me", labelInline: true });
      expect(screen.getByText("Toggle me")).toHaveStyleRule(
        "margin-right",
        "var(--global-space-comp-s,8px)",
      );
    });

    it("applies a calculated margin-right when labelInline is true and labelSpacing is provided", () => {
      renderSwitch({ label: "Toggle me", labelInline: true, labelSpacing: 2 });
      expect(screen.getByText("Toggle me")).toHaveStyleRule(
        "margin-right",
        "16px",
      );
    });
  });

  describe("inputHint", () => {
    it("renders hint text when inputHint is provided", () => {
      renderSwitch({ inputHint: "Some helpful hint" });
      expect(screen.getByTestId("hint-text")).toBeInTheDocument();
      expect(screen.getByTestId("hint-text")).toHaveTextContent(
        "Some helpful hint",
      );
    });

    it("does not render hint text when inputHint is not provided", () => {
      renderSwitch();
      expect(screen.queryByTestId("hint-text")).not.toBeInTheDocument();
    });

    it("sets the hint text id to inputHintId.current", () => {
      // guid mock returns "guid-123" for every call;
      // internalId = "guid-123", labelId = "guid-123-label", inputHintId = "guid-123-hint"
      renderSwitch({ inputHint: "Hint" });
      expect(screen.getByTestId("hint-text")).toHaveAttribute(
        "id",
        "guid-123-hint",
      );
    });

    it("sets aria-describedby on the input to inputHintId.current when inputHint is provided", () => {
      renderSwitch({ inputHint: "Hint" });
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-describedby",
        "guid-123-hint",
      );
    });

    it("does not set aria-describedby on the input when inputHint is not provided", () => {
      renderSwitch();
      expect(screen.getByRole("switch")).not.toHaveAttribute(
        "aria-describedby",
      );
    });
  });
});
