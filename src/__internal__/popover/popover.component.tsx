import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  RefObject,
} from "react";
import ReactDOM from "react-dom";
import { flip, Placement, Middleware } from "@floating-ui/dom";

import useFloating from "../../hooks/__internal__/useFloating";
import { StyledBackdrop, StyledPopoverContent } from "./popover.style";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import ModalContext, { ModalContextProps } from "../modal/modal.context";

export interface PopoverProps {
  /**
   * Element to be positioned, has to be a single node and has to accept `ref` and `style` props.
   */
  children: React.ReactElement;
  /**
   * Placement of children in relation to the reference element.
   */
  placement?: Placement;
  /**
   * Disables interaction with background UI.
   */
  disableBackgroundUI?: boolean;
  /**
   * Optional middleware array, for more information go to:
   * [https://floating-ui.com/docs/middleware](https://floating-ui.com/docs/middleware)
   */
  middleware?: Middleware[];
  /**
   * When true, children are not rendered in portal.
   */
  disablePortal?: boolean;
  /**
   * Reference element, children will be positioned in relation to this element - should be a ref shaped object.
   */
  reference: RefObject<HTMLElement>;
  /**
   * Determines if the popover is currently open/visible or not. Defaults to true.
   */
  isOpen?: boolean;
  /**
   * Whether to update the position of the floating element on every animation frame if required. This is optimized for performance but can still be costly. Use with caution!
   * [https://floating-ui.com/docs/autoUpdate#animationframe](https://floating-ui.com/docs/autoUpdate#animationframe)
   */
  animationFrame?: boolean;
  /**
   * Optional strategy to use for positioning the floating element. Defaults to "absolute".
   */
  popoverStrategy?: "absolute" | "fixed";
  /**
   * Allows child ref to be set via a prop instead of dynamically finding it via children iteration.
   */
  childRefOverride?: MutableRefObject<HTMLDivElement | null>;
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
  popoverStrategy = "absolute",
  childRefOverride,
}: PopoverProps) => {
  const elementDOM = useRef<HTMLDivElement | null>(null);
  const { isInModal } = useContext<ModalContextProps>(ModalContext);
  const candidateNode = reference.current?.closest("[role='dialog']");
  const mountNode = isInModal && candidateNode ? candidateNode : document.body;

  if (!elementDOM.current && !disablePortal) {
    elementDOM.current = document.createElement("div");
    mountNode.appendChild(elementDOM.current);
  }

  const childRef =
    childRefOverride ||
    (React.Children.only(children) as React.FunctionComponentElement<unknown>)
      .ref;
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
    strategy: popoverStrategy,
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
        <StyledBackdrop data-role="popup-backdrop">{content}</StyledBackdrop>
      </StyledPopoverContent>
    );
  }

  if (disablePortal) {
    return content;
  }

  return ReactDOM.createPortal(
    <CarbonScopedTokensProvider>{content}</CarbonScopedTokensProvider>,
    elementDOM.current as HTMLDivElement,
  );
};

export default Popover;
