import React from 'react';
import I18n from 'i18n-js';

import Button from 'components/button';
import './get-code-buttons.scss';

const GetCodeButtons = {
  github: () => {
    return (
      <Button
        as={ 'primary' }
        className='github'
        href='https://github.com/Sage/carbon'
        size='large'
        theme='magenta'
        target="_blank"
      >
        { I18n.t('navigation.github.view') }
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
        target="_blank"
      >
        { I18n.t('navigation.github.download') }
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
