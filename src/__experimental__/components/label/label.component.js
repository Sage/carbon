import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import StyledLabel from './label.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import { getValidationType } from '../../../components/validations/with-validation.hoc';
import { filterByProps } from '../../../utils/ether';

const labelPropTypes = {
  labelId: PropTypes.string,
  helpId: PropTypes.string,
  children: PropTypes.node,
  help: PropTypes.string,
  helpIcon: PropTypes.string,
  helpTag: PropTypes.string,
  helpTabIndex: PropTypes.string,
  tooltipMessage: PropTypes.string,
  useValidationIcon: PropTypes.bool,
  htmlFor: PropTypes.string,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasInfo: PropTypes.bool
};

const validationsPresent = ({ hasError, hasWarning, hasInfo }) => hasError || hasWarning || hasInfo;

const Label = (props) => {
  const {
    labelId,
    helpId,
    children,
    help,
    helpIcon,
    helpTag,
    helpTabIndex,
    tooltipMessage,
    useValidationIcon,
    htmlFor
  } = props;
  const labelProps = filterByProps(props, [
    'theme',
    'disabled',
    'inline',
    'align',
    'inputSize',
    'width',
    'childOfForm',
    'optional'
  ]);

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
    <StyledLabel
      data-element='label'
      { ...labelProps }
    >
      {/* eslint jsx-a11y/label-has-for: ["error", { every: ["id"], allowChildren: true } ] */}
      <label id={ labelId } htmlFor={ htmlFor }>{children}</label>
      {/* eslint-enable jsx-a11y/label-has-for */}
      {icon()}
    </StyledLabel>
  );
};

Label.propTypes = labelPropTypes;

Label.defaultProps = {
  useValidationIcon: false
};

export default Label;
