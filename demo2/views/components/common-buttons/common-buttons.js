import React from 'react';
import Button from 'components/button';

const CommonButtons = {
  github: (className) => {
    return (
      <Button
        as='primary'
        className={ className }
        href='https://github.com/Sage/carbon'
      >
        View on Github
      </Button>
    );
  },

  download: (className) =>  {
    return (
      <Button
        className={ className }
        href='https://github.com/Sage/carbon/releases/tag/v0.27.0'
      >
        Download Carbon
      </Button>
    );
  }
};

export default CommonButtons;
