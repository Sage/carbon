import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  RefObject,
} from "react";

import {
  defaultFocusableSelectors,
  setElementFocus,
  onTabGuardFocus,
  trapFunction,
} from "./focus-trap-utils";
import ModalContext, { ModalContextProps } from "../modal/modal.context";
import usePrevious from "../../hooks/__internal__/usePrevious";
import TopModalContext from "../../components/carbon-provider/__internal__/top-modal.context";

export const TAB_GUARD_TOP = "tab-guard-top";
export const TAB_GUARD_BOTTOM = "tab-guard-bottom";

export interface FocusTrapProps {
  children: React.ReactNode;
  autoFocus?: boolean;
  /** provide a custom first element to focus */
  focusFirstElement?: RefObject<HTMLElement> | HTMLElement | null;
  /** a custom callback that will override the default focus trap behaviour */
  bespokeTrap?: (
    ev: KeyboardEvent,
    firstElement?: HTMLElement,
    lastElement?: HTMLElement,
  ) => void;
  /** optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
  /** a ref to the container wrapping the focusable elements */
  wrapperRef: RefObject<HTMLElement>;
  /* whether the modal (etc.) component that the focus trap is inside is open or not */
  isOpen?: boolean;
  /** an optional array of refs to containers whose content should also be reachable from the FocusTrap */
  additionalWrapperRefs?: RefObject<HTMLElement>[];
}

const FocusTrap = ({
  children,
  autoFocus = true,
  focusableSelectors,
  focusFirstElement,
  bespokeTrap,
  wrapperRef,
  isOpen,
  additionalWrapperRefs,
}: FocusTrapProps) => {
  const trapRef = useRef<HTMLDivElement>(null);
  const [currentFocusedElement, setCurrentFocusedElement] = useState<
    HTMLElement | undefined
  >();
  const { isAnimationComplete = true, triggerRefocusFlag } =
    useContext<ModalContextProps>(ModalContext);

  const { topModal } = useContext(TopModalContext);
  // we ensure that isTopModal is true if there is no TopModalContext, so that consumers who have not
  // wrapped their app in CarbonProvider do not have all FocusTrap behaviour broken
  const isTopModal =
    !topModal || (wrapperRef.current && topModal.contains(wrapperRef.current));

  const trapWrappers = useMemo(
    () =>
      additionalWrapperRefs?.length
        ? [wrapperRef, ...additionalWrapperRefs]
        : [wrapperRef],
    [additionalWrapperRefs, wrapperRef],
  );

  const onTabGuardTopFocus = useMemo(
    () => onTabGuardFocus(trapWrappers, focusableSelectors, "top"),
    [focusableSelectors, trapWrappers],
  );

  const onTabGuardBottomFocus = useMemo(
    () => onTabGuardFocus(trapWrappers, focusableSelectors, "bottom"),
    [focusableSelectors, trapWrappers],
  );

  useEffect(() => {
    additionalWrapperRefs?.forEach((ref) => {
      const { current: containerElement } = ref;
      // istanbul ignore else
      if (containerElement) {
        // istanbul ignore else
        if (
          !containerElement.previousElementSibling?.matches(
            `[data-element=${TAB_GUARD_TOP}]`,
          )
        ) {
          const topTabGuard = document.createElement("div");
          topTabGuard.tabIndex = 0;
          topTabGuard.dataset.element = TAB_GUARD_TOP;
          containerElement.insertAdjacentElement("beforebegin", topTabGuard);
          topTabGuard.addEventListener("focus", onTabGuardTopFocus(ref));
        }
        // istanbul ignore else
        if (
          !containerElement.nextElementSibling?.matches(
            `[data-element=${TAB_GUARD_BOTTOM}]`,
          )
        ) {
          const bottomTabGuard = document.createElement("div");
          bottomTabGuard.tabIndex = 0;
          bottomTabGuard.dataset.element = TAB_GUARD_BOTTOM;
          containerElement.insertAdjacentElement("afterend", bottomTabGuard);
          bottomTabGuard.addEventListener("focus", onTabGuardBottomFocus(ref));
        }
      }
    });

    return () => {
      additionalWrapperRefs?.forEach((ref) => {
        const previousElement = ref.current?.previousElementSibling;
        if (previousElement?.matches(`[data-element=${TAB_GUARD_TOP}]`)) {
          previousElement.remove();
        }
        const nextElement = ref.current?.nextElementSibling;
        if (nextElement?.matches(`[data-element=${TAB_GUARD_BOTTOM}]`)) {
          nextElement.remove();
        }
      });
    };
  }, [additionalWrapperRefs, onTabGuardTopFocus, onTabGuardBottomFocus]);

  const shouldSetFocus = autoFocus && isOpen && isAnimationComplete;

  const prevShouldSetFocus = usePrevious(shouldSetFocus);

  const getFocusableElements = useCallback(
    (selector: string) => {
      const elements: Element[] = [];
      trapWrappers.forEach((ref) => {
        // istanbul ignore else
        if (ref.current) {
          elements.push(
            ...Array.from(ref.current.querySelectorAll(selector)).filter(
              (el) => Number((el as HTMLElement).tabIndex) !== -1,
            ),
          );
        }
      });
      return elements as HTMLElement[];
    },
    [trapWrappers],
  );

  useEffect(() => {
    if (shouldSetFocus && !prevShouldSetFocus) {
      const candidateFirstElement =
        focusFirstElement && "current" in focusFirstElement
          ? focusFirstElement.current
          : focusFirstElement;
      const autoFocusedElement = getFocusableElements(
        defaultFocusableSelectors,
      ).find((el) => el.getAttribute("data-has-autofocus") === "true");
      const elementToFocus =
        (candidateFirstElement as HTMLElement) ||
        autoFocusedElement ||
        wrapperRef.current;
      // istanbul ignore else
      if (elementToFocus) {
        setElementFocus(elementToFocus);
      }
    }
  }, [
    shouldSetFocus,
    prevShouldSetFocus,
    getFocusableElements,
    focusFirstElement,
    wrapperRef,
  ]);

  useEffect(() => {
    const trapFn = (ev: KeyboardEvent) => {
      // block focus trap from working if it's not the topmost trap, or is currently closed
      if (!isTopModal || !isOpen) {
        return;
      }

      const focusableElements = getFocusableElements(defaultFocusableSelectors);
      trapFunction(
        ev,
        focusableElements,
        document.activeElement === wrapperRef.current,
        focusableSelectors,
        bespokeTrap,
      );
    };

    document.addEventListener("keydown", trapFn, true);

    return function cleanup() {
      document.removeEventListener("keydown", trapFn, true);
    };
  }, [
    bespokeTrap,
    wrapperRef,
    focusableSelectors,
    getFocusableElements,
    isTopModal,
    isOpen,
  ]);

  const updateCurrentFocusedElement = useCallback(() => {
    const focusableElements = getFocusableElements(
      focusableSelectors || defaultFocusableSelectors,
    );
    const element = focusableElements?.find(
      (el) => el === document.activeElement,
    );

    if (element) {
      setCurrentFocusedElement(element);
    }
  }, [getFocusableElements, focusableSelectors]);

  const refocusTrap = useCallback(() => {
    if (
      currentFocusedElement &&
      !currentFocusedElement.hasAttribute("disabled")
    ) {
      // the trap breaks if it tries to refocus a disabled element
      setElementFocus(currentFocusedElement);
    } else if (wrapperRef.current?.hasAttribute("tabindex")) {
      setElementFocus(wrapperRef.current);
    } else {
      const focusableElements = getFocusableElements(
        focusableSelectors || defaultFocusableSelectors,
      );
      /* istanbul ignore else */
      if (focusableElements.length) {
        setElementFocus(focusableElements[0]);
      }
    }
  }, [
    currentFocusedElement,
    wrapperRef,
    focusableSelectors,
    getFocusableElements,
  ]);

  useEffect(() => {
    if (triggerRefocusFlag) {
      refocusTrap();
    }
  }, [triggerRefocusFlag, refocusTrap]);

  const [tabIndex, setTabIndex] = useState<number | undefined>(0);

  useEffect(() => {
    // tabIndex is set to 0 and removed on blur.
    if (!isOpen) {
      setTabIndex(0);
    }
  }, [isOpen]);

  const onBlur = () => {
    /* istanbul ignore else */
    if (isOpen) {
      setTabIndex(undefined);
    }
  };

  const focusProps = (hasNoTabIndex: boolean) => ({
    ...(hasNoTabIndex && { tabIndex, onBlur }),
    onFocus: updateCurrentFocusedElement,
  });

  // passes focusProps, sets tabIndex and onBlur if no tabIndex has been explicitly set on child
  const clonedChildren = React.Children.map(children, (child) => {
    const focusableChild = child as React.ReactElement;
    return React.cloneElement(
      focusableChild,
      focusProps(focusableChild?.props?.tabIndex === undefined),
    );
  });

  return (
    <div ref={trapRef}>
      {isOpen && (
        <div
          data-element={TAB_GUARD_TOP}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onFocus={onTabGuardTopFocus(wrapperRef)}
        />
      )}
      {clonedChildren}
      {isOpen && (
        <div
          data-element={TAB_GUARD_BOTTOM}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onFocus={onTabGuardBottomFocus(wrapperRef)}
        />
      )}
    </div>
  );
};

export default FocusTrap;
