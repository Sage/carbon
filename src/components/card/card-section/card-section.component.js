import React from 'react';
import propTypes from 'prop-types';
import {
  StyledCardSection,
  StyledCardContent
} from './card-section.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const { cardSection } = OptionsHelper;

/** function to iterate over the section's props and render as content */
function renderCardContent({
  positionType,
  inline,
  ...props
}) {
  return Object.keys(props).map((key, index) => {
    return (
      <StyledCardContent
        key={ `${key}-${String(index)}` }
        data-element={ `${positionType}-${key}` }
        positionType={ positionType }
        styleType={ key }
      >
        { props[key] }
      </StyledCardContent>
    );
  });
}

const CardSection = ({
  align,
  ...props
}) => {
  return (
    <StyledCardSection
      data-element='card-section'
      align={ align }
    >
      { renderCardContent(props) }
    </StyledCardSection>
  );
};

CardSection.propTypes = {
  /** text alignment of the card section text */
  align: propTypes.oneOf(OptionsHelper.alignFull),
  /** position of width in the card */
  positionType: propTypes.oneOf(Object.keys(cardSection)),
  /** text value of the primary element */
  primary: propTypes.string,
  /** text value of the secondary element */
  secondary: propTypes.string,
  /** text value of the tertiary element */
  tertiary: propTypes.string
};

export default CardSection;
