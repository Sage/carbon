import React from "react";
import Badge, { BadgeProps } from "./badge.component";
import Box from "../box";
import Button from "../button";

export const BadgeComponent = (props: Partial<BadgeProps>) => {
  return (
    <Box m={2}>
      <Badge {...props} />
    </Box>
  );
};

export const BadgeOnDarkBackground = (props: Partial<BadgeProps>) => {
  return (
    <Box m={2} backgroundColor="--colorsUtilityYin090">
      <Badge {...props} />
    </Box>
  );
};

export const BadgeWithChildren = (props: Partial<BadgeProps>) => {
  return (
    <Box m={2}>
      <Badge id="badge" {...props}>
        <Button mr={0} buttonType="secondary" aria-describedby="badge">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
