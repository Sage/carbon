import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { acronymize } from '../../utils/ether/ether';
import tagComponent from '../../utils/helpers/tags/tags';
import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle
} from './profile.style';

class Profile extends React.Component {
  /** Returns the classes for the component. */
  get classes() {
    return classNames(
      this.props.className
    );
  }

  /** Returns the initials for the name. */
  get initials() {
    if (this.props.initials) { return this.props.initials; }
    return acronymize(this.props.name);
  }

  /** Returns the avatar portion of the profile. */
  get avatar() {
    return (
      <ProfileAvatarStyle
        initials={ this.initials }
        gravatar={ this.props.email }
        size='medium-small'
      />
    );
  }

  /** Returns the text portion of the profile. */
  get text() {
    return (
      <ProfileDetailsStyle>
        <ProfileNameStyle data-element='name'>
          { this.props.name }
        </ProfileNameStyle><br />
        <span data-element='email'>
          { this.props.email }
        </span>
      </ProfileDetailsStyle>
    );
  }

  render() {
    return (
      <ProfileStyle
        large={ this.props.large } className={ this.classes }
        { ...tagComponent('profile', this.props) }
      >
        { this.avatar }
        { this.text }
      </ProfileStyle>
    );
  }
}

Profile.propTypes = {
  /** A custom class name for the component. */
  className: PropTypes.string,
  /** Define the name to display. */
  name: PropTypes.string.isRequired,
  /** Define the email to use (will check Gravatar for image). */
  email: PropTypes.string.isRequired,
  /** Define initials to display if there is no Gravatar image. */
  initials: PropTypes.string,
  /** Enable a larger theme for the name. */
  large: PropTypes.bool
};

Profile.defaultProps = {
  large: false
};

export default Profile;
