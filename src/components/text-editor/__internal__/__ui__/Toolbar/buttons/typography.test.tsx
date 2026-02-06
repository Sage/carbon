import React from "react";
import { render, screen } from "@testing-library/react";
import TypographySelector from "./typography.component";
import userEvent from "@testing-library/user-event";

import TestEditor from "../../../TestEditor.component";

jest.mock("../../../../../../hooks/__internal__/useLocale", () => () => ({
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
    const ref = { current: null };
    render(
      <TestEditor>
        <TypographySelector
          namespace="editor"
          isOpen
          setIsOpen={() => {}}
          contentEditorRef={ref}
        />
      </TestEditor>,
    );

    const button = screen.getByRole("combobox");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Paragraph/gi);
  });

  it("updates state when dropdown value changes", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const Component = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const ref = { current: null };
      return (
        <TypographySelector
          namespace="editor"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          contentEditorRef={ref}
        />
      );
    };

    render(
      <TestEditor>
        <Component />
      </TestEditor>,
    );

    const button = screen.getByRole("combobox");

    await user.click(button);
    const titleOption = screen.getByRole("option", { name: "Title" });

    await user.click(titleOption);
    expect(button).toHaveTextContent(/Title/gi);

    jest.useRealTimers();
  });
});
