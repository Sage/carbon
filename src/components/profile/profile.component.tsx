import React from "react";

import { MarginProps } from "styled-system";

import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Logger from "../../__internal__/utils/logger";
import type { PortraitProps } from "../portrait";

import { ProfileSize } from "./profile.config";
import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
  ProfileTextStyle,
  ProfileCustomContentStyle,
} from "./profile.style";

function acronymize(str?: string) {
  if (!str) return "";
  const matches = str.match(/\b\w/g);
  if (!matches) return "";
  return matches.join("");
}

let useOfNoNameWarnTriggered = false;
let deprecateDarkBackgroundWarnTriggered = false;
let deprecateBackgroundColorWarnTriggered = false;
let deprecateForegroundColorWarnTriggered = false;
let backgroundColorAndVariantWarnTriggered = false;
let foregroundColorAndVariantWarnTriggered = false;

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
  initials?: PortraitProps["initials"];
  /** Allow to setup size for the component */
  size?: ProfileSize;
  /**
   * Use a dark background.
   * @deprecated This prop is deprecated and will be removed in a future release.
   */
  darkBackground?: PortraitProps["darkBackground"];
  /**
   * The hex code of the background colour to be passed to the avatar
   * @deprecated This prop is deprecated and will be removed in a future release. Use `variant` instead.
   */
  backgroundColor?: PortraitProps["backgroundColor"];
  /**
   * The hex code of the foreground colour to be passed to the avatar. Must be used in conjunction with `backgroundColor`
   * @deprecated This prop is deprecated and will be removed in a future release. Use `variant` instead.
   */
  foregroundColor?: PortraitProps["foregroundColor"];
  /** Color variant to be passed to the avatar. */
  variant?: PortraitProps["variant"];
  /** Custom content rendered below the right side Profile content. */
  children?: React.ReactNode;
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
  variant,
  children,
  ...props
}: ProfileProps) => {
  const getInitials = () => {
    if (initials) return initials;
    return acronymize(name).slice(0, 3).toUpperCase();
  };

  // If variant is provided, ignore deprecated backgroundColor/foregroundColor
  const commonAvatarProps = {
    darkBackground,
    alt,
    name,
    initials: getInitials(),
    size,
    ...(variant ? { variant } : { backgroundColor, foregroundColor }),
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
    Logger.warn(
      "[WARNING] The `email` or `text` prop should not be used without the `name` prop in `Profile`." +
        " Please use the `name` prop as well as `email` or `text`.",
    );
  }

  if (darkBackground && !deprecateDarkBackgroundWarnTriggered) {
    deprecateDarkBackgroundWarnTriggered = true;
    Logger.deprecate(
      "The `darkBackground` prop in `Profile` is deprecated and will soon be removed.",
    );
  }

  if (backgroundColor && !deprecateBackgroundColorWarnTriggered) {
    deprecateBackgroundColorWarnTriggered = true;
    Logger.deprecate(
      "The `backgroundColor` prop in `Profile` is deprecated and will soon be removed. Please use `variant` instead.",
    );
  }

  if (backgroundColor && variant && !backgroundColorAndVariantWarnTriggered) {
    backgroundColorAndVariantWarnTriggered = true;
    Logger.warn(
      "Both `backgroundColor` and `variant` props are set. The `variant` prop will be used.",
    );
  }

  if (foregroundColor && !deprecateForegroundColorWarnTriggered) {
    deprecateForegroundColorWarnTriggered = true;
    Logger.deprecate(
      "The `foregroundColor` prop in `Profile` is deprecated and will soon be removed. Please use `variant` instead.",
    );
  }

  if (foregroundColor && variant && !foregroundColorAndVariantWarnTriggered) {
    foregroundColorAndVariantWarnTriggered = true;
    Logger.warn(
      "Both `foregroundColor` and `variant` props are set. The `variant` prop will be used.",
    );
  }

  const details = () => {
    if (!name && !children) return null;

    return (
      <ProfileDetailsStyle $size={size} data-element="details">
        {name && (
          <>
            <ProfileNameStyle
              $size={size}
              darkBackground={darkBackground}
              data-element="name"
            >
              {name}
            </ProfileNameStyle>
            {email && (
              <ProfileEmailStyle
                href={`mailto: ${email}`}
                $size={size}
                darkBackground={darkBackground}
                data-role="email-link"
                data-element="email"
              >
                {email}
              </ProfileEmailStyle>
            )}
            {text && (
              <ProfileTextStyle
                $size={size}
                darkBackground={darkBackground}
                data-element="text"
              >
                {text}
              </ProfileTextStyle>
            )}
          </>
        )}
        {children && (
          <ProfileCustomContentStyle
            data-role="custom-content"
            data-element="custom-content"
          >
            {children}
          </ProfileCustomContentStyle>
        )}
      </ProfileDetailsStyle>
    );
  };

  return (
    <ProfileStyle
      className={className}
      darkBackground={darkBackground}
      {...tagComponent("profile", props)}
      {...filterStyledSystemMarginProps(props)}
    >
      {avatar()}
      {details()}
    </ProfileStyle>
  );
};

export default Profile;
