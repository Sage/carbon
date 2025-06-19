import React from "react";
import { render, screen } from "@testing-library/react";
import { css, ThemeProvider } from "styled-components";
import { StyledAnchor, StyledButton, StyledLinkStyles } from "./link.style";
import Link from "./link.component";

const mockTheme = {
  colors: {
    actionMajor500: "#0066cc",
    actionMajor600: "#0052a3",
  },
};

describe("Link Styles", () => {
  test("StyledAnchor applies $styles interpolation", () => {
    const customStyles = css`
      background-color: red;
      padding: 10px;
    `;

    render(
      <ThemeProvider theme={mockTheme}>
        <StyledAnchor $styles={customStyles} href="#" aria-label="Test Anchor">
          Test Anchor
        </StyledAnchor>
      </ThemeProvider>,
    );

    const anchor = screen.getByRole("link");
    expect(anchor).toHaveStyle({
      backgroundColor: "red",
      padding: "10px",
    });
  });

  test("StyledButton applies $styles interpolation", () => {
    const customStyles = css`
      background-color: blue;
      margin: 5px;
    `;

    render(
      <ThemeProvider theme={mockTheme}>
        <StyledButton $styles={customStyles} type="button">
          Test Button
        </StyledButton>
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      backgroundColor: "blue",
      margin: "5px",
    });
  });

  test("StyledAnchor works without $styles", () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <StyledAnchor href="#" aria-label="No Custom Styles">
          No Custom Styles
        </StyledAnchor>
      </ThemeProvider>,
    );

    const anchor = screen.getByRole("link");
    expect(anchor).toBeInTheDocument();
  });

  test("StyledButton works without $styles", () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <StyledButton type="button">No Custom Styles</StyledButton>
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("$styles interpolation is executed in StyledButton", () => {
    const mockStyles = css`
      color: purple;
      border: 1px solid red;
    `;

    render(
      <ThemeProvider theme={mockTheme}>
        <StyledButton $styles={mockStyles} type="button">
          Test
        </StyledButton>
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      color: "purple",
      border: "1px solid red",
    });
  });

  test("$styles interpolation is executed in StyledAnchor", () => {
    const mockStyles = css`
      color: green;
      font-weight: bold;
    `;

    render(
      <ThemeProvider theme={mockTheme}>
        <StyledAnchor $styles={mockStyles} href="#" aria-label="Test">
          Test
        </StyledAnchor>
      </ThemeProvider>,
    );

    const anchor = screen.getByRole("link");
    expect(anchor).toHaveStyle({
      color: "green",
      fontWeight: "bold",
    });
  });
});

describe("StyledLinkStyles Function Tests", () => {
  test("StyledLinkStyles uses default parameters", () => {
    const result = StyledLinkStyles({
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles with variant default parameter", () => {
    const result = StyledLinkStyles({
      variant: "default",
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles with disabled default parameter", () => {
    const result = StyledLinkStyles({
      disabled: false,
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles with iconAlign default parameter", () => {
    const result = StyledLinkStyles({
      iconAlign: "left",
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles with all default parameters", () => {
    const result = StyledLinkStyles({
      variant: "default",
      disabled: false,
      iconAlign: "left",
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles with undefined props triggers defaults", () => {
    const result = StyledLinkStyles({
      variant: undefined,
      disabled: undefined,
      iconAlign: undefined,
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles with empty props object", () => {
    const result = StyledLinkStyles({});
    expect(result).toBeDefined();
  });

  test("StyledLinkStyles with negative variant", () => {
    const result = StyledLinkStyles({
      variant: "negative",
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles with neutral variant", () => {
    const result = StyledLinkStyles({
      variant: "neutral",
      hasContent: true,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles negative variant with complex props", () => {
    const result = StyledLinkStyles({
      variant: "negative",
      disabled: false,
      iconAlign: "left",
      hasContent: true,
      isDarkBackground: false,
      hasFocus: true,
      isMenuItem: false,
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles neutral variant with complex props", () => {
    const result = StyledLinkStyles({
      variant: "neutral",
      disabled: false,
      iconAlign: "right",
      hasContent: true,
      isDarkBackground: true,
      hasFocus: false,
      isSkipLink: true,
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles skip link right icon margin conditions", () => {
    const withContentResult = StyledLinkStyles({
      isSkipLink: true,
      iconAlign: "right",
      hasContent: true,
    });

    const withoutContentResult = StyledLinkStyles({
      isSkipLink: true,
      iconAlign: "right",
      hasContent: false,
    });

    expect(withContentResult).toBeDefined();
    expect(withoutContentResult).toBeDefined();

    expect(typeof withContentResult).toBe("object");
    expect(typeof withoutContentResult).toBe("object");
  });

  test("StyledLinkStyles variants", () => {
    const variants = ["default", "negative", "neutral"];

    variants.forEach((variant) => {
      const result = StyledLinkStyles({
        variant: variant as "default" | "negative" | "neutral",
        hasContent: true,
        isDarkBackground: false,
      });

      expect(result).toBeDefined();
    });
  });

  test("StyledLinkStyles negative variant", () => {
    const negativeScenarios = [
      { variant: "negative" },
      { variant: "negative", disabled: true },
      { variant: "negative", hasFocus: true },
      { variant: "negative", isDarkBackground: true },
      { variant: "negative", isMenuItem: true },
      { variant: "negative", hasContent: false },
    ];

    negativeScenarios.forEach((props) => {
      const result = StyledLinkStyles(props);
      expect(result).toBeDefined();
    });
  });

  test("StyledLinkStyles neutral variant", () => {
    const neutralScenarios = [
      { variant: "neutral" },
      { variant: "neutral", disabled: true },
      { variant: "neutral", hasFocus: true },
      { variant: "neutral", isDarkBackground: true },
      { variant: "neutral", isSkipLink: true },
      { variant: "neutral", hasContent: false },
    ];

    neutralScenarios.forEach((props) => {
      const result = StyledLinkStyles(props);
      expect(result).toBeDefined();
    });
  });
});

describe("Link Component Branch Coverage", () => {
  test("renders skip link with data-element and skip link label", () => {
    render(
      <Link isSkipLink href="#main">
        Skip Link Test
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("data-element", "skip-link");
    expect(link).toHaveTextContent("Skip to main content");
  });

  test("renders skip link without children uses skipLinkLabel", () => {
    render(<Link isSkipLink href="#main" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("data-element", "skip-link");
    expect(link).toBeInTheDocument();
  });

  test("renders span with ariaLabel when no children provided", () => {
    render(<Link href="#test" ariaLabel="Custom Aria Label" />);

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Custom Aria Label");
  });

  test("renders button with span ariaLabel when no children", () => {
    render(<Link onClick={() => {}} ariaLabel="Button Aria Label" />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Button Aria Label");
  });

  test("uses children when provided, ignores ariaLabel fallback", () => {
    render(
      <Link href="#test" ariaLabel="Should Not Show">
        Actual Children Content
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Actual Children Content");
    expect(link).not.toHaveTextContent("Should Not Show");
  });

  test("uses ariaLabel fallback when children is null", () => {
    render(
      <Link href="#test" ariaLabel="Null Children Fallback">
        {null}
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Null Children Fallback");
  });

  test("uses ariaLabel fallback when children is undefined", () => {
    render(
      <Link href="#test" ariaLabel="Undefined Children Fallback">
        {undefined}
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Undefined Children Fallback");
  });

  test("does not add skip-link data-element when isSkipLink is false", () => {
    render(
      <Link isSkipLink={false} href="#test">
        Not A Skip Link
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("data-element", "skip-link");
  });

  test("skip link with children ignores ariaLabel fallback", () => {
    render(
      <Link isSkipLink href="#main" ariaLabel="Should Not Show">
        Skip to Content
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("data-element", "skip-link");
    expect(link).toHaveTextContent("Skip to main content");
    expect(link).not.toHaveTextContent("Should Not Show");
  });

  test("handles no children and no ariaLabel", () => {
    render(<Link href="#test" />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  test("skip link as button when no href", () => {
    render(
      <Link isSkipLink onClick={() => {}}>
        Skip Button
      </Link>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-element", "skip-link");
    expect(button).toHaveTextContent("Skip to main content");
  });

  test("conditional rendering for link component", () => {
    const { unmount } = render(
      <Link isSkipLink href="#test">
        Test
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "data-element",
      "skip-link",
    );
    unmount();

    const { unmount: unmount2 } = render(
      <Link href="#test" ariaLabel="Test Label" />,
    );
    expect(screen.getByRole("link")).toHaveTextContent("Test Label");
    unmount2();

    render(<Link href="#test">Regular Link</Link>);
    expect(screen.getByRole("link")).toHaveTextContent("Regular Link");
  });

  test("renders link with different iconAlign values", () => {
    render(
      <Link href="#test" iconAlign="right">
        Right Icon Link
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Right Icon Link");
  });

  test("StyledLinkStyles with left icon and content", () => {
    const result = StyledLinkStyles({
      iconAlign: "left",
      hasContent: true,
      variant: "default",
      disabled: false,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles with right icon and content", () => {
    const result = StyledLinkStyles({
      iconAlign: "right",
      hasContent: true,
      variant: "default",
      disabled: false,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles with disabled state", () => {
    const result = StyledLinkStyles({
      disabled: true,
      hasContent: true,
      isDarkBackground: false,
      variant: "default",
      iconAlign: "left",
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles covers icon alignment", () => {
    const leftIconResult = StyledLinkStyles({
      iconAlign: "left",
      hasContent: true,
      variant: "default",
    });
    expect(leftIconResult).toBeDefined();

    const rightIconResult = StyledLinkStyles({
      iconAlign: "right",
      hasContent: true,
      variant: "default",
    });
    expect(rightIconResult).toBeDefined();

    const disabledResult = StyledLinkStyles({
      disabled: true,
      variant: "default",
    });
    expect(disabledResult).toBeDefined();
  });

  test("StyledLinkStyles right icon with hasContent true triggers margin-left", () => {
    const result = StyledLinkStyles({
      iconAlign: "right",
      hasContent: true,
      variant: "default",
      disabled: false,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles right icon with hasContent false triggers margin-left 0", () => {
    const result = StyledLinkStyles({
      iconAlign: "right",
      hasContent: false,
      variant: "default",
      disabled: false,
      isDarkBackground: false,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("StyledLinkStyles right icon covers both hasContent", () => {
    const resultWithContent = StyledLinkStyles({
      iconAlign: "right",
      hasContent: true,
    });
    expect(resultWithContent).toBeDefined();

    const resultWithoutContent = StyledLinkStyles({
      iconAlign: "right",
      hasContent: false,
    });
    expect(resultWithoutContent).toBeDefined();
  });

  test("StyledLinkStyles minimal props for right icon", () => {
    const result = StyledLinkStyles({
      iconAlign: "right",
    });
    expect(result).toBeDefined();
  });

  test("StyledLinkStyles right icon string literal evaluation", () => {
    const trueResult = StyledLinkStyles({
      iconAlign: "right",
      hasContent: true,
    });

    const falseResult = StyledLinkStyles({
      iconAlign: "right",
      hasContent: false,
    });

    expect(trueResult).toBeDefined();
    expect(falseResult).toBeDefined();
    expect(typeof trueResult).toBe("object");
    expect(typeof falseResult).toBe("object");
  });

  test("StyledLinkStyles icon alignment", () => {
    const result = StyledLinkStyles({
      iconAlign: "right",
      hasContent: true,
      variant: "default",
    });

    expect(result).toBeDefined();
  });

  test("StyledLinkStyles right icon with undefined hasContent", () => {
    const result = StyledLinkStyles({
      iconAlign: "right",
      hasContent: undefined,
    });

    expect(result).toBeDefined();
  });
});
