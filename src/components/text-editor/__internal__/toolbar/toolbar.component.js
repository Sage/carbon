import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  StyledToolbar,
  StyledEditorStyleControls,
  StyledEditorActionControls,
} from "./toolbar.style";
import ToolbarButton from "./toolbar-button";
import Events from "../../../../__internal__/utils/helpers/events";
import Icon from "../../../icon";
import Tooltip from "../../../tooltip";
import useLocale from "../../../../hooks/__internal__/useLocale";

const BOLD = "BOLD";
const ITALIC = "ITALIC";
const UNORDERED_LIST = "unordered-list-item";
const ORDERED_LIST = "ordered-list-item";

const Toolbar = ({
  activeControls,
  canFocus,
  toolbarElements,
  setBlockStyle,
  setInlineStyle,
}) => {
  const { textEditor } = useLocale();
  const { tooltipMessages, ariaLabels } = textEditor;
  const controlRefs = [useRef(), useRef(), useRef(), useRef()];
  const [focusIndex, setFocusIndex] = useState(0);
  const [tabbable, setTabbable] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState("");

  const handleInlineStyleChange = useCallback(
    (ev, inlineType) => {
      setInlineStyle(ev, inlineType);
    },
    [setInlineStyle]
  );

  const handleBlockType = useCallback(
    (ev, blockType) => {
      setBlockStyle(ev, blockType);
    },
    [setBlockStyle]
  );

  const handleKeyDown = useCallback(
    (ev, type) => {
      if (Events.isTabKey(ev)) {
        setFocusIndex(null);
      } else if (Events.isSpaceKey(ev) || Events.isEnterKey(ev)) {
        if ([BOLD, ITALIC].includes(type)) {
          handleInlineStyleChange(ev, type);
        } else {
          handleBlockType(ev, type);
        }
        setFocusIndex(0);
        setTabbable(true);
      } else if (Events.isLeftKey(ev)) {
        if (focusIndex === null || focusIndex === 0) {
          controlRefs[3].current.focus();
          setFocusIndex(3);
        } else {
          controlRefs[focusIndex - 1].current.focus();
          setFocusIndex(focusIndex - 1);
        }
        setTabbable(false);
      } else if (Events.isRightKey(ev)) {
        if (focusIndex === 3) {
          controlRefs[0].current.focus();
          setFocusIndex(0);
        } else {
          controlRefs[focusIndex + 1].current.focus();
          setFocusIndex(focusIndex + 1);
        }
        setTabbable(false);
      }
    },
    [controlRefs, focusIndex, handleBlockType, handleInlineStyleChange]
  );

  useEffect(() => {
    if (focusIndex === null) {
      setTabbable(true);
    }
  }, [focusIndex]);

  useEffect(() => {
    if (!canFocus) {
      setFocusIndex(null);
    }
  }, [canFocus]);

  const isTabbable = useCallback(
    (index) => {
      if (!controlRefs[index] || !controlRefs[index].current) {
        return false;
      }

      return controlRefs[index].current === document.activeElement;
    },
    [controlRefs]
  );

  return (
    <StyledToolbar data-component="text-editor-toolbar">
      <StyledEditorStyleControls>
        <Tooltip
          isVisible={activeTooltip === "Bold"}
          message={tooltipMessages.bold()}
          position="top"
        >
          <ToolbarButton
            ariaLabel={ariaLabels.bold()}
            onKeyDown={(ev) => handleKeyDown(ev, BOLD)}
            onMouseDown={(ev) => handleInlineStyleChange(ev, BOLD)}
            activated={activeControls.BOLD}
            ref={controlRefs[0]}
            tabbable={tabbable}
            onMouseOver={() => setActiveTooltip("Bold")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Bold")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon type="bold" />
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          isVisible={activeTooltip === "Italic"}
          message={tooltipMessages.italic()}
          position="top"
        >
          <ToolbarButton
            ariaLabel={ariaLabels.italic()}
            onKeyDown={(ev) => handleKeyDown(ev, ITALIC)}
            onMouseDown={(ev) => handleInlineStyleChange(ev, ITALIC)}
            activated={activeControls.ITALIC}
            ref={controlRefs[1]}
            tabbable={isTabbable(1)}
            onMouseOver={() => setActiveTooltip("Italic")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Italic")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon type="italic" />
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          isVisible={activeTooltip === "Bulleted List"}
          message={tooltipMessages.bulletList()}
          position="top"
        >
          <ToolbarButton
            ariaLabel={ariaLabels.bulletList()}
            onKeyDown={(ev) => handleKeyDown(ev, UNORDERED_LIST)}
            onMouseDown={(ev) => handleBlockType(ev, UNORDERED_LIST)}
            activated={activeControls[UNORDERED_LIST]}
            ref={controlRefs[2]}
            tabbable={isTabbable(2)}
            onMouseOver={() => setActiveTooltip("Bulleted List")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Bulleted List")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon type="bullet_list_dotted" />
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          isVisible={activeTooltip === "Numbered List"}
          message={tooltipMessages.numberList()}
          position="top"
        >
          <ToolbarButton
            ariaLabel={ariaLabels.numberList()}
            onKeyDown={(ev) => handleKeyDown(ev, ORDERED_LIST)}
            onMouseDown={(ev) => handleBlockType(ev, ORDERED_LIST)}
            activated={activeControls[ORDERED_LIST]}
            ref={controlRefs[3]}
            tabbable={isTabbable(3)}
            onMouseOver={() => setActiveTooltip("Numbered List")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Numbered List")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon type="bullet_list_numbers" />
          </ToolbarButton>
        </Tooltip>
      </StyledEditorStyleControls>

      {toolbarElements && (
        <StyledEditorActionControls>
          {toolbarElements}
        </StyledEditorActionControls>
      )}
    </StyledToolbar>
  );
};

Toolbar.propTypes = {
  /** Used to override the active status of the inline controls */
  activeControls: PropTypes.object.isRequired,
  /** Flag to trigger control focusing */
  canFocus: PropTypes.bool,
  /** Callback to handle setting the inline styles */
  setInlineStyle: PropTypes.func.isRequired,
  /** Callback to handle setting the block styles */
  setBlockStyle: PropTypes.func.isRequired,
  /** Additional elements to be rendered in the Toolbar, e.g. Save and Cancel Button */
  toolbarElements: PropTypes.node,
};

export default Toolbar;
