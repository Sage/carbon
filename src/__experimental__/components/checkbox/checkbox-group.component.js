import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import { withValidation } from '../../../components/validations';
import { getValidationType } from '../../../components/validations/with-validation.hoc';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import FormField from '../form-field';

function initialTabIndex(childIndex) {
  return (childIndex > 0) ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const CheckboxGroup = (props) => {
  const {
    children,
    groupName,
    label,
    labelHelp,
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

  const type = getValidationType(props);
  const labelWithValidationIcon = () => {
    return (
      <React.Fragment>
        {label}
        {type !== '' && (
          <ValidationIcon
            tooltipMessage={ labelHelp }
            type={ type }
            { ...props }
          />
        )}
      </React.Fragment>
    );
  };
  const fieldProps = {
    ...props,
    label: labelWithValidationIcon(),
    labelId: groupLabelId,
    labelHelp: type === '' ? labelHelp : null
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
      <FormField { ...fieldProps }>
        {buttons}
      </FormField>
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
