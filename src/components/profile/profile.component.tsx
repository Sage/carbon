import React from "react";

import { MarginProps } from "styled-system";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
  ProfileTextStyle,
} from "./profile.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { ProfileSize } from "./profile.config";

function acronymize(str?: string) {
  if (!str) return "";
  const matches = str.match(/\b\w/g);
  if (!matches) return "";
  return matches.join("");
}

let useOfNoNameWarnTriggered = false;

export interface ProfileProps extends MarginProps {
  /** [Legacy] A custom class name for the component */
  className?: string;
  /** Custom source URL */
  src?: string;
  /** The `alt` HTML string. */
  alt?: string;
  /** Define the name to display. */
  name?: string;
  /** Define the email to use (will check Gravatar for image). */
  email?: string;
  /** Define read-only text to display. */
  text?: string;
  /** Define initials to display if there is no Gravatar image. */
  initials?: string;
  /** Allow to setup size for the component */
  size?: ProfileSize;
  /** Use a dark background. */
  darkBackground?: boolean;
}

export const Profile = ({
  src,
  alt,
  className,
  initials,
  name,
  size,
  email,
  text,
  darkBackground,
  ...props
}: ProfileProps) => {
  const getInitials = () => {
    if (initials) return initials;
    return acronymize(name).slice(0, 3).toUpperCase();
  };

  const commonAvatarProps = {
    darkBackground,
    alt,
    name,
    initials: getInitials(),
    size,
  };

  const avatar = () => {
    if (src) {
      return (
        <ProfileAvatarStyle
          src={src}
          data-element="user-image"
          {...commonAvatarProps}
        />
      );
    }
    return <ProfileAvatarStyle gravatar={email} {...commonAvatarProps} />;
  };

  if (!useOfNoNameWarnTriggered && !name && (email || text)) {
    useOfNoNameWarnTriggered = true;
    console.warn(
      "[WARNING] The `email` or `text` prop should not be used without the `name` prop in `Profile`." +
        " Please use the `name` prop as well as `email` or `text`."
    );
  }

  const children = () => {
    if (name)
      return (
        <ProfileDetailsStyle size={size} hasSrc={!!src} data-element="details">
          <ProfileNameStyle size={size} data-element="name">
            {name}
          </ProfileNameStyle>
          {email && (
            <ProfileEmailStyle
              href={`mailto: ${email}`}
              size={size}
              darkBackground={darkBackground}
              data-element="email"
            >
              {email}
            </ProfileEmailStyle>
          )}
          {text && (
            <ProfileTextStyle size={size} data-element="text">
              {text}
            </ProfileTextStyle>
          )}
        </ProfileDetailsStyle>
      );
    return null;
  };

  return (
    <ProfileStyle
      className={className}
      hasSrc={!!src}
      darkBackground={darkBackground}
      {...tagComponent("profile", props)}
      {...filterStyledSystemMarginProps(props)}
    >
      {avatar()}
      {children()}
    </ProfileStyle>
  );
};

export default Profile;
