import React, { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import {
  VerticalMenu,
  VerticalMenuItem,
  VerticalMenuTrigger,
  VerticalMenuTriggerProps,
  VerticalMenuFullScreen,
  VerticalMenuFullScreenProps,
  VerticalMenuProps,
  VerticalMenuItemProps,
} from ".";
import Box from "../box";
import Pill from "../pill";

export const VerticalMenuDefaultComponent = (
  props: Partial<VerticalMenuProps>,
) => {
  return (
    <Box height="100vh">
      <VerticalMenu {...props}>
        <VerticalMenuItem
          iconType="analysis"
          adornment={(isOpen) =>
            !isOpen && (
              <Pill borderColor="#fff" fill size="S">
                10
              </Pill>
            )
          }
          title="Item 1"
        >
          <VerticalMenuItem
            title="ChildItem 1"
            href="/child-item-1"
            adornment={
              <Pill borderColor="#fff" fill size="S">
                10
              </Pill>
            }
          />
          <VerticalMenuItem href="/child-item-2" title="ChildItem 2" />
        </VerticalMenuItem>

        <VerticalMenuItem iconType="admin" href="/item1" title="Item 2" />

        <VerticalMenuItem
          iconType="home"
          title="Item 3"
          active={(isOpen) => !isOpen}
          adornment={(isOpen) =>
            !isOpen && (
              <Pill borderColor="#fff" fill size="S">
                129
              </Pill>
            )
          }
        >
          <VerticalMenuItem
            title="Very long text that will be wrapped"
            href="/very-long-text-that-will-be-wrapped"
            adornment={
              <Pill borderColor="#fff" fill size="S">
                100
              </Pill>
            }
          />
          <VerticalMenuItem
            title="Active item"
            href="/active-item"
            active
            adornment={
              <Pill borderColor="#fff" fill size="S">
                29
              </Pill>
            }
          />
        </VerticalMenuItem>

        <VerticalMenuItem iconType="alert" title="Item 4" href="/item-4" />

        <VerticalMenuItem iconType="bank" title="Item 5">
          <VerticalMenuItem title="ChildItem 1" href="/child-item-1" />
          <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
        </VerticalMenuItem>

        <VerticalMenuItem iconType="basket" title="Item 6" href="/item-6" />

        <VerticalMenuItem
          iconType="calendar"
          title="Item 7 - More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title."
        >
          <VerticalMenuItem title="ChildItem 1" href="/child-item-1" />
          <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
        </VerticalMenuItem>
      </VerticalMenu>
    </Box>
  );
};

export const VerticalMenuItemCustom = ({
  component,
  ...props
}: Partial<VerticalMenuItemProps>) => {
  return (
    <Box height="100vh">
      <VerticalMenu>
        <VerticalMenuItem
          iconType="analysis"
          active={(isOpen) => !isOpen}
          adornment={(isOpen) =>
            !isOpen && (
              <Pill borderColor="#fff" fill size="S">
                10
              </Pill>
            )
          }
          title="Item 1"
          {...props}
        >
          <VerticalMenuItem
            title="ChildItem 1"
            href="/child-item-1"
            adornment={
              <Pill borderColor="#fff" fill size="S">
                10
              </Pill>
            }
          />
          <VerticalMenuItem href="/child-item-2" title="ChildItem 2" />
        </VerticalMenuItem>
      </VerticalMenu>
    </Box>
  );
};

export const VerticalMenuItemCustomHref = ({
  component,
  ...props
}: Partial<VerticalMenuItemProps>) => {
  return (
    <Box height="100vh">
      <VerticalMenu>
        <VerticalMenuItem
          iconType="analysis"
          adornment={(isOpen) =>
            !isOpen && (
              <Pill borderColor="#fff" fill size="S">
                100
              </Pill>
            )
          }
          title="Item 1"
        >
          <VerticalMenuItem
            title="ChildItem 1"
            adornment={
              <Pill borderColor="#fff" fill size="S">
                10
              </Pill>
            }
            {...props}
          />
          <VerticalMenuItem href="/child-item-2" title="ChildItem 2" />
        </VerticalMenuItem>
      </VerticalMenu>
    </Box>
  );
};

export const VerticalMenuTriggerCustom = (
  props: Partial<VerticalMenuTriggerProps>,
) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box height="100vh">
      <VerticalMenuTrigger
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        {...props}
      >
        Menu
      </VerticalMenuTrigger>
    </Box>
  );
};

export const VerticalMenuFullScreenCustom = (
  props: Partial<VerticalMenuFullScreenProps>,
) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 1200px)");

  const menuItems = (
    <>
      <VerticalMenuItem iconType="analysis" title="Item 1">
        <VerticalMenuItem
          title="ChildItem 1"
          href="/child-item-1"
          adornment={
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          }
        />
        <VerticalMenuItem href="/child-item-2" title="ChildItem 2" />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="admin" href="/item1" title="Item 2" />

      <VerticalMenuItem iconType="home" title="Item 3">
        <VerticalMenuItem
          title="Very long text that will be wrapped"
          href="/very-long-text-that-will-be-wrapped"
          adornment={
            <Pill borderColor="#fff" fill size="S">
              100
            </Pill>
          }
        />
        <VerticalMenuItem
          title="Active item"
          href="/active-item"
          active
          adornment={
            <Pill borderColor="#fff" fill size="S">
              29
            </Pill>
          }
        />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="alert" title="Item 4" href="/item-4" />

      <VerticalMenuItem iconType="bank" title="Item 5">
        <VerticalMenuItem title="ChildItem 1" href="/child-item-1" />
        <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
      </VerticalMenuItem>

      <VerticalMenuItem iconType="basket" title="Item 6" href="/item-6" />

      <VerticalMenuItem
        iconType="calendar"
        title="Item 7 - More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title. More text to wrap the whole title. "
      >
        <VerticalMenuItem title="ChildItem 1" href="/child-item-1" />
        <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
      </VerticalMenuItem>
    </>
  );

  if (fullscreenViewBreakPoint) {
    return (
      <>
        <VerticalMenuTrigger onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Menu
        </VerticalMenuTrigger>
        <VerticalMenuFullScreen
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          {...props}
        >
          {menuItems}
        </VerticalMenuFullScreen>
      </>
    );
  }
  return <VerticalMenu>{menuItems}</VerticalMenu>;
};

export const VerticalMenuFullScreenBackgroundScrollTest = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <VerticalMenuFullScreen isOpen onClose={() => {}}>
        <VerticalMenuItem title="Menu Item One" href="#" />
        <VerticalMenuItem title="Menu Item Two" href="#" />
      </VerticalMenuFullScreen>
    </Box>
  );
};

export const ClosedVerticalMenuFullScreenWithButtons = () => {
  return (
    <>
      <button type="button" id="button-1">
        Button 1
      </button>
      <VerticalMenuFullScreen isOpen={false} onClose={() => {}}>
        <VerticalMenuItem title="Menu Item One" href="#" />
        <VerticalMenuItem title="Menu Item Two" href="#" />
      </VerticalMenuFullScreen>
      <button type="button" id="button-2">
        Button 2
      </button>
    </>
  );
};

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link = ({ to, children, className }: LinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
  };
  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export const CustomComponent = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        title="Item 1"
        component={Link}
        to="/item-1"
      />
    </VerticalMenu>
  );
};

export const Adornment = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        adornment={(isOpen) =>
          !isOpen && (
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          )
        }
        title="Item 1"
      >
        <VerticalMenuItem
          adornment={
            <Pill borderColor="#fff" fill size="S">
              10
            </Pill>
          }
          title="ChildItem 1"
          href="/child-item-1"
        />
        <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
      </VerticalMenuItem>
    </VerticalMenu>
  );
};

export const CustomItemPadding = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        title="Item 1"
        padding="0 0 0 80px"
      />
    </VerticalMenu>
  );
};

export const CustomItemHeight = () => {
  return (
    <VerticalMenu>
      <VerticalMenuItem height="100px" iconType="analysis" title="Item 1" />
    </VerticalMenu>
  );
};
