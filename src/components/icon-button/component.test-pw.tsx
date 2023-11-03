import React from "react";
import IconButton, { IconButtonProps } from ".";
import Icon from "../icon";

const IconButtonComponent = (props: Partial<IconButtonProps>) => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}} {...props}>
      <Icon type="home" />
    </IconButton>
  );
};

export default IconButtonComponent;
