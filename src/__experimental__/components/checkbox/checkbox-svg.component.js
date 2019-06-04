import React from 'react';
import StyledCheckboxSvgWrapper from './checkbox-svg-wrapper.style';

const CheckboxSvg = () => {
  return (
    <StyledCheckboxSvgWrapper>
      <svg
        width='12'
        height='10'
        viewBox='0 0 12 10'
      >
        <path
          d={ 'M.237 6.477A.752.752 0 0 1 .155 5.47l.851-1.092a.63.63 0 0 1 .934-.088l2.697 1.964, '
            + '4.674-6a.63.63 0 0 1 .933-.088l1.015.917c.28.254.317.703.081 1.005L6.353 8.492a.725.725, '
            + '0 0 1-.095.16l-.85 1.093a.637.637 0 0 1-.626.244.638.638 0 0 1-.335-.16L.237 6.476z' }
          fill='#FFFFFF'
          fillRule='evenodd'
        />
      </svg>
    </StyledCheckboxSvgWrapper>
  );
};

export default CheckboxSvg;
