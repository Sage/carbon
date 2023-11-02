import React from "react";
import Profile, { ProfileProps } from ".";

const ProfileComponent = (props: Partial<ProfileProps>) => {
  return (
    <Profile email="email@email.com" initials="JD" name="John Doe" {...props} />
  );
};

export default ProfileComponent;
