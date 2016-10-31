import React from 'react';
import Button from 'components/button';

const CommonButtons = {
  github: () => {
    return (
      <Button
        as={ 'primary' }
        className='github-button'
        href='https://github.com/Sage/carbon'
        size='large'
        theme='magenta'
      >
        View on Github
      </Button>
    );
  },

  download: (theme) =>  {
    return (
      <Button
        as={ 'secondary' }
        className='download-button'
        href='https://github.com/Sage/carbon/releases/tag/v0.27.0'
        size='large'
        theme={ theme }
      >
        Download Carbon
      </Button>
    );
  }
};

export default CommonButtons;
