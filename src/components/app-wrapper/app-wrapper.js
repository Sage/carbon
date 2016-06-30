import React from 'react';
import classNames from 'classnames';

/**
 * Manages the width and containment of your application.
 */
class AppWrapper extends React.Component {
  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "ui-app-wrapper",
      this.props.className
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className={ this.classes }>
        { this.props.children }
      </div>
    );
  }
}

export default AppWrapper;
