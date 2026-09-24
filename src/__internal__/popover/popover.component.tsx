import React, {
  MutableRefObject,
  useContext,
  useRef,
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  autoUpdate,
  flip,
  Middleware,
  Placement,
  useFloating,
} from "@floating-ui/react-dom";

import { StyledBackdrop, StyledPopoverContent } from "./popover.style";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import ModalContext, { ModalContextProps } from "../modal/modal.context";
import useIsBrowser from "../../hooks/__internal__/useIsBrowser";
import TokensWrapperContext from "../../components/tokens-wrapper/__internal__/context";
import combineRefs from "../utils/helpers/combine-refs";

type OriginalFloatingStyles = Pick<
  CSSStyleDeclaration,
  "height" | "left" | "position" | "top" | "transform" | "width"
>;

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
}

const defaultMiddleware = [
  flip({
    fallbackStrategy: "initialPlacement",
  }),
];

const disableAutomaticUpdate = () => () => {};

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
}: Omit<PopoverProps, "disablePortal">) => {
  const childRef = (
    React.Children.only(children) as React.FunctionComponentElement<unknown>
  ).ref;
  const originalFloatingStyles = useRef<OriginalFloatingStyles | null>(null);
  const {
    elements,
    floatingStyles,
    isPositioned,
    placement: currentPlacement,
    refs,
    update,
  } = useFloating({
    open: isOpen,
    placement,
    middleware,
    strategy: popoverStrategy,
    transform: false,
    whileElementsMounted: disableAutomaticUpdate,
  });

  useLayoutEffect(() => {
    refs.setReference(reference.current);

    if (childRefOverride) {
      refs.setFloating(childRefOverride.current);
    }
  }, [childRefOverride, reference, refs]);

  useEffect(() => {
    if (!isOpen || !elements.reference || !elements.floating) return;

    return autoUpdate(elements.reference, elements.floating, update, {
      animationFrame,
    });
  }, [animationFrame, elements.floating, elements.reference, isOpen, update]);

  useLayoutEffect(() => {
    const floatingElement = childRefOverride?.current;

    if (!isOpen || !floatingElement) return;

    const { height, left, position, top, transform, width } =
      floatingElement.style;
    originalFloatingStyles.current = {
      height,
      left,
      position,
      top,
      transform,
      width,
    };

    return () => {
      Object.assign(floatingElement.style, originalFloatingStyles.current);
      floatingElement.removeAttribute("data-floating-placement");
      originalFloatingStyles.current = null;
    };
  }, [childRefOverride, elements.floating, isOpen]);

  useLayoutEffect(() => {
    const floatingElement = childRefOverride?.current;

    if (!isOpen || !floatingElement) return;

    Object.assign(floatingElement.style, floatingStyles);

    if (isPositioned) {
      floatingElement.setAttribute("data-floating-placement", currentPlacement);
    }
  }, [
    childRefOverride,
    currentPlacement,
    floatingStyles,
    isOpen,
    isPositioned,
  ]);

  const childStyle = (children.props as { style?: React.CSSProperties }).style;
  const sanitizedFloatingStyles = {
    ...floatingStyles,
    ...(typeof floatingStyles.left === "number" &&
    !Number.isFinite(floatingStyles.left)
      ? { left: 0 }
      : {}),
    ...(typeof floatingStyles.top === "number" &&
    !Number.isFinite(floatingStyles.top)
      ? { top: 0 }
      : {}),
  };
  const setFloating = useMemo(
    () => combineRefs(childRef, refs.setFloating),
    [childRef, refs.setFloating],
  );
  const content = childRefOverride
    ? children
    : React.cloneElement(children, {
        ref: setFloating,
        style: isOpen
          ? { ...childStyle, ...sanitizedFloatingStyles }
          : childStyle,
        "data-floating-placement":
          isOpen && isPositioned ? currentPlacement : undefined,
      });

  return (
    <StyledPopoverContent hide={hide}>
      {disableBackgroundUI ? (
        <StyledBackdrop data-role="popup-backdrop">{content}</StyledBackdrop>
      ) : (
        content
      )}
    </StyledPopoverContent>
  );
};

const Popover = ({ disablePortal, portalTarget, ...props }: PopoverProps) => {
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
