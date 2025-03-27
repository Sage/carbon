import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  StyledButton,
  StyledGlobalVerticalMenuWrapper,
} from "./global-vertical-menu.style";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { useV2Menu, V2MenuProvider } from "./global-vertical-menu.context";

const MenuLauncher = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (_active: boolean) => void;
}) => {
  const { buttonRef, setActiveMenuItem } = useV2Menu();

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

export interface GlobalNavV2Props extends TagProps {
  children?: React.ReactNode;
  height?: string;
  reduceMotion?: boolean;
}

export const GlobalVerticalMenu = ({ children, ...rest }: GlobalNavV2Props) => {
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
    <V2MenuProvider>
      <StyledGlobalVerticalMenuWrapper
        ref={containerRef}
        {...tagComponent("global-nav-v2", rest)}
      >
        <MenuLauncher active={active} setActive={setActive} />
        {active && children}
      </StyledGlobalVerticalMenuWrapper>
    </V2MenuProvider>
  );
};

export default GlobalVerticalMenu;
