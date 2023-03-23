import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import Preview from "./preview.component";
import Button from "../button";

export const Default: ComponentStory<typeof Preview> = () => (
  <Preview loading />
);

export const WithLines: ComponentStory<typeof Preview> = () => (
  <Preview loading lines={6} />
);

export const WithChildren: ComponentStory<typeof Preview> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = () => {
    setIsLoading(!isLoading);
  };
  return (
    <>
      <Preview loading={isLoading} lines={3}>
        This the where the children are rendered
      </Preview>
      <Button mt={2} onClick={handleOnClick}>
        {isLoading ? "Click to preview children" : "Click to see loading state"}
      </Button>
    </>
  );
};

export const WithWidth: ComponentStory<typeof Preview> = () => (
  <Preview loading width="256px" />
);

export const WithHeight: ComponentStory<typeof Preview> = () => (
  <Preview loading height="256px" />
);
