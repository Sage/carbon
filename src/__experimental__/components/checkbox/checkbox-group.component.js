import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import { withValidation } from '../../../components/validations';
import FormField from '../form-field';

const CheckboxGroup = (props) => {
  const {
    id,
    children,
    hasError,
    hasWarning,
    hasInfo,
    onChange,
    onBlur,
    value,
    defaultValue
  } = props;

  const defaultChecked = (defaultValue !== undefined) ? defaultValue : [];
  const checkboxGroupValue = (value !== undefined) ? value : defaultChecked;
  const groupLabelId = `${id}-label`;
  const [checkedValue, setCheckedValue] = useState(checkboxGroupValue);

  const onChangeProp = useCallback((e) => {
    const checkedCheckboxes = [...checkedValue];
    const checkedIndex = checkedCheckboxes.indexOf(e.target.value);

    if (checkedIndex === -1) {
      checkedCheckboxes.push(e.target.value);
    } else {
      checkedCheckboxes.splice(checkedIndex, 1);
    }

    setCheckedValue(checkedCheckboxes);

    e.target = {
      id,
      value: checkedCheckboxes
    };

    onChange(e);
  }, [onChange, checkedValue]);

  const buttons = React.Children.map(children, (child) => {
    const checked = (checkedValue.indexOf(child.props.value) !== -1);

    let childProps = {
      name: child.props.name,
      onChange: onChangeProp,
      onBlur,
      checked
    };

    if (!checked) {
      childProps = {
        ...childProps,
        hasError,
        hasWarning,
        hasInfo
      };
    }

    return React.cloneElement(child, childProps);
  });

  const { name, ...rest } = { ...props };

  return (
    <StyledCheckboxGroup
      aria-labelledby={ groupLabelId }
      role='checkbox'
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      value={ checkedValue }
      { ...tagComponent('checkboxgroup', props) }
    >
      <FormField { ...rest }>
        {buttons}
      </FormField>
    </StyledCheckboxGroup>
  );
};

CheckboxGroup.propTypes = {
  id: PropTypes.string,
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool,
  onChange: PropTypes.func,
  /** Callback fired when each RadioButton is blurred */
  onBlur: PropTypes.func,
  value: PropTypes.array,
  defaultValue: PropTypes.array
};

CheckboxGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(CheckboxGroup, { unblockValidation: true });
