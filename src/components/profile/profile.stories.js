import React from "react";
import { text, select } from "@storybook/addon-knobs";

import Profile from "./profile.component";
import { PROFILE_SIZES } from "./profile.config";

export default {
  title: "Profile/Test",
  component: Profile,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const email = text("email", "johnsmith@sage.com");
  const initials = text("initials", "JS");
  const size = select("size", PROFILE_SIZES, PROFILE_SIZES[0]);
  const name = text("name", "John Smith");
  const src = text("src", "");

  return (
    <Profile
      email={email}
      initials={initials}
      size={size}
      name={name}
      src={src}
    />
  );
};

Default.story = {
  name: "default",
};
