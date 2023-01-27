import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import useMediaQuery from "../../hooks/useMediaQuery";

import {
  VerticalMenu,
  VerticalMenuItem,
  VerticalMenuTrigger,
  VerticalMenuTriggerProps,
  VerticalMenuFullScreen,
  VerticalMenuFullScreenProps,
} from ".";
import Box from "../box";
import Pill from "../pill";

export default {
  title: "VerticalMenu/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    "aria-label": {
      control: {
        type: "text",
      },
    },
    "aria-labelledby": {
      control: {
        type: "text",
      },
    },
    width: {
      control: {
        type: "text",
      },
    },
    height: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default: ComponentStory<typeof VerticalMenu> = ({ ...args }) => {
  return (
    <Box height="100vh">
      <VerticalMenu {...args}>
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

Default.storyName = "default";

export const VerticalMenuItemCustom: ComponentStory<
  typeof VerticalMenuItem
> = ({ ...args }) => {
  return (
    <Box height="100vh">
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
          {...args}
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

export const VerticalMenuItemCustomHref: ComponentStory<
  typeof VerticalMenuItem
> = ({ ...args }) => {
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
            {...args}
          />
          <VerticalMenuItem href="/child-item-2" title="ChildItem 2" />
        </VerticalMenuItem>
      </VerticalMenu>
    </Box>
  );
};

export const VerticalMenuTriggerCustom: ComponentStory<
  typeof VerticalMenuTrigger
> = ({ ...args }: Partial<VerticalMenuTriggerProps>) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box height="100vh">
      <VerticalMenuTrigger onClick={() => setIsMenuOpen(!isMenuOpen)} {...args}>
        Menu
      </VerticalMenuTrigger>
    </Box>
  );
};

export const VerticalMenuFullScreenCustom: ComponentStory<
  typeof VerticalMenuFullScreen
> = ({ ...args }: Partial<VerticalMenuFullScreenProps>) => {
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
          {...args}
        >
          {menuItems}
        </VerticalMenuFullScreen>
      </>
    );
  }
  return <VerticalMenu>{menuItems}</VerticalMenu>;
};
