import React from 'react';
import ClassNames from 'classnames';

/**
 * An Icon widget.
 *
 * == How to use an Icon in a component:
 *
 * In your file
 *
 *   import Icon from 'carbon/lib/components/icon';
 *
 * To render an Icon:
 *
 *   <Icon type='foo' />
 *
 * 'type' is a required prop
 *
 * This widget follows this pattern: https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 *
 * @class Icon
 * @constructor
 */
class Icon extends React.Component {

  get renderIcon() {
    switch(this.props.type) {
      case 'warning':
        return this.renderWarningIcon;
        break;
      case 'alert':
        return this.renderAlertIcon;
        break;
      default:
        return null;
        break;
    }
  }

   /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let { className, type, ...otherProps } = this.props;

    let icon = this.renderIcon;

    className = ClassNames(
      className, {
        [`icon-${type}`]: !icon
      }
    );

    return (
      <span className={ className } { ...otherProps } dangerouslySetInnerHTML={ icon }></span>
    );
  }

  /**
   * Returns the 'warning' icon
   * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
   *
   * @method renderWarningIcon
   * @return {Object} warningIcon svg
   */
  get renderWarningIcon() {
    return {
      __html:
        '<svg class="ui-icon__svg ui-icon__svg--warning" width="25px" height="20px" viewBox="0 0 50 40" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '<g class="ui-icon__svg-group" fill="#4D4F53">' +
                    '<path d="M23.4139163,5.53773397 C24.2898861,4.1361822 25.7118106,4.13889694 26.5860837,5.53773397 L43.4139163,32.462266 C44.2898861,33.8638178 43.6576906,35 41.9934988,35 L8.0065012,35 C6.34605644,35 5.71181059,33.8611031 6.58608373,32.462266 L23.4139163,5.53773397 Z M23,12 L27,12 L27,24 L23,24 L23,12 Z M25,32 C26.6568542,32 28,30.6568542 28,29 C28,27.3431458 26.6568542,26 25,26 C23.3431458,26 22,27.3431458 22,29 C22,30.6568542 23.3431458,32 25,32 Z"></path>' +
                '</g>' +
            '</g>' +
        '</svg>'
    };
  }
}

export default Icon;
