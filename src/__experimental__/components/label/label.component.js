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
    disableIcon
  } = props;

  const icon = () => {
    if (disableIcon) {
      return null;
    }

    if (validationsPresent(props) && tooltipMessage) {
      return (
        <ValidationIcon
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
  disableIcon: PropTypes.bool
};

export default Label;
