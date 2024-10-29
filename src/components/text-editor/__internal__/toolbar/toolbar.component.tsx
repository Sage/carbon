import React, { useCallback, useEffect, useState, useRef } from "react";
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
import { BOLD, ITALIC, UNORDERED_LIST, ORDERED_LIST } from "../../types";
import type { InlineStyleType, BlockType } from "../../types";

export interface ToolbarProps {
  /** Used to override the active status of the inline controls */
  activeControls: Record<InlineStyleType | BlockType, boolean>;
  /** Flag to trigger control focusing */
  canFocus?: boolean;
  /** Callback to handle setting the inline styles */
  setInlineStyle: (
    ev:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
    inlineType: InlineStyleType,
  ) => void;
  /** Callback to handle setting the block styles */
  setBlockStyle: (
    ev:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
    blockType: BlockType,
  ) => void;
  /** Additional elements to be rendered in the Toolbar, e.g. Save and Cancel Button */
  toolbarElements?: React.ReactNode;
}

const Toolbar = ({
  activeControls,
  canFocus,
  toolbarElements,
  setBlockStyle,
  setInlineStyle,
}: ToolbarProps) => {
  const { textEditor } = useLocale();
  const { tooltipMessages, ariaLabels } = textEditor;
  const controlRefs = useRef([
    React.createRef<HTMLButtonElement>(),
    React.createRef<HTMLButtonElement>(),
    React.createRef<HTMLButtonElement>(),
    React.createRef<HTMLButtonElement>(),
  ]);

  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [tabbable, setTabbable] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState("");

  const handleInlineStyleChange = useCallback(
    (
      ev:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
      inlineType: InlineStyleType,
    ) => {
      setInlineStyle(ev, inlineType);
    },
    [setInlineStyle],
  );

  const handleBlockType = useCallback(
    (
      ev:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
      blockType: BlockType,
    ) => {
      setBlockStyle(ev, blockType);
    },
    [setBlockStyle],
  );

  const handleKeyDown = useCallback(
    (
      ev: React.KeyboardEvent<HTMLButtonElement>,
      type: InlineStyleType | BlockType,
    ) => {
      if (Events.isTabKey(ev)) {
        setFocusIndex(null);
      } else if (Events.isSpaceKey(ev) || Events.isEnterKey(ev)) {
        if (type === BOLD || type === ITALIC) {
          handleInlineStyleChange(ev, type);
        } else {
          handleBlockType(ev, type);
        }
        setFocusIndex(0);
        setTabbable(true);
      } else if (Events.isLeftKey(ev)) {
        if (focusIndex === null || focusIndex === 0) {
          controlRefs.current[3].current?.focus();
          setFocusIndex(3);
        } else {
          controlRefs.current[focusIndex - 1].current?.focus();
          setFocusIndex(focusIndex - 1);
        }
        setTabbable(false);
      } else if (Events.isRightKey(ev)) {
        if (focusIndex === 3) {
          controlRefs.current[0].current?.focus();
          setFocusIndex(0);
        } else {
          const currentIndex = focusIndex === null ? 0 : focusIndex;
          controlRefs.current[currentIndex + 1].current?.focus();
          setFocusIndex(currentIndex + 1);
        }
        setTabbable(false);
      }
    },
    [focusIndex, handleBlockType, handleInlineStyleChange],
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

  const isTabbable = (index: number) => {
    if (!controlRefs.current[index] || !controlRefs.current[index].current) {
      return false;
    }

    return controlRefs.current[index].current === document.activeElement;
  };

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
            ref={controlRefs.current[0]}
            tabbable={tabbable}
            onMouseOver={() => setActiveTooltip("Bold")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Bold")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon
              color={
                activeControls[BOLD]
                  ? "var(--colorsActionMinorYang100)"
                  : undefined
              }
              type="bold"
            />
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
            ref={controlRefs.current[1]}
            tabbable={isTabbable(1)}
            onMouseOver={() => setActiveTooltip("Italic")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Italic")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon
              color={
                activeControls[ITALIC]
                  ? "var(--colorsActionMinorYang100)"
                  : undefined
              }
              type="italic"
            />
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
            ref={controlRefs.current[2]}
            tabbable={isTabbable(2)}
            onMouseOver={() => setActiveTooltip("Bulleted List")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Bulleted List")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon
              color={
                activeControls[UNORDERED_LIST]
                  ? "var(--colorsActionMinorYang100)"
                  : undefined
              }
              type="bullet_list_dotted"
            />
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
            ref={controlRefs.current[3]}
            tabbable={isTabbable(3)}
            onMouseOver={() => setActiveTooltip("Numbered List")}
            onMouseLeave={() => setActiveTooltip("")}
            onFocus={() => setActiveTooltip("Numbered List")}
            onBlur={() => setActiveTooltip("")}
          >
            <Icon
              color={
                activeControls[ORDERED_LIST]
                  ? "var(--colorsActionMinorYang100)"
                  : undefined
              }
              type="bullet_list_numbers"
            />
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

export default Toolbar;
