import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledRadioButtonGroup } from './radio-button.style';
import withValidation from '../../../components/validations/with-validation.hoc';
import FormField from '../form-field';
import Events from '../../../utils/helpers/events';

function initialTabIndex(childIndex) {
  return (childIndex > 0) ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const RadioButtonGroup = (props) => {
  const {
    children,
    groupName,
    hasError,
    hasWarning,
    hasInfo
  } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const refCollection = [];
  const groupLabelId = `${groupName}-label`;
  const buttonGroupRef = useRef(null);

  const buttons = React.Children.map(children, (child, index) => {
    const isDefaultChecked = child.props.checked && !selectedValue;
    const checked = isDefaultChecked || selectedValue === child.props.value;
    const tabindex = selectedValue ? checkedTabIndex(checked) : initialTabIndex(index);

    const handleChange = (ev) => {
      child.props.onChange(ev);
      setSelectedValue(ev.target.value);
    };

    const inputRef = child.ref || React.createRef();
    refCollection.push(inputRef);

    let childProps = {
      checked,
      tabindex,
      inputName: groupName,
      onChange: handleChange,
      inputRef
    };

    if (checked) {
      childProps = {
        ...childProps,
        hasError,
        hasWarning,
        hasInfo
      };
    }

    return React.cloneElement(child, childProps);
  });

  function activeElement() {
    const activeIndex = refCollection.findIndex(ref => ref.current && ref.current === document.activeElement);

    return activeIndex === -1 ? 0 : activeIndex;
  }

  const handleKeyDown = (ev) => {
    ev.preventDefault();
    const numOfChildren = children.length;

    let radioFocusIndex = activeElement();

    if (Events.isShiftKey(ev)) {
      refCollection[radioFocusIndex].current.blur();
    }

    if (Events.isSpaceKey(ev) || Events.isEnterKey(ev)) {
      refCollection[radioFocusIndex].current.click();
    }

    if (Events.isUpKey(ev) || Events.isLeftKey(ev)) {
      radioFocusIndex = radioFocusIndex <= 0 ? numOfChildren - 1 : radioFocusIndex - 1;

      refCollection[radioFocusIndex].current.focus();
      return;
    }

    if (Events.isDownKey(ev) || Events.isRightKey(ev)) {
      radioFocusIndex = radioFocusIndex >= (numOfChildren - 1) ? 0 : radioFocusIndex + 1;

      refCollection[radioFocusIndex].current.focus();
    }
  };

  return (
    <StyledRadioButtonGroup
      ref={ buttonGroupRef }
      aria-labelledby={ groupLabelId }
      role='radiogroup'
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      onKeyDown={ handleKeyDown }
      { ...tagComponent('radiogroup', props) }
    >
      <FormField { ...props } labelId={ groupLabelId }>
        {buttons}
      </FormField>
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
  /** Help text */
  labelHelp: PropTypes.string,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export { RadioButtonGroup as OriginalRadioButtonGroup };

export default withValidation(RadioButtonGroup);
