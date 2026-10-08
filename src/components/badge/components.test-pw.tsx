import React from "react";
import Badge, { BadgeProps } from "./badge.component";
import Box from "../box";
import Button from "../button";

const translucentBlackBackground: React.CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  margin: "var(--global-space-layout-2-xs)",
};

export const BadgeComponent = (props: Partial<BadgeProps>) => {
  return (
    <Box m={2}>
      <Badge {...props} />
    </Box>
  );
};

export const BadgeOnDarkBackground = (props: Partial<BadgeProps>) => {
  return (
    <div style={translucentBlackBackground}>
      <Badge {...props} />
    </div>
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
