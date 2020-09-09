import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import propTypes from '@styled-system/prop-types';
import Heading from '../heading';
import Icon from '../icon';
import Events from '../../utils/helpers/events/events';
import { StyledHeadingWrapper, StyledCollapsableContent } from './tile.style';

const TileHeader = ({
  title,
  collapsable = false,
  children,
  p = 2
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState();
  const collapsableContent = useRef(null);

  useEffect(() => {
    setContentHeight(!isExpanded ? 0 : children && collapsableContent.current.scrollHeight);
  }, [children, contentHeight, isExpanded]);

  const handleClick = () => {
    setExpanded(!isExpanded);
  };

  const handleKeyDown = (e) => {
    if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
      e.preventDefault();
      handleClick();
    }
  };

  const createCorrectContent = () => {
    if (collapsable) {
      return (
        <>
          <StyledHeadingWrapper
            p={ p }
            onClick={ handleClick }
            onKeyDown={ handleKeyDown }
            tabIndex='0'
            isExpanded={ isExpanded }
          >
            <Heading title={ title } divider={ false } />
            <Icon type='chevron_down' />
          </StyledHeadingWrapper>
          <StyledCollapsableContent
            maxHeight={ contentHeight }
            ref={ collapsableContent }
            isExpanded={ isExpanded }
            p={ p }
          >
            {children}
          </StyledCollapsableContent>
        </>
      );
    }

    return <Heading title={ title } divider={ false }>Some content usees inside of header component</Heading>;
  };


  return createCorrectContent();
};

TileHeader.propTypes = {
  ...propTypes.space,
  title: PropTypes.string,
  collapsable: PropTypes.bool,
  children: PropTypes.node
};

export default TileHeader;
