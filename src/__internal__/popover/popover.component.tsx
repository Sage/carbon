import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { flip, Placement, Middleware } from "@floating-ui/dom";

import useFloating from "../../hooks/__internal__/useFloating";
import { StyledBackdrop, StyledPopoverContent } from "./popover.style";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import {
  ModalContext,
  ModalContextProps,
} from "../../components/modal/modal.component";

type CustomRefObject<T> = {
  current?: T | null;
};

export interface PopoverProps {
  // Element to be positioned, has to be a single node and has to accept `ref` and `style` props
  children: React.ReactElement;
  // Placement of children in relation to the reference element
  placement?: Placement;
  // Disables interaction with background UI
  disableBackgroundUI?: boolean;
  // Optional middleware array, for more information go to:
  // https://floating-ui.com/docs/middleware
  middleware?: Middleware[];
  // When true, children are not rendered in portal
  disablePortal?: boolean;
  // Reference element, children will be positioned in relation to this element - should be a ref shaped object
  reference: CustomRefObject<HTMLElement>;
  // Determines if the popover is currently open/visible or not. Defaults to true.
  isOpen?: boolean;
  // Whether to update the position of the floating element on every animation frame if required. This is optimized for performance but can still be costly. Use with caution!
  // https://floating-ui.com/docs/autoUpdate#animationframe
  animationFrame?: boolean;
}

const defaultMiddleware = [
  flip({
    fallbackStrategy: "initialPlacement",
  }),
];

const Popover = ({
  children,
  placement,
  disablePortal,
  reference,
  middleware = defaultMiddleware,
  disableBackgroundUI,
  isOpen = true,
  animationFrame,
}: PopoverProps) => {
  const elementDOM = useRef<HTMLDivElement | null>(null);
  const { isInModal } = useContext<ModalContextProps>(ModalContext);
  const candidateNode = reference.current?.closest("[role='dialog']");
  const mountNode = isInModal && candidateNode ? candidateNode : document.body;

  if (!elementDOM.current && !disablePortal) {
    elementDOM.current = document.createElement("div");
    mountNode.appendChild(elementDOM.current);
  }

  const childRef = (React.Children.only(
    children
  ) as React.FunctionComponentElement<unknown>).ref;
  const innerRef = useRef<HTMLElement | null>(null);
  const floatingReference = childRef || innerRef;

  let content;
  if (childRef) {
    content = children;
  } else {
    content = React.cloneElement(children, { ref: floatingReference });
  }

  useFloating({
    isOpen,
    reference,
    floating: floatingReference,
    placement,
    middleware,
    animationFrame,
  });

  useEffect(() => {
    return () => {
      if (!disablePortal && elementDOM.current) {
        mountNode.removeChild(elementDOM.current);
        elementDOM.current = null;
      }
    };
  }, [disablePortal, mountNode]);

  if (!disableBackgroundUI) {
    content = (
      <StyledPopoverContent isOpen={isOpen}>{content}</StyledPopoverContent>
    );
  }

  if (disableBackgroundUI) {
    content = (
      <StyledPopoverContent isOpen={isOpen}>
        <StyledBackdrop>{content}</StyledBackdrop>
      </StyledPopoverContent>
    );
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
