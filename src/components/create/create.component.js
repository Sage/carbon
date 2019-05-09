import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags/tags';
import CreateStyle from './create.style';

class Create extends React.Component {
  /** Returns the props for the component. */
  linkProps = () => {
    const { ...props } = this.props;

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
