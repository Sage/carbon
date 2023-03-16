import React from "react";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
} from "./profile.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { ProfileSize } from "./profile.config";

function acronymize(str: string) {
  if (!str) return "";
  const matches = str.match(/\b\w/g);
  if (!matches) return "";
  return matches.join("");
}

export interface ProfileProps {
  /** [Legacy] A custom class name for the component */
  className?: string;
  /** Custom source URL */
  src?: string;
  /** Define the name to display. */
  name: string;
  /** Define the email to use (will check Gravatar for image). */
  email: string;
  /** Define initials to display if there is no Gravatar image. */
  initials?: string;
  /** Allow to setup size for the component */
  size?: ProfileSize;
}

export const Profile = ({
  src,
  className,
  initials,
  name,
  size,
  email,
  ...props
}: ProfileProps) => {
  const getInitials = () => {
    if (initials) return initials;
    return acronymize(name);
  };

  const avatar = () => {
    if (src) {
      return (
        <ProfileAvatarStyle
          src={src}
          alt={getInitials()}
          initials={getInitials()}
          size={size}
          shape="circle"
          data-element="user-image"
        />
      );
    }
    return (
      <ProfileAvatarStyle
        initials={getInitials()}
        gravatar={email}
        size={size}
      />
    );
  };

  const text = () => {
    return (
      <ProfileDetailsStyle size={size} hasSrc={!!src}>
        <ProfileNameStyle size={size} data-element="name">
          {name}
        </ProfileNameStyle>
        <ProfileEmailStyle size={size} data-element="email">
          {email}
        </ProfileEmailStyle>
      </ProfileDetailsStyle>
    );
  };

  return (
    <ProfileStyle
      className={className}
      hasSrc={!!src}
      {...tagComponent("profile", props)}
      {...filterStyledSystemMarginProps(props)}
    >
      {avatar()}
      {text()}
    </ProfileStyle>
  );
};

export default Profile;
