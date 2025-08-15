import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { allModes } from "../../../../.storybook/modes";
import isChromatic from "../../../../.storybook/isChromatic";

import {
  ResponsiveVerticalMenu,
  ResponsiveVerticalMenuDivider,
  ResponsiveVerticalMenuItem,
  ResponsiveVerticalMenuProvider,
} from ".";
import Box from "../../box";
import Icon from "../../icon";
import GlobalHeader from "../../global-header";

const defaultOpenState = isChromatic();

const meta: Meta<typeof ResponsiveVerticalMenu> = {
  title: "Vertical Menu/Responsive",
  component: ResponsiveVerticalMenu,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    modes: {
      desktop: allModes.chromatic,
    },
  },
  decorators: [
    (Story, { viewMode }) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
            <Story />
          </Box>
        ) : (
          <Box {...(viewMode !== "docs" && { height: "100vh" })}>
            <Story />
          </Box>
        )}
      </>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ResponsiveVerticalMenu>;

export const Default: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu height="100%">
            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu"
              label="Primary Menu With Children"
            >
              <ResponsiveVerticalMenuItem
                id="secondary-menu"
                label="Secondary Menu With Children"
              >
                <ResponsiveVerticalMenuItem
                  id="tertiary-menu"
                  label="Tertiary Menu"
                />
              </ResponsiveVerticalMenuItem>
              <ResponsiveVerticalMenuItem
                id="secondary-menu-no-children"
                label="Secondary Menu Item"
              />
            </ResponsiveVerticalMenuItem>
            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu-no-children"
              label="Primary Menu Item"
            />
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
Default.storyName = "Default";

export const WithDivider: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu height="100%">
            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu-item-1"
              label="Primary Menu Item 1"
            />

            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu-item-2"
              label="Primary Menu Item 2"
            />
            <ResponsiveVerticalMenuDivider />
            <ResponsiveVerticalMenuItem
              icon="business"
              id="primary-menu-with-children"
              label="Primary Menu With Children"
            >
              <ResponsiveVerticalMenuItem
                id="secondary-menu-item-1"
                label="Secondary Menu Item 1"
              />
              <ResponsiveVerticalMenuDivider />
              <ResponsiveVerticalMenuItem
                id="secondary-menu-item-2"
                label="Secondary Menu Item 2"
              />
            </ResponsiveVerticalMenuItem>
            <ResponsiveVerticalMenuDivider m={4} />

            <ResponsiveVerticalMenuItem
              icon="business"
              id="primary-menu-item-3"
              label="Primary Menu Item 3"
            />
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
WithDivider.storyName = "With Divider";

export const CustomHeight: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu height="500px">
            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu"
              label="Primary Menu With Children"
            >
              <ResponsiveVerticalMenuItem
                id="secondary-menu"
                label="Secondary Menu With Children"
              >
                <ResponsiveVerticalMenuItem
                  id="tertiary-menu"
                  label="Tertiary Menu"
                />
              </ResponsiveVerticalMenuItem>
            </ResponsiveVerticalMenuItem>
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
CustomHeight.storyName = "Custom Height";

export const CustomWidth: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu width="200px">
            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu"
              label="Primary Menu"
              py={1}
            >
              <ResponsiveVerticalMenuItem
                id="secondary-menu"
                label="Secondary Menu"
                py={1}
              >
                <ResponsiveVerticalMenuItem
                  id="tertiary-menu"
                  label="Tertiary Menu"
                  py={1}
                />
              </ResponsiveVerticalMenuItem>
            </ResponsiveVerticalMenuItem>
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
CustomWidth.storyName = "Custom Width";

export const Responsive: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu responsiveBreakpoint={900}>
            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu"
              label="Primary Menu With Children"
            >
              <ResponsiveVerticalMenuItem
                id="secondary-menu"
                label="Secondary Menu With Children"
              >
                <ResponsiveVerticalMenuItem
                  id="tertiary-menu"
                  label="Tertiary Menu"
                />
              </ResponsiveVerticalMenuItem>
            </ResponsiveVerticalMenuItem>
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
Responsive.storyName = "Responsive";

export const CustomIcon: Story = () => {
  const CustomSVG = () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.7358 0H3.26418C1.46142 0 0 1.46142 0 3.26418V24.7358C0 26.5386 1.46142 28 3.26418 28H24.7358C26.5386 28 28 26.5386 28 24.7358V3.26418C28 1.46142 26.5386 0 24.7358 0Z"
        fill="black"
      />
      <path
        d="M5.92137 15.8727C6.95575 15.8727 7.79427 15.0341 7.79427 13.9997C7.79427 12.9654 6.95575 12.1268 5.92137 12.1268C4.88699 12.1268 4.04846 12.9654 4.04846 13.9997C4.04846 15.0341 4.88699 15.8727 5.92137 15.8727Z"
        fill="white"
      />
      <path
        d="M22.0786 15.8727C23.113 15.8727 23.9515 15.0341 23.9515 13.9997C23.9515 12.9654 23.113 12.1268 22.0786 12.1268C21.0442 12.1268 20.2057 12.9654 20.2057 13.9997C20.2057 15.0341 21.0442 15.8727 22.0786 15.8727Z"
        fill="white"
      />
      <path
        d="M8.2874 21.5855C9.32178 21.5855 10.1603 20.747 10.1603 19.7126C10.1603 18.6782 9.32178 17.8397 8.2874 17.8397C7.25303 17.8397 6.4145 18.6782 6.4145 19.7126C6.4145 20.747 7.25303 21.5855 8.2874 21.5855Z"
        fill="white"
      />
      <path
        d="M19.7126 10.1603C20.7469 10.1603 21.5855 9.32182 21.5855 8.28744C21.5855 7.25306 20.7469 6.41453 19.7126 6.41453C18.6782 6.41453 17.8397 7.25306 17.8397 8.28744C17.8397 9.32182 18.6782 10.1603 19.7126 10.1603Z"
        fill="white"
      />
      <path
        d="M13.9997 23.9515C15.0341 23.9515 15.8726 23.113 15.8726 22.0786C15.8726 21.0443 15.0341 20.2057 13.9997 20.2057C12.9653 20.2057 12.1268 21.0443 12.1268 22.0786C12.1268 23.113 12.9653 23.9515 13.9997 23.9515Z"
        fill="white"
      />
      <path
        d="M13.9997 7.79427C15.0341 7.79427 15.8726 6.95575 15.8726 5.92137C15.8726 4.88699 15.0341 4.04846 13.9997 4.04846C12.9653 4.04846 12.1268 4.88699 12.1268 5.92137C12.1268 6.95575 12.9653 7.79427 13.9997 7.79427Z"
        fill="white"
      />
      <path
        d="M19.7126 21.5855C20.7469 21.5855 21.5855 20.747 21.5855 19.7126C21.5855 18.6782 20.7469 17.8397 19.7126 17.8397C18.6782 17.8397 17.8397 18.6782 17.8397 19.7126C17.8397 20.747 18.6782 21.5855 19.7126 21.5855Z"
        fill="white"
      />
      <path
        d="M8.2874 10.1603C9.32178 10.1603 10.1603 9.32182 10.1603 8.28744C10.1603 7.25306 9.32178 6.41453 8.2874 6.41453C7.25303 6.41453 6.4145 7.25306 6.4145 8.28744C6.4145 9.32182 7.25303 10.1603 8.2874 10.1603Z"
        fill="white"
      />
      <path
        d="M13.9997 15.8726C15.0341 15.8726 15.8726 15.0341 15.8726 13.9997C15.8726 12.9654 15.0341 12.1268 13.9997 12.1268C12.9654 12.1268 12.1268 12.9654 12.1268 13.9997C12.1268 15.0341 12.9654 15.8726 13.9997 15.8726Z"
        fill="#00D639"
      />
    </svg>
  );

  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu responsiveBreakpoint={900}>
            <ResponsiveVerticalMenuItem
              customIcon={<CustomSVG />}
              id="primary-menu"
              label="Primary Menu With Children"
            >
              <ResponsiveVerticalMenuItem
                id="secondary-menu"
                label="Secondary Menu With Children"
              >
                <ResponsiveVerticalMenuItem
                  id="tertiary-menu"
                  label="Tertiary Menu"
                />
              </ResponsiveVerticalMenuItem>
            </ResponsiveVerticalMenuItem>
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
CustomIcon.storyName = "Custom Icon";

export const ItemWithOnClickHandler: Story = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open("https://carbon.sage.com", "_blank", "noopener noreferrer");
  };

  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu height="100%">
            <ResponsiveVerticalMenuItem
              icon="home"
              id="toggle-click-handler"
              label="Toggle Click Handler"
              onClick={handleClick}
              target="_blank"
              rel="noopener noreferrer"
            />
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
ItemWithOnClickHandler.storyName = "Item With OnClick Handler";
ItemWithOnClickHandler.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ItemWithCustomLabel: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenuProvider>
          <ResponsiveVerticalMenu height="100%">
            <ResponsiveVerticalMenuItem
              icon="home"
              id="primary-menu"
              label={
                <Box display="flex" width="100%" alignItems="center" gap={1}>
                  <span>Primary Menu Item</span>
                  <Icon type="link" />
                </Box>
              }
            />
          </ResponsiveVerticalMenu>
        </ResponsiveVerticalMenuProvider>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
ItemWithCustomLabel.storyName = "Item With Custom Label";
ItemWithCustomLabel.parameters = {
  chromatic: { disableSnapshot: true },
};
