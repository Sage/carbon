import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import { withValidation } from '../../../components/validations';
import Label from '../label';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import Help from '../../../components/help';

function initialTabIndex(childIndex) {
  return (childIndex > 0) ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const getValidationType = ({ hasError, hasWarning }) => {
  let type = 'info';

  if (hasError) {
    type = 'error';
  } else if (hasWarning) {
    type = 'warning';
  }

  return type;
};

const CheckboxGroup = (props) => {
  const {
    children,
    groupName,
    label,
    hasError,
    hasWarning,
    hasInfo,
    labelHelp
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

  const tooltip = () => {
    if (hasError || hasWarning || hasInfo) {
      const bool = true;
      const type = getValidationType(props);

      return (
        <ValidationIcon
          type={ type }
          size='small'
          isPartOfInput={ bool }
        />
      );
    }

    return labelHelp && <Help>{labelHelp}</Help>;
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
        {tooltip()}
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
