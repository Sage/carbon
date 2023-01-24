import styled, { css } from "styled-components";
import Icon from "../icon";
import { slideAnimation, fadeAnimation } from "./slide.config";
import { SlideStyle } from "./slide/slide.style";

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
  color: var(--colorsActionMajorYang100);
  &::before {
    font-size: 16px;
  }
`;

const CarouselStyledIconLeft = styled(CarouselStyledIcon)`
  transform: rotate(90deg);
`;

const CarouselStyledIconRight = styled(CarouselStyledIcon)`
  transform: rotate(-90deg);
`;

const CarouselButtonStyle = styled.button.attrs({ type: "button" })`
  ${({ disabled }) => css`
    border: none;
    border-radius: var(--borderRadius100);
    width: 40px;
    height: 64px;
    border-width: var(--borderWidth200);
    border-color: var(--colorsActionMajorTransparent);
    background-color: ${disabled
      ? "var(--colorsActionDisabled500)"
      : "var(--colorsActionMajor500)"};

    ${disabled &&
    css`
      ${CarouselStyledIcon} {
        color: var(--colorsActionMajorYin030);
      }
    `}

    &:hover {
      background-color: var(--colorsActionMajor600);
      cursor: ${disabled ? "default" : "pointer"};

      ${disabled &&
      css`
        background-color: var(--colorsActionDisabled500);
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
      outline: 2px solid var(--colorsSemanticFocus500);

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
  border-radius: var(--borderRadius100);
  width: 10px;
  height: 10px;
  background: var(--colorsActionMinor200);
  margin: 0px 4px;

  &:hover {
    cursor: pointer;
  }
`;

const CarouselSelectorWrapperStyle = styled.div`
  ${css`
    height: 20px;
    margin-top: 25px;
    text-align: center;

    ${CarouselSelectorInputStyle}:checked {
      + ${CarouselSelectorLabelStyle} {
        width: 10px;
        height: 10px;
        background: var(--colorsActionMinor400);
        border-color: transparent;
        position: relative;
      }
    }
  `}
`;

const CarouselSelectorInputWrapperStyle = styled.span`
  display: inline-block;
  line-height: 20px;
  vertical-align: middle;
`;

interface CarouselSliderWrapperProps {
  elementIndex: number;
}

const CarouselSliderWrapper = styled.div<CarouselSliderWrapperProps>`
  transition: 0.4s;
  display: flex;
  position: relative;

  ${({ elementIndex }) => css`
    left: ${10 - 80 * elementIndex}%;

    ${SlideStyle}:nth-of-type(${elementIndex + 1}) {
      transform: scale(1);
      opacity: 1;
    }
  `}
`;

const CarouselWrapperStyle = styled.div`
  .carbon-carousel__content {
    overflow: hidden;
    position: relative;
  }

  ${slideAnimation};
  ${fadeAnimation};
`;

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
