import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';
import buttonBaseTheme from './themes/button-base.theme';

const StyledButton = styled.button`
  ${(props) => {
    const { theme, size } = props;
    const buttonConfig = buttonBaseTheme(theme);
    const sizeConfig = buttonConfig.sizes[size];

    let themedButtonConfig = {};

    if (props.renderAs === 'primary') {
      if (props.disabled) themedButtonConfig = buttonConfig.variants.primary.disabled;
      else if (props.darkBackground) themedButtonConfig = buttonConfig.variants.primary.darkBackground;
      else themedButtonConfig = buttonConfig.variants.primary.standard;
    }

    if (props.renderAs === 'secondary') {
      if (props.disabled) themedButtonConfig = buttonConfig.variants.secondary.disabled;
      else if (props.darkBackground) themedButtonConfig = buttonConfig.variants.secondary.darkBackground;
      else themedButtonConfig = buttonConfig.variants.secondary.standard;
    }

    if (props.renderAs === 'tertiary') {
      if (props.disabled) themedButtonConfig = buttonConfig.variants.tertiary.disabled;
      else themedButtonConfig = buttonConfig.variants.tertiary.standard;
    }

    if (props.renderAs === 'destructive') {
      if (props.disabled) themedButtonConfig = buttonConfig.variants.primary.disabled;
      else themedButtonConfig = buttonConfig.variants.destructive.standard;
    }

    return css`
      ${themedButtonConfig}
      ${sizeConfig};

      &:focus {
        outline: solid 3px ${theme.colors.warning};
      }
    `;
  }
}}
`;

StyledButton.defaultProps = {
  theme: baseTheme,
  medium: true
};

export default StyledButton;
