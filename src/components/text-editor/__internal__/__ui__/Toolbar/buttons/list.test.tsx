import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { $getRoot, LexicalEditor } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ListItemNode, ListNode } from "@lexical/list";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import ListControls from "./list.component";

import TextEditor from '../../../../text-editor.component'

const EditorRefPlugin = ({ onReady }: { onReady: (editor: LexicalEditor) => void }) => {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    onReady(editor);
  }, [editor, onReady]);
  return null;
};

// Reusable JSON object for testing the default state
const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Sample text",
            type: "text",
            version: 1,
          },
        ],
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],

    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

it("should render the ordered list control correctly", async () => {
  const user = userEvent.setup();
  render(
    <TextEditor labelText="Test Editor" namespace="test" />
  );
  const olButton = screen.getByTestId(`test-ordered-list-button`);

  expect(olButton).toBeInTheDocument();
  expect(olButton).toHaveStyleRule("background-color", "transparent");
  expect(olButton).toHaveAttribute("aria-pressed", "false");

  await user.click(olButton);
  expect(olButton).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMajor600)",
  );
  expect(olButton).toHaveAttribute("aria-pressed", "true");
});

it("should render the unordered list control correctly", async () => {
  const user = userEvent.setup();
  render(
    <TextEditor labelText="Test Editor" namespace="test" />
  );
  const ulButton = screen.getByTestId(`test-unordered-list-button`);
  expect(ulButton).toBeInTheDocument();
  expect(ulButton).toHaveStyleRule("background-color", "transparent");
  expect(ulButton).toHaveAttribute("aria-pressed", "false");

  await user.click(ulButton);
  expect(ulButton).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMajor600)",
  );
  expect(ulButton).toHaveAttribute("aria-pressed", "true");
});

it("applies unordered list formatting when UnorderedList is clicked", async () => {
  let editorRef: LexicalEditor;
  const user = userEvent.setup();

  render(<TextEditor 
    labelText="Test Editor" 
    initialValue={JSON.stringify(initialValue)}
    customPlugins={<EditorRefPlugin onReady={(editor) => { editorRef = editor; }} />}
    namespace="test"
  />);

  const editor = screen.getByRole("textbox");
  await user.tripleClick(editor);

  const ulButton = screen.getByTestId("test-unordered-list-button");
  await userEvent.click(ulButton);

  await waitFor(() => {
    expect(ulButton).toHaveAttribute("aria-pressed", "true");
  });

  expect(screen.getByText("Sample text")).toBeInTheDocument();

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild() as ListNode;
      expect(firstNode?.getType()).toBe("list");
      expect(firstNode?.getTag()).toBe("ul");
      expect(firstNode?.getChildren()[0].getType()).toBe("listitem");
      expect(
        (firstNode?.getChildren()[0] as ListItemNode)
          .getChildren()[0]
          .getTextContent(),
      ).toBe("Sample text");
    });
  });
});

it("applies ordered list formatting when OrderedList is clicked", async () => {
  let editorRef: LexicalEditor;
  const user = userEvent.setup();

  render(<TextEditor 
    labelText="Test Editor" 
    initialValue={JSON.stringify(initialValue)}
    customPlugins={<EditorRefPlugin onReady={(editor) => { editorRef = editor; }} />}
    namespace="test"
  />);

  const editor = screen.getByRole("textbox");
  
  await user.tripleClick(editor);

  const olButton = screen.getByTestId("test-ordered-list-button");

  await userEvent.click(olButton);

  await waitFor(() => {
    expect(olButton).toHaveAttribute("aria-pressed", "true");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild() as ListNode;
      expect(firstNode?.getType()).toBe("list");
      expect(firstNode?.getTag()).toBe("ol");
      expect(firstNode?.getChildren()[0].getType()).toBe("listitem");
      expect(
        (firstNode?.getChildren()[0] as ListItemNode)
          .getChildren()[0]
          .getTextContent(),
      ).toBe("Sample text");
    });
  });
});

it("applies and removed unordered list formatting when UnorderedList is clicked", async () => {
  let editorRef: LexicalEditor;
  const user = userEvent.setup();

  render(<TextEditor 
    labelText="Test Editor" 
    initialValue={JSON.stringify(initialValue)}
    customPlugins={<EditorRefPlugin onReady={(editor) => { editorRef = editor; }} />}
    namespace="test"
  />);

  const editor = screen.getByRole("textbox");
  
  await user.tripleClick(editor);

  const ulButton = screen.getByTestId("test-unordered-list-button");

  await userEvent.click(ulButton);

  await waitFor(() => {
    expect(ulButton).toHaveAttribute("aria-pressed", "true");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild() as ListNode;
      expect(firstNode?.getType()).toBe("list");
      expect(firstNode?.getTag()).toBe("ul");
      expect(firstNode?.getChildren()[0].getType()).toBe("listitem");
      expect(
        (firstNode?.getChildren()[0] as ListItemNode)
          .getChildren()[0]
          .getTextContent(),
      ).toBe("Sample text");
    });
  });

  await userEvent.click(ulButton);

  await waitFor(() => {
    expect(ulButton).toHaveAttribute("aria-pressed", "false");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild();
      expect(firstNode?.getType()).toBe("paragraph");
      expect(firstNode?.getTextContent()).toBe("Sample text");
    });
  });
});

it("applies and removed ordered list formatting when UnorderedList is clicked", async () => {
  let editorRef: LexicalEditor;
  const user = userEvent.setup();

  render(<TextEditor 
    labelText="Test Editor" 
    initialValue={JSON.stringify(initialValue)}
    customPlugins={<EditorRefPlugin onReady={(editor) => { editorRef = editor; }} />}
    namespace="test"
  />);

  const editor = screen.getByRole("textbox");
  
  await user.tripleClick(editor);

  const olButton = screen.getByTestId("test-ordered-list-button");

  await userEvent.click(olButton);

  await waitFor(() => {
    expect(olButton).toHaveAttribute("aria-pressed", "true");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild() as ListNode;
      expect(firstNode?.getType()).toBe("list");
      expect(firstNode?.getTag()).toBe("ol");
      expect(firstNode?.getChildren()[0].getType()).toBe("listitem");
      expect(
        (firstNode?.getChildren()[0] as ListItemNode)
          .getChildren()[0]
          .getTextContent(),
      ).toBe("Sample text");
    });
  });

  await userEvent.click(olButton);

  await waitFor(() => {
    expect(olButton).toHaveAttribute("aria-pressed", "false");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild();
      expect(firstNode?.getType()).toBe("paragraph");
      expect(firstNode?.getTextContent()).toBe("Sample text");
    });
  });
});

it("applies and converts between list formatting types", async () => {
  let editorRef: LexicalEditor;
  const user = userEvent.setup();

  render(<TextEditor 
    labelText="Test Editor" 
    initialValue={JSON.stringify(initialValue)}
    customPlugins={<EditorRefPlugin onReady={(editor) => { editorRef = editor; }} />}
    namespace="test"
  />);

  const editor = screen.getByRole("textbox");
  await user.tripleClick(editor);
  const olButton = screen.getByTestId("test-ordered-list-button");
  const ulButton = screen.getByTestId("test-unordered-list-button");

  await userEvent.click(olButton);

  await waitFor(() => {
    expect(olButton).toHaveAttribute("aria-pressed", "true");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild() as ListNode;
      expect(firstNode?.getType()).toBe("list");
      expect(firstNode?.getTag()).toBe("ol");
      expect(firstNode?.getChildren()[0].getType()).toBe("listitem");
      expect(
        (firstNode?.getChildren()[0] as ListItemNode)
          .getChildren()[0]
          .getTextContent(),
      ).toBe("Sample text");
    });
  });

  await userEvent.click(ulButton);

  await waitFor(() => {
    expect(olButton).toHaveAttribute("aria-pressed", "false");
  });
  await waitFor(() => {
    expect(ulButton).toHaveAttribute("aria-pressed", "true");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild() as ListNode;
      expect(firstNode?.getType()).toBe("list");
      expect(firstNode?.getTag()).toBe("ul");
      expect(firstNode?.getChildren()[0].getType()).toBe("listitem");
      expect(
        (firstNode?.getChildren()[0] as ListItemNode)
          .getChildren()[0]
          .getTextContent(),
      ).toBe("Sample text");
    });
  });

  await userEvent.click(olButton);

  await waitFor(() => {
    expect(ulButton).toHaveAttribute("aria-pressed", "false");
  });
  await waitFor(() => {
    expect(olButton).toHaveAttribute("aria-pressed", "true");
  });

  await waitFor(() => {
    editorRef.getEditorState().read(() => {
      const root = $getRoot();
      const firstNode = root.getFirstChild() as ListNode;
      expect(firstNode?.getType()).toBe("list");
      expect(firstNode?.getTag()).toBe("ol");
      expect(firstNode?.getChildren()[0].getType()).toBe("listitem");
      expect(
        (firstNode?.getChildren()[0] as ListItemNode)
          .getChildren()[0]
          .getTextContent(),
      ).toBe("Sample text");
    });
  });
});

it("defaults showUL and showOL to true when props are not specified", () => {
  const initialConfig = {
    namespace: "test-list-composer",
    nodes: [],
    onError: () => {},
  };
  
  render(
    <LexicalComposer  initialConfig={initialConfig}>
      <ListControls namespace="test" />
    </LexicalComposer>,
  );

  expect(screen.getByTestId("test-unordered-list-button")).toBeInTheDocument();
  expect(screen.getByTestId("test-ordered-list-button")).toBeInTheDocument();
});
