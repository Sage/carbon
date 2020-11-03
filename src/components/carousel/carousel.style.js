import styled, { css } from "styled-components";
import Icon from "../icon";
import { slideAnimation, fadeAnimation } from "./slide.config";
import baseTheme from "../../style/themes/base";

const CarouselNavigationStyle = styled.div`
  margin-top: -32.5px;
  position: absolute;
  top: 50%;
  z-index: 20;
`;

const CarouselPreviousButtonWrapperStyle = styled(CarouselNavigationStyle)`
  margin-left: 2px;
`;
const CarouselNextButtonWrapperStyle = styled(CarouselNavigationStyle)`
  right: 0;
  margin-right: 2px;
`;

const CarouselStyledIcon = styled(Icon)`
  cursor: pointer;
  &&::before {
    font-size: 16px;
  }
`;

const CarouselStyledIconLeft = styled(CarouselStyledIcon)`
  transform: rotate(90deg);
`;

const CarouselStyledIconRight = styled(CarouselStyledIcon)`
  transform: rotate(-90deg);
`;

const CarouselButtonStyle = styled.button`
  ${({ theme, disabled }) => css`
    border: none;
    width: 40px;
    height: 64px;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    opacity: ${disabled ? "0.1" : "1"};

    &:hover {
      background-color: ${theme.colors.secondary};
      cursor: ${disabled ? "default" : "pointer"};

      ${disabled &&
      css`
        background-color: ${theme.colors.primary};
        cursor: default;

        ${CarouselStyledIcon} {
          cursor: default;
        }
      `}
    }

    &:active {
      border: none;
    }

    &:focus {
      outline: 2px solid ${theme.colors.focus};

      ::-moz-focus-inner {
        border: 0;
      }

      ${disabled &&
      css`
        outline: none;
      `}
    }
  `}
`;

const CarouselSelectorInputStyle = styled.input`
  display: none;
`;

const CarouselSelectorLabelStyle = styled.label`
  display: inline-block;
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.carousel.inactiveSelectorBackground};
  margin: 0px 4px;

  &:hover {
    cursor: pointer;
  }
`;

const CarouselSelectorWrapperStyle = styled.div`
  ${({ theme }) => css`
    height: 20px;
    margin-top: 25px;
    text-align: center;

    ${CarouselSelectorInputStyle}:checked {
      + ${CarouselSelectorLabelStyle} {
        background: ${theme.carousel.activeSelectorBackground};
        border-color: transparent;
        height: 10px;
        position: relative;
        width: 10px;
      }
    }
  `}
`;

const CarouselSelectorInputWrapperStyle = styled.span`
  display: inline-block;
  line-height: 20px;
  vertical-align: middle;
`;

const CarouselSliderWrapper = styled.div`
  transition: 0.4s;
  display: flex;
  position: relative;
  left: ${({ elementIndex }) => 10 - 80 * elementIndex}%;
`;

const CarouselWrapperStyle = styled.div`
  .carbon-carousel__content {
    overflow: hidden;
    position: relative;
  }

  ${slideAnimation};
  ${fadeAnimation};
`;

CarouselNavigationStyle.defaultProps = {
  theme: baseTheme,
};

CarouselButtonStyle.defaultProps = {
  theme: baseTheme,
};

CarouselStyledIcon.defaultProps = {
  theme: baseTheme,
};

CarouselSelectorWrapperStyle.defaultProps = {
  theme: baseTheme,
};

CarouselSelectorLabelStyle.defaultProps = {
  theme: baseTheme,
};

CarouselStyledIconLeft.defaultProps = {
  theme: baseTheme,
};

CarouselStyledIconRight.defaultProps = {
  theme: baseTheme,
};

CarouselPreviousButtonWrapperStyle.defaultProps = {
  theme: baseTheme,
};

CarouselNextButtonWrapperStyle.defaultProps = {
  theme: baseTheme,
};

export {
  CarouselNavigationStyle,
  CarouselNextButtonWrapperStyle,
  CarouselPreviousButtonWrapperStyle,
  CarouselButtonStyle,
  CarouselStyledIcon,
  CarouselStyledIconLeft,
  CarouselStyledIconRight,
  CarouselSelectorWrapperStyle,
  CarouselSelectorInputWrapperStyle,
  CarouselSelectorInputStyle,
  CarouselSelectorLabelStyle,
  CarouselWrapperStyle,
  CarouselSliderWrapper,
};
