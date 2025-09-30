import React, { forwardRef, useState } from "react";
import Tooltip from ".";
import { TOOLTIP_POSITIONS, TooltipPositions } from "./tooltip.config";
import { TooltipProps } from "./tooltip.component";
import { ButtonProps } from "../button";

export default {
  title: "Deprecated/Tooltip/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    type: {
      options: ["error", "default", "info", "warning"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["medium", "large"],
      control: {
        type: "select",
      },
    },
    flipOverrides: {
      mapping: (value: TooltipPositions) => [value],
      options: ["left", "right", "top", "bottom"],
      control: {
        type: "select",
      },
    },
    position: {
      options: TOOLTIP_POSITIONS,
      control: {
        type: "select",
      },
    },
    bgColor: {
      control: {
        type: "text",
      },
    },
    fontColor: {
      control: {
        type: "text",
      },
    },
  },
};

export const DefaultStory = ({
  message,
  isVisible,
  flipOverrides,
  ...args
}: TooltipProps) => {
  const [stateVisible, setStateVisible] = useState(false);
  return (
    <div
      style={{
        margin: "200px 400px",
        width: 350,
        height: 250,
        overflow: "auto",
      }}
    >
      <Tooltip
        isVisible={stateVisible || isVisible}
        flipOverrides={flipOverrides}
        message={message}
        {...args}
      >
        <div
          style={{
            backgroundColor: "#00815D",
            color: "white",
            width: "42px",
            height: "26px",
            position: "relative",
            outline: "none",
            cursor: "pointer",
          }}
          {...(isVisible === false && {
            onMouseOver: () => setStateVisible(true),
            onMouseLeave: () => setStateVisible(false),
            onFocus: () => setStateVisible(true),
            onBlur: () => setStateVisible(false),
          })}
        >
          <span style={{ position: "absolute", top: "4px", left: "2px" }}>
            target
          </span>
        </div>
      </Tooltip>
    </div>
  );
};

DefaultStory.story = {
  name: "default",
  args: {
    position: "top",
    isVisible: true,
    message:
      "I'm a helpful tooltip that can display additional information to a user.",
    type: "default",
    size: "medium",
    bgColor: undefined,
    fontColor: undefined,
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children }, ref) => (
    <button
      type="button"
      tabIndex={0}
      data-component="tooltip-trigger"
      style={{
        backgroundColor: "#00815D",
        color: "white",
        cursor: "pointer",
        border: "none",
        padding: "8px",
      }}
      ref={ref}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Tooltip";

const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children }, ref) => (
    <button
      type="button"
      tabIndex={0}
      data-component="tooltip-trigger"
      ref={ref}
    >
      {children}
    </button>
  ),
);
SecondaryButton.displayName = "Tooltip";
