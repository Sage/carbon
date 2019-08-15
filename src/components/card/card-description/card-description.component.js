import React from 'react';
import propTypes from 'prop-types';
import StyledCardDescription from './card-description.style';

const CardDescription = ({
  description,
  theme,
  ...props
}) => {
  const descProps = (description && description[0]) ? description[0] : null;
  const { primary, secondary, tertiary } = descProps || {
    primary: null, secondary: null, tertiary: null
  };
  return (
    <StyledCardDescription
      data-element='card-description'
      theme={ theme }
      { ...props }
    >
      { description && (
        <>
          {
            primary && (
              <p
                data-element='primary-description'
                className='primary-description'
              >{ primary }
              </p>
            )
          }
          {
            secondary && (
              <p
                data-element='secondary-description'
                className='secondary-description'
              >{ secondary }
              </p>
            )
          }
          {
            tertiary && (
              <p
                data-element='tertiary-description'
                className='tertiary-description'
              >{ tertiary }
              </p>
            )
          }
        </>
      )}
    </StyledCardDescription>
  );
};


CardDescription.propTypes = {
  description: propTypes.array,
  theme: propTypes.object
};

export default CardDescription;
