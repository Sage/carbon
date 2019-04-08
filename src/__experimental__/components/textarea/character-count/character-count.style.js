import styled from 'styled-components';

const StyledCharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.disabled.disabled}
`;

export default StyledCharacterCount;
