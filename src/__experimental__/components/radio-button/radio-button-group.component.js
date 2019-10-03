import React, { useState, useCallback, useMemo } from 'react';
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
    hasInfo,
    onChange,
    value
  } = props;
  const refCollection = [];
  const groupLabelId = `${groupName}-label`;

  const anyChecked = useMemo(() => {
    let result = false;
    React.Children.map(children, (child) => {
      if (Object.prototype.hasOwnProperty.call(child.props, 'checked')) {
        result = true;
      }
    });
    return result;
  }, [children]);

  const isControled = value !== undefined;
  const [checkedValue, setCheckedValue] = useState(false);
  const onChangeProp = useCallback((e) => {
    onChange(e);
    setCheckedValue(e.target.value);
  }, [onChange, setCheckedValue]);

  const buttons = React.Children.map(children, (child, index) => {
    const inputRef = child.ref || React.createRef();
    refCollection.push(inputRef);

    let tabindex;
    let checked;
    if (isControled) {
      // The user is controlling the input via the value prop
      checked = value === child.props.value;
      tabindex = checkedTabIndex(checked);
    } else if (!checkedValue && anyChecked) {
      // Uncontrolled and the user has not made a selection, but at least one has a checked prop
      checked = child.props.checked || false;
      tabindex = checkedTabIndex(checked);
    } else {
      // Uncontrolled, existing selection or none marked as checked
      checked = checkedValue === child.props.value;
      tabindex = initialTabIndex(index);
    }

    return React.cloneElement(child, {
      checked,
      tabindex,
      inputName: groupName,
      onChange: onChangeProp,
      inputRef
    });
  });

  function activeElementIndex() {
    let activeIndex;
    refCollection.forEach((ref, index) => {
      if (ref && ref.current === document.activeElement) {
        activeIndex = index;
      }
    });
    return activeIndex || 0;
  }

  const handleKeyDown = (ev) => {
    const numOfChildren = children.length;

    let radioFocusIndex = activeElementIndex();

    if (Events.isSpaceKey(ev) || Events.isEnterKey(ev)) {
      ev.preventDefault();
      refCollection[radioFocusIndex].current.click();
    }

    if (Events.isUpKey(ev) || Events.isLeftKey(ev)) {
      ev.preventDefault();
      radioFocusIndex = radioFocusIndex <= 0 ? numOfChildren - 1 : radioFocusIndex - 1;

      refCollection[radioFocusIndex].current.focus();
      return;
    }

    if (Events.isDownKey(ev) || Events.isRightKey(ev)) {
      ev.preventDefault();
      radioFocusIndex = radioFocusIndex >= (numOfChildren - 1) ? 0 : radioFocusIndex + 1;

      refCollection[radioFocusIndex].current.focus();
    }
  };

  return (
    <StyledRadioButtonGroup
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
  hasInfo: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(RadioButtonGroup, { unblockValidation: true });
