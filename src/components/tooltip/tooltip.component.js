import React, { useRef } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import StyledTooltip from "./tooltip.style";
import StyledPointer from "./tooltip-pointer.style";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";

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
      flipOverrides,
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
        popperOptions={{
          modifiers: [
            ...(flipOverrides
              ? [
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: flipOverrides,
                    },
                  },
                ]
              : []),
            {
              name: "computeStyles",
              options: {
                gpuAcceleration: false,
              },
            },
          ],
        }}
      >
        {children}
      </Tippy>
    );
  }
);

const placements = ["top", "bottom", "left", "right"];

Tooltip.propTypes = {
  /** The message to be displayed within the tooltip */
  message: PropTypes.node.isRequired,
  /** The id attribute to use for the tooltip */
  id: PropTypes.string,
  /** Whether to to show the Tooltip */
  isVisible: PropTypes.bool,
  /** Sets position of the tooltip */
  position: PropTypes.oneOf(placements),
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
  /** Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"] (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) */
  flipOverrides: (props, propName) => {
    const prop = props[propName];
    const isValid =
      prop &&
      Array.isArray(prop) &&
      prop.every((placement) => placements.includes(placement));

    if (!prop || isValid) {
      return null;
    }
    return new Error(
      // eslint-disable-next-line max-len
      `The \`${propName}\` prop supplied to \`Tooltip\` must be an array containing some or all of ["top", "bottom", "left", "right"].`
    );
  },
};

export default Tooltip;
