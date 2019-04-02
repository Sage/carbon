import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portrait from '../portrait';
import { acronymize } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './profile.scss';

class Profile extends React.Component {
  static propTypes = {
    /**
     * A custom class name for the component.
     */
    className: PropTypes.string,

    /**
     * Define the name to display.
     */
    name: PropTypes.string.isRequired,

    /**
     * Define the email to use (will check Gravatar for image).
     */
    email: PropTypes.string.isRequired,

    /**
     * Define initials to display if there is no Gravatar image.
     */
    initials: PropTypes.string,

    /**
     * Enable a larger theme for the name.
     */
    large: PropTypes.bool
  };

  static defaultProps = {
    large: false
  };

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      'carbon-profile',
      this.props.className, {
        'carbon-profile--large': this.props.large
      }
    );
  }

  /**
   * Returns the initials for the name.
   *
   * @method initials
   * @return {String}
   */
  get initials() {
    if (this.props.initials) { return this.props.initials; }
    return acronymize(this.props.name);
  }

  /**
   * Returns the avatar portion of the profile.
   *
   * @method avatar
   * @return {Object} JSX
   */
  get avatar() {
    return (
      <Portrait
        initials={ this.initials }
        gravatar={ this.props.email }
        className='carbon-profile__avatar'
        size='medium-small'
      />
    );
  }

  /**
   * Returns the text portion of the profile.
   *
   * @method text
   * @return {Object} JSX
   */
  get text() {
    return (
      <div className='carbon-profile__details'>
        <span className='carbon-profile__name' data-element='name'>
          { this.props.name }
        </span><br />
        <span className='carbon-profile__email' data-element='email'>
          { this.props.email }
        </span>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className={ this.classes } { ...tagComponent('profile', this.props) }>
        { this.avatar }
        { this.text }
      </div>
    );
  }
}

export default Profile;
