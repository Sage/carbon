import React from "react";
import Profile, { ProfileProps } from ".";

export const EmptyProfileComponent = (props: Partial<ProfileProps>) => {
  return <Profile {...props} />;
};

export const ProfileComponent = (props: Partial<ProfileProps>) => {
  return (
    <Profile
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="Some text about John here"
      {...props}
    />
  );
};
