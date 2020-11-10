import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  StyledToolbar,
  StyledEditorStyleControls,
  StyledEditorActionControls,
} from "./toolbar.style";
import ToolbarButton from "./toolbar-button";
import Button from "../../../button";
import Events from "../../../../utils/helpers/events/events";
import Icon from "../../../icon";

const BOLD = "BOLD";
const ITALIC = "ITALIC";
const UNORDERED_LIST = "unordered-list-item";
const ORDERED_LIST = "ordered-list-item";

const Toolbar = ({
  activeControls,
  canFocus,
  isDisabled,
  onCancel,
  onSave,
  setBlockStyle,
  setInlineStyle,
}) => {
  const [showTooltip, setShowTooltip] = useState("");
  const controlRefs = [useRef(), useRef(), useRef(), useRef()];
  const [focusIndex, setFocusIndex] = useState(0);
  const [tabbable, setTabbable] = useState(true);

  const handleInlineStyleChange = useCallback(
    (ev, inlineType) => {
      setInlineStyle(ev, inlineType);
      setShowTooltip("");
    },
    [setInlineStyle]
  );

  const handleBlockType = useCallback(
    (ev, blockType) => {
      setBlockStyle(ev, blockType);
      setShowTooltip("");
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
          setFocusIndex(3);
        } else {
          setFocusIndex(focusIndex - 1);
        }
        setTabbable(false);
      } else if (Events.isRightKey(ev)) {
        if (focusIndex === 3) {
          setFocusIndex(0);
        } else {
          setFocusIndex(focusIndex + 1);
        }
        setTabbable(false);
      }
    },
    [focusIndex, handleBlockType, handleInlineStyleChange]
  );

  useEffect(() => {
    if (focusIndex === null) {
      setTabbable(true);
    } else if (canFocus && focusIndex !== null) {
      controlRefs[focusIndex].current._target.focus();
    }
  }, [canFocus, controlRefs, focusIndex, tabbable]);

  const isTabbable = useCallback(
    (index) => {
      if (!controlRefs[index] || !controlRefs[index].current) {
        return false;
      }

      return controlRefs[index].current._target === document.activeElement;
    },
    [controlRefs]
  );

  return (
    <StyledToolbar data-component="text-editor-toolbar">
      <StyledEditorStyleControls>
        <ToolbarButton
          ariaLabel="bold"
          onKeyDown={(ev) => handleKeyDown(ev, BOLD)}
          onMouseDown={(ev) => handleInlineStyleChange(ev, BOLD)}
          activated={activeControls.BOLD}
          ref={controlRefs[0]}
          tabbable={tabbable}
          {...tooltipProps("Bold", showTooltip, setShowTooltip)}
        >
          <Icon type="bold" />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel="italic"
          onKeyDown={(ev) => handleKeyDown(ev, ITALIC)}
          onMouseDown={(ev) => handleInlineStyleChange(ev, ITALIC)}
          activated={activeControls.ITALIC}
          ref={controlRefs[1]}
          tabbable={isTabbable(1)}
          {...tooltipProps("Italic", showTooltip, setShowTooltip)}
        >
          <Icon type="italic" />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel="bullet-list"
          onKeyDown={(ev) => handleKeyDown(ev, UNORDERED_LIST)}
          onMouseDown={(ev) => handleBlockType(ev, UNORDERED_LIST)}
          activated={activeControls[UNORDERED_LIST]}
          ref={controlRefs[2]}
          tabbable={isTabbable(2)}
          {...tooltipProps("Bulleted List", showTooltip, setShowTooltip)}
        >
          <Icon type="bullet_list_dotted" />
        </ToolbarButton>
        <ToolbarButton
          ariaLabel="number-list"
          onKeyDown={(ev) => handleKeyDown(ev, ORDERED_LIST)}
          onMouseDown={(ev) => handleBlockType(ev, ORDERED_LIST)}
          activated={activeControls[ORDERED_LIST]}
          ref={controlRefs[3]}
          tabbable={isTabbable(3)}
          {...tooltipProps("Numbered List", showTooltip, setShowTooltip)}
        >
          <Icon type="bullet_list_numbers" />
        </ToolbarButton>
      </StyledEditorStyleControls>

      {onSave && (
        <StyledEditorActionControls>
          <Button
            buttonType="tertiary"
            onClick={onCancel ? (ev) => onCancel(ev) : undefined}
          >
            Cancel
          </Button>
          <Button buttonType="primary" onClick={onSave} disabled={isDisabled}>
            Save
          </Button>
        </StyledEditorActionControls>
      )}
    </StyledToolbar>
  );
};

function tooltipProps(id, showTooltip, setShowTooltip) {
  return {
    tooltipMessage: id,
    tooltipPosition: "top",
    tooltipAlign: "center",
    tooltipVisible: showTooltip === id,
    onMouseOver: () => setShowTooltip(id),
    onMouseLeave: () => setShowTooltip(""),
  };
}

Toolbar.propTypes = {
  /** Used to override the active status of the inline controls */
  activeControls: PropTypes.object.isRequired,
  /** Flag to trigger control focusing */
  canFocus: PropTypes.bool,
  /** Used to allow toolbar to determine active controls */
  editorState: PropTypes.object,
  /** Sets the form controls ('Save', 'Cancel') to disabled */
  isDisabled: PropTypes.bool,
  /** Optional callback to handle event after clicking the 'Cancel" button */
  onCancel: PropTypes.func,
  /** Optional callback to handle event after clicking the 'Save" button */
  onSave: PropTypes.func,
  /** Callback to handle setting the inline styles */
  setInlineStyle: PropTypes.func.isRequired,
  /** Callback to handle setting the block styles */
  setBlockStyle: PropTypes.func.isRequired,
};

export default Toolbar;
