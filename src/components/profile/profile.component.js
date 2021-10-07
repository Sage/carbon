import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
} from "./profile.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

function acronymize(str) {
  if (!str) return "";
  const matches = str.match(/\b\w/g);
  if (!matches) return "";
  return matches.join("");
}

const Profile = ({ src, className, initials, name, size, email, ...props }) => {
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
          shape="square"
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

Profile.propTypes = {
  ...marginPropTypes,
  /** [Legacy] A custom class name for the component */
  className: PropTypes.string,
  /** Custom source URL */
  src: PropTypes.string,
  /** Define the name to display. */
  name: PropTypes.string.isRequired,
  /** Define the email to use (will check Gravatar for image). */
  email: PropTypes.string.isRequired,
  /** Define initials to display if there is no Gravatar image. */
  initials: PropTypes.string,
  /** Allow to setup size for the component */
  size: PropTypes.oneOf(["XS", "S", "M", "ML", "L", "XL", "XXL"]),
};

export default Profile;
