import React from "react";
import Portrait from "./portrait.component";

export const PortraitDefaultComponent = ({ ...props }) => {
  return <Portrait {...props} />;
};

export const PortraitComponent = ({ ...props }) => {
  return (
    <Portrait
      tooltipMessage="Rebecca Smith"
      tooltipIsVisible
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
      {...props}
    />
  );
};
