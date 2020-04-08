import React, {
  useState, useRef, useEffect, useCallback
} from 'react';
import PropTypes from 'prop-types';

import OptionsHelper from '../../utils/helpers/options-helper';
import createGuid from '../../utils/helpers/guid';
import Events from '../../utils/helpers/events';
import {
  StyledAccordionContainer,
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionIcon,
  StyledAccordionContentContainer,
  StyledAccordionContent
} from './accordion.style';

const Accordion = React.forwardRef(({
  defaultExpanded,
  expanded,
  onChange,
  children,
  handleKeyboardAccessibility, // eslint-disable-line react/prop-types
  id,
  index, // eslint-disable-line react/prop-types
  iconType,
  iconAlign,
  styleOverride,
  type,
  title
}, ref) => {
  const isControlled = expanded !== undefined;

  const [isExpandedInternal, setIsExpandedInternal] = useState(defaultExpanded || false);

  const [contentHeight, setContentHeight] = useState(isExpandedInternal ? 'auto' : 0);

  const accordionContent = useRef(null);

  const isExpanded = isControlled ? expanded : isExpandedInternal;

  useEffect(() => {
    setContentHeight(!isExpanded ? 0 : accordionContent.current.scrollHeight);
  }, [isExpanded]);

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
      accordionType={ type }
      styleOverride={ styleOverride.root }
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
        styleOverride={ styleOverride.headerArea }
      >
        <StyledAccordionTitle
          data-element='accordion-title'
          styleOverride={ styleOverride.header }
        >
          { title }
        </StyledAccordionTitle>
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
  /** Sets accordion type to either primary (default), or secondary */
  type: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** Sets accordion title */
  title: PropTypes.string.isRequired
};

Accordion.defaultProps = {
  iconType: 'chevron_down',
  iconAlign: 'right',
  type: 'primary',
  styleOverride: {}
};

Accordion.displayName = 'Accordion';
export default Accordion;
