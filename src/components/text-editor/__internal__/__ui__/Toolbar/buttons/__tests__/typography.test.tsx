import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import TypographySelector from "../typography.component";
import userEvent from "@testing-library/user-event";

import {
  TestEditor,
  TestEditorHelpers,
} from "../../../../../__tests__/utils/TestEditor";
import { $getRoot, LexicalEditor, ParagraphNode, TextNode } from "lexical";

const mockUpdate = jest.fn((cb) => cb());

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
        <TypographySelector namespace="editor" isOpen />
      </TestEditor>,
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Paragraph");
  });

  it("updates state when dropdown value changes", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <TestEditor>
        <TypographySelector namespace="editor" isOpen />
      </TestEditor>,
    );

    const titleOption = screen.getByRole("menuitem", { name: "Title" });
    const button = screen.getByRole("button");

    await user.click(titleOption);
    expect(button).toHaveTextContent("Title");

    jest.useRealTimers();
  });

  it("calls editor.update when changing typography", async () => {
    let editorRef: LexicalEditor;
    let textEditorHelpers: TestEditorHelpers;

    const TestComponent = () => {
      const [typographyDropdownOpen, setTypographyDropdownOpen] =
        React.useState(true);
      const [
        typographyDropdownFocusedIndex,
        setTypographyDropdownFocusedIndex,
      ] = React.useState(0);
      return (
        <TestEditor
          onEditorReady={(editor, helpers) => {
            editorRef = editor;
            textEditorHelpers = helpers;
          }}
        >
          <TypographySelector
            namespace={"test"}
            isFirstButton
            isOpen={typographyDropdownOpen}
            setIsOpen={setTypographyDropdownOpen}
            focusedIndex={typographyDropdownFocusedIndex}
            setFocusedIndex={setTypographyDropdownFocusedIndex}
          />
        </TestEditor>
      );
    };

    render(<TestComponent />);

    act(() => {
      textEditorHelpers.setEditorContent(editorRef, "Hello");

      editorRef.update(() => {
        const root = $getRoot();
        const paragraph = root.getFirstChild() as ParagraphNode;
        const textNode = paragraph?.getFirstChild() as TextNode;

        // eslint-disable-next-line testing-library/no-node-access
        textNode?.select(0, textNode?.getTextContentSize());
      });
    });

    const button = screen.getByRole("button");
    await userEvent.click(button);

    const subtitleOption = screen.getByRole("menuitem", { name: "Subtitle" });
    await userEvent.click(subtitleOption);

    expect(mockUpdate).toHaveBeenCalled();
  });
});
