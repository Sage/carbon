import React from 'react';
import propTypes from 'prop-types';
import {
  StyledCardSection,
  StyledCardContent
} from './card-section.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const { cardSection, cardTextTypes } = OptionsHelper;

/** function to iterate over the section's props and render as content */
function renderCardContent({
  positionType,
  inline,
  ...props
}) {
  console.log(positionType, props);
  return Object.keys(props).map((key) => {
    return (
      <StyledCardContent
        data-element={ `${positionType}-${cardTextTypes[key]}` }
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
  console.log(props);
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
