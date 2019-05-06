import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags/tags';
import Link from '../link';
import CreateStyle from './create.style';
// import './create.scss';

class Create extends React.Component {
  static propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.node,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * Props for the link
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
      <CreateStyle
        { ...this.linkProps() } { ...tagComponent('create', this.props) }
      >
        { this.props.children }
      </CreateStyle>
    );
  }
}

export default Create;
