import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import { Select, Option } from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';

const singleSelectStore = new Store({
  value: undefined
});

const multiSelectStore = new Store({
  value: []
});

storiesOf('Experimental/Select', module)
  .add('Single Select', () => {
    return (
      <State store={ singleSelectStore }>
        <Select
          disabled={ boolean('disabled') }
          errorMessage={ text('errorMessage') }
          infoMessage={ text('infoMessage') }
          label={ text('label') }
          labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
          labelInline={ boolean('labelInline') }
          onChange={ (ev) => { singleSelectStore.set({ value: ev.target.value }); } }
          placeholder={ text('placeholder') }
          readOnly={ boolean('readOnly') }
          size={ select('size', OptionsHelper.sizesRestricted) }
          warningMessage={ text('warningMessage') }
        >
          <Option text='Amber' value='1' />
          <Option text='Black' value='2' />
          <Option text='Blue' value='3' />
          <Option text='Brown' value='4' />
          <Option text='Green' value='5' />
          <Option text='Orange' value='6' />
          <Option text='Pink' value='7' />
          <Option text='Purple' value='8' />
          <Option text='Red' value='9' />
          <Option text='White' value='10' />
          <Option text='Yellow' value='11' />
        </Select>
      </State>
    );
  })

  .add('Multi Select', () => {
    return (
      <State store={ multiSelectStore }>
        <Select
          disabled={ boolean('disabled') }
          errorMessage={ text('errorMessage') }
          infoMessage={ text('infoMessage') }
          label={ text('label') }
          labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
          labelInline={ boolean('labelInline') }
          onChange={ (ev) => { multiSelectStore.set({ value: ev.target.value }); } }
          placeholder={ text('placeholder') }
          readOnly={ boolean('readOnly') }
          size={ select('size', OptionsHelper.sizesRestricted) }
          warningMessage={ text('warningMessage') }
        >
          <Option text='Amber' value='1' />
          <Option text='Black' value='2' />
          <Option text='Blue' value='3' />
          <Option text='Brown' value='4' />
          <Option text='Green' value='5' />
          <Option text='Orange' value='6' />
          <Option text='Pink' value='7' />
          <Option text='Purple' value='8' />
          <Option text='Red' value='9' />
          <Option text='White' value='10' />
          <Option text='Yellow' value='11' />
        </Select>
      </State>
    );
  });
