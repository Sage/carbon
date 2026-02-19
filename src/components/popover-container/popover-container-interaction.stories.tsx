import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

import PopoverContainer from "./popover-container.component";
import Box from "../box";
import Button from "../button";
import Link from "../link";
import Divider from "../divider";
import useMediaQuery from "../../hooks/useMediaQuery";
import GlobalHeader from "../global-header";
import { Menu, MenuItem } from "../menu";
import Typography from "../typography";
import Icon from "../icon";
import IconButton from "../icon-button";

type Story = StoryObj<typeof PopoverContainer>;

export default {
  title: "Popover Container/Interactions",
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const KeyboardInteraction: Story = {
  render: () => (
    <>
      <Box height={120} display="flex">
        <PopoverContainer
          title="Default"
          position="center"
          data-role="target"
          disableAnimation
        >
          Content1
        </PopoverContainer>
      </Box>
      <Box height={120} display="flex">
        <PopoverContainer title="Offset" position="center" offset={10} open>
          Content
        </PopoverContainer>
      </Box>
      <Box height={120} display="flex">
        <PopoverContainer
          title="Border Radius"
          position="center"
          borderRadius="borderRadius000 borderRadius000 borderRadius400 borderRadius400"
          open
        >
          Content
        </PopoverContainer>
      </Box>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const popoverButton = canvas.getAllByRole("button");

    await userEvent.click(popoverButton[0]);
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.click(popoverButton[0]);
    await userEvent.keyboard("{Enter}");
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await userEvent.type(popoverButton[0], "{space}");
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.tab();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
KeyboardInteraction.storyName = "Keyboard Interactions";

export const CoverButtonFocusTrap: Story = {
  render: () => (
    <PopoverContainer
      title="Cover Button"
      position="center"
      shouldCoverButton
      disableAnimation
    >
      Content
    </PopoverContainer>
  ),
  play: async () => {
    if (!allowInteractions()) {
      return;
    }
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    await userEvent.tab();
    await expect(
      await within(document.body).findByText("Content"),
    ).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
CoverButtonFocusTrap.storyName = "Cover Button Focus";

const CreatePopoverInMenu = () => {
  const [open, setOpen] = useState(false);
  const isMid = useMediaQuery("(max-width: 1075px)");
  const isSmall = useMediaQuery("(max-width: 512px)");

  const PopoverLink = ({ text }: { text: string }) => (
    <Link href="#" variant="subtle" inverse underline="hover">
      {text}
    </Link>
  );

  return (
    <GlobalHeader>
      <Menu menuType="black" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem href="#" flex="1">
          <PopoverContainer
            containerAriaLabel="Create"
            closeButtonAriaLabel="Close Create Popover"
            position={isSmall || !isMid ? "center" : "right"}
            offset={0}
            p={0}
            borderRadius="borderRadius000 borderRadius000 borderRadius200 borderRadius200"
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            renderOpenComponent={({
              ref,
              onClick,
              "data-popover-container-button": dataPopoverContainerButton,
            }) => (
              <Button
                aria-label="Create"
                ref={ref}
                onClick={onClick}
                data-popover-container-button={dataPopoverContainerButton}
              >
                <Box alignItems="center" display="flex" px={2}>
                  <Icon type="plus" />
                  Create
                </Box>
              </Button>
            )}
            renderCloseComponent={({ ref, onClick }) => (
              <Box position="absolute" right="15px" top="15px">
                <IconButton
                  aria-label="Close Create Popover"
                  ref={ref}
                  onClick={onClick}
                >
                  <Icon color="var(--colorsActionMajorYang100)" type="close" />
                </IconButton>
              </Box>
            )}
          >
            <Box
              display="flex"
              flexDirection={!isMid ? "row" : "column"}
              gap={!isMid ? "64px" : "24px"}
              padding="24px 32px"
              borderRadius="borderRadius000 borderRadius000 borderRadius200 borderRadius200"
              backgroundColor="var(--colorsActionMajor500)"
              boxSizing="border-box"
              marginLeft="0"
              maxHeight="410px"
              overflowY="auto"
              {...(isSmall && { width: "100vw" })}
            >
              <Box
                display="flex"
                flexDirection="column"
                boxSizing="border-box"
                margin="0"
                padding="0"
              >
                <Typography variant="segment-subheader" color="white" m={0}>
                  Lorem Ipsum
                </Typography>
                <Divider type="horizontal" inverse mt={1} mb={2} />
                <Box display="flex" flexDirection="row" gap="32px">
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Lorem ipsum dolor" />
                    <PopoverLink text="Sit amet consectetur" />
                    <PopoverLink text="Adipiscing elit sed" />
                    <PopoverLink text="Do eiusmod tempor" />
                    <PopoverLink text="Incididunt ut labore" />
                    <PopoverLink text="Et dolore magna" />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Aliqua ut enim" />
                    <PopoverLink text="Ad minim veniam" />
                    <PopoverLink text="Quis nostrud exercitation" />
                    <PopoverLink text="Ullamco laboris nisi" />
                    <PopoverLink text="Ut aliquip ex" />
                    <PopoverLink text="Ea commodo consequat" />
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                boxSizing="border-box"
                margin="0"
                padding="0"
              >
                <Typography variant="segment-subheader" color="white" m={0}>
                  Dolor Sit Amet
                </Typography>
                <Divider type="horizontal" inverse mt={1} mb={2} />
                <Box display="flex" flexDirection="row" gap="32px">
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Duis aute irure" />
                    <PopoverLink text="Dolor in reprehenderit" />
                    <PopoverLink text="In voluptate velit" />
                    <PopoverLink text="Esse cillum dolore" />
                    <PopoverLink text="Eu fugiat nulla" />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Pariatur excepteur sint" />
                    <PopoverLink text="Occaecat cupidatat non" />
                    <PopoverLink text="Proident sunt in" />
                    <PopoverLink text="Culpa qui officia" />
                    <PopoverLink text="Deserunt mollit anim" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </PopoverContainer>
        </MenuItem>
      </Menu>
    </GlobalHeader>
  );
};

export const CreatePopoverInMenuStory: Story = {
  render: () => <CreatePopoverInMenu />,
  play: async ({ canvas }) => {
    if (!allowInteractions()) {
      return;
    }

    await userEvent.click(canvas.getByRole("button", { name: "Create" }));
  },
};
