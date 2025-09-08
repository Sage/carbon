import React, { useRef, useState } from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Dialog from ".";
import Button from "../button";
import Box from "../box";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";

type Story = StoryObj<typeof Dialog>;

export default {
    title: "Dialog/Interactions",
    component: Dialog,
    decorators: [
        (StoryToRender: StoryFn) => (
            <DefaultDecorator>
                <Box mt="100px">
                    <StoryToRender />
                </Box>
            </DefaultDecorator>
        ),
    ],
};

export const OpenAndCloseDialog: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        const triggerRef = useRef<HTMLButtonElement>(null);

        return (
            <>
                <Button
                    data-testid="dialog-trigger"
                    onClick={() => setOpen(true)}
                    ref={triggerRef}
                >
                    Open Dialog
                </Button>

                <Dialog
                    open={open}
                    onCancel={() => setOpen(false)}
                    title="Open and Close Dialog"
                    showCloseIcon
                    restoreFocusOnClose
                >
                    <p>Dialog Content</p>
                    <Button
                        onClick={() => setOpen(false)}
                        data-testid="close-dialog-button"
                    >
                        Close Dialog
                    </Button>
                </Dialog>
            </>
        );
    },

    play: async ({ canvasElement }) => {
        if (!allowInteractions()) return;

        const canvas = within(canvasElement);
        const openButton = canvas.getByTestId("dialog-trigger");

        await userEvent.click(openButton);
        await userInteractionPause(300);

        const dialog = canvas.getByRole("dialog");
        expect(dialog).toBeVisible();

        const closeButton = canvas.getByTestId("close-dialog-button");
        await userEvent.click(closeButton);
        await userInteractionPause(300);

        expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
        expect(openButton).toHaveFocus();
    },
};

export const FocusManagement: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const buttonRef = useRef<HTMLButtonElement>(null);

        return (
            <>
                <Button
                    ref={buttonRef}
                    onClick={() => setIsOpen(true)}
                    data-testid="open-dialog-btn"
                >
                    Open Dialog
                </Button>
                <Dialog
                    open={isOpen}
                    title="Dialog Title"
                    subtitle="Subtitle"
                    onCancel={() => setIsOpen(false)}
                    showCloseIcon
                    focusFirstElement={buttonRef}
                >
                    <Box>
                        <Button data-testid="dialog-btn-1">First Button</Button>
                        <Button data-testid="dialog-btn-2">Second Button</Button>
                    </Box>
                </Dialog>
            </>
        );
    },

    play: async ({ canvasElement }) => {
        if (!allowInteractions()) return;
        const canvas = within(canvasElement);

        const openButton = canvas.getByTestId("open-dialog-btn");
        await userEvent.click(openButton);
        await userInteractionPause(300);

        const closeButton = canvas.getByRole("button", { name: /close/i });
        await userEvent.tab();
        expect(closeButton).toHaveFocus();

        const btn1 = canvas.getByTestId("dialog-btn-1");
        await userEvent.tab();
        expect(btn1).toHaveFocus();

        const btn2 = canvas.getByTestId("dialog-btn-2");
        await userEvent.tab();
        expect(btn2).toHaveFocus();

        await userEvent.tab();
        expect(closeButton).toHaveFocus();

        await userEvent.click(closeButton);
        await userInteractionPause(300);

        expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    },
};

export const DialogRestoreFocus: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        const triggerRef = useRef<HTMLButtonElement>(null);

        return (
            <>
                <Button
                    ref={triggerRef}
                    onClick={() => setOpen(true)}
                    data-testid="trigger-button"
                >
                    Open Dialog
                </Button>

                <Dialog
                    open={open}
                    onCancel={() => setOpen(false)}
                    title="Restore Focus Dialog"
                    showCloseIcon
                    restoreFocusOnClose
                >
                    <p>This dialog will restore focus on close.</p>
                    <Button
                        data-testid="close-inside"
                        onClick={() => setOpen(false)}
                    >
                        Close Dialog
                    </Button>
                </Dialog>
            </>
        );
    },

    play: async ({ canvasElement }) => {
        if (!allowInteractions()) return;

        const canvas = within(canvasElement);
        const triggerButton = canvas.getByTestId("trigger-button");

        await userEvent.click(triggerButton);
        await userInteractionPause(300);

        const closeInsideButton = canvas.getByTestId("close-inside");

        await userEvent.tab();
        await userEvent.tab();
        expect(closeInsideButton).toHaveFocus();

        await userEvent.click(closeInsideButton);
        await userInteractionPause(300);

        expect(triggerButton).toHaveFocus();
    },
};
