import {
  $createListNode,
  $isListItemNode,
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
  ListType,
  REMOVE_LIST_COMMAND,
  $insertList,
  $removeList,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";

import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  LexicalNode,
  NodeKey,
} from "lexical";

import React, { useCallback, useEffect, useState } from "react";

import { FormattingButton } from "../toolbar.style";
import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { TEXT_EDITOR_ACTION_TYPES } from "../../../__utils__/constants";

// The `ListControls` component is a set of buttons that allow the user to insert ordered and unordered lists into the editor.
const ListControls = ({
  namespace,
  olIsFirstButton,
  showOL = true,
  showUL = true,
  ulIsFirstButton,
  size = "medium",
}: {
  namespace: string;
  olIsFirstButton?: boolean;
  showOL?: boolean;
  showUL?: boolean;
  ulIsFirstButton?: boolean;
  size?: "small" | "medium" | "large";
}) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();
  // Get the locale to enable translations
  const locale = useLocale();
  // Set the initial state of the list buttons
  const [isOLActive, setIsOLActive] = useState(false);
  const [isULActive, setIsULActive] = useState(false);

  // Register the commands for inserting and removing lists
  /* istanbul ignore next */
  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          $insertList(TEXT_EDITOR_ACTION_TYPES.OrderedList);
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          $insertList(TEXT_EDITOR_ACTION_TYPES.UnorderedList);
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        REMOVE_LIST_COMMAND,
        () => {
          $removeList();
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  // Recursive function to find the closest list item ancestor
  const findListItemAncestor = (node: LexicalNode | null) => {
    let currentNode = node;
    while (currentNode !== null) {
      if (currentNode instanceof ListItemNode) {
        return currentNode;
      }
      currentNode = currentNode?.getParent();
    }
    return null;
  };

  // Covered in Playwright tests
  /* istanbul ignore next */
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if (!selection) {
      setIsOLActive(false);
      setIsULActive(false);
      return;
    }

    const selectedNodes = selection.getNodes();

    if (selectedNodes.length === 0) {
      setIsOLActive(false);
      setIsULActive(false);
      return;
    }

    const listItemNode = selectedNodes
      .map(findListItemAncestor)
      .find((node) => node !== null);

    if (!listItemNode) {
      setIsOLActive(false);
      setIsULActive(false);
      return;
    }

    let listNode = listItemNode.getParent();

    while (listNode && !(listNode instanceof ListNode)) {
      listNode = listNode.getParent();
    }

    if (listNode instanceof ListNode) {
      setIsOLActive(listNode.getListType() === "number");
      setIsULActive(listNode.getListType() === "bullet");
    } else {
      setIsOLActive(false);
      setIsULActive(false);
    }
  }, []);

  // Register an update listener to update the toolbar when the editor state changes
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const isEditable = editor.isEditable();

          /* istanbul ignore else */
          if (isEditable) updateToolbar();
        });
      }),
    );
  }, [updateToolbar, editor]);

  // When the ordered list button is clicked, insert or remove an ordered list
  const handleOLClick = () => {
    const isEditable = editor.isEditable();

    /* istanbul ignore else */
    if (isEditable) {
      if (isOLActive) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        setIsOLActive(false);
      } else {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        setIsOLActive(true);
      }
      // If the unordered list button is active, deactivate it
      setIsULActive(false);
    }
  };

  // When the unordered list button is clicked, insert or remove an unordered list
  const handleULClick = () => {
    const isEditable = editor.isEditable();

    /* istanbul ignore else */
    if (isEditable) {
      if (isULActive) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        setIsULActive(false);
      } else {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        setIsULActive(true);
      }
      // If the ordered list button is active, deactivate it
      setIsOLActive(false);
    }
  };

  // Split an array into three parts: before a subset, the subset, and after the subset
  // Covered by Playwright tests
  /* istanbul ignore next */
  function splitArray(allEntries: string[], subsetEntries: string[]) {
    let startIndex = -1;
    for (let i = 0; i <= allEntries.length - subsetEntries.length; i++) {
      if (
        allEntries.slice(i, i + subsetEntries.length).toString() ===
        subsetEntries.toString()
      ) {
        startIndex = i;
        break;
      }
    }

    if (startIndex === -1) {
      throw new Error("Subset B not found in array A");
    }

    // If the subset matches the full selection, return the original subset
    if (startIndex === 0 && subsetEntries.length === allEntries.length) {
      return { beforeSubset: [], subset: allEntries, afterSubset: [] };
    }

    // Split A into three parts
    const beforeSubset = allEntries.slice(0, startIndex);
    const subset = allEntries.slice(
      startIndex,
      startIndex + subsetEntries.length,
    );
    const afterSubset = allEntries.slice(startIndex + subsetEntries.length);

    return { beforeSubset, subset, afterSubset };
  }

  // Covered by Playwright tests
  /* istanbul ignore next */
  const alignListTypes = (lists: ListNode[], listType: ListType) => {
    lists.forEach((list) => {
      editor.update(() => {
        list.setListType(listType);
      });
    });
  };

  // Covered by Playwright tests
  /* istanbul ignore next */
  const convertListType = (newType: ListType) => {
    editor.update(() => {
      // Get the current selection
      const selection = $getSelection();
      // If the selection is not a range selection, return
      if (!$isRangeSelection(selection)) return;

      // Get the anchor node
      const anchorNode = selection.anchor.getNode();

      // Find the parent list node
      let currentList = anchorNode.getParent();
      while (currentList && !$isListNode(currentList)) {
        currentList = currentList.getParent();
      }

      // If the parent node is not a list node, return
      if (!currentList) {
        return;
      }

      // Determine how many lists have been selected
      const numberOfListsSelected = selection
        .getNodes()
        .map((node) => {
          return node.getType() === "list" ? node : null;
        })
        .filter((node): node is ListNode => node !== null);

      // If more than one list is selected, just align the list types to use the selected type
      if (numberOfListsSelected.length > 1) {
        alignListTypes(numberOfListsSelected, newType);
        return;
      }

      const preSelectionList: ListItemNode[] = [];
      const selectionList: ListItemNode[] = [];
      const postSelectionList: ListItemNode[] = [];

      // Get the keys of the nodes in the selection, filtering out the current list node (the parent)
      const selectionKeys = selection
        .getNodes()
        .map((node) => {
          let _p = node.getParent();
          // If we're not in a list item directly, get the parent of the node
          if (!$isListItemNode(_p)) {
            const nodeType = _p?.getType();
            // If the node is a link or autolink, use the parent of the link node instead
            if (nodeType && ["link", "autolink"].includes(nodeType)) {
              _p = _p?.getParent() ?? null;
            } else {
              // This node is useless, return null
              return null;
            }
          }
          const _k = _p?.getKey();

          if (_k !== currentList?.getKey()) return _k;
          return null;
        })
        .filter((key): key is string => key !== null && key !== undefined);
      // Get the keys of the nodes in the current list node
      const listKeys = currentList.getChildrenKeys();

      // Remove duplicate keys from the selection
      const uniqueSelectionKeys = Array.from(new Set(selectionKeys));

      // Split the list keys into three parts: before the selection, the selection, and after the selection
      const { beforeSubset, subset, afterSubset } = splitArray(
        listKeys,
        uniqueSelectionKeys,
      );

      // Get the nodes of the three parts
      beforeSubset.forEach((key: NodeKey) => {
        const node = $getNodeByKey(key);
        if ($isListItemNode(node)) preSelectionList.push(node);
      });
      subset.forEach((key: NodeKey) => {
        const node = $getNodeByKey(key);
        if ($isListItemNode(node)) selectionList.push(node);
      });
      afterSubset.forEach((key: NodeKey) => {
        const node = $getNodeByKey(key);
        if ($isListItemNode(node)) postSelectionList.push(node);
      });

      // Create new list nodes with the new list type
      const originalListType = currentList.getListType();
      const newPreNode = $createListNode(originalListType);
      const newSelectionNode = $createListNode(newType);
      const newPostNode = $createListNode(originalListType);
      newPreNode.append(...preSelectionList);
      newSelectionNode.append(...selectionList);
      newPostNode.append(...postSelectionList);

      // Insert the new nodes before the current list node if they have children
      if (newPreNode.getChildren().length > 0) {
        currentList.insertBefore(newPreNode);
      }
      if (newSelectionNode.getChildren().length > 0) {
        if (newPreNode.getChildren().length > 0) {
          newPreNode.insertAfter(newSelectionNode);
        } else {
          currentList.insertBefore(newSelectionNode);
        }
      }
      if (newPostNode.getChildren().length > 0) {
        if (newSelectionNode.getChildren().length > 0) {
          newSelectionNode.insertAfter(newPostNode);
        } else if (newPreNode.getChildren().length > 0) {
          newPreNode.insertAfter(newPostNode);
        } else {
          currentList.insertBefore(newPostNode);
        }
      }

      // Remove the current list node
      currentList.remove();
    });
  };

  return (
    <>
      {showUL && (
        <FormattingButton
          size={size}
          aria-label={locale.textEditor.unorderedListAria()}
          onClick={() =>
            isOLActive ? convertListType("bullet") : handleULClick()
          }
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
          }
          iconType="bullet_list_dotted"
          buttonType={isULActive ? "primary" : "tertiary"}
          isActive={isULActive}
          aria-pressed={isULActive}
          data-role={`${namespace}-unordered-list-button`}
          id={`${namespace}-unordered-list-button`}
          tabIndex={ulIsFirstButton ? 0 : -1}
          className="toolbar-button"
        />
      )}
      {showOL && (
        <FormattingButton
          size={size}
          aria-label={locale.textEditor.orderedListAria()}
          onClick={() =>
            isULActive ? convertListType("number") : handleOLClick()
          }
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
          }
          iconType="bullet_list_numbers"
          buttonType={isOLActive ? "primary" : "tertiary"}
          isActive={isOLActive}
          aria-pressed={isOLActive}
          data-role={`${namespace}-ordered-list-button`}
          id={`${namespace}-ordered-list-button`}
          tabIndex={olIsFirstButton ? 0 : -1}
          className="toolbar-button"
        />
      )}
    </>
  );
};

export default ListControls;
