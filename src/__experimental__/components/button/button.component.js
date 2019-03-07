import React, { useState } from 'react';
import styled from 'styled-components';

const TestButton = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
`;

const Button = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <TestButton
        href='https://github.com/styled-components/styled-components'
        target='_blank'
        rel='noopener'
        primary
        onClick={ () => setCount(count + 1) }
      >
      count
      </TestButton>

      <TestButton
        as='' href='/docs'
        onClick={ () => setCount(count + 3) }
      >
      Documentation
      </TestButton>
    </div>
  );
};

export default Button;
