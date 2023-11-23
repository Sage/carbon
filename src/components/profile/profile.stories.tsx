import React from "react";
import { ComponentStory } from "@storybook/react";

import useMediaQuery from "../../hooks/useMediaQuery";

import Profile from ".";
import Box from "../box";

export const Default: ComponentStory<typeof Profile> = () => (
  <Profile
    email="email@email.com"
    initials="JD"
    name="John Doe"
    text="+33 657 22 34 71"
  />
);

export const DarkBackground: ComponentStory<typeof Profile> = () => (
  <Box
    p={2}
    backgroundColor="black"
    width="190px"
    height="50px"
    borderRadius="borderRadius200"
  >
    <Profile
      darkBackground
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
  </Box>
);

export const Src: ComponentStory<typeof Profile> = () => (
  <Profile
    email="email@email.com"
    initials="JD"
    name="John Doe"
    text="+33 657 22 34 71"
    src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
  />
);

export const Sizes: ComponentStory<typeof Profile> = () => {
  return (
    <>
      {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
        <Profile
          email="email@email.com"
          initials="JD"
          name="John Doe"
          text="+33 657 22 34 71"
          size={size}
          key={size}
        />
      ))}
    </>
  );
};

export const Responsive: ComponentStory<typeof Profile> = () => {
  const largeScreen = useMediaQuery("(min-width: 1260px)");
  const mediumScreen = useMediaQuery("(min-width: 960px)");
  const smallScreen = useMediaQuery("(max-width: 600px)");
  const setCorrectScreenSize = () => {
    if (largeScreen) {
      return "XL";
    }
    if (mediumScreen) {
      return "ML";
    }
    if (smallScreen) {
      return "S";
    }
    return "M";
  };
  return (
    <Box>
      <Profile
        email="email@email.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
        size={setCorrectScreenSize()}
      />
    </Box>
  );
};
Responsive.parameters = {
  chromatic: {
    viewports: [1300, 900],
  },
};
