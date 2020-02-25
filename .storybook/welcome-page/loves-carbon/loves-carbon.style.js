import styled from 'styled-components';
import { StyledComponentHeader } from '../components-demo/component-heading/component-heading.style'; 
import Link from '../../../src/components/link/link.style';

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  padding: 120px 4%;
`;

export const LovesCarbonWrapper = styled.div`
  background-color: #E6EBED;
  width: 100%;

  && ${Link} a {
    font-size: 18px;
    font-weight: bold;
  }

  ${StyledComponentHeader} {
    margin-bottom: 30px;
  }
`;

export const Image = styled.img`
  display: none;

  @media (min-width: 300px) {
    align-self: center;
    display: block;
    width: 50%;
  }
`;

