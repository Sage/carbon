import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';
import Link from '../link/link';
import './create.scss';

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
   * Returns the props for the component.
   *
   * @method linkProps
   * @return {Object}
   */
  linkProps() {
    const { className, ...props } = this.props;

    props.className = classNames('carbon-create', className);

    props.iconAlign = 'right';
    props.icon = 'add';
    return props;
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
}

export default Create;
