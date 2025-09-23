import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

import isChromatic from "../../../.storybook/isChromatic";

import Box from "../box";
import Button from "../button";
import Icon from "../icon";
import Toast from ".";

const meta: Meta<typeof Toast> = {
  title: "Deprecated/Toast",
  component: Toast,
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const defaultOpenState = isChromatic();

const StyledButton = styled(Button)<{ isOpen: boolean }>`
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ isOpen }) => (isOpen ? "green" : "blue")};
  border: ${({ isOpen }) => (isOpen ? "2px solid green" : "2px solid blue")};
`;

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-default">
      <StyledButton
        id="button-default"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast id="toast-default" variant="success" open={isOpen}>
        My message
      </Toast>
    </Box>
  );
};
Default.storyName = "Default";

export const Info: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-info">
      <StyledButton
        id="button-variant-info"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="info" id="toast-variant-info" open={isOpen}>
        My Info
      </Toast>
    </Box>
  );
};
Info.storyName = "Info";

export const Neutral: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-neutral">
      <StyledButton
        id="button-variant-neutral"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="neutral" id="toast-variant-neutral" open={isOpen}>
        My Neutral Toast
      </Toast>
    </Box>
  );
};
Neutral.storyName = "Neutral";

export const Error: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-error">
      <StyledButton
        id="button-variant-error"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="error" id="toast-variant-error" open={isOpen}>
        My Info
      </Toast>
    </Box>
  );
};
Error.storyName = "Error";

export const Warning: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-warning">
      <StyledButton
        id="button-variant-warning"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="warning" id="toast-variant-warning" open={isOpen}>
        My Info
      </Toast>
    </Box>
  );
};
Warning.storyName = "Warning";

export const Notice: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-alternative">
      <StyledButton
        id="button-alternative"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        id="toast-alternative"
        open={isOpen}
        onDismiss={onDismissClick}
        variant="notice"
      >
        <Icon type="warning" color="--colorsSemanticNeutralYang100" /> My Info
      </Toast>
    </Box>
  );
};
Notice.storyName = "Notice";

export const Notification: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-notification">
      <StyledButton
        id="button-notification"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast id="toast-notification" variant="notification" open={isOpen}>
        My message
      </Toast>
    </Box>
  );
};
Notification.storyName = "Notification";

export const AlignedLeft: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-left-aligned">
      <StyledButton
        id="button-left-aligned"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        align="left"
        variant="warning"
        id="toast-left-aligned"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
};
AlignedLeft.storyName = "Aligned Left";

export const AlignedCenter: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-center-aligned">
      <StyledButton
        id="button-center-aligned"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        align="center"
        variant="warning"
        id="toast-center-aligned"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
};
AlignedCenter.storyName = "Aligned Center";

export const AlignedRight: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-right-aligned">
      <StyledButton
        id="button-right-aligned"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        align="right"
        variant="warning"
        id="toast-right-aligned"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
};
AlignedRight.storyName = "Aligned Right";

export const AlignedYTop: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-top-alignedY">
      <StyledButton
        id="button-top-alignedY"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        alignY="top"
        variant="warning"
        id="toast-top-alignedY"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
};
AlignedYTop.storyName = "Aligned Y Top";

export const AlignedYCenter: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-center-alignedY">
      <StyledButton
        id="button-center-alignedY"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        alignY="center"
        variant="warning"
        id="toast-center-alignedY"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
};
AlignedYCenter.storyName = "Aligned Y Center";

export const AlignedYBottom: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-bottom-alignedY">
      <StyledButton
        id="button-bottom-alignedY"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        alignY="bottom"
        variant="warning"
        id="toast-bottom-alignedY"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
};
AlignedYBottom.storyName = "Aligned Y Bottom";

export const CustomMaxWidth: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-custom-width">
      <StyledButton
        id="button-custom-width"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-custom-width"
        open={isOpen}
        onDismiss={onDismissClick}
        maxWidth="550px"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        cupiditate doloremque earum, excepturi ipsum libero provident sint?
        Animi aperiam atque consectetur error, facilis minima perferendis
        perspiciatis quas quo, soluta voluptatibus?
      </Toast>
    </Box>
  );
};
CustomMaxWidth.storyName = "Custom Max Width";

export const Dismissible: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-dismissible">
      <StyledButton
        id="button-toast-dismissible"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
};
Dismissible.storyName = "Dismissible";

export const DismissibleWithTimeout: Story = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-dismissible">
      <StyledButton
        id="button-toast-dismissible"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
        timeout={2000}
      >
        My text
      </Toast>
    </Box>
  );
};
DismissibleWithTimeout.storyName = "Dismissible with timeout";

export const DismissibleWithoutAutoFocus: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-dismissible">
      <StyledButton
        id="button-toast-dismissible"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
        disableAutoFocus
      >
        My text
      </Toast>
    </Box>
  );
};
DismissibleWithoutAutoFocus.storyName = "Dismissible without autoFocus";

export const StackedDelayed: Story = () => {
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onDismissClickA = () => {
    setIsOpenA(!isOpenA);
  };
  const onDismissClickB = () => {
    setIsOpenB(!isOpenB);
  };

  const handleToggle = () => {
    if (!isOpenA) {
      window.scrollTo(0, 0);
    }
    if (!isOpenA && !isOpenB) {
      setIsOpenA(true);
      setButtonDisabled(true);
      setTimeout(() => {
        setIsOpenB(true);
        setButtonDisabled(false);
      }, 1000);
    } else {
      setButtonDisabled(true);
      setIsOpenA(false);
      setTimeout(() => {
        setIsOpenB(false);
        setButtonDisabled(false);
      }, 1000);
    }
  };

  return (
    <Box id="wrapper-stacked-delayed">
      <StyledButton
        id="button-stacked-delayed"
        key="button"
        onClick={handleToggle}
        disabled={buttonDisabled}
        isOpen={isOpenA || isOpenB}
      >
        Toggle - Preview is: {isOpenA || isOpenB ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        id="toast-stacked-delayed-a"
        variant="warning"
        open={isOpenA}
        onDismiss={onDismissClickA}
        targetPortalId="stacked-delay"
      >
        My toast A
      </Toast>
      <Toast
        id="toast-stacked-delayed-b"
        variant="error"
        open={isOpenB}
        onDismiss={onDismissClickB}
        targetPortalId="stacked-delay"
      >
        My toast B
      </Toast>
    </Box>
  );
};
StackedDelayed.storyName = "Stacked Delayed";

export const Stacked: Story = () => {
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const onDismissClickA = () => {
    setIsOpenA(!isOpenA);
  };
  const onDismissClickB = () => {
    setIsOpenB(!isOpenB);
  };

  const handleToggle = () => {
    if (!isOpenA) {
      window.scrollTo(0, 0);
    }
    if (!isOpenA && !isOpenB) {
      setIsOpenA(true);
      setIsOpenB(true);
    } else {
      setIsOpenA(false);
      setIsOpenB(false);
    }
  };

  return (
    <Box id="wrapper-stacked">
      <StyledButton
        id="button-stacked"
        key="button"
        onClick={handleToggle}
        isOpen={isOpenA || isOpenB}
      >
        Toggle - Preview is: {isOpenA || isOpenB ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        id="toast-stacked-a"
        variant="success"
        open={isOpenA}
        onDismiss={onDismissClickA}
        targetPortalId="stacked"
      >
        My Toast A
      </Toast>
      <Toast
        id="toast-stacked-b"
        variant="warning"
        open={isOpenB}
        onDismiss={onDismissClickB}
        targetPortalId="stacked"
      >
        My Toast B
      </Toast>
    </Box>
  );
};
Stacked.storyName = "Stacked";
