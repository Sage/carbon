import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { acronymize } from '../../utils/ether/ether';
import tagComponent from '../../utils/helpers/tags/tags';
import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle
} from './profile.style';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

class Profile extends React.Component {
  /** Determines whether a `src` prop has been supplied */
  get hasSrc() {
    return Boolean(this.props.src);
  }

  /** Returns the classes for the component. */
  get classes() {
    return classNames(this.props.className);
  }

  /** Returns the initials for the name. */
  get initials() {
    if (this.props.initials) return this.props.initials;
    return acronymize(this.props.name);
  }

  /** Returns the avatar portion of the profile. */
  get avatar() {
    if (this.hasSrc) {
      return (
        <ProfileAvatarStyle
          src={ this.props.src }
          alt={ this.initials }
          initials={ this.initials }
          size={ isClassic(this.props.theme) ? 'medium-small' : this.props.size }
          shape='square'
          data-element='user-image'
        />
      );
    }
    return (
      <ProfileAvatarStyle
        initials={ this.initials }
        gravatar={ this.props.email }
        size={ isClassic(this.props.theme) ? 'medium-small' : this.props.size }
      />
    );
  }

  /** Returns the text portion of the profile. */
  get text() {
    return (
      <ProfileDetailsStyle size={ this.props.size } hasSrc={ this.hasSrc }>
        <ProfileNameStyle size={ this.props.size } data-element='name'>
          { this.props.name }
        </ProfileNameStyle>
        <ProfileEmailStyle size={ this.props.size } data-element='email'>
          { this.props.email }
        </ProfileEmailStyle>
      </ProfileDetailsStyle>
    );
  }

  render() {
    return (
      <ProfileStyle
        large={ this.props.large } className={ this.classes }
        hasSrc={ this.hasSrc }
        { ...tagComponent('profile', this.props) }
      >
        { this.avatar }
        { this.text }
      </ProfileStyle>
    );
  }
}

Profile.propTypes = {
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
  /** [Legacy] Enable a larger theme for the name. */
  large: PropTypes.bool,
  /** Allow to setup size for the component */
  size: PropTypes.string,
  /** theme to detect which component should be rendered */
  theme: PropTypes.object
};

Profile.defaultProps = {
  large: false,
  theme: baseTheme
};

export { Profile as OriginalProfile };
export default withTheme(Profile);
