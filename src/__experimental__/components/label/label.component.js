import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import LabelStyle from './label.style';

const Label = ({
  children,
  help,
  helpIcon,
  helpId,
  helpTag,
  helpTabIndex,
  ...props
}) => (
  <LabelStyle
    data-element='label'
    { ...props }
  >
    {children}
    {help && (
      <Help
        helpId={ helpId }
        tagTypeOverride={ helpTag }
        tabIndexOverride={ helpTabIndex }
        type={ helpIcon }
      >
        {help}
      </Help>)}
  </LabelStyle>
);

Label.propTypes = {
  children: PropTypes.node,
  help: PropTypes.string,
  helpIcon: PropTypes.string,
  helpId: PropTypes.string,
  helpTag: PropTypes.string,
  helpTabIndex: PropTypes.string
};

export default Label;
