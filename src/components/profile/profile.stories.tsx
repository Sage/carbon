import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import useMediaQuery from "../../hooks/useMediaQuery";

import Box from "../box";
import Profile from ".";

const meta: Meta<typeof Profile> = {
  title: "Profile",
  component: Profile,
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Default: Story = () => {
  return (
    <Profile
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
  );
};
Default.storyName = "Default";

export const DarkBackground: Story = () => {
  return (
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
};
DarkBackground.storyName = "Dark Background";

export const Src: Story = () => {
  return (
    <Profile
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    />
  );
};
Src.storyName = "Src";

export const Sizes: Story = () => {
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
Sizes.storyName = "Sizes";

export const Responsive: Story = () => {
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
Responsive.storyName = "Responsive";
Responsive.parameters = {
  chromatic: {
    viewports: [1300, 900],
  },
};
