import { render, screen } from "@testing-library/react";
import React from "react";
import { checkForAtSignMentions, getPossibleQueryMatch } from "./helpers";
import MentionsTypeaheadMenuItem from "./mentions-typeahead-menu-item.component";
import MentionTypeaheadOption from "./mention-typeahead-option.class";

describe("checkForAtSignMentions", () => {
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

describe("getPossibleQueryMatch", () => {
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

describe("MentionsTypeaheadMenuItem", () => {
  it("renders correctly when not selected", () => {
    render(
      <MentionsTypeaheadMenuItem
        namespace="test"
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
        namespace="test"
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
