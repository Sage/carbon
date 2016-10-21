import React from 'react';
import Button from 'components/button';

const CommonButtons = {
  githubButton: (className) => {
    return (
      <Button
        as='primary'
        className={ className }
        href='https://github.com/Sage/carbon'
        target='_blank'
      >
        View on Github
      </Button>
    );
  },

  downloadButton: (className) =>  {
    return (
      <Button
        className={ className }
        href='https://github.com/Sage/carbon/releases/tag/v0.27.0'
        target='_blank'
      >
        Download Carbon
      </Button>
    );
  }
};

export default CommonButtons;
