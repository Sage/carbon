import styled from 'styled-components';

const CloseIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  width: 45px;

  span {
    cursor: pointer;
    &:before {
      font-size: 16px;
      display: block;
      color: ${({ theme, type }) => (type === 'info' && theme.colors.info)
        || (type === 'warning' && theme.colors.warning)
        || (type === 'error' && theme.colors.error)
        || (type === 'success' && theme.colors.success)};
    }
  }
`;

export default CloseIconContainerStyle;
