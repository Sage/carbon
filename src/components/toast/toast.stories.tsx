import React, { useState } from "react";

import Toast from ".";
import Switch from "../switch";
import Icon from "../icon";
import isChromatic from "../../../.storybook/isChromatic";

const defaultOpenState = isChromatic();

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast variant="success" open={isOpen}>
        My message
      </Toast>
    </>
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast variant="info" open={isOpen}>
        My message
      </Toast>
    </>
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast variant="error" open={isOpen}>
        My message
      </Toast>
    </>
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast variant="warning" open={isOpen}>
        My message
      </Toast>
    </>
  );
};

export const Notice = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => {
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast
        id="toast-alternative"
        open={isOpen}
        onDismiss={handleDismiss}
        variant="notice"
      >
        <Icon type="warning" color="--colorsSemanticNeutralYang100" /> My Info
      </Toast>
    </>
  );
};

export const LeftAligned = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast
        variant="warning"
        id="toast-left-aligned"
        open={isOpen}
        onDismiss={handleDismiss}
        isCenter={false}
      >
        My text
      </Toast>
    </>
  );
};

export const CustomMaxWidth = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast
        variant="warning"
        id="toast-custom-width"
        open={isOpen}
        onDismiss={handleDismiss}
        isCenter
        maxWidth="550px"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        cupiditate doloremque earum, excepturi ipsum libero provident sint?
        Animi aperiam atque consectetur error, facilis minima perferendis
        perspiciatis quas quo, soluta voluptatibus?
      </Toast>
    </>
  );
};

export const Dismissible = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => {
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={handleDismiss}
        isCenter
      >
        My text
      </Toast>
    </>
  );
};

export const DismissibleWithTimeout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => {
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={handleDismiss}
        isCenter
        timeout={2000}
      >
        My text
      </Toast>
    </>
  );
};

export const DismissibleWithoutAutoFocus = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  const handleDismiss = () => {
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpen}
        onChange={() => handleToggle()}
      />
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={handleDismiss}
        isCenter
        disableAutoFocus
      >
        My text
      </Toast>
    </>
  );
};

export const StackedDelayed = () => {
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const [switchDisabled, setSwitchDisabled] = useState(false);

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
      setSwitchDisabled(true);
      setTimeout(() => {
        setIsOpenB(true);
        setSwitchDisabled(false);
      }, 1000);
    } else {
      setSwitchDisabled(true);
      setIsOpenA(false);
      setTimeout(() => {
        setIsOpenB(false);
        setSwitchDisabled(false);
      }, 1000);
    }
  };

  return (
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        disabled={switchDisabled}
        checked={isOpenA || isOpenB}
        onChange={() => handleToggle()}
      />
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
    </>
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
    <>
      <Switch
        label="Toggle toast visibility"
        name="toggle-toast-visibility"
        checked={isOpenA || isOpenB}
        onChange={() => handleToggle()}
      />
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
    </>
  );
};
