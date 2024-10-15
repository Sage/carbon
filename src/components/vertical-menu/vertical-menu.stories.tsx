import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { allModes } from "../../../.storybook/modes";
import isChromatic from "../../../.storybook/isChromatic";
import useMediaQuery from "../../hooks/useMediaQuery";

import Box from "../box";
import Pill from "../pill";
import {
  VerticalMenu,
  VerticalMenuItem,
  VerticalMenuFullScreen,
  VerticalMenuTrigger,
} from ".";

const defaultOpenState = isChromatic();

const meta: Meta<typeof VerticalMenu> = {
  title: "Vertical Menu",
  component: VerticalMenu,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    modes: {
      desktop: allModes.chromatic,
    },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VerticalMenu>;

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

export const Default: Story = () => (
  <Box height="100vh">
    <VerticalMenu aria-label="Default vertical menu">
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
        defaultOpen
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
Default.storyName = "Default";

export const CustomWidthAndHeight: Story = () => (
  <VerticalMenu
    width="500px"
    height="100vh"
    aria-label="Vertical menu with custom width and height"
  >
    <VerticalMenuItem
      iconType="analysis"
      adornment={
        <Pill borderColor="#fff" fill size="S">
          10
        </Pill>
      }
      title="Item 1"
      href="/item-1"
    />
    <VerticalMenuItem iconType="cart" active title="Item 2" href="/item-2" />
    <VerticalMenuItem iconType="bank" title="Item 3" href="/item-3" />
  </VerticalMenu>
);
CustomWidthAndHeight.storyName = "Custom Width and Height";

export const Adornment: Story = () => (
  <VerticalMenu aria-label="Vertical menu with adornment">
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
Adornment.storyName = "Adornment";

export const Active: Story = () => (
  <VerticalMenu aria-label="Active vertical menu">
    <VerticalMenuItem
      iconType="analysis"
      active={(isOpen) => !isOpen}
      title="Item 1"
    >
      <VerticalMenuItem active title="ChildItem 1" href="/child-item-1" />
      <VerticalMenuItem title="ChildItem 2" href="/child-item-2" />
    </VerticalMenuItem>
  </VerticalMenu>
);
Active.storyName = "Active";

export const CustomItemPadding: Story = () => (
  <VerticalMenu aria-label="Vertical menu with custom item padding">
    <VerticalMenuItem iconType="analysis" title="Item 1" padding="0 0 0 80px" />
  </VerticalMenu>
);
CustomItemPadding.storyName = "Custom Item Padding";

export const CustomItemHeight: Story = () => (
  <VerticalMenu aria-label="Vertical menu with custom item height">
    <VerticalMenuItem height="100px" iconType="analysis" title="Item 1" />
  </VerticalMenu>
);
CustomItemHeight.storyName = "Custom Item Height";

export const CustomComponent: Story = () => (
  <VerticalMenu aria-label="Custom vertical menu component">
    <VerticalMenuItem
      iconType="analysis"
      title="Item 1"
      component={Link}
      to="/item-1"
    />
  </VerticalMenu>
);
CustomComponent.storyName = "Custom Component";

export const FullScreen: Story = () => {
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
        >
          {menuItems}
        </VerticalMenuFullScreen>
      </>
    );
  }

  return (
    <VerticalMenu aria-label="Full-screen vertical menu">
      {menuItems}
    </VerticalMenu>
  );
};
FullScreen.storyName = "Full Screen";
