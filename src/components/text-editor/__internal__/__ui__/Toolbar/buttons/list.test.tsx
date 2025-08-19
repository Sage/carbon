import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { act } from "react";

import { TestEditor, TestEditorHelpers } from "../../../TestEditor.component";

import { ListControls } from ".";
import { $getRoot, LexicalEditor, ParagraphNode, TextNode } from "lexical";
import { ListItemNode, ListNode } from "@lexical/list";

it("should render the ordered list control correctly", async () => {
  const user = userEvent.setup();
  render(
    <TestEditor>
      <ListControls namespace="test" />
    </TestEditor>,
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
    <TestEditor>
      <ListControls namespace="test" />
    </TestEditor>,
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
  let textEditorHelpers: TestEditorHelpers;

  render(
    <TestEditor
      onEditorReady={(editor, helpers) => {
        editorRef = editor;
        textEditorHelpers = helpers;
      }}
    >
      <ListControls namespace="test" />
    </TestEditor>,
  );

  act(() => {
    textEditorHelpers.setEditorContent(editorRef, "Hello");

    editorRef.update(() => {
      const root = $getRoot();
      const paragraph = root.getFirstChild() as ParagraphNode;
      const textNode = paragraph?.getFirstChild() as TextNode;

      textNode?.select(0, textNode?.getTextContentSize());
    });
  });

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
      ).toBe("Hello");
    });
  });
});

it("applies ordered list formatting when OrderedList is clicked", async () => {
  let editorRef: LexicalEditor;
  let textEditorHelpers: TestEditorHelpers;

  render(
    <TestEditor
      onEditorReady={(editor, helpers) => {
        editorRef = editor;
        textEditorHelpers = helpers;
      }}
    >
      <ListControls namespace="test" />
    </TestEditor>,
  );

  act(() => {
    textEditorHelpers.setEditorContent(editorRef, "Hello");

    editorRef.update(() => {
      const root = $getRoot();
      const paragraph = root.getFirstChild() as ParagraphNode;
      const textNode = paragraph?.getFirstChild() as TextNode;

      textNode?.select(0, textNode?.getTextContentSize());
    });
  });

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
      ).toBe("Hello");
    });
  });
});

it("applies and removed unordered list formatting when UnorderedList is clicked", async () => {
  let editorRef: LexicalEditor;
  let textEditorHelpers: TestEditorHelpers;

  render(
    <TestEditor
      onEditorReady={(editor, helpers) => {
        editorRef = editor;
        textEditorHelpers = helpers;
      }}
    >
      <ListControls namespace="test" />
    </TestEditor>,
  );

  act(() => {
    textEditorHelpers.setEditorContent(editorRef, "Hello");

    editorRef.update(() => {
      const root = $getRoot();
      const paragraph = root.getFirstChild() as ParagraphNode;
      const textNode = paragraph?.getFirstChild() as TextNode;

      textNode?.select(0, textNode?.getTextContentSize());
    });
  });

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
      ).toBe("Hello");
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
      expect(firstNode?.getTextContent()).toBe("Hello");
    });
  });
});

it("applies and removed ordered list formatting when UnorderedList is clicked", async () => {
  let editorRef: LexicalEditor;
  let textEditorHelpers: TestEditorHelpers;

  render(
    <TestEditor
      onEditorReady={(editor, helpers) => {
        editorRef = editor;
        textEditorHelpers = helpers;
      }}
    >
      <ListControls namespace="test" />
    </TestEditor>,
  );

  act(() => {
    textEditorHelpers.setEditorContent(editorRef, "Hello");

    editorRef.update(() => {
      const root = $getRoot();
      const paragraph = root.getFirstChild() as ParagraphNode;
      const textNode = paragraph?.getFirstChild() as TextNode;

      textNode?.select(0, textNode?.getTextContentSize());
    });
  });

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
      ).toBe("Hello");
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
      expect(firstNode?.getTextContent()).toBe("Hello");
    });
  });
});

it("applies and converts between list formatting types", async () => {
  let editorRef: LexicalEditor;
  let textEditorHelpers: TestEditorHelpers;

  render(
    <TestEditor
      onEditorReady={(editor, helpers) => {
        editorRef = editor;
        textEditorHelpers = helpers;
      }}
    >
      <ListControls namespace="test" />
    </TestEditor>,
  );

  act(() => {
    textEditorHelpers.setEditorContent(editorRef, "Hello");

    editorRef.update(() => {
      const root = $getRoot();
      const paragraph = root.getFirstChild() as ParagraphNode;
      const textNode = paragraph?.getFirstChild() as TextNode;

      textNode?.select(0, textNode?.getTextContentSize());
    });
  });

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
      ).toBe("Hello");
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
      ).toBe("Hello");
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
      ).toBe("Hello");
    });
  });
});

it("applies list changes correctly", async () => {
  let editorRef: LexicalEditor;
  let textEditorHelpers: TestEditorHelpers;

  render(
    <TestEditor
      onEditorReady={(editor, helpers) => {
        editorRef = editor;
        textEditorHelpers = helpers;
      }}
    >
      <ListControls namespace="test" />
    </TestEditor>,
  );

  const ulButton = screen.getByTestId("test-unordered-list-button");

  await userEvent.click(ulButton);

  act(() => {
    expect(ulButton).toHaveAttribute("aria-pressed", "true");
  });

  await act(() => {
    editorRef.update(() => {
      textEditorHelpers.typeIntoEditor("Foo");
      textEditorHelpers.typeIntoEditor("{enter}");
      textEditorHelpers.typeIntoEditor("Bar");
      textEditorHelpers.typeIntoEditor("{enter}");
      textEditorHelpers.typeIntoEditor("Baz");
      textEditorHelpers.typeIntoEditor("{enter}");
    });
  });
});
