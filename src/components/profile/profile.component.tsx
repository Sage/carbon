import React from "react";

import { MarginProps } from "styled-system";

import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

import { ProfileSize } from "./profile.config";
import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
  ProfileTextStyle,
} from "./profile.style";

function acronymize(str?: string) {
  if (!str) return "";
  const matches = str.match(/\b\w/g);
  if (!matches) return "";
  return matches.join("");
}

let useOfNoNameWarnTriggered = false;

export interface ProfileProps extends MarginProps, TagProps {
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** Custom source URL */
  src?: string;
  /** The `alt` HTML string. */
  alt?: string;
  /** Define the name to display. */
  name?: string;
  /** Define the email to use. */
  email?: string;
  /** Define read-only text to display. */
  text?: string;
  /** Define initials to display image. */
  initials?: string;
  /** Allow to setup size for the component */
  size?: ProfileSize;
  /** Use a dark background. */
  darkBackground?: boolean;
  /** The hex code of the background colour to be passed to the avatar */
  backgroundColor?: string;
  /** The hex code of the foreground colour to be passed to the avatar. Must be used in conjunction with `backgroundColor` */
  foregroundColor?: string;
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
  backgroundColor,
  foregroundColor,
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
    backgroundColor,
    foregroundColor,
    "data-role": "profile-portrait",
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
    return <ProfileAvatarStyle {...commonAvatarProps} />;
  };

  if (!useOfNoNameWarnTriggered && !name && (email || text)) {
    useOfNoNameWarnTriggered = true;
    console.warn(
      "[WARNING] The `email` or `text` prop should not be used without the `name` prop in `Profile`." +
        " Please use the `name` prop as well as `email` or `text`.",
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
              data-role="email-link"
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
