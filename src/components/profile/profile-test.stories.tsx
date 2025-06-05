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
    <Box width="320px" backgroundColor="#d7d7d7">
      <Profile
        email="email@email.com"
        initials="JD"
        name="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        text="+33 657 22 34 71"
        {...args}
      />
    </Box>
  );
};
