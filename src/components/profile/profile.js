import React from 'react';
import Portrait from './../portrait';
import classNames from 'classnames';
import { acronymize } from './../../utils/ether';

/**
 * Renders a user profile, with avatar.
 */
class Profile extends React.Component {
  static propTypes = {
    /**
     * The user's name.
     *
     * @property name
     * @type {String}
     */
    name: React.PropTypes.string.isRequired,

    /**
     * The user's email.
     *
     * @property email
     * @type {String}
     */
    email: React.PropTypes.string.isRequired,

    /**
     * The user's initials.
     *
     * @property initials
     * @type {String}
     */
    initials: React.PropTypes.string,

    /**
     * Outputs a large name version.
     *
     * @property large
     * @type {Boolean}
     */
    large: React.PropTypes.bool
  }


  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "ui-profile",
      this.props.className, {
        ["ui-profile--large"]: this.props.large
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
        className="ui-profile__avatar"
        size="medium-small"
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
      <div className="ui-profile__details">
        <span className="ui-profile__name">
          { this.props.name }
        </span><br />
        <span className="ui-profile__email">
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
      <div className={ this.classes }>
        { this.avatar }
        { this.text }
      </div>
    );
  }
}

export default Profile;
