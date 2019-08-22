import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import Label from '../label';
import { StyledRadioButtonGroup } from './radio-button.style';
import withValidation from '../../../components/validations/with-validation.hoc';
import ValidationIconStyle from '../../../components/validations/validation-icon.style';
import Icon from '../../../components/icon';

function initialTabIndex(childIndex) {
  return (childIndex > 0) ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const getValidationType = ({ hasError, hasWarning, hasInfo }) => {
  let type = 'help';

  if (hasError) {
    type = 'error';
  } else if (hasWarning) {
    type = 'warning';
  } else if (hasInfo) {
    type = 'info';
  }

  return type;
};

const getValidationMessage = (type, props) => {
  const {
    labelHelp,
    errorMessage,
    warningMessage,
    infoMessage
  } = props;

  switch (type) {
    case 'error':
      return errorMessage;
    case 'warning':
      return warningMessage;
    case 'info':
      return infoMessage;
    default:
      return labelHelp;
  }
};

const RadioButtonGroup = (props) => {
  const {
    children,
    groupName,
    label,
    hasError,
    hasWarning,
    hasInfo
  } = props;
  const [selectedValue, setSelectedValue] = useState(null);

  const groupLabelId = `${groupName}-label`;

  const buttons = React.Children.map(children, (child, index) => {
    const checked = selectedValue === child.props.value;
    const tabindex = selectedValue ? checkedTabIndex(checked) : initialTabIndex(index);

    const handleChange = (ev) => {
      child.props.onChange(ev);
      setSelectedValue(ev.target.value);
    };

    return React.cloneElement(
      child,
      {
        checked,
        inputName: groupName,
        onChange: handleChange,
        tabindex,
        hasError,
        hasWarning,
        hasInfo
      }
    );
  });

  const icon = () => {
    const type = getValidationType(props);
    const message = getValidationMessage(type, props);

    return (
      <ValidationIconStyle type={ type }>
        <Icon
          type={ type }
          tooltipMessage={ message }
        />
      </ValidationIconStyle>
    );
  };

  return (
    <StyledRadioButtonGroup
      aria-labelledby={ groupLabelId }
      role='radiogroup'
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      { ...tagComponent('radiogroup', props) }
    >
      <Label id={ groupLabelId }>
        {label}
        {icon()}
      </Label>
      {buttons}
    </StyledRadioButtonGroup>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
  /** The content for the RadioGroup Label */
  label: PropTypes.string.isRequired,
  /** Validation indicators */
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasInfo: PropTypes.bool
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export { RadioButtonGroup as OriginalRadioButtonGroup };

export default withValidation(RadioButtonGroup);
