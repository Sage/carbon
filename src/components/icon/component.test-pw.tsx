import React from "react";
import Icon, { IconProps } from ".";

export const IconComponent = (props: Partial<IconProps>) => {
  return <Icon type="add" tooltipVisible {...props} />;
};

export const IconTooltipComponent = (props: Partial<IconProps>) => {
  return (
    <div
      style={{
        marginLeft: "300px",
        marginRight: "64px",
        marginTop: "64px",
        marginBottom: "64px",
      }}
    >
      <Icon
        type="add"
        tooltipVisible
        tooltipMessage="Hey I'm a tooltip with a different position!"
        {...props}
      />
    </div>
  );
};
