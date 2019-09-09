import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags';
import StyledHelp from './help.style';
import Events from '../../utils/helpers/events/events';
import OptionsHelper from '../../utils/helpers/options-helper';

const Help = (props) => {
  const helpElement = useRef(null);
  const [isTooltipVisible, updateTooltipVisible] = useState(false);
  const {
    className,
    href,
    helpId,
    children,
    tabIndexOverride,
    tagTypeOverride,
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

  tagType = tagTypeOverride || tagType;

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
      id={ helpId }
      target='_blank'
      rel='noopener noreferrer'
      ref={ helpElement }
      onFocus={ () => updateTooltipVisible(true) }
      onBlur={ () => updateTooltipVisible(false) }
      { ...tagComponent('help', props) }
      tabIndex={ tabIndexOverride }
      value={ children }
      aria-label='additional help information'
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
  /** The unique id of the component (used with aria-describedby for accessibility) */
  helpId: PropTypes.string,
  /** Overrides the default tabindex of the component */
  tabIndexOverride: PropTypes.string,
  /** Overrides the default 'as' attribute of the Help component */
  tagTypeOverride: PropTypes.string,
  /** Position of tooltip relative to target */
  tooltipPosition: PropTypes.oneOf(OptionsHelper.positions),
  /** Aligment of pointer */
  tooltipAlign: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
  /** A path for the anchor */
  href: PropTypes.string
};

Help.defaultProps = {
  tooltipPosition: 'top',
  tooltipAlign: 'center',
  tabIndexOverride: 0
};

export default Help;
