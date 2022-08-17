import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { createPopper, State, Instance } from "@popperjs/core";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import StyledBackdrop from "./popover.style";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import { ModalContext } from "../../components/modal/modal.component";

type PopoverModifier = {
  name: string;
  options?: Record<string, unknown>;
  enabled?: boolean;
};

export interface PopoverProps {
  // Element to be positioned, has to be a single node and has to accept `ref` and `style` props
  children: React.ReactElement;
  // Placement of children in relation to the reference element
  placement?:
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end";
  // Disables interaction with background UI
  disableBackgroundUI?: boolean;
  // Optional modifiers array, for more information and object shape go to:
  // https://popper.js.org/docs/v2/constructors/#modifiers
  modifiers?: PopoverModifier[];
  // Optional onFirstUpdate function, for more information go to:
  // hhttps://popper.js.org/docs/v2/lifecycle/#hook-into-the-lifecycle
  onFirstUpdate?: (state: Partial<State>) => void;
  // When true, children are not rendered in portal
  disablePortal?: boolean;
  // Reference element, children will be positioned in relation to this element - should be a ref shaped object
  reference: React.RefObject<HTMLElement>;
}
// TODO: Remove TempModalContext after modal has been converted to TS
type TempModalContext = {
  isInModal?: boolean;
};

const Popover = ({
  children,
  placement,
  disablePortal,
  reference,
  onFirstUpdate,
  modifiers,
  disableBackgroundUI,
}: PopoverProps) => {
  const elementDOM = useRef<HTMLDivElement | null>(null);
  // TODO: Remove TempModalContext after modal has been converted to TS
  const { isInModal } = useContext<TempModalContext>(ModalContext);
  const candidateNode = reference.current?.closest("[role='dialog']");
  const mountNode = isInModal && candidateNode ? candidateNode : document.body;

  if (!elementDOM.current && !disablePortal) {
    elementDOM.current = document.createElement("div");
    mountNode.appendChild(elementDOM.current);
  }

  const popperInstance = useRef<Instance | null>(null);
  const popperRef = useRef<HTMLElement | null>(null);
  let content;
  let popperElementRef: React.MutableRefObject<HTMLElement | null>;

  const childRef = (
    React.Children.only(children) as React.FunctionComponentElement<unknown>
  ).ref;

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
        popperElementRef.current as HTMLElement,
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
        mountNode.removeChild(elementDOM.current as HTMLDivElement);
        elementDOM.current = null;
      }
    };
  }, [disablePortal, mountNode]);

  if (disableBackgroundUI) {
    content = <StyledBackdrop>{content}</StyledBackdrop>;
  }

  if (disablePortal) {
    return content;
  }

  return ReactDOM.createPortal(
    <CarbonScopedTokensProvider>{content}</CarbonScopedTokensProvider>,
    elementDOM.current as HTMLDivElement
  );
};

export default Popover;
