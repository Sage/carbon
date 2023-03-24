import React from "react";
import { ComponentStory } from "@storybook/react";

import useMediaQuery from "../../hooks/useMediaQuery";

import Profile from ".";

export const Default: ComponentStory<typeof Profile> = () => (
  <Profile email="email@email.com" initials="JD" name="John Doe" />
);

export const Src: ComponentStory<typeof Profile> = () => (
  <Profile
    email="email@email.com"
    initials="JD"
    name="John Doe"
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
    <div>
      <Profile
        email="email@email.com"
        initials="JD"
        name="John Doe"
        size={setCorrectScreenSize()}
      />
    </div>
  );
};
Responsive.parameters = {
  chromatic: {
    viewports: [1300, 900],
  },
};
