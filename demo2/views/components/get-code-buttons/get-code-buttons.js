import React from 'react';

import Button from 'components/button';

const GetCodeButtons = {
  github: () => {
    return (
      <Button
        as={ 'primary' }
        className='github'
        href='https://github.com/Sage/carbon'
        size='large'
        theme='magenta'
      >
        View on GitHub
      </Button>
    );
  },

  download: (theme) => {
    return (
      <Button
        as={ 'secondary' }
        className='download'
        href='https://github.com/Sage/carbon/releases'
        size='large'
        theme={ theme }
      >
        Download Carbon
      </Button>
    );
  },

  pair: () => {
    return (
      <div className='demo-get-code-buttons'>
        { GetCodeButtons.github() }
        { GetCodeButtons.download('white') }
      </div>
    );
  }
}

export default GetCodeButtons;
