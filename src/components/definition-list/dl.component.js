import React from 'react';
import propTypes from '@styled-system/prop-types';
import PropTypes from 'prop-types';
import { StyledDl, StyledDtDiv, StyledDdDiv } from './definition-list.style';
import Dt from './dt.component';
import Dd from './dd.component';

const Dl = ({
  children,
  w = 50,
  dtTextAlign = 'right',
  ddTextAlign = 'left'
}) => {
  const dtLabels = React.Children.toArray(children).filter(child => child.type === Dt);
  const ddContent = React.Children.toArray(children).filter(child => child.type === Dd);

  return (
    <StyledDl data-component='dl'>

      <StyledDtDiv w={ w } dtTextAlign={ dtTextAlign }>
        {dtLabels}
      </StyledDtDiv>

      <StyledDdDiv w={ w } ddTextAlign={ ddTextAlign }>
        {ddContent}
      </StyledDdDiv>

    </StyledDl>
  );
};

Dl.propTypes = {
  ...propTypes.space,
  /** This string will specify the text align styling of the `<dt></dt>`. */
  dtTextAlign: PropTypes.oneOf(['left', 'center', 'right']),
  /** This string will specify the text align styling of the `<dd></dd>`. */
  ddTextAlign: PropTypes.oneOf(['left', 'center', 'right']),
  /** This value will specify the width of the `StyledDtDiv` as a percentage. The remaining space will be taken up
      by the `StyledDdDiv`.
   */
  w: PropTypes.number,
  /**
   * @private
   * @ignore
   */
  children: PropTypes.node.isRequired
};
export default Dl;
