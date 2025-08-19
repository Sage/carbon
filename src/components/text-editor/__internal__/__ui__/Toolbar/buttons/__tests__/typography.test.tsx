import React from "react";
import { render, screen } from "@testing-library/react";
import TypographySelector from "../typography.component";
import userEvent from "@testing-library/user-event";

import { TestEditor } from "../../../../../__tests__/utils/TestEditor";

jest.mock("../../../../../../../hooks/__internal__/useLocale", () => () => ({
  textEditor: {
    typography: {
      selectAria: () => "Select an option",
      paragraph: () => "Paragraph",
      title: () => "Title",
      subtitle: () => "Subtitle",
      sectionHeader: () => "Section Header",
      sectionSubheader: () => "Section Subheader",
    },
  },
}));

describe("TypographySelector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default paragraph option", () => {
    render(
      <TestEditor>
        <TypographySelector namespace="editor" isOpen setIsOpen={() => {}} />
      </TestEditor>,
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Paragraph");
  });

  it("updates state when dropdown value changes", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const Component = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <TypographySelector
          namespace="editor"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      );
    };

    render(
      <TestEditor>
        <Component />
      </TestEditor>,
    );

    const button = screen.getByRole("button");

    await user.click(button);
    const titleOption = screen.getByRole("menuitem", { name: "Title" });

    await user.click(titleOption);
    expect(button).toHaveTextContent("Title");

    jest.useRealTimers();
  });
});
