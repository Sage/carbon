import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { tagComponent } from '../../utils/helpers/tags';
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

  constructor(args) {
    super(args);
    this.linkProps = this.linkProps.bind(this);
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <Link { ...this.linkProps() } { ...tagComponent('create', this.props) }>
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
