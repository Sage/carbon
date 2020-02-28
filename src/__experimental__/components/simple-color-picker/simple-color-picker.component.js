import React, {
  useCallback,
  useState,
  useRef,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import Events from '../../../utils/helpers/events';
import tagComponent from '../../../utils/helpers/tags/tags';
import SimpleColor from './simple-color';
import RadioButtonMapper from '../radio-button/radio-button-mapper.component';
import { SimpleColorFieldset, StyledColorOptions } from './simple-color-picker.style';

const SimpleColorPicker = (props) => {
  const {
    children,
    name,
    legend,
    onChange,
    onBlur,
    onKeyDown,
    value,
    isBlurBlocked = false,
    maxWidth = 300,
    childWith = 58
  } = props;

  const myRef = useRef(null);
  const [blurBlocked, setIsBlurBlocked] = useState(isBlurBlocked);
  const [focusedElement, setFocusedElement] = useState(null);
  const itemsPerRow = Math.floor(maxWidth / childWith);
  const rowCount = Math.ceil(children.length / itemsPerRow);
  let blankSlots = itemsPerRow * rowCount - children.length;
  let currentRow = 1;
  let loopCounter = 1;

  const gridItemRefs = useRef(Array.from({
    length: React.Children.count(children)
  }, () => React.createRef()));

  const navigationGrid = React.Children.map(children, (child, index) => {
    const allowUp = currentRow !== 1;
    let allowDown = false;

    if ((currentRow + 1) === rowCount && (blankSlots - itemsPerRow) < 0) {
      allowDown = true;
      blankSlots += 1;
    } else if ((currentRow + 1) !== rowCount && currentRow !== rowCount && rowCount > 1) {
      allowDown = true;
    }

    if (loopCounter === itemsPerRow) {
      loopCounter = 0;
      currentRow += 1;
    }

    let upItem;

    if (allowUp) {
      upItem = index - itemsPerRow;
    }

    let downItem;

    if (allowDown) {
      downItem = itemsPerRow + index;
    }

    const childProps = {
      ref: child.ref || gridItemRefs.current[index],
      'data-up': allowUp,
      'data-down': allowDown,
      'data-item-up': upItem,
      'data-item-down': downItem
    };

    loopCounter += 1;

    return React.cloneElement(child, childProps);
  });

  const onKeyDownHandler = useCallback((e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    const arrowKeys = [
      Events.isLeftKey(e),
      Events.isUpKey(e),
      Events.isRightKey(e),
      Events.isDownKey(e)
    ];

    if (!arrowKeys.includes(true)) return;

    e.preventDefault();

    let itemIndex;

    if (Events.isUpKey(e)) {
      if (e.target.getAttribute('data-up') !== 'true') return;
      itemIndex = e.target.getAttribute('data-item-up');
    } else if (Events.isDownKey(e)) {
      if (e.target.getAttribute('data-down') !== 'true') return;
      itemIndex = e.target.getAttribute('data-item-down');
    }

    if (Events.isLeftKey(e) || Events.isRightKey(e)) {
      const position = (element) => {
        return e.target.getAttribute('value') === element.ref.current.props.value;
      };

      if (Events.isLeftKey(e)) {
        itemIndex = navigationGrid.findIndex(position) - 1;
      } else {
        itemIndex = navigationGrid.findIndex(position) + 1;
      }

      if (itemIndex < 0) {
        itemIndex = (navigationGrid.length - 1);
      } else if (itemIndex > (navigationGrid.length - 1)) {
        itemIndex = 0;
      }
    }

    const item = navigationGrid[itemIndex].ref.current;
    const { value: colorValue } = item.props;
    item.input.current.focus();
    item.props.onChange({ target: { checked: true, value: colorValue } });
  }, [onKeyDown, navigationGrid]);

  const handleClickOutside = (ev) => {
    if (myRef.current && ev.target && !myRef.current.contains(ev.target)) {
      setIsBlurBlocked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    };
  });

  const handleOnBlur = (ev) => {
    ev.preventDefault();

    if (!blurBlocked) {
      onBlur(ev);
    }
  };

  const handleOnMouseDown = (ev) => {
    setIsBlurBlocked(true);

    // If the mousedown event occurred on the currently-focused <SimpleColor>
    if (focusedElement !== null && focusedElement === ev.target) {
      ev.preventDefault();

    // If a different <SimpleColor> is currently focused
    } else if (focusedElement !== null) {
      ev.preventDefault();
      setIsBlurBlocked(false);
      setFocusedElement(ev.target);

    // If no <SimpleColor> is currently focused
    } else {
      setIsBlurBlocked(true);
      setFocusedElement(ev.target);
    }
  };

  return (
    <SimpleColorFieldset
      role='radiogroup'
      legend={ legend }
      isBlurBlocked={ blurBlocked }
      { ...tagComponent('simple-color-picker', props) }
      maxWidth={ maxWidth }
    >
      <StyledColorOptions ref={ myRef }>
        <RadioButtonMapper
          name={ name }
          value={ value }
          onChange={ onChange }
          onMouseDown={ handleOnMouseDown }
          onKeyDown={ onKeyDownHandler }
          onBlur={ handleOnBlur }
        >
          { navigationGrid }
        </RadioButtonMapper>
      </StyledColorOptions>
    </SimpleColorFieldset>
  );
};

SimpleColorPicker.propTypes = {
  /** The SimpleColor components to be rendered in the group */
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (SimpleColor.displayName !== child.type.displayName) {
        error = new Error(`\`${componentName}\` only accepts children of type \`${SimpleColor.displayName}\`.`);
      }
    });

    return error;
  },
  /** Should the onBlur callback prop be initially blocked? */
  isBlurBlocked: PropTypes.bool,
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string.isRequired,
  /** The currently selected color. */
  value: PropTypes.string,
  /** The name to apply to the input. */
  name: PropTypes.string,
  /** A callback triggered when a color is selected. */
  onChange: PropTypes.func,
  /** A callback triggered when a color is selected. */
  onBlur: PropTypes.func,
  /** A callback triggered on key down. */
  onKeyDown: PropTypes.func,
  /** prop that sets max-width in css */
  maxWidth: PropTypes.string,
  /** prop that represents childWith */
  childWith: PropTypes.string
};

export default SimpleColorPicker;
