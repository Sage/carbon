import React, { useRef } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import StyledTooltip from "./tooltip.style";
import StyledPointer from "./tooltip-pointer.style";
import tagComponent from "../../utils/helpers/tags/tags";

const TOOLTIP_DELAY = 100;

const Tooltip = React.forwardRef(
  (
    {
      children,
      isVisible,
      position = "top",
      message,
      type,
      size = "medium",
      isPartOfInput,
      inputSize,
      id,
      bgColor,
      fontColor,
      ...rest
    },
    ref
  ) => {
    const tooltipRef = useRef(ref || null);

    const tooltip = (attrs, content) => {
      const currentPosition = attrs["data-placement"] || position;

      return (
        <StyledTooltip
          data-element="tooltip"
          role="tooltip"
          tabIndex="-1"
          type={type}
          size={size}
          id={id}
          {...tagComponent("tooltip", rest)}
          isPartOfInput={isPartOfInput}
          inputSize={inputSize}
          {...attrs}
          position={currentPosition}
          ref={tooltipRef}
          bgColor={bgColor}
          fontColor={fontColor}
        >
          <StyledPointer
            key="pointer"
            type={type}
            {...attrs}
            position={currentPosition}
            data-popper-arrow=""
            data-element="tooltip-pointer"
            bgColor={bgColor}
          />
          <div>{content}</div>
        </StyledTooltip>
      );
    };

    return (
      <Tippy
        placement={position}
        delay={TOOLTIP_DELAY}
        {...(isVisible !== undefined && { visible: isVisible })}
        render={(attrs) => tooltip(attrs, message)}
      >
        {children}
      </Tippy>
    );
  }
);

Tooltip.propTypes = {
  /** The message to be displayed within the tooltip */
  message: PropTypes.node.isRequired,
  /** The id attribute to use for the tooltip */
  id: PropTypes.string,
  /** Whether to to show the Tooltip */
  isVisible: PropTypes.bool,
  /** Sets position of the tooltip */
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Defines the message type */
  type: PropTypes.string,
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** Defines the size of the tooltip content */
  size: PropTypes.oneOf(["medium", "large"]),
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  bgColor: PropTypes.string,
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  fontColor: PropTypes.string,
  /** @ignore @private */
  isPartOfInput: PropTypes.bool,
  /** @ignore @private */
  inputSize: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Tooltip;
