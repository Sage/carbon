import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";

import Toast from ".";
import Button from "../button";
import Icon from "../icon";
import isChromatic from "../../../.storybook/isChromatic";

const isOpenForChromatic = isChromatic();

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
    action("open")(!isOpen);
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
    action("open")(!isOpen);
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

export const Error = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
    action("open")(!isOpen);
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
    action("open")(!isOpen);
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
    action("open")(!isOpen);
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

export const LeftAligned = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpen(!isOpen);
    action("click")(ev);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
    action("open")(!isOpen);
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

export const CustomMaxWidth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpen(!isOpen);
    action("click")(ev);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
    action("open")(!isOpen);
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
  const onDismissClick = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
    action("click")(ev);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
    action("open")(!isOpen);
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

  const onDismissClick = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
    action("click")(ev);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
    action("open")(!isOpen);
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
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
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

  const onDismissClickA = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpenA(!isOpenA);
    action("click")(ev);
  };
  const onDismissClickB = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpenB(!isOpenB);
    action("click")(ev);
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
      action("open")(true);
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
  const onDismissClickA = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpenA(!isOpenA);
    action("click")(ev);
  };
  const onDismissClickB = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpenB(!isOpenB);
    action("click")(ev);
  };

  const handleToggle = () => {
    if (!isOpenA) {
      window.scrollTo(0, 0);
    }
    if (!isOpenA && !isOpenB) {
      setIsOpenA(true);
      setIsOpenB(true);
      action("open")(true);
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
