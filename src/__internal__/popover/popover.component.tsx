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
import { flip, Middleware, Placement } from "@floating-ui/react-dom";

import { StyledBackdrop, StyledPopoverContent } from "./popover.style";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import ModalContext, { ModalContextProps } from "../modal/modal.context";
import useIsBrowser from "../../hooks/__internal__/useIsBrowser";
import useFloating from "../../hooks/__internal__/useFloating";
import TokensWrapperContext from "../../components/tokens-wrapper/__internal__/context";
import combineRefs from "../utils/helpers/combine-refs";

export interface PopoverProps {
  children: React.ReactElement;
  placement?: Placement;
  disableBackgroundUI?: boolean;
  middleware?: Middleware[];
  disablePortal?: boolean;
  reference: RefObject<HTMLElement>;
  isOpen?: boolean;
  hide?: boolean;
  animationFrame?: boolean;
  popoverStrategy?: "absolute" | "fixed";
  childRefOverride?: MutableRefObject<HTMLDivElement | null>;
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
  const childRef = (
    React.Children.only(children) as React.FunctionComponentElement<unknown>
  ).ref;
  const innerRef = useRef<HTMLElement | null>(null);
  const floatingRef = childRefOverride ?? innerRef;

  const setFloating = useFloating({
    animationFrame,
    floating: floatingRef,
    isOpen,
    middleware,
    placement,
    reference,
    strategy: useTopLayer ? "fixed" : popoverStrategy,
  });

  const content = childRefOverride
    ? children
    : React.cloneElement(children, {
        ref: combineRefs(childRef, innerRef, setFloating),
      });

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
    return portalTarget ? createPortal(content, portalTarget) : content;
  }

  if (disablePortal) return <PopoverRoot {...props} />;
  if (!isBrowser) return null;

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
