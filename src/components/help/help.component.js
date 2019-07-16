import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags';
import StyledHelp from './help.style';
import Events from '../../utils/helpers/events/events';

const Help = (props) => {
  const helpElement = useRef(null);
  const [isTooltipVisible, updateTooltipVisible] = useState(false);
  const {
    className,
    href,
    children,
    tooltipPosition,
    tooltipAlign
  } = props;
  let tagType;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  if (href) {
    tagType = 'a';
  }

  function handleKeyPress(ev) {
    if (Events.isEscKey(ev)) {
      helpElement.current.blur();
      updateTooltipVisible(false);
    }
  }

  return (
    <StyledHelp
      className={ className }
      as={ tagType }
      href={ href }
      target='_blank'
      rel='noopener noreferrer'
      ref={ helpElement }
      onFocus={ () => updateTooltipVisible(true) }
      onBlur={ () => updateTooltipVisible(false) }
      { ...tagComponent('help', props) }
    >
      <Icon
        type='help'
        tooltipMessage={ children }
        tooltipPosition={ tooltipPosition }
        tooltipAlign={ tooltipAlign }
        tooltipVisible={ isTooltipVisible }
      />
    </StyledHelp>
  );
};

Help.propTypes = {
  /** [Legacy] A custom class name for the component. */
  className: PropTypes.string,
  /** Message to display in tooltip */
  children: PropTypes.string,
  /** Position of tooltip relative to target */
  tooltipPosition: PropTypes.string,
  /** Aligment of pointer */
  tooltipAlign: PropTypes.string,
  /** A path for the anchor */
  href: PropTypes.string
};

Help.defaultProps = {
  tooltipPosition: 'top',
  tooltipAlign: 'center'
};

export default Help;
