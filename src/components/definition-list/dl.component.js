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
  const dlComponent = [];
  const listChildren = React.Children.toArray(children);
  let dtLabel;
  let ddContent = [];

  Object.keys(listChildren).forEach((key) => {
    if (listChildren[key].type === Dt) {
      dtLabel = listChildren[key];
    } else if (listChildren[key].type === Dd) {
      ddContent.push(listChildren[key]);
    }
    if (dtLabel
      && (parseInt(key, 10) === (listChildren.length - 1) || listChildren[parseInt(key, 10) + 1].type === Dt)) {
      dlComponent.push(
        <StyledDl data-component='dl' key={ `dl_${key}` }>

          <StyledDtDiv w={ w } dtTextAlign={ dtTextAlign }>
            {dtLabel}
          </StyledDtDiv>

          <StyledDdDiv w={ w } ddTextAlign={ ddTextAlign }>
            {ddContent}
          </StyledDdDiv>

        </StyledDl>
      );
      dtLabel = undefined;
      ddContent = [];
    }
  });

  return (dlComponent);
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
