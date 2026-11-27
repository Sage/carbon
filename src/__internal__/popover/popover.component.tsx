import React, {
  MutableRefObject,
  useContext,
  useRef,
  RefObject,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { flip, Placement, Middleware } from "@floating-ui/dom";

import useFloating from "../../hooks/__internal__/useFloating";
import { StyledBackdrop, StyledPopoverContent } from "./popover.style";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import ModalContext, { ModalContextProps } from "../modal/modal.context";
import useIsBrowser from "../../hooks/__internal__/useIsBrowser";
import TokensWrapperContext from "../../components/tokens-wrapper/__internal__/context";
import getElementRef from "../utils/helpers/get-element-ref";
import useCombinedRefs from "../../hooks/__internal__/useCombinedRefs";

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
  reference: Readonly<RefObject<HTMLElement | null>>;
  /**
   * Whether the Popover is open, determines if autoUpdate runs in useFloating.
   */
  isOpen?: boolean;
  /**
   * Applies display: none to the content wrapper.
   */
  hide?: boolean;
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
  /** Optional custom portal container. Defaults to document.body (or the closest dialog in a modal). */
  portalTarget?: HTMLElement | null;
  /** Prefer the browser's top layer to preserve DOM order without ancestor clipping. Falls back to a portal when unsupported. */
  useTopLayer?: boolean;
}

const defaultMiddleware = [
  flip({
    fallbackStrategy: "initialPlacement",
  }),
];

const PopoverRoot = ({
  children,
  placement,
  reference,
  middleware = defaultMiddleware,
  disableBackgroundUI,
  isOpen = true,
  hide,
  animationFrame,
  popoverStrategy = "absolute",
  childRefOverride,
  useTopLayer = false,
}: Omit<PopoverProps, "disablePortal">) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement | null>(null);
  const child = React.Children.only(children) as React.ReactElement<{
    ref?: React.Ref<HTMLElement>;
  }>;
  const childRef = getElementRef<HTMLElement>(child);
  const combinedRef = useCombinedRefs(innerRef, childRef);
  const floatingReference = childRefOverride || innerRef;
  // An override can identify a nested element rather than the direct child.
  const content = childRefOverride
    ? children
    : React.cloneElement(child, { ref: combinedRef });

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!useTopLayer || !element) return;

    element.setAttribute("popover", "manual");
    if (isOpen) element.showPopover();

    return () => {
      if (element.matches(":popover-open")) element.hidePopover();
      element.removeAttribute("popover");
    };
  }, [useTopLayer, isOpen]);

  useFloating({
    isOpen,
    reference,
    floating: floatingReference,
    placement,
    middleware,
    animationFrame,
    strategy: useTopLayer ? "fixed" : popoverStrategy,
  });

  return (
    <StyledPopoverContent ref={contentRef} hide={hide} $topLayer={useTopLayer}>
      {disableBackgroundUI ? (
        <StyledBackdrop data-role="popup-backdrop">{content}</StyledBackdrop>
      ) : (
        content
      )}
    </StyledPopoverContent>
  );
};

const Popover = ({
  disablePortal,
  portalTarget,
  useTopLayer,
  ...props
}: PopoverProps) => {
  const { isBrowser } = useIsBrowser();
  const { isInModal } = useContext<ModalContextProps>(ModalContext);
  const { wrapperId } = useContext(TokensWrapperContext);
  const closestDialog =
    props.reference.current?.closest<HTMLElement>("[role='dialog']");
  const [mode, setMode] = useState<string | undefined>();

  useEffect(() => {
    const wrapper = props.reference.current?.closest("[data-carbon-theme]");
    if (!wrapper) return;

    setMode(
      wrapper.getAttribute("data-carbon-theme") ??
        /* istanbul ignore next */ undefined,
    );

    const observer = new MutationObserver(() => {
      setMode(wrapper.getAttribute("data-carbon-theme") ?? undefined);
    });

    observer.observe(wrapper, {
      attributes: true,
      attributeFilter: ["data-carbon-theme"],
    });

    return () => {
      observer.disconnect();
      setMode(undefined);
    };
  }, [props.reference]);

  const canUseTopLayer =
    useTopLayer && isBrowser && "showPopover" in HTMLElement.prototype;

  if (canUseTopLayer) {
    const content = <PopoverRoot {...props} useTopLayer />;
    // Submenus belong inside their parent list item, including inside dialogs.
    return portalTarget ? createPortal(content, portalTarget) : content;
  }

  if (disablePortal) {
    return <PopoverRoot {...props} />;
  }

  if (!isBrowser) {
    return null;
  }

  const target =
    isInModal && closestDialog
      ? closestDialog
      : (portalTarget ?? document.body);

  return createPortal(
    <CarbonScopedTokensProvider
      className="carbon-portal-scoped-tokens-provider"
      data-role="carbon-portal-scoped-tokens-provider"
      data-tokens-wrapper-id={wrapperId}
      {...(mode && { "data-carbon-theme": mode })}
    >
      <PopoverRoot {...props} />
    </CarbonScopedTokensProvider>,
    target,
  );
};

export default Popover;
