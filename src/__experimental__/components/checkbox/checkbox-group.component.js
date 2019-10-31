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
  const isControled = value !== undefined;
  const [checkedValues, setCheckedValues] = useState([]);
  const onChangeProp = useCallback((e) => {
    onChange(e);
    if (!isControled) {
      const checkboxIndex = checkedValues.indexOf(e.target.value);

      if (checkboxIndex !== -1) {
        checkedValues.splice(checkboxIndex, 1);
      } else {
        checkedValues.push(e.target.value);
      }

      setCheckedValues(checkedValues);
    }
  }, [onChange, setCheckedValues, isControled]);

  const buttons = React.Children.map(children, (child) => {
    let checked;

    checked = (value.indexOf(child.props.values) !== -1);

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
  value: PropTypes.string
};

CheckboxGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(CheckboxGroup, { unblockValidation: true });
