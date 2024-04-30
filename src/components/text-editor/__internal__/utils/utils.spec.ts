import { ContentBlock, ContentState, EditorState, genKey } from "draft-js";
import { List } from "immutable";
import { computeBlockType, resetBlockType, getSelectedLength } from "./utils";

describe("computeBlockType", () => {
  it('returns "unstyled" as default when char is not "." or "*"', () => {
    expect(computeBlockType("@", "ordered-list-item")).toEqual("unstyled");
  });

  it('returns "unstyled" as default when char is "*" and type is "unordered-list-item"', () => {
    expect(computeBlockType("*", "unordered-list-item")).toEqual("unstyled");
  });

  it('returns "unstyled" as default when char is "." and type is "ordered-list-item"', () => {
    expect(computeBlockType(".", "ordered-list-item")).toEqual("unstyled");
  });

  it('returns "ordered-list-item" as default when char is "." and type is not "ordered-list-item"', () => {
    expect(computeBlockType(".", "unordered-list-item")).toEqual(
      "ordered-list-item",
    );
  });

  it('returns "unordered-list-item" as default when char is "*" and type is not "unordered-list-item"', () => {
    expect(computeBlockType("*", "ordered-list-item")).toEqual(
      "unordered-list-item",
    );
  });
});

describe("resetBlockType", () => {
  it.each(["ordered-list-item", "unordered-list-item"] as const)(
    "returns editorState with block replaced with given %s type",
    (type) => {
      const value = EditorState.createEmpty();
      const blocks = resetBlockType(value, type)
        .getCurrentContent()
        .getBlocksAsArray();
      expect(blocks.length).toEqual(1);
      blocks.forEach((block) => expect(block.getType()).toEqual(type));
    },
  );

  it("returns editorState with default unstyled block when no type provided", () => {
    const value = EditorState.createEmpty();
    const blocks = resetBlockType(value).getCurrentContent().getBlocksAsArray();
    expect(blocks.length).toEqual(1);
    blocks.forEach((block) => expect(block.getType()).toEqual("unstyled"));
  });
});

describe("getSelectedLength", () => {
  const currentSelectionInfo = (value: EditorState) => {
    const content = value.getCurrentContent();

    return {
      anchorKey: content.getFirstBlock().getKey(),
      focusKey: content.getLastBlock().getKey(),
      focusOffset: content.getLastBlock().getText().length,
    };
  };

  const makeBlock = (value: EditorState) => {
    const content = value.getCurrentContent();

    const newBlock = new ContentBlock({
      key: genKey(),
      type: "unstyled",
      text: "foo",
      characterList: List(),
    });
    const newBlockMap = content.getBlockMap().set(newBlock.getKey(), newBlock);

    return EditorState.push(
      value,
      ContentState.createFromBlockArray(newBlockMap.toArray())
        .set("selectionBefore", content.getSelectionBefore())
        .set("selectionAfter", content.getSelectionAfter()) as ContentState,
      "insert-fragment",
    );
  };

  it("returns 0 when there is not content", () => {
    const editorState = EditorState.createEmpty();
    expect(getSelectedLength(editorState)).toEqual(0);
  });

  it("returns 0 when the selection is collapsed", () => {
    const editorState = EditorState.createWithContent(
      ContentState.createFromText("foo"),
    );
    const { anchorKey, focusKey } = currentSelectionInfo(editorState);
    const newValue = EditorState.acceptSelection(
      editorState,
      editorState.getSelection().merge({
        anchorKey,
        anchorOffset: 1,
        focusOffset: 1,
        focusKey,
        isBackward: false,
        hasFocus: false,
      }),
    );
    expect(getSelectedLength(newValue)).toEqual(0);
  });

  it("returns the difference between the anchor and focus offsets if there is only one block of content", () => {
    const editorState = EditorState.createWithContent(
      ContentState.createFromText("foo"),
    );
    const { anchorKey, focusKey } = currentSelectionInfo(editorState);
    const newValue = EditorState.acceptSelection(
      editorState,
      editorState.getSelection().merge({
        anchorKey,
        anchorOffset: 0,
        focusOffset: 1,
        focusKey,
        isBackward: false,
        hasFocus: false,
      }),
    );
    expect(getSelectedLength(newValue)).toEqual(1);
  });

  it("returns the difference between the anchor and focus offsets plus any initial content", () => {
    const editorState = makeBlock(
      EditorState.createWithContent(ContentState.createFromText("foo")),
    );
    const { anchorKey, focusKey, focusOffset } =
      currentSelectionInfo(editorState);
    const newValue = EditorState.acceptSelection(
      editorState,
      editorState.getSelection().merge({
        anchorKey,
        anchorOffset: 0,
        focusOffset,
        focusKey,
        isBackward: false,
        hasFocus: false,
      }),
    );
    expect(getSelectedLength(newValue)).toEqual(7);
  });

  it("returns the difference between the anchor and focus offsets plus the other blocks", () => {
    let editorState = makeBlock(
      EditorState.createWithContent(ContentState.createFromText("foo")),
    );
    editorState = makeBlock(editorState);
    const { anchorKey, focusKey, focusOffset } =
      currentSelectionInfo(editorState);

    const newValue = EditorState.acceptSelection(
      editorState,
      editorState.getSelection().merge({
        anchorKey,
        anchorOffset: 0,
        focusOffset,
        focusKey,
        isBackward: false,
        hasFocus: false,
      }),
    );
    expect(getSelectedLength(newValue)).toEqual(11);
  });
});
