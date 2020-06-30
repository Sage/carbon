import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags/tags';
import CreateStyle from './create.style';
import Logger from '../../utils/logger/logger';

let deprecatedWarnTriggered = false;

const Create = (props) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate('The Create component is scheduled to be removed from Carbon. Please see https://github.com/Sage/carbon-codemod/tree/master/transforms/deprecate-create for more details and for a codemod to assist in replacing this component.');
  }

  /** Returns the props for the component. */
  const linkProps = {
    iconAlign: 'right',
    icon: 'add',
    ...props
  };

  return (
    <CreateStyle
      { ...linkProps } { ...tagComponent('create', props) }
    >
      { props.children }
    </CreateStyle>
  );
};

Create.propTypes = {
  /** Children elements */
  children: PropTypes.node,
  /** Custom className */
  className: PropTypes.string,
  /** Props for the link */
  linkProps: PropTypes.object
};

export default Create;
