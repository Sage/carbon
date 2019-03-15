import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import ImmutableHelper from '../../utils/helpers/immutable';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import DropdownFilter from './dropdown-filter';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

const store = new Store({
  value: ''
});

const create = (evt, component) => component.state.filter;

// Shared Props
const onChange = (evt) => {
  store.set({ value: evt.target.value });
  action('change')(evt);
};
const autoFocus = boolean('autoFocus', false);
const cacheVisibleValue = boolean('cacheVisibleValue', true);
const disabled = boolean('disabled', false);
const name = text('name', 'Name');
const readOnly = boolean('readOnly', false);
const timeToDisappear = number('timeToDisappear', 0);
const label = text('label', 'Dropdown Label');
const labelInline = boolean('labelInline', true);
const labelWidth = labelInline ? text('labelWidth', '') : undefined;
const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;
const labelHelp = text('labelHelp', 'This is help text');
const inputWidth = text('inputWidth', '');
const fieldHelp = text('fieldHelp', 'This is field help text');
const fieldHelpInline = boolean('fieldHelpInline', false);
const createText = text('createText', '');
const createIconType = text('createIconType', '');
const suggest = boolean('suggest', false);
const freetext = boolean('freetext', false);
const options = ImmutableHelper.parseJSON([
  {
    id: 1, name: 'Orange'
  }, {
    id: 2, name: 'Blue'
  }
]);

const infoText = (
  <div>
    <p>A dropdown filter widget.</p>

    <StoryHeader>How to use a dropdown in a component:</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      {'import DropdownFilter from "carbon-react/lib/components/dropdown-filter";'}
    </StoryCode>

    <p>To render a DropdownFilter:</p>

    <StoryCode padded>
      {'<DropdownFilter name="foo" options={ foo } onChange={ myChangeHandler } />'}
    </StoryCode>

    <p>The developer should pass data to the store as JSON. e.g.</p>

    <StoryCode padded>
      {'foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]'}
    </StoryCode>

    <p>
      {"When using the component in 'suggest' mode, the dropdown only shows once a filter term has been entered."}
    </p>

    <p>
      {"In 'freetext' mode, the component mimics 'suggest', but allows write-in text values as well as list options."}
    </p>

    <p>
      {"Specify an initial write-in value with the 'visibleValue' property."}
    </p>

    <p>
      {"Setting the 'freetextName' property adds a second hidden input for the write-in value."}
    </p>

    <p>
      {"Otherwise, the 'name' property is used for the option id."}
    </p>

    <p>
      {"You can define a function for the 'create' prop, which allows you to trigger events to create new items."}
    </p>
  </div>
);

storiesOf('Dropdown Filter', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    return (
      <State store={ store }>
        <DropdownFilter
          autoFocus={ autoFocus }
          cacheVisibleValue={ cacheVisibleValue }
          disabled={ disabled }
          name={ name }
          readOnly={ readOnly }
          timeToDisappear={ timeToDisappear }
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          createText={ createText }
          createIconType={ createIconType }
          suggest={ suggest }
          freetext={ freetext }
          options={ options }
          onChange={ onChange }
          value={ store.get('value') }
        />
      </State>
    );
  }, {
    info: { text: infoText },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add('with Create', () => {
    return (
      <State store={ store }>
        <DropdownFilter
          autoFocus={ autoFocus }
          cacheVisibleValue={ cacheVisibleValue }
          disabled={ disabled }
          name={ name }
          readOnly={ readOnly }
          timeToDisappear={ timeToDisappear }
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          createText={ createText }
          createIconType={ createIconType }
          suggest={ suggest }
          freetext={ freetext }
          create={ create }
          options={ options }
          onChange={ onChange }
          value={ store.get('value') }
        />
      </State>
    );
  }, {
    info: { text: infoText },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
