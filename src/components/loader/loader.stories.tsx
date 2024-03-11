import React, { useEffect, useRef, useState } from "react";
import { ComponentStory } from "@storybook/react";

import Loader from ".";
import Button from "../button/button.component";
import Box from "../box";

export const Default: ComponentStory<typeof Loader> = () => <Loader />;

export const Variant: ComponentStory<typeof Loader> = () => (
  <Loader variant="gradient" />
);

export const Small: ComponentStory<typeof Loader> = () => (
  <Loader size="small" />
);

export const Large: ComponentStory<typeof Loader> = () => (
  <Loader size="large" />
);

export const InsideButtons: ComponentStory<typeof Loader> = () => {
  return (
    <>
      <Button buttonType="primary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="primary" destructive aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} destructive aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="tertiary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="secondary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="dashed" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Box id="dark-background" mt={2} p={2} width="fit-content" bg="#000000">
        <Button m={2} buttonType="darkBackground" aria-label="Loading">
          <Loader isInsideButton />
        </Button>
      </Box>
    </>
  );
};

export const AccessibleExample: ComponentStory<typeof Loader> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mimicLoading = () => {
    setIsLoading(true);
    buttonRef.current?.focus();
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  useEffect(() => {
    mimicLoading();
  }, []);
  const handleButtonClick = () => {
    mimicLoading();
  };
  const buttonContent = isLoading ? <Loader isInsideButton /> : "Click me";
  const ariaProps = {
    "aria-label": "Loading",
  };
  return (
    <>
      <Button
        buttonType="primary"
        {...(isLoading ? ariaProps : {})}
        onClick={handleButtonClick}
        ref={buttonRef}
      >
        {buttonContent}
      </Button>
    </>
  );
};
