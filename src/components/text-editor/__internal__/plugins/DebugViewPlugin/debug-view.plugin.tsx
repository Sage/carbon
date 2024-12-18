/* istanbul ignore file */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import React from "react";

/**
 * This plugin renders the current tree on-screen underneath the contenteditable
 * div. It is used for debugging purposes only.
 *
 * To use it, import DebugViewPlugin into the main text editor component and
 * add <DebugViewPlugin /> as the last child of the StyledTextEditor component.
 *
 * DO NOT leave this active when tests are running, as they will all fail
 * immediately (and remember to turn it off when you're done debugging).
 */

const DebugViewPlugin = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName="tree-view-output"
      treeTypeButtonClassName="debug-treetype-button"
      timeTravelPanelClassName="debug-timetravel-panel"
      timeTravelButtonClassName="debug-timetravel-button"
      timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
      timeTravelPanelButtonClassName="debug-timetravel-panel-button"
      editor={editor}
    />
  );
};

export default DebugViewPlugin;
