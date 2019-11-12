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
    value
  } = props;

  const checkboxGroupValue = (value !== undefined) ? value : [];
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

    const name = (id && { id });

    e.target = {
      ...(id && { id }),
      ...name,
      value: checkedCheckboxes
    };

    onChange(e);
  }, [onChange, checkedValue]);

  const buttons = React.Children.map(children, (child) => {
    const checked = (checkedValue.indexOf(child.props.value) !== -1);

    let childProps = {
      name: id,
      onChange: onChangeProp,
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
  value: PropTypes.array
};

CheckboxGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(CheckboxGroup, { unblockValidation: true });
