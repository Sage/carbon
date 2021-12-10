import React, { useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createPopper } from "@popperjs/core";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import { tokensClassName } from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";

const Popover = ({
  children,
  placement,
  disablePortal,
  reference,
  onFirstUpdate,
  modifiers,
}) => {
  const elementDOM = useRef();
  if (!elementDOM.current && !disablePortal) {
    elementDOM.current = document.createElement("div");
    elementDOM.current.classList.add(tokensClassName);
    document.body.appendChild(elementDOM.current);
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

  useResizeObserver(reference, () => {
    popperInstance?.current?.update();
  });

  useLayoutEffect(() => {
    if (reference.current) {
      popperInstance.current = createPopper(
        reference.current,
        popperElementRef.current,
        {
          placement,
          onFirstUpdate,
          modifiers: [
            {
              name: "computeStyles",
              options: {
                gpuAcceleration: false,
                roundOffsets: false,
              },
            },
            ...(modifiers || []),
          ],
        }
      );
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    };
  }, [modifiers, onFirstUpdate, placement, popperElementRef, reference]);

  useEffect(() => {
    return () => {
      if (!disablePortal) {
        document.body.removeChild(elementDOM.current);
      }
    };
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
  onFirstUpdate: PropTypes.func,
  // When true, children are not rendered in portal
  disablePortal: PropTypes.bool,
  // Reference element, children will be positioned in relation to this element - should be a ref
  reference: PropTypes.shape({ current: PropTypes.any }),
};

export default Popover;
