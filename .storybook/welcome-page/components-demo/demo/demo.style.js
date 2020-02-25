import styled from 'styled-components';

export const ComponentShowcaseWrapper = styled.div`
  align-items: center;
  background-image: linear-gradient(180deg,#f3f8fe,#fdf5f5);
  display: flex;
  flex-direction: column;
  padding: 120px 0 0;
  margin-bottom: 50px;
`;

export const StyledDemoWrapper = styled.div`
  padding: 0px 14%;
`;

export const StyledDemoRow = styled.div`
  padding-top: 8px;
  text-align: center;
  ${({ styling }) => styling}
`;

export const StyledComponentWrapper = styled.div`
  ${({ styling }) => styling}
`;
