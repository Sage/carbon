import React, { useCallback, useEffect, useRef, useState } from "react";

import useMediaQuery from "../../../hooks/useMediaQuery";

import {
  useVerticalMenu,
  VerticalMenuProvider,
} from "./vertical-menu-with-button.context";
import {
  StyledButton,
  StyledGlobalVerticalMenuWrapper,
} from "./vertical-menu-with-button.style";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

const MenuLauncher = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (_active: boolean) => void;
}) => {
  const { buttonRef, setActiveMenuItem, setReducedMotion } = useVerticalMenu();
  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  useEffect(() => {
    setReducedMotion?.(reduceMotion);
  }, [reduceMotion, setReducedMotion]);

  return (
    <StyledButton
      active={active}
      buttonType="tertiary"
      data-component="global-nav-v2-toggle"
      iconType="squares_nine"
      onClick={() => {
        setActive(!active);
        setActiveMenuItem(null);
      }}
      ref={buttonRef}
    />
  );
};

export interface VerticalMenuWithButtonProps extends TagProps {
  children?: React.ReactNode;
}

export const VerticalMenuWithButton = ({
  children,
  ...rest
}: VerticalMenuWithButtonProps) => {
  const [active, setActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();

      setActive(false);
    }
  }, []);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    const notInContainer =
      containerRef.current &&
      !containerRef.current.contains(event.target as Node);

    if (notInContainer) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (active) {
      document.addEventListener("keydown", handleClose);
    }

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [active, handleClose]);

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return function cleanup() {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    const handleBlur = () => {
      setTimeout(() => {
        if (
          containerRef.current &&
          !containerRef.current.contains(document.activeElement)
        ) {
          setActive(false);
        }
      }, 0);
    };

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener("focusout", handleBlur);

    return () => {
      currentContainer?.removeEventListener("focusout", handleBlur);
    };
  }, [active, handleClose]);

  return (
    <VerticalMenuProvider>
      <StyledGlobalVerticalMenuWrapper
        ref={containerRef}
        {...rest}
        {...tagComponent("global-nav-v2", rest)}
      >
        <MenuLauncher active={active} setActive={setActive} />
        {active && children}
      </StyledGlobalVerticalMenuWrapper>
    </VerticalMenuProvider>
  );
};

export default VerticalMenuWithButton;
