import React from 'react';
import classNames from 'classnames';
import Portrait from './../portrait';
import Content from './../content';

class PortraitContainer extends React.Component {

  /**
   * @method mainClasses
   * @return {Object}
   */
  get mainClasses() {
    return classNames(
      this.props.className,
      'ui-portrait-container'
    );
  }

  /**
   * @method getInitials
   * @return {String}
   */
  get getInitials() {
    if (this.props.containerInitials) {
      return this.props.containerInitials.toUpperCase();
    }
    let names = this.props.containerTitle.split(' ');
    let initials = names[0].substring(0, 1);

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1);
    }
    return initials.toUpperCase();
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        <Portrait
          initials={ this.getInitials }
          { ...this.props }
          />
        <Content title={ this.props.containerTitle }>
          <span>{ this.props.containerSubtitle }</span>
        </Content>
      </div>
    );
  }

}

export default PortraitContainer;
