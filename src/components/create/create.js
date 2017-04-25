import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from './../link';

class Create extends React.Component {
  static propTypes = {
    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Props for the link
     *
     * @property linkProps
     * @type {Object}
     */
    linkProps: PropTypes.object
  };

  constructor(...args) {
    super(...args);
    this.linkProps = this.linkProps.bind(this);
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <Link { ...this.linkProps() }>
        { this.props.children }
      </Link>
    );
  }

  /**
   * Returns the props for the component.
   *
   * @method linkProps
   * @return {Object}
   */
  linkProps() {
    const className = this.props.className;
    let { ...props } = this.props;

    props.className = classNames(
      'carbon-create', className
    );

    props.iconAlign = 'right';
    props.icon = 'add';
    return props;
  }
}

export default Create;
