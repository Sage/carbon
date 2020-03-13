import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon-react/lib/utils/router';

// Loads base css from carbon:
import 'carbon-react/lib/utils/css';

import Index from './components';
import Chrome from './components/chrome';

import UncontrolledRadioButton from './components/uncontrolled/radio-button';
import UncontrolledSwitch from './components/uncontrolled/switch';
import ControlledRadioButton from './components/controlled/radio-button';
import ControlledSwitch from './components/controlled/switch';
import UncontrolledDecimal from './components/uncontrolled/decimal';
import ControlledDecimal from './components/controlled/decimal';
import ControlledTextArea from './components/controlled/textarea';
import UncontrolledTextArea from './components/uncontrolled/textarea';
import ControlledTextbox from './components/controlled/textbox';
import UncontrolledTextbox from './components/uncontrolled/textbox';
import ControlledNumber from './components/controlled/number';
import UncontrolledNumber from './components/uncontrolled/number';
import ControlledGroupedCharacter from './components/controlled/grouped-character';
import UncontrolledGroupedCharacter from './components/uncontrolled/grouped-character';
import ControlledSimpleColorPicker from './components/controlled/simple-color-picker';
import UncontrolledSimpleColorPicker from './components/uncontrolled/simple-color-picker';
import ControlledDate from './components/controlled/date';
import UncontrolledDate from './components/uncontrolled/date';
import ControlledSingleSelect from './components/controlled/select';
import UnControlledSingleSelect from './components/uncontrolled/select';
import ControlledMultiSelect from './components/controlled/multi-select';
import UnControlledMultiSelect from './components/uncontrolled/multi-select';
import ControlledDateRange from './components/controlled/date-range';
import UncontrolledDateRange from './components/uncontrolled/date-range';
import UncontrolledCheckboxGroup from './components/uncontrolled/checkbox-group';
import ControlledCheckboxGroup from './components/controlled/checkbox-group';
import UncontrolledCheckbox from './components/uncontrolled/checkbox';
import ControlledCheckbox from './components/controlled/checkbox';
import UncontrolledSearch from './components/uncontrolled/search';
import ControlledSearch from './components/controlled/search';

const routes = {
  'radio-button': {
    description: 'Radio Button',
    controlled: ControlledRadioButton,
    uncontrolled: UncontrolledRadioButton
  },
  switch: { description: 'Switch', controlled: ControlledSwitch, uncontrolled: UncontrolledSwitch },
  date: { description: 'Date', controlled: ControlledDate, uncontrolled: UncontrolledDate },
  dateRange: { description: 'Date Range', controlled: ControlledDateRange, uncontrolled: UncontrolledDateRange },
  decimal: { description: 'Decimal', controlled: ControlledDecimal, uncontrolled: UncontrolledDecimal },
  textarea: { description: 'Text Area', controlled: ControlledTextArea, uncontrolled: UncontrolledTextArea },
  textbox: { description: 'Text Box', controlled: ControlledTextbox, uncontrolled: UncontrolledTextbox },
  number: { description: 'Number', controlled: ControlledNumber, uncontrolled: UncontrolledNumber },
  'grouped-character': {
    description: 'Grouped Character',
    controlled: ControlledGroupedCharacter,
    uncontrolled: UncontrolledGroupedCharacter
  },
  'simple-color-picker': {
    description: 'Simple Color Picker',
    controlled: ControlledSimpleColorPicker,
    uncontrolled: UncontrolledSimpleColorPicker
  },
  'single-select': {
    description: 'Single-Select',
    controlled: ControlledSingleSelect,
    uncontrolled: UnControlledSingleSelect
  },
  'multi-select': {
    description: 'Multi-Select',
    controlled: ControlledMultiSelect,
    uncontrolled: UnControlledMultiSelect
  },
  checkboxgroup: {
    description: 'Checkbox Group',
    uncontrolled: UncontrolledCheckboxGroup,
    controlled: ControlledCheckboxGroup
  },
  checkbox: {
    description: 'Checkbox',
    uncontrolled: UncontrolledCheckbox,
    controlled: ControlledCheckbox
  },
  search: {
    description: 'Search',
    uncontrolled: UncontrolledSearch,
    controlled: ControlledSearch
  }
};


startRouter(
  [
    <Route
      key='0' path='/'
      component={ Index }
      routes={ routes }
    />,
    <Route
      key='1' path='/'
      component={ Chrome }
    >
      {Object.keys(routes).filter(key => routes[key].controlled).map((key) => {
        const path = `/controlled/${key}`;
        return (
          <Route
            key={ path } path={ path }
            component={ routes[key].controlled }
          />
        );
      })}
      {Object.keys(routes).filter(key => routes[key].uncontrolled).map((key) => {
        const path = `/uncontrolled/${key}`;
        return (
          <Route
            key={ path } path={ path }
            component={ routes[key].uncontrolled }
          />
        );
      })}
    </Route>
  ]
);

// Enables hot reloading through webpack:
if (module.hot) {
  module.hot.accept();
}
