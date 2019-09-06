import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import LabelStyle from './label.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import { getValidationType } from '../../../components/validations/with-validation.hoc';

const validationsPresent = ({ hasError, hasWarning, hasInfo }) => hasError || hasWarning || hasInfo;

const Label = (props) => {
  const {
    children,
    help,
    helpIcon,
    helpId,
    helpTag,
    helpTabIndex,
    tooltipMessage,
    useValidationIcon
  } = props;

  const icon = () => {
    if (useValidationIcon && validationsPresent(props) && tooltipMessage) {
      return (
        <ValidationIcon
          iconId={ helpId }
          type={ getValidationType(props) }
          tooltipMessage={ tooltipMessage }
        />
      );
    }

    return help && (
      <Help
        helpId={ helpId }
        tagTypeOverride={ helpTag }
        tabIndexOverride={ helpTabIndex }
        type={ helpIcon }
      >
        {help}
      </Help>
    );
  };

  return (
    <LabelStyle
      data-element='label'
      { ...props }
    >
      {children}
      {icon()}
    </LabelStyle>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  help: PropTypes.string,
  helpIcon: PropTypes.string,
  helpId: PropTypes.string,
  helpTag: PropTypes.string,
  helpTabIndex: PropTypes.string,
  tooltipMessage: PropTypes.string,
  useValidationIcon: PropTypes.bool
};

Label.defaultProps = {
  useValidationIcon: false
};

export default Label;
