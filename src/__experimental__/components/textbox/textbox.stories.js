import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Textbox from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';

storiesOf('Experimental/Textbox', module)
  .add('Basic', () => {
    return (
      <Textbox
        disabled={ boolean('disabled') }
        errorMessage={ text('errorMessage') }
        fieldHelp={ text('fieldHelp') }
        infoMessage={ text('infoMessage') }
        info={ text('info') }
        inputIcon={ select('inputIcon', OptionsHelper.icons) }
        label={ text('label') }
        labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warningMessage={ text('warningMessage') }
      />
    );
  })
  .add('Multiple', () => {
    return ([
      <Textbox
        disabled={ boolean('disabled') }
        errorMessage={ text('errorMessage') }
        fieldHelp={ text('fieldHelp') }
        infoMessage={ text('infoMessage') }
        label={ text('label') }
        labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warningMessage={ text('warningMessage') }
        key='0'
      />,
      <Textbox
        disabled={ boolean('disabled') }
        errorMessage={ text('errorMessage') }
        fieldHelp={ text('fieldHelp') }
        infoMessage={ text('infoMessage') }
        label={ text('label') }
        labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warningMessage={ text('warningMessage') }
        key='1'
      />
    ]);
  });
