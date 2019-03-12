import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';

const stylingFromProps = states => (props) => {
  const parsedStates = states(props);
  return Object.keys(parsedStates).reduce((acc, stateKey) => {
    if (props[stateKey]) return acc + parsedStates[stateKey];
    return acc;
  }, '');
};

const stylingFromPropValue = prop => states => (props) => {
  const parsedStates = states(props);
  return parsedStates[props[prop]];
};

const InputPresentationStyle = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.text.body};
  background: transparent;
  line-height: 16px;
  display: flex;
  cursor: text;
  margin: 0px;
  min-height: 32px;
  border: 1px solid ${({ theme }) => theme.input.borderColor};

  ${stylingFromProps(({ theme }) => ({
    error: `border: 2px solid ${theme.colors.error};`,
    warning: `border: 2px solid ${theme.colors.warning};`,
    hasFocus: `outline: 3px solid ${theme.colors.warning};`,
    disabled: `
      color: ${theme.colors.text.disabled};
      background: ${theme.input.disabled.backgroundColor};
      cursor: not-allowed;
    `,
    readOnly: `
      background: transparent;
      border: none;
    `
  }))}

  ${stylingFromPropValue('size')(() => ({
    small: `
      height: 32px;
      font-size: 14px;
      padding-left: 8px;
      padding-right: 8px;
    `,
    medium: `
      height: 40px;
      font-size: 14px;
      padding-left: 11px;
      padding-right: 11px;
    `,
    large: `
      height: 48px;
      font-size: 16px;
      padding-left: 13px;
      padding-right: 13px;
    `
  }))}
`;

InputPresentationStyle.defaultProps = {
  theme: baseTheme,
  large: true
};

export default InputPresentationStyle;
