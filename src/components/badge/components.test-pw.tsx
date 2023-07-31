import React from "react";
import Badge, { BadgeProps } from "./badge.component";
import Box from "../box";
import Button from "../button";

const BadgeComponent = (props: Partial<BadgeProps>) => {
  return (
    <Box margin="40px">
      <Badge {...props}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};

export default BadgeComponent;
