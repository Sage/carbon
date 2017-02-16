// expose additional classes to the window
global['React'] = require('react');
global['ReactDOM'] = require('react-dom');
global['I18n'] = require('i18n-js');
global['Immutable'] = require('immutable');
global['ImmutableHelper'] = require('utils/helpers/immutable').default;
global['Dispatcher'] = require('./dispatcher').default;
global['ComponentConstants'] = require('./constants/component').default;
global['Request'] = require('superagent');
global['serialize'] = require('utils/helpers/serialize').default;
global['Row'] = require('components/row').default;
global['PresenceValidation'] = require('utils/validations/presence').default;
