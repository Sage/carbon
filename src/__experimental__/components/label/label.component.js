import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import LabelStyle from './label.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import { getValidationType } from '../../../components/validations/with-validation.hoc';

const Label = ({
  children,
  help,
  helpIcon,
  helpId,
  helpTag,
  helpTabIndex,
  hasError,
  hasWarning,
  hasInfo,
  tooltipMessage,
  ...props
}) => (
  <LabelStyle
    data-element='label'
    hasError={ hasError }
    { ...props }
  >
    {children}

    {(hasError || hasWarning || hasInfo) && tooltipMessage && (
      <ValidationIcon
        type={ getValidationType({ hasError, hasWarning, hasInfo }) }
        tooltipMessage={ tooltipMessage }
      />
    )}

    {!hasError && !hasWarning && !hasInfo && help && (
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
  helpTabIndex: PropTypes.string,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasInfo: PropTypes.bool,
  tooltipMessage: PropTypes.string
};

export default Label;
