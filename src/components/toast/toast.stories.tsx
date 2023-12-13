import React, { useState } from "react";
import styled from "styled-components";

import Toast from ".";
import Button from "../button";
import Icon from "../icon";
import isChromatic from "../../../.storybook/isChromatic";

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

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div id="wrapper-default">
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
    </div>
  );
};

export const Info = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div id="wrapper-variant-info">
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
    </div>
  );
};

export const Neutral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div id="wrapper-variant-neutral">
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
    </div>
  );
};

export const Error = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div id="wrapper-variant-error">
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
    </div>
  );
};

export const Warning = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div id="wrapper-variant-warning">
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
    </div>
  );
};

export const Notice = () => {
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
    <div id="wrapper-alternative">
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
    </div>
  );
};

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div id="wrapper-notification">
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
    </div>
  );
};

export const LeftAligned = () => {
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
    <div id="wrapper-left-aligned">
      <StyledButton
        id="button-left-aligned"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-left-aligned"
        open={isOpen}
        onDismiss={onDismissClick}
        isCenter={false}
      >
        My text
      </Toast>
    </div>
  );
};

export const AlignedLeft = () => {
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
    <div id="wrapper-left-aligned">
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
        isCenter={false}
      >
        My text
      </Toast>
    </div>
  );
};

export const AlignedCenter = () => {
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
    <div id="wrapper-center-aligned">
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
        isCenter={false}
      >
        My text
      </Toast>
    </div>
  );
};

export const AlignedRight = () => {
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
    <div id="wrapper-right-aligned">
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
        isCenter={false}
      >
        My text
      </Toast>
    </div>
  );
};

export const AlignedYTop = () => {
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
    <div id="wrapper-top-alignedY">
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
    </div>
  );
};

export const AlignedYCenter = () => {
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
    <div id="wrapper-center-alignedY">
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
    </div>
  );
};

export const AlignedYBottom = () => {
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
    <div id="wrapper-bottom-alignedY">
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
    </div>
  );
};

export const CustomMaxWidth = () => {
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
    <div id="wrapper-custom-width">
      <StyledButton
        id="button-custom-width"
        key="button"
        onClick={handleToggle}
        isOpen
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-custom-width"
        open={isOpen}
        onDismiss={onDismissClick}
        isCenter
        maxWidth="550px"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        cupiditate doloremque earum, excepturi ipsum libero provident sint?
        Animi aperiam atque consectetur error, facilis minima perferendis
        perspiciatis quas quo, soluta voluptatibus?
      </Toast>
    </div>
  );
};

export const Dismissible = () => {
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
    <div id="wrapper-dismissible">
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
        isCenter
      >
        My text
      </Toast>
    </div>
  );
};

export const DismissibleWithTimeout = () => {
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
    <div id="wrapper-dismissible">
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
        isCenter
        timeout={2000}
      >
        My text
      </Toast>
    </div>
  );
};

export const DismissibleWithoutAutoFocus = () => {
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
    <div id="wrapper-dismissible">
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
        isCenter
        disableAutoFocus
      >
        My text
      </Toast>
    </div>
  );
};

export const StackedDelayed = () => {
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
    <div id="wrapper-stacked-delayed">
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
        isCenter
        targetPortalId="stacked-delay"
      >
        My toast A
      </Toast>
      <Toast
        id="toast-stacked-delayed-b"
        variant="error"
        open={isOpenB}
        onDismiss={onDismissClickB}
        isCenter
        targetPortalId="stacked-delay"
      >
        My toast B
      </Toast>
    </div>
  );
};

export const Stacked = () => {
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
    <div id="wrapper-stacked">
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
        isCenter
        targetPortalId="stacked"
      >
        My Toast A
      </Toast>
      <Toast
        id="toast-stacked-b"
        variant="warning"
        open={isOpenB}
        onDismiss={onDismissClickB}
        isCenter
        targetPortalId="stacked"
      >
        My Toast B
      </Toast>
    </div>
  );
};
