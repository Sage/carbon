import React from 'react';
import propTypes from 'prop-types';
import StyledCardHeader from './card-header.style';

const CardHeader = ({
  header,
  theme,
  ...props
}) => {
  const headerProps = (header && header[0]) ? header[0] : null;
  const { title, subtitle } = headerProps || {
    title: null, subtitle: null
  };
  return (
    <StyledCardHeader
      data-element='card-header'
      { ...props }
    >
      { header && (
      <>
        {
          title && (
            <h2>{ title }</h2>
          )
        }
        {
          subtitle && (
            <p>{ subtitle }</p>
          )
        }
      </>
      )}
    </StyledCardHeader>
  );
};

CardHeader.propTypes = {
  header: propTypes.array,
  theme: propTypes.object
};

export default CardHeader;
