import styled from 'styled-components';

const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.text.color};

  div:first-of-type {
    font-weight: bold;
    font-size: ${({ theme }) => theme.text.size}
    color: ${({ type, theme }) => (type === 'info' && theme.name === 'classic' && theme.colors.info)
      || (type === 'warning' && theme.name === 'classic' && theme.colors.warning)
      || (type === 'error' && theme.name === 'classic' && theme.colors.error)
      || (type === 'success' && theme.name === 'classic' && theme.colors.success)};

  }
`;

export default MessageContentStyle;
