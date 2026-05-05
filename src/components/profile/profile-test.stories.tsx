import React from "react";
import Profile, { ProfileProps } from "./profile.component";
import Box from "../box";

export default {
  title: "Profile/Test",
  component: Profile,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const DefaultStory = ({ ...args }: ProfileProps) => (
  <Profile {...args} />
);
DefaultStory.story = {
  args: {
    email: "johnsmith@sage.com",
    initials: "JS",
    size: "S",
    name: "John Smith",
    text: "Some other text about John here",
  },
};

export const WithLongText = ({ ...args }) => {
  return (
    <Box width="300px" backgroundColor="#d7d7d7">
      <Profile
        email="thisisamuchlongeremailaddresswhichexistsinordertotryandforcewrapping@email.com"
        initials="JD"
        name="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        text="+33 657 22 34 71"
        {...args}
      />
    </Box>
  );
};

export const ChromaticSnapshotsStory = () => (
  <Box display="flex" flexDirection="column" gap={3}>
    {/* Dark background */}
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

    {/* With src image */}
    <Profile
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    />

    {/* All sizes */}
    <Box display="flex" flexDirection="column" gap={2}>
      {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
        <Profile
          key={size}
          email="email@email.com"
          initials="JD"
          name="John Doe"
          text="+33 657 22 34 71"
          size={size}
        />
      ))}
    </Box>

    {/* With margin */}
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

    {/* Custom portrait background colors */}
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

    {/* Custom portrait foreground colors */}
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
  </Box>
);
ChromaticSnapshotsStory.storyName = "Chromatic Snapshots Story";
ChromaticSnapshotsStory.parameters = {
  chromatic: { disableSnapshot: false },
};
