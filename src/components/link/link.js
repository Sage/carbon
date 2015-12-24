import React from 'react';

class Link extends React.Component {

  static propTypes = {
    path: React.PropTypes.string.isRequired,

    /**
     * Gives the link a disabled state.
     *
     * @property boolean
     * @type {Boolean}
     * @default false
     */
    disabled: React.PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let {className, ...props} = this.props;

    className = 'ui-link' +
      (this.props.disabled ? ' ui-link--disabled' : '') +
      (className ? ' ' + className : '');

    return (
      <div className={ className }>
        <a href={ this.props.path} >
          { this.props.children }
        </a>
      </div>
    );
  }

}

export default Link;
