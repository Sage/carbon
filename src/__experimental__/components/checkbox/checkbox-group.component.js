import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import { withValidation } from '../../../components/validations';
import FormField from '../form-field';

const CheckboxGroup = (props) => {
  const {
    children,
    name,
    hasError,
    hasWarning,
    hasInfo,
    onChange,
    value
  } = props;

  const groupLabelId = `${name}-label`;
  const [checkedValue, setCheckedValue] = useState([]);

  const onChangeProp = useCallback((e) => {
    onChange(e);
    if (value !== checkedValue) {
      setCheckedValue(value);
    }
  }, [onChange, value, setCheckedValue]);

  const buttons = React.Children.map(children, (child) => {
    let checked;

    checked = (value.indexOf(child.props.value) !== -1);

    let childProps = {
      name,
      onChange: onChangeProp,
      checked
    };

    if (!child.props.checked) {
      childProps = {
        ...childProps,
        hasError,
        hasWarning,
        hasInfo
      };
    }

    return React.cloneElement(child, childProps);
  });

  return (
    <StyledCheckboxGroup
      aria-labelledby={ groupLabelId }
      role='checkbox'
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      { ...tagComponent('checkboxgroup', props) }
    >
      <FormField { ...props }>
        {buttons}
      </FormField>
    </StyledCheckboxGroup>
  );
};

CheckboxGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.array
};

CheckboxGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(CheckboxGroup, { unblockValidation: true });
