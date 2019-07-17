import styled from 'styled-components';
import Icon from '../icon/icon';

const CarouselNavigationStyle = styled.div`
  margin-top: -22.5px;
  position: absolute;
  top: 50%;
  z-index: 20;
`;

const CarouselPreviousButtonWrapperStyle = CarouselNavigationStyle;
const CarouselNextButtonWrapperStyle = styled(CarouselNavigationStyle)`
  right: 0;
`;

const CarouselButtonStyle = styled.button`
  border: none;
  width: 45px;
  height: 45px;
  background-color: #CCD6DA;

  &:hover {
    color: #255BC7;
    background-color: #99ADB6;
  }

  &:focus {
    outline: none;
  }
`;

const CarouselStyledIcon = styled(Icon)`
  cursor: pointer;
  display: inline-block;

  &&::before {
    font-size: 25px;
  }
`;

const CarouselStyledIconLeft = styled(CarouselStyledIcon)`
  transform: rotate(90deg);
`;

const CarouselStyledIconRight = styled(CarouselStyledIcon)`
  transform: rotate(-90deg)
`;


export {
  CarouselNavigationStyle,
  CarouselNextButtonWrapperStyle,
  CarouselPreviousButtonWrapperStyle,
  CarouselButtonStyle,
  CarouselStyledIcon,
  CarouselStyledIconLeft,
  CarouselStyledIconRight
};
