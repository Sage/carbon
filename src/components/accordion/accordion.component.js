import React, {
  useState, useRef, useEffect, useCallback
} from 'react';
import PropTypes from 'prop-types';

import OptionsHelper from '../../utils/helpers/options-helper';
import createGuid from '../../utils/helpers/guid';
import Events from '../../utils/helpers/events';
import {
  StyledAccordionContainer,
  StyledAccordionHeadingsContainer,
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionSubTitle,
  StyledAccordionIcon,
  StyledAccordionContentContainer,
  StyledAccordionContent
} from './accordion.style';
import Logger from '../../utils/logger/logger';

let deprecatedWarnTriggered = false;

const Accordion = React.forwardRef(({
  borders = 'default',
  customPadding,
  defaultExpanded,
  expanded,
  onChange,
  children,
  handleKeyboardAccessibility, // eslint-disable-line react/prop-types
  id,
  index, // eslint-disable-line react/prop-types
  iconType = 'chevron_down',
  iconAlign = 'right',
  scheme = 'white',
  size = 'large',
  styleOverride = {},
  subTitle,
  title,
  width,
  ...rest
}, ref) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate('`styleOverride` that is used in the `Accordion` component is deprecated and will soon be removed.');
  }

  const isControlled = expanded !== undefined;

  const [isExpandedInternal, setIsExpandedInternal] = useState(defaultExpanded || false);

  const [contentHeight, setContentHeight] = useState(isExpandedInternal ? 'auto' : 0);

  const accordionContent = useRef(null);

  const isExpanded = isControlled ? expanded : isExpandedInternal;

  useEffect(() => {
    setContentHeight(!isExpanded ? 0 : accordionContent.current.scrollHeight);
  }, [isExpanded, children]);

  const toggleAccordion = useCallback((ev) => {
    if (!isControlled) setIsExpandedInternal(!isExpanded);
    if (onChange) onChange(ev, !isExpanded);
  }, [isControlled, isExpanded, onChange]);

  const handleKeyDown = useCallback((ev) => {
    if (handleKeyboardAccessibility) {
      handleKeyboardAccessibility(ev, index);
    }

    if (Events.isEnterKey(ev) || Events.isSpaceKey(ev)) {
      toggleAccordion(ev);
    }
  }, [handleKeyboardAccessibility, index, toggleAccordion]);

  const guid = useRef(createGuid());
  const accordionId = id || `Accordion_${guid.current}`;
  const headerId = `AccordionHeader_${guid.current}`;
  const contentId = `AccordionContent_${guid.current}`;

  return (
    <StyledAccordionContainer
      id={ accordionId }
      data-component='accordion'
      width={ width }
      borders={ borders }
      customPadding={ customPadding }
      scheme={ scheme }
      styleOverride={ styleOverride.root }
      { ...rest }
    >
      <StyledAccordionTitleContainer
        data-element='accordion-title-container'
        id={ headerId }
        aria-expanded={ isExpanded }
        aria-controls={ contentId }
        onClick={ toggleAccordion }
        onKeyDown={ handleKeyDown }
        iconAlign={ iconAlign }
        ref={ ref }
        tabIndex='0'
        size={ size }
        styleOverride={ styleOverride.headerArea }
      >
        <StyledAccordionHeadingsContainer
          data-element='accordion-headings-container'
        >
          <StyledAccordionTitle
            data-element='accordion-title'
            size={ size }
            styleOverride={ styleOverride.header }
          >
            { title }
          </StyledAccordionTitle>

          {(subTitle && size === 'large') && (
            <StyledAccordionSubTitle>
              { subTitle }
            </StyledAccordionSubTitle>
          )}
        </StyledAccordionHeadingsContainer>

        <StyledAccordionIcon
          data-element='accordion-icon'
          type={ iconType }
          isExpanded={ isExpanded }
          iconAlign={ iconAlign }
          styleOverride={ styleOverride.icon }
        />
      </StyledAccordionTitleContainer>
      <StyledAccordionContentContainer
        isExpanded={ isExpanded }
        maxHeight={ contentHeight }
      >
        <StyledAccordionContent
          role='region'
          data-element='accordion-content'
          id={ contentId }
          aria-labelledby={ headerId }
          ref={ accordionContent }
          styleOverride={ styleOverride.content }
        >
          { children }
        </StyledAccordionContent>
      </StyledAccordionContentContainer>
    </StyledAccordionContainer>
  );
});

Accordion.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  /** Set the default state of expansion of the Accordion if component is meant to be used as uncontrolled */
  defaultExpanded: PropTypes.bool,
  /** Sets the expansion state of the Accordion if component is meant to be used as controlled */
  expanded: PropTypes.bool,
  /** Sets icon type - accepted values: 'chevron_down' (default), 'dropdown' */
  iconType: PropTypes.oneOf(['chevron_down', 'dropdown']),
  /** Sets icon alignment - accepted values: 'left', 'right' (default) */
  iconAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    headerArea: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange: PropTypes.func,
  /** Sets accordion title */
  title: PropTypes.string.isRequired,
  /** Sets accordion sub title */
  subTitle: PropTypes.string,
  /** Sets accordion size */
  size: PropTypes.oneOf(['large', 'small']),
  /** Adds additional top and bottom padding */
  customPadding: PropTypes.number,
  /** Toggles left and right borders */
  borders: PropTypes.oneOf(['default', 'full']),
  /** Sets background as white or transparent */
  scheme: PropTypes.oneOf(['white', 'transparent']),
  /** Sets accordion width */
  width: PropTypes.string
};

Accordion.displayName = 'Accordion';
export default Accordion;
