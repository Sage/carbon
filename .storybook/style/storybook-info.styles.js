import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StoryHeader = styled.h1`
  border-bottom: 1px solid #E6EBED;
  font-size: 24px;
  margin: 24px 0px;
  padding: 0px 0px 5px;
`;

const StoryCode = styled.code`
  background-color: #EBEFF0;
  display: ${props => (props.block ? 'block' : 'inline')};
  padding: ${props => (props.padded ? '8px' : '0')};
`;

const StyledPre = styled.pre`
  background-color: #EBEFF0;
  padding: 32px;
`;

const StoryCodeBlock = ({ children }) => (
  <StyledPre>
    {Array.isArray(children)
      ? children.map((item, index) => (
          <StoryCode block key={index}>
            {item}
          </StoryCode>
        ))
      : children}
  </StyledPre>
);

StoryCodeBlock.propTypes = {
  children: PropTypes.node
};

export { StoryHeader, StoryCode, StoryCodeBlock };
