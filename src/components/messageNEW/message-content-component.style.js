import styled from 'styled-components';

const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.text.color};

  div:first-of-type {
    font-weight: bold;
    font-size: ${({ theme }) => theme.text.size}
    color: ${({ type, theme }) => (type === 'info' && theme.colors.info)
      || (type === 'warning' && theme.colors.warning)
      || (type === 'error' && theme.colors.error)
      || (type === 'success' && theme.colors.success)};
  }
`;

export default MessageContentStyle;
