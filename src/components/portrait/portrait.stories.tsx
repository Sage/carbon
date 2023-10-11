import React from "react";
import { ComponentStory } from "@storybook/react";

import Portrait from ".";
import Box from "../box";

export const Default: ComponentStory<typeof Portrait> = () => <Portrait />;

export const Initials: ComponentStory<typeof Portrait> = () => (
  <Portrait initials="MK" />
);

export const Src: ComponentStory<typeof Portrait> = () => (
  <Portrait src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
);

export const Gravatar: ComponentStory<typeof Portrait> = () => (
  <Portrait gravatar="chris.barber@sage.com" />
);

export const IconType: ComponentStory<typeof Portrait> = () => (
  <Portrait iconType="image" />
);

export const WithTooltip: ComponentStory<typeof Portrait> = () => (
  <Box margin={8}>
    <Portrait
      tooltipMessage="Rebecca Smith"
      tooltipPosition="bottom"
      tooltipBgColor="rebeccapurple"
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    />
  </Box>
);

export const Sizes: ComponentStory<typeof Portrait> = () => {
  return (
    <Box display="flex" alignItems="baseline">
      {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
        <Portrait key={size} size={size} />
      ))}
    </Box>
  );
};

export const Shapes: ComponentStory<typeof Portrait> = () => {
  return (
    <>
      {(["circle", "square"] as const).map((shape) => (
        <Portrait key={shape} shape={shape} />
      ))}
    </>
  );
};

export const DarkBackground: ComponentStory<typeof Portrait> = () => (
  <>
    <Portrait darkBackground />
    <Portrait initials="MK" darkBackground />
  </>
);

export const WithMargin: ComponentStory<typeof Portrait> = () => (
  <Box display="flex" alignItems="baseline">
    <Portrait m={3} />
    <Portrait darkBackground m={2} />
    <Portrait shape="circle" m="25px" />
    <Portrait size="L" m="30px" />
  </Box>
);
