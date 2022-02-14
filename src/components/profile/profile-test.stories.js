/* eslint-disable react/prop-types */
import React from "react";

import specialCharacters, {
  email as testEmail,
} from "../../../.storybook/utils/argTypes/specialCharacters";
import Profile from "./profile.component";
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
    emailSpecialCharacters: {
      options: [...specialCharacters.options, ...testEmail.options],
      mapping: {
        ...specialCharacters.mapping,
        ...testEmail.mapping,
      },
    },
    nameSpecialCharacters: specialCharacters,
  },
};

export const DefaultStory = ({
  email,
  emailSpecialCharacters,
  name,
  nameSpecialCharacters,
  ...args
}) => (
  <Profile
    email={email || emailSpecialCharacters}
    name={name || nameSpecialCharacters}
    {...args}
  />
);

DefaultStory.story = {
  name: "default",
  args: {
    email: "johnsmith@sage.com",
    initials: "JS",
    size: PROFILE_SIZES[0],
    name: "John Smith",
    src: "",
    emailSpecialCharacters: undefined,
    nameSpecialCharacters: undefined,
  },
};
