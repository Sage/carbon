import React from "react";
import Profile, { ProfileProps } from "./profile.component";
import { PROFILE_SIZES } from "./profile.config";

export default {
  title: "Profile/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: PROFILE_SIZES,
      },
    },
  },
};

export const DefaultStory = ({ email, name, ...args }: ProfileProps) => (
  <Profile email={email} name={name} {...args} />
);

DefaultStory.story = {
  name: "default",
  args: {
    email: "johnsmith@sage.com",
    initials: "JS",
    size: PROFILE_SIZES[0],
    name: "John Smith",
    src: "",
  },
};
