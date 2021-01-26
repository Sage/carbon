import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createPopper } from "@popperjs/core";

// Temporary fix for Popper rounding issue described here:
// https://github.com/popperjs/popper-core/pull/1213
// https://github.com/popperjs/popper-core/issues/1169
export const alignSameWidthPopoverFunction = ({ state }) => {
  const refWidth = state.elements.reference.getBoundingClientRect().width;
  const popperWidth = state.elements.popper.getBoundingClientRect().width;

  /* istanbul ignore else */
  if (refWidth === popperWidth) {
    const rect = state.rects.reference.x;
    const offset = state.modifiersData.popperOffsets.x;
    const number = rect > offset ? rect : offset;
    state.styles.popper.left = `${number}px`;
  }
};

const alignSameWidthPopper = {
  name: "alignSameWidthPopper",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: alignSameWidthPopoverFunction,
};

const Popover = ({
  children,
  placement,
  disablePortal,
  reference,
  onFirstUpdate,
  modifiers,
}) => {
  const elementDOM = useRef();
  if (!elementDOM.current) {
    elementDOM.current = document.createElement("div");
  }
  const popperInstance = useRef();
  const popperRef = useRef();
  let content;
  let popperElementRef;

  const childRef = React.Children.only(children).ref;

  if (childRef) {
    content = children;
    popperElementRef = childRef;
  } else {
    content = React.cloneElement(children, { ref: popperRef });
    popperElementRef = popperRef;
  }

  useEffect(() => {
    popperInstance.current = createPopper(
      reference.current,
      popperElementRef.current,
      {
        placement,
        onFirstUpdate,
        modifiers: [
          alignSameWidthPopper,
          {
            name: "computeStyles",
            options: {
              gpuAcceleration: false,
            },
          },
          ...(modifiers || []),
        ],
      }
    );

    return () => {
      popperInstance.current.destroy();
      popperInstance.current = null;
    };
  }, [modifiers, onFirstUpdate, placement, popperElementRef, reference]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!disablePortal) {
      const portalElement = elementDOM.current;
      document.body.appendChild(portalElement);
      return () => {
        document.body.removeChild(portalElement);
      };
    }
  }, [disablePortal]);

  if (disablePortal) {
    return content;
  }

  return ReactDOM.createPortal(content, elementDOM.current);
};

Popover.propTypes = {
  // Element to be positioned, has to be a single node and has to accept `ref` and `style` props
  children: PropTypes.node.isRequired,
  // Placement of children in relation to the reference element
  placement: PropTypes.oneOf([
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "right",
    "right-start",
    "right-end",
    "left",
    "left-start",
    "left-end",
  ]),
  // Optional modifiers array, for more information and object structure go to:
  // https://popper.js.org/docs/v2/constructors/#modifiers
  modifiers: PropTypes.array,
  // Optional onFirstUpdate funcition, for more information go to:
  // https://popper.js.org/docs/v2/constructors/#modifiers
  onFirstUpdate: PropTypes.array,
  // When true, children are not rendered in portal
  disablePortal: PropTypes.bool,
  // Reference element, children will be positioned in relation to this element - should be a ref
  reference: PropTypes.shape({ current: PropTypes.any }),
};

export default Popover;
