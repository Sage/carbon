import React from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import "@testing-library/jest-dom";

import SplitButton from ".";
import Button from "../button";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof SplitButton>;

export default {
    title: "Split Button/Interactions",
    component: SplitButton,
    parameters: {
        themeProvider: { chromatic: { theme: "sage" } },
    },
};

const SplitButtonTypes = () => (
    <Box display="flex" flexDirection="column" gap="24px">
        {/* Primary SplitButton */}
        <SplitButton buttonType="primary" text="Primary Action">
            <Button data-role="target">Save</Button>
            <Button buttonType="primary" destructive>Delete</Button>
            <Button disabled>Disabled Option</Button>
            <Button iconType="download">Download</Button>
        </SplitButton>

        {/* Secondary SplitButton */}
        <SplitButton buttonType="secondary" text="Secondary Action">
            <Button buttonType="secondary">Edit</Button>
            <Button data-role="target" buttonType="secondary" destructive>Remove</Button>
            <Button buttonType="secondary" disabled>Unavailable</Button>
            <Button buttonType="secondary" iconType="settings">Configure</Button>
        </SplitButton>

        {/* White variant */}
        <Box p={3} backgroundColor="#000" width="fit-content">
            <SplitButton buttonType="secondary" isWhite text="White Variant">
                <Button buttonType="secondary">Edit</Button>
                <Button data-role="target" buttonType="secondary" destructive>Remove</Button>
                <Button buttonType="secondary" disabled>Unavailable</Button>
                <Button buttonType="secondary" iconType="settings">Configure</Button>
            </SplitButton>
        </Box>

        {/* Additional buttonType variations */}
        <SplitButton buttonType="secondary" text="Tertiary & Gradient Types">
            <Button data-role="target" buttonType="tertiary">Tertiary Button</Button>
            <Button buttonType="gradient-grey">Grey Gradient</Button>
            <Button buttonType="gradient-white">White Gradient</Button>
        </SplitButton>

        {/* Advanced child options */}
        <SplitButton buttonType="primary" text="Advanced Options">
            <Button href="https://example.com" target="_blank">Visit Site</Button>
            <Button noWrap>VeryLongUnwrappableLabelText</Button>
            <Button iconType="info" aria-label="Info" />
            <Button iconType="add" iconPosition="after">Add Item</Button>
        </SplitButton>
    </Box>
);

const SplitButtonSizes = () => (
    <Box display="flex" flexDirection="column" gap="24px">
        <SplitButton size="small" text="Small Actions">
            <Button data-role="target" size="small">Quick Save</Button>
            <Button size="small" destructive>Quick Delete</Button>
            <Button size="small" disabled>Disabled</Button>
            <Button size="small" iconType="add">Add Item</Button>
        </SplitButton>
        <SplitButton size="medium" text="Medium Actions">
            <Button size="medium">Save Document</Button>
            <Button data-role="target" size="medium" destructive>Delete Document</Button>
            <Button size="medium" disabled>Unavailable</Button>
            <Button size="medium" iconType="print">Print Document</Button>
        </SplitButton>
        <SplitButton size="large" text="Large Actions" subtext="with subtext">
            <Button size="large">Save Project</Button>
            <Button size="large" destructive>Delete Project</Button>
            <Button data-role="target" size="large" disabled>Locked Action</Button>
            <Button size="large" iconType="share">Share Project</Button>
        </SplitButton>
    </Box>
);

const SplitButtonPositions = () => (
    <Box display="flex" justifyContent="space-between" width="100%" px="100px">
        <Box>
            <SplitButton position="left" align="left" text="Left Position">
                <Button data-role="target">Align Left</Button>
                <Button iconType="arrow_left">Move Left</Button>
                <Button disabled>Disabled Left</Button>
                <Button destructive>Delete Left</Button>
            </SplitButton>
        </Box>
        <Box>
            <SplitButton position="right" align="right" text="Right Position">
                <Button>Align Right</Button>
                <Button data-role="target" iconType="arrow_right">Move Right</Button>
                <Button disabled>Disabled Right</Button>
                <Button destructive>Delete Right</Button>
            </SplitButton>
        </Box>
    </Box>
);

const SplitButtonWithAllIcons = () => (
    <SplitButton text="Actions with Icons" iconType="settings">
        <Button data-role="target" iconType="save">Save Document</Button>
        <Button iconType="download" iconPosition="after">Download File</Button>
        <Button iconType="email" disabled>Send Email</Button>
        <Button iconType="delete" destructive>Delete Item</Button>
        <Button iconType="edit">Edit Content</Button>
        <Button iconType="print" buttonType="secondary">Print Report</Button>
    </SplitButton>
);

const SplitButtonChildFocusStates = () => (
    <SplitButton text="Focus Test Actions">
        <Button data-role="focus-target">Focus This Button</Button>
        <Button>Regular Button</Button>
        <Button data-role="focus-disabled" disabled>Disabled Button</Button>
        <Button destructive>Destructive Button</Button>
        <Button iconType="settings">Button with Icon</Button>
    </SplitButton>
);

export const AllButtonVariations: Story = {
    render: () => <SplitButtonTypes />,
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) return;

        const canvas = within(canvasElement);
        const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

        if (toggleButtons[0]) {
            await userEvent.click(toggleButtons[0]);
            await userInteractionPause(1000);

            const targetButton = canvas.getByText("Save");
            await userEvent.hover(targetButton);
            targetButton.focus();
            await userInteractionPause(800);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[1]) {
            await userEvent.click(toggleButtons[1]);
            await userInteractionPause(1000);

            const destructiveButton = canvas.getByText("Remove");
            destructiveButton.focus();
            await userInteractionPause(800);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[2]) {
            await userEvent.click(toggleButtons[2]);
            await userInteractionPause(1000);

            const whiteVariantButton = canvas.getAllByText("Remove")[1];
            if (whiteVariantButton) {
                whiteVariantButton.focus();
                await userInteractionPause(800);
            }

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[3]) {
            await userEvent.click(toggleButtons[3]);
            await userInteractionPause(1000);

            const tertiaryButton = canvas.getByText("Tertiary Button");
            tertiaryButton.focus();
            await userInteractionPause(600);

            const greyGradientButton = canvas.getByText("Grey Gradient");
            await userEvent.hover(greyGradientButton);
            await userInteractionPause(600);

            const whiteGradientButton = canvas.getByText("White Gradient");
            whiteGradientButton.focus();
            await userInteractionPause(600);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[4]) {
            await userEvent.click(toggleButtons[4]);
            await userInteractionPause(1000);

            const linkButton = canvas.getByText("Visit Site");
            linkButton.focus();
            await userInteractionPause(600);

            const noWrapButton = canvas.getByText(/VeryLongUnwrappableLabelText/);
            noWrapButton.focus();
            await userInteractionPause(600);

            const iconOnlyButton = canvas.getByLabelText("Info");
            await userEvent.hover(iconOnlyButton);
            await userInteractionPause(600);

            const toggleButton = toggleButtons[4];
            expect(toggleButton).toHaveAttribute("aria-expanded", "true");
            expect(toggleButton).toHaveAttribute("aria-controls");

            expect(iconOnlyButton).toHaveAccessibleName("Info");
            expect(iconOnlyButton).toHaveAttribute("aria-label", "Info");
            expect(iconOnlyButton).toHaveAttribute("role", "button");

            const allButtons = canvas.getAllByRole("button");
            expect(allButtons.length).toBeGreaterThan(0);

            await userEvent.tab();
            expect(document.activeElement).toHaveAttribute("data-element", "main-button");

            await userEvent.tab();
            expect(document.activeElement).toHaveAttribute("data-element", "toggle-button");

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
            expect(document.activeElement).toHaveAttribute("data-element", "toggle-button");
        }

    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};

AllButtonVariations.storyName = "All Button Variations";
AllButtonVariations.parameters = {
    pseudo: {
        hover: "[data-role='target'], [aria-label='Info']",
        focus: "[data-role='target'], [aria-label='Info']",
    },
};


export const AllSizeVariations: Story = {
    render: () => <SplitButtonSizes />,
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const canvas = within(canvasElement);
        const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

        if (toggleButtons[0]) {
            await userEvent.click(toggleButtons[0]);
            await userInteractionPause(1000);

            const smallTargetButton = canvas.getByText("Quick Save");
            smallTargetButton.focus();
            await userInteractionPause(600);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[1]) {
            await userEvent.click(toggleButtons[1]);
            await userInteractionPause(1000);

            const mediumDestructiveButton = canvas.getByText("Delete Document");
            mediumDestructiveButton.focus();
            await userInteractionPause(600);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[2]) {
            await userEvent.click(toggleButtons[2]);
            await userInteractionPause(1000);

            const disabledButton = canvas.getByText("Locked Action");
            await userEvent.hover(disabledButton);
            await userInteractionPause(800);
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
AllSizeVariations.storyName = "All Size Variations";
AllSizeVariations.parameters = {
    pseudo: {
        hover: "[data-role='target']",
        focus: "[data-role='target']",
    },
};

export const PopoverPositions: Story = {
    render: () => <SplitButtonPositions />,
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const canvas = within(canvasElement);
        const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

        if (toggleButtons[0]) {
            await userEvent.click(toggleButtons[0]);
            await userInteractionPause(1000);

            const leftTargetButton = canvas.getByText("Align Left");
            leftTargetButton.focus();
            await userInteractionPause(600);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[1]) {
            await userEvent.click(toggleButtons[1]);
            await userInteractionPause(1000);

            const rightTargetButton = canvas.getByText("Move Right");
            rightTargetButton.focus();
            await userInteractionPause(800);
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
PopoverPositions.storyName = "Popover Positions";
PopoverPositions.parameters = {
    pseudo: {
        hover: "[data-role='target']",
    },
};

export const ButtonsWithIcons: Story = {
    render: () => <SplitButtonWithAllIcons />,
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const canvas = within(canvasElement);
        const toggleButton = canvas.getByTestId(/toggle-button/i);

        await userEvent.click(toggleButton);
        await userInteractionPause(1000);

        const iconTargetButton = canvas.getByText("Save Document");
        iconTargetButton.focus();
        await userInteractionPause(600);

        await userEvent.keyboard("{ArrowDown}");
        await userInteractionPause(400);
        await userEvent.keyboard("{ArrowDown}");
        await userInteractionPause(400);

        const destructiveIconButton = canvas.getByText("Delete Item");
        await userEvent.hover(destructiveIconButton);
        await userInteractionPause(600);
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
ButtonsWithIcons.storyName = "Buttons with Icons";
ButtonsWithIcons.parameters = {
    pseudo: {
        hover: "[data-role='target']",
        focus: "[data-role='target']",
    },
};

export const ChildButtonFocusStates: Story = {
    render: () => <SplitButtonChildFocusStates />,
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const canvas = within(canvasElement);
        const toggleButton = canvas.getByTestId(/toggle-button/i);

        await userEvent.click(toggleButton);
        await userInteractionPause(1000);

        const focusTargetButton = canvas.getByText("Focus This Button");
        focusTargetButton.focus();
        await userInteractionPause(600);

        await userEvent.keyboard("{ArrowDown}");
        await userInteractionPause(400);

        await userEvent.keyboard("{ArrowDown}");
        await userInteractionPause(400);

        await userEvent.keyboard("{ArrowDown}");
        await userInteractionPause(400);

        await userEvent.keyboard("{ArrowDown}");
        await userInteractionPause(600);

        const disabledButton = canvas.getByText("Disabled Button");
        await userEvent.hover(disabledButton);
        await userInteractionPause(600);
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
ChildButtonFocusStates.storyName = "Child Button Focus States";
ChildButtonFocusStates.parameters = {
    pseudo: {
        hover: "[data-role='focus-disabled']",
        focus: "[data-role='focus-target']",
    },
};

export const ButtonConnectionStates: Story = {
    render: () => (
        <Box display="flex" flexDirection="column" gap="32px">
            <Box display="flex" gap="24px">
                <SplitButton buttonType="primary" text="Primary Connection">
                    <Button data-role="target">Option 1</Button>
                    <Button>Option 2</Button>
                </SplitButton>
                <SplitButton buttonType="secondary" text="Secondary Connection">
                    <Button>Option 1</Button>
                    <Button data-role="target">Option 2</Button>
                </SplitButton>
            </Box>
            <Box display="flex" gap="24px">
                <SplitButton size="small" text="Small Connection">
                    <Button size="small" data-role="target">Option 1</Button>
                </SplitButton>
                <SplitButton size="large" text="Large Connection">
                    <Button size="large">Option 1</Button>
                </SplitButton>
            </Box>
        </Box>
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const canvas = within(canvasElement);
        const mainButtons = canvas.getAllByTestId(/main-button/i);
        const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

        if (mainButtons[0]) {
            mainButtons[0].focus();
            await userInteractionPause(800);
        }

        if (toggleButtons[0]) {
            toggleButtons[0].focus();
            await userInteractionPause(800);
        }

        if (mainButtons[1]) {
            mainButtons[1].focus();
            await userInteractionPause(800);
        }

        if (toggleButtons[1]) {
            toggleButtons[1].focus();
            await userInteractionPause(800);
        }

        if (mainButtons[2]) {
            mainButtons[2].focus();
            await userInteractionPause(600);
        }

        if (mainButtons[3]) {
            mainButtons[3].focus();
            await userInteractionPause(600);
        }

        if (toggleButtons[0]) {
            await userEvent.click(toggleButtons[0]);
            await userInteractionPause(500);

            mainButtons[0].focus();
            await userInteractionPause(800);

            toggleButtons[0].focus();
            await userInteractionPause(800);
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
ButtonConnectionStates.storyName = "Button Connection States";
ButtonConnectionStates.parameters = {
    pseudo: {
        hover: "[data-element='main-button']",
        focus: "[data-element='main-button'], [data-element='toggle-button']",
    },
};

export const ToggleButtonStates: Story = {
    render: () => (
        <Box display="flex" flexDirection="column" gap="32px">
            <Box display="flex" gap="24px">
                <SplitButton buttonType="primary" text="Primary Closed">
                    <Button>Option 1</Button>
                    <Button data-role="target">Option 2</Button>
                </SplitButton>
                <SplitButton buttonType="secondary" text="Secondary Closed">
                    <Button>Option 1</Button>
                    <Button data-role="target">Option 2</Button>
                </SplitButton>
            </Box>
            <Box p={3} backgroundColor="#000" width="fit-content">
                <SplitButton buttonType="secondary" isWhite text="White Closed">
                    <Button buttonType="secondary">Option 1</Button>
                    <Button buttonType="secondary" data-role="target">Option 2</Button>
                </SplitButton>
            </Box>
        </Box>
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const canvas = within(canvasElement);
        const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

        if (toggleButtons[0]) {
            toggleButtons[0].focus();
            await userInteractionPause(800);
        }

        if (toggleButtons[1]) {
            toggleButtons[1].focus();
            await userInteractionPause(800);
        }

        if (toggleButtons[2]) {
            toggleButtons[2].focus();
            await userInteractionPause(800);
        }

        if (toggleButtons[0]) {
            await userEvent.click(toggleButtons[0]);
            await userInteractionPause(1000);

            toggleButtons[0].focus();
            await userInteractionPause(800);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[1]) {
            await userEvent.click(toggleButtons[1]);
            await userInteractionPause(1000);

            toggleButtons[1].focus();
            await userInteractionPause(800);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[2]) {
            await userEvent.click(toggleButtons[2]);
            await userInteractionPause(1000);

            toggleButtons[2].focus();
            await userInteractionPause(800);
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
ToggleButtonStates.storyName = "Toggle Button States";
ToggleButtonStates.parameters = {
    pseudo: {
        hover: "[data-element='toggle-button']",
        focus: "[data-element='toggle-button']",
    },
};
export const ComprehensiveStates: Story = {
    render: () => (
        <Box display="flex" flexDirection="column" gap="40px">
            <Box>
                <SplitButton buttonType="primary" size="large" text="Primary Large">
                    <Button data-role="target">Save Changes</Button>
                    <Button destructive>Discard Changes</Button>
                    <Button disabled>Locked Option</Button>
                    <Button iconType="download">Export Data</Button>
                </SplitButton>
            </Box>
            <Box display="flex" justifyContent="center">
                <SplitButton buttonType="secondary" position="left" text="Secondary Left">
                    <Button buttonType="secondary">Edit Item</Button>
                    <Button data-role="target" buttonType="secondary" iconType="copy">Duplicate Item</Button>
                    <Button buttonType="secondary" disabled>Unavailable</Button>
                    <Button buttonType="secondary" destructive>Delete Item</Button>
                </SplitButton>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <SplitButton size="small" position="right" text="Small Right">
                    <Button size="small" iconType="settings">Settings</Button>
                    <Button size="small" disabled>Disabled</Button>
                    <Button data-role="target" size="small" destructive>Remove</Button>
                </SplitButton>
            </Box>
        </Box>
    ),
    play: async ({ canvasElement }) => {
        if (!allowInteractions()) {
            return;
        }

        const canvas = within(canvasElement);
        const toggleButtons = canvas.getAllByTestId(/toggle-button/i);

        if (toggleButtons[0]) {
            await userEvent.click(toggleButtons[0]);
            await userInteractionPause(1000);

            const primaryTarget = canvas.getByText("Save Changes");
            primaryTarget.focus();
            await userInteractionPause(600);

            await userEvent.keyboard("{ArrowDown}");
            await userInteractionPause(400);

            await userEvent.keyboard("{ArrowDown}");
            await userInteractionPause(400);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[1]) {
            await userEvent.click(toggleButtons[1]);
            await userInteractionPause(1000);

            const secondaryTarget = canvas.getByText("Duplicate Item");
            secondaryTarget.focus();
            await userInteractionPause(600);

            await userEvent.keyboard("{Escape}");
            await userInteractionPause(300);
        }

        if (toggleButtons[2]) {
            await userEvent.click(toggleButtons[2]);
            await userInteractionPause(1000);

            await userEvent.keyboard("{ArrowDown}");
            await userInteractionPause(300);
            await userEvent.keyboard("{ArrowDown}");
            await userInteractionPause(600);
        }
    },
    decorators: [
        (StoryToRender) => (
            <DefaultDecorator>
                <StoryToRender />
            </DefaultDecorator>
        ),
    ],
};
ComprehensiveStates.storyName = "Comprehensive States";
ComprehensiveStates.parameters = {
    pseudo: {
        hover: "[data-role='target']",
        focus: "[data-role='target']",
    },
};