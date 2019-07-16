import styled from 'styled-components';

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


export { CarouselNavigationStyle, CarouselNextButtonWrapperStyle, CarouselPreviousButtonWrapperStyle };
