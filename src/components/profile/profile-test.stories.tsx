import React from "react";
import Profile, { ProfileProps } from "./profile.component";
import { PROFILE_SIZES } from "./profile.config";

export default {
  title: "Profile/Test",
  includeStories: "DefaultStory",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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

export const ProfileComponentTest = ({ ...props }) => {
  return (
    <Profile email="email@email.com" initials="JD" name="John Doe" {...props} />
  );
};
