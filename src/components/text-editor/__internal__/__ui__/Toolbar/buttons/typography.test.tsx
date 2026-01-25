import React, { useRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import TextEditor from '../../../../text-editor.component'
import TypographySelector from "./typography.component";

const TypographyInComposer = () => {
  const contentEditorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "test-typography",
        nodes: [],
        onError: () => {},
      }}
    >
      <TypographySelector
        contentEditorRef={contentEditorRef}
        namespace="test-typography"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setFocusedIndex={() => {}}
      />
    </LexicalComposer>
  );
};

describe("TypographySelector", () => {
  it("renders with default paragraph option", () => {
    render(
      <TextEditor labelText="Test Editor" />,
    );

    const button = screen.getByRole("combobox");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Paragraph");
  });

  it("updates state when dropdown value changes", async () => {
    render(
      <TextEditor labelText="Test Editor" />,
    );

    const button = screen.getByRole("combobox");

    await userEvent.click(button);
    const titleOption = screen.getByRole("option", { name: "Title" });

    await userEvent.click(titleOption);
    expect(button).toHaveTextContent(/Title/gi);
  });

  it("defaults to size medium when rendered inside LexicalComposer", async () => {
    render(<TypographyInComposer />);

    const button = screen.getByRole("combobox");
    await userEvent.click(button);

    const menu = screen.getByRole("listbox");
    expect(menu).toHaveStyle({ top: "46px" });
  });
});
