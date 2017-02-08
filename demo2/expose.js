// expose additional classes to the window
global['React'] = require('react');
global['ReactDOM'] = require('react-dom');
global['Immutable'] = require('immutable');
global['Dispatcher'] = require('./dispatcher').default;
global['ComponentConstants'] = require('./constants/component').default;
global['Request'] = require('superagent');
global['serialize'] = require('utils/helpers/serialize').default;
global['Button'] = require('components/button').default;
