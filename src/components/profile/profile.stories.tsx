import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import useMediaQuery from "../../hooks/useMediaQuery";

import Box from "../box";
import Button from "../button/__next__";
import Profile, { ProfileProps } from ".";

const blackBackground: React.CSSProperties = {
  borderRadius: "var(--global-radius-container-l)",
  padding: "var(--global-space-layout-2-xs)",
  width: "190px",
  height: "50px",
  display: "flex",
  backgroundColor: "rgb(0, 0, 0)",
};

const customContentCard: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  width: "200px",
  minHeight: "88px",
  padding: "var(--global-space-layout-3-xs)",
  boxShadow:
    "0 3px 3px 0 rgba(0, 20, 30, 0.2), 0 2px 4px 0 rgba(0, 20, 30, 0.15)",
};

type ProfileVariant = NonNullable<ProfileProps["variant"]>;

const PROFILE_VARIANTS: ProfileVariant[] = [
  "black",
  "blue",
  "teal",
  "green",
  "lime",
  "orange",
  "red",
  "pink",
  "purple",
  "slate",
  "gray",
];

const meta: Meta<typeof Profile> = {
  title: "Profile",
  component: Profile,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
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

export const Variant: Story = () => {
  return (
    <Box display="flex" gap={2} flexDirection="column">
      {PROFILE_VARIANTS.map((variant) => (
        <Profile
          key={variant}
          email="email@email.com"
          initials="JD"
          name="John Doe"
          text="+33 657 22 34 71"
          variant={variant}
        />
      ))}
    </Box>
  );
};
Variant.storyName = "Variant";

export const DarkBackground: Story = () => {
  return (
    <div style={blackBackground}>
      <Profile
        darkBackground
        email="email@email.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
      />
    </div>
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

export const WithMargin: Story = () => (
  <Box display="flex" alignItems="baseline">
    <Profile
      m={2}
      size="XS"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
    <Profile
      m={3}
      size="S"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
    <Profile
      m="50px"
      size="XL"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
  </Box>
);
WithMargin.storyName = "With Margin";

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

export const WithCustomContent: Story = () => {
  return (
    <div style={customContentCard}>
      <Profile
        initials="JD"
        name="John Doe"
        text="Fusion Designer"
        variant="purple"
      >
        <Button
          mt={1}
          size="xs"
          variantType="secondary"
          iconType="view"
          iconPosition="before"
        >
          View profile
        </Button>
      </Profile>
    </div>
  );
};
WithCustomContent.storyName = "With Custom Content";

export const WithCustomPortraitBackgroundColor: Story = () => {
  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Profile
        email="john@thefamilydoe.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
        backgroundColor="#FF0000"
      />
      <Profile
        email="jane@thefamilydoe.com"
        initials="JD"
        name="Jane Doe"
        text="+33 657 22 34 72"
        backgroundColor="#0000FF"
      />
    </Box>
  );
};
WithCustomPortraitBackgroundColor.storyName =
  "With Custom Portrait Background Color";

export const WithCustomPortraitForegroundColor: Story = () => {
  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Profile
        email="john@thefamilydoe.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
        backgroundColor="#AA00FF"
        foregroundColor="#FFFF99"
      />
      <Profile
        email="jane@thefamilydoe.com"
        initials="JD"
        name="Jane Doe"
        text="+33 657 22 34 72"
        backgroundColor="#0000FF"
        foregroundColor="#FFBB00"
      />
    </Box>
  );
};
WithCustomPortraitForegroundColor.storyName =
  "With Custom Portrait Foreground Color";
