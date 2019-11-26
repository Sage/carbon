import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import FormField from '../form-field';

const CheckboxGroup = (props) => {
  const { children, id } = props;
  const groupLabelId = `${id}-label`;

  return (
    <StyledCheckboxGroup
      aria-labelledby={ groupLabelId }
      role='checkbox'
      { ...tagComponent('checkboxgroup', props) }
    >
      <FormField { ...props }>
        {children}
      </FormField>
    </StyledCheckboxGroup>
  );
};

CheckboxGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  id: PropTypes.string.isRequired
};

export default CheckboxGroup;
