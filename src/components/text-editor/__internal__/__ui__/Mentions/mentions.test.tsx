import { render, screen, waitFor, act } from "@testing-library/react";
import React from "react";
import { checkForAtSignMentions, getPossibleQueryMatch } from "./helpers";
import MentionsTypeaheadMenuItem from "./mentions-typeahead-menu-item.component";
import MentionTypeaheadOption from "./mention-typeahead-option.class";
import MentionsPlugin from "./mentions.component";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalTypeaheadMenuPlugin } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { $createMentionNode } from "../../__nodes__/mention.node";
import { $createTextNode, $isTextNode } from "lexical";

// Mock the Lexical hooks and components
jest.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: jest.fn(),
}));

jest.mock("lexical", () => ({
  ...jest.requireActual("lexical"),
  $createTextNode: jest.fn(),
  $isTextNode: jest.fn(),
  TextNode: jest.fn(),
}));

jest.mock("../../__nodes__/mention.node", () => ({
  $createMentionNode: jest.fn(),
  $isMentionNode: jest.fn(),
}));

jest.mock("@lexical/react/LexicalTypeaheadMenuPlugin", () => ({
  LexicalTypeaheadMenuPlugin: jest.fn(() => null),
  MenuOption: class {
    key: string;
    constructor(key: string) {
      this.key = key;
    }
  },
}));

jest.mock("../../../../../hooks/__internal__/useLocale", () => () => ({
  textEditor: {
    mentions: {
      listAriaLabel: () => "Mentions list",
    },
  },
}));

describe("when checkForAtSignMentions function is called", () => {
  it("returns null for plain text", () => {
    expect(checkForAtSignMentions("hello world", 1)).toBeNull();
  });

  it("detects a simple mention", () => {
    const match = checkForAtSignMentions("Hello @Alice", 1);
    expect(match).not.toBeNull();
    expect(match?.matchingString).toBe("Alice");
    expect(match?.replaceableString).toBe("@Alice");
  });

  it("respects minMatchLength", () => {
    const match = checkForAtSignMentions("@A", 2);
    expect(match).toBeNull();
  });

  it("rejects when mention exceeds length limit", () => {
    const longName = "A".repeat(100);
    const match = checkForAtSignMentions(`@${longName}`, 1);
    expect(match).toBeNull();
  });
});

describe("when getPossibleQueryMatch function is called", () => {
  it("requires at least 1 character", () => {
    expect(getPossibleQueryMatch("@")).toBeNull();
  });

  it("returns a match for @ followed by letters", () => {
    const match = getPossibleQueryMatch("say @Charlie");
    expect(match?.matchingString).toBe("Charlie");
  });

  it("returns null if no trigger is present", () => {
    expect(getPossibleQueryMatch("Charlie")).toBeNull();
  });
});

describe("when MentionsTypeaheadMenuItem component is rendered", () => {
  it("renders correctly when not selected", () => {
    render(
      <MentionsTypeaheadMenuItem
        index={0}
        isSelected={false}
        onClick={() => {}}
        onMouseEnter={() => {}}
        option={new MentionTypeaheadOption("1", "Alice", "A")}
      />,
    );

    expect(screen.getByRole("option", { name: "Alice" })).toHaveClass("item");
  });

  it("renders correctly when selected", () => {
    render(
      <MentionsTypeaheadMenuItem
        index={0}
        isSelected={true}
        onClick={() => {}}
        onMouseEnter={() => {}}
        option={new MentionTypeaheadOption("1", "Alice", "A")}
      />,
    );

    expect(screen.getByRole("option", { name: "Alice" })).toHaveClass(
      "selected",
    );
  });
});

describe("MentionsPlugin", () => {
  const mockEditor = {
    registerCommand: jest.fn(() => jest.fn()),
    update: jest.fn((callback) => callback()),
  };

  beforeEach(() => {
    (useLexicalComposerContext as jest.Mock).mockReturnValue([mockEditor]);
    (LexicalTypeaheadMenuPlugin as jest.Mock).mockClear();
    ($createTextNode as jest.Mock).mockClear();
    ($isTextNode as unknown as jest.Mock).mockClear();
    ($createMentionNode as jest.Mock).mockClear();
  });

  const searchOptions = [
    { id: "1", name: "Will Seabrook" },
    { id: "2", name: "John Doe" },
    { id: "3", name: "Jane Smith" },
  ];

  it("filters options using fuzzy search (includes) instead of startsWith", async () => {
    render(<MentionsPlugin namespace="test" searchOptions={searchOptions} />);

    // Get the props passed to the mocked LexicalTypeaheadMenuPlugin
    const { calls } = (LexicalTypeaheadMenuPlugin as jest.Mock).mock;
    const lastCall = calls[calls.length - 1];
    const [props] = lastCall;

    // Simulate typing "Seabrook" (surname)
    const { onQueryChange } = props;

    act(() => {
      onQueryChange("Seabrook");
    });

    // Check the new props passed to LexicalTypeaheadMenuPlugin
    await waitFor(() => {
      const { calls: updatedCalls } = (LexicalTypeaheadMenuPlugin as jest.Mock)
        .mock;
      const [updatedProps] = updatedCalls[updatedCalls.length - 1];

      expect(updatedProps.options).toHaveLength(1);
    });

    const { calls: updatedCalls } = (LexicalTypeaheadMenuPlugin as jest.Mock)
      .mock;
    const [updatedProps] = updatedCalls[updatedCalls.length - 1];
    expect(updatedProps.options[0].name).toBe("Will Seabrook");
  });

  it("filters options case-insensitively", async () => {
    render(<MentionsPlugin namespace="test" searchOptions={searchOptions} />);

    const { calls } = (LexicalTypeaheadMenuPlugin as jest.Mock).mock;
    const [props] = calls[calls.length - 1];
    const { onQueryChange } = props;

    act(() => {
      onQueryChange("seabrook");
    });

    await waitFor(() => {
      const { calls: updatedCalls } = (LexicalTypeaheadMenuPlugin as jest.Mock)
        .mock;
      const [updatedProps] = updatedCalls[updatedCalls.length - 1];

      expect(updatedProps.options).toHaveLength(1);
    });

    const { calls: updatedCalls } = (LexicalTypeaheadMenuPlugin as jest.Mock)
      .mock;
    const [updatedProps] = updatedCalls[updatedCalls.length - 1];
    expect(updatedProps.options[0].name).toBe("Will Seabrook");
  });

  describe("onSelectOption", () => {
    it("inserts a space after mention if next sibling is not a space", () => {
      const mockMentionNode = {
        getNextSibling: jest.fn().mockReturnValue(null),
        insertAfter: jest.fn(),
      };
      ($createMentionNode as jest.Mock).mockReturnValue(mockMentionNode);

      const mockSpaceNode = { select: jest.fn() };
      ($createTextNode as jest.Mock).mockReturnValue(mockSpaceNode);

      const closeMenu = jest.fn();
      const nodeToReplace = { replace: jest.fn() };
      const option = new MentionTypeaheadOption("1", "Will Seabrook", "WS");

      render(<MentionsPlugin namespace="test" searchOptions={searchOptions} />);

      const { calls } = (LexicalTypeaheadMenuPlugin as jest.Mock).mock;
      const [props] = calls[calls.length - 1];
      const { onSelectOption } = props;

      act(() => {
        onSelectOption(option, nodeToReplace, closeMenu);
      });

      expect(nodeToReplace.replace).toHaveBeenCalledWith(mockMentionNode);
      expect($createTextNode).toHaveBeenCalledWith(" ");
      expect(mockMentionNode.insertAfter).toHaveBeenCalledWith(mockSpaceNode);
      expect(mockSpaceNode.select).toHaveBeenCalled();
      expect(closeMenu).toHaveBeenCalled();
    });

    it("moves selection if next sibling starts with a space", () => {
      const mockNextSibling = {
        getTextContent: jest.fn().mockReturnValue(" existing text"),
        select: jest.fn(),
      };
      const mockMentionNode = {
        getNextSibling: jest.fn().mockReturnValue(mockNextSibling),
        insertAfter: jest.fn(),
      };
      ($createMentionNode as jest.Mock).mockReturnValue(mockMentionNode);
      ($isTextNode as unknown as jest.Mock).mockReturnValue(true);

      const closeMenu = jest.fn();
      const nodeToReplace = { replace: jest.fn() };
      const option = new MentionTypeaheadOption("1", "Will Seabrook", "WS");

      render(<MentionsPlugin namespace="test" searchOptions={searchOptions} />);

      const { calls } = (LexicalTypeaheadMenuPlugin as jest.Mock).mock;
      const [props] = calls[calls.length - 1];
      const { onSelectOption } = props;

      act(() => {
        onSelectOption(option, nodeToReplace, closeMenu);
      });

      expect(nodeToReplace.replace).toHaveBeenCalledWith(mockMentionNode);
      expect($createTextNode).not.toHaveBeenCalled();
      expect(mockMentionNode.insertAfter).not.toHaveBeenCalled();
      expect(mockNextSibling.select).toHaveBeenCalledWith(1, 1);
      expect(closeMenu).toHaveBeenCalled();
    });
  });
});
