import styled, { css } from 'styled-components';
import Icon from '../icon/icon';
import { slideAnimation, fadeAnimation } from './slide.config';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const CarouselNavigationStyle = styled.div`
  margin-top: -32.5px;
  position: absolute;
  top: 50%;
  z-index: 20;

  ${({ theme }) => isClassic(theme) && css`
    margin-top: -22.5px;
  `}
`;

const CarouselPreviousButtonWrapperStyle = CarouselNavigationStyle;
const CarouselNextButtonWrapperStyle = styled(CarouselNavigationStyle)`
  right: 0;
`;

const CarouselButtonStyle = styled.button`
  border: none;
  width: 40px;
  height: 64px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
  }

  &:active {
    border: none;
  }

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.focus};
  }

  ${({ theme }) => isClassic(theme) && css`
    width: 45px; 
    height: 45px;
    background-color: #CCD6DA;
    color: rgba(0,0,0, 0.85);

    :hover{
      background-color: #99ADB6;
      color: #255BC7;
      cursor: default;
    }

      &:focus {
        outline: none;
        border: none;
      }
  `}
`;

const CarouselStyledIcon = styled(Icon)`
  cursor: pointer;
  display: inline-block;

  &&::before {
    font-size: 16px;
  }

  ${({ theme }) => isClassic(theme) && css`
    &&::before {
      font-size: 25px;
    } 
  `}
`;

const CarouselStyledIconLeft = styled(CarouselStyledIcon)`
  transform: rotate(90deg);
`;

const CarouselStyledIconRight = styled(CarouselStyledIcon)`
  transform: rotate(-90deg);
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

  ${({ theme }) => isClassic(theme) && css`
    border: 1px solid #4C6F7F;
    background: transparent;
    width: 8px;
    height: 8px;
    margin: 0px 5px;
  `}
`;

const CarouselSelectorWrapperStyle = styled.div`
  height: 20px;
  margin-top: 5px;
  text-align: center;

    ${CarouselSelectorInputStyle}:checked {
    + ${CarouselSelectorLabelStyle} {
      background: ${({ theme }) => theme.carousel.activeSelectorBackground};
      border-color: transparent;
      height: 10px;
      position: relative;
      width: 10px;

      ${({ theme }) => isClassic(theme) && css`
        background: #255BC7;
        top: 1px;
      `}
    }
  }
`;

const CarouselSelectorInputWrapperStyle = styled.span`
  display: inline-block;
  line-height: 20px;
  vertical-align: middle;

  ${({ theme }) => isClassic(theme) && css`
    width: 22px;
  `}
`;

const CarouselSliderWrapper = styled.div`
transition: .4s;
display: flex;
position: relative;
left: ${({ elementIndex }) => 10 - (80 * elementIndex)}%;
`;

const CarouselWrapperStyle = styled.div`
  .carbon-carousel__content {
    overflow: hidden;
    position: relative;
}

  /* ${slideAnimation}; */
  /* ${fadeAnimation}; */
`;

CarouselNavigationStyle.defaultProps = {
  theme: baseTheme
};

CarouselButtonStyle.defaultProps = {
  theme: baseTheme
};

CarouselStyledIcon.defaultProps = {
  theme: baseTheme
};

CarouselSelectorWrapperStyle.defaultProps = {
  theme: baseTheme
};

CarouselSelectorLabelStyle.defaultProps = {
  theme: baseTheme
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
  CarouselSliderWrapper
};
