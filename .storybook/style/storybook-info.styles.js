import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StoryHeader = styled.h1`
  border-bottom: 1px solid rgb(238, 238, 238);
  font-size: 25px;
  margin: 20px 0px 0px;
  padding: 0px 0px 5px;
`;

const StoryCode = styled.code`
  background-color: rgb(250, 250, 250);
  display: ${props => (props.block ? 'block' : 'inline')};
  padding: ${props => (props.padded ? '0.5rem' : '0')};
`;

const StyledPre = styled.pre`
  background-color: rgb(250, 250, 250);
  padding: 0.5rem;
`;

const StoryCodeBlock = ({ children }) => (
  <StyledPre>
    {children.map((item, index) => (
      <StoryCode block key={ index }>
        {item}
      </StoryCode>
    ))}
  </StyledPre>
);

StoryCodeBlock.propTypes = {
  children: PropTypes.node
};

export { StoryHeader, StoryCode, StoryCodeBlock };
