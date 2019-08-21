import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import { withValidation } from '../../../components/validations';
import Label from '../label';
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

const CheckboxGroup = (props) => {
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
        tabindex
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
    <StyledCheckboxGroup
      aria-labelledby={ groupLabelId }
      role='checkbox'
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      { ...tagComponent('checkboxgroup', props) }
    >
      <Label id={ groupLabelId }>
        {label}
        {icon()}
      </Label>
      {buttons}
    </StyledCheckboxGroup>
  );
};

CheckboxGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
  /** The content for the RadioGroup Label */
  label: PropTypes.string.isRequired,
  /** Text for help tooltip */
  labelHelp: PropTypes.string,
  /** Validation indicators */
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasInfo: PropTypes.bool
};

CheckboxGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export { CheckboxGroup as OriginalCheckboxGroup };

export default withValidation(CheckboxGroup);
