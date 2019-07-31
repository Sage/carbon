import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';


const CarouselButtonStyleClassic = (({ theme }) => isClassic(theme) && css`
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
`);

const CarouselSelectorLabelStyleClassic = (({ theme }) => isClassic(theme) && css`
  border: 1px solid #4C6F7F;
  background: transparent;
  width: 8px;
  height: 8px;
  margin: 0px 5px;
`);

export { CarouselButtonStyleClassic, CarouselSelectorLabelStyleClassic };
