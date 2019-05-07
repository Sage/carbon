import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags/tags';
import CreateStyle from './create.style';
// import './create.scss';

class Create extends React.Component {
  constructor(args) {
    super(args);
    this.linkProps = this.linkProps.bind(this);
  }

  /** Returns the props for the component. */
  linkProps() {
    const { className, ...props } = this.props;

    props.className = classNames('carbon-create', className);

    props.iconAlign = 'right';
    props.icon = 'add';
    return props;
  }

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

Create.propTypes = {
  /** Children elements */
  children: PropTypes.node,

  /** Custom className */
  className: PropTypes.string,

  /** Props for the link */
  linkProps: PropTypes.object
};

export default Create;
