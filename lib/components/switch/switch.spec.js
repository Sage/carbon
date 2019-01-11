'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _switch = require('./switch');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Switch', function () {
  var wrapper = void 0;

  it('renders a Switch component with reverse className', function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_switch2.default, {
      label: 'My label'
    }));
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a Switch component with loading dots, loading className and without the reverse className', function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_switch2.default, {
      label: 'My label',
      loading: true,
      reverse: false
    }));
    expect(wrapper).toMatchSnapshot();
  });

  it('removes loading from the props passed to Checkbox', function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_switch2.default, {
      label: 'My label',
      loading: true
    }));

    expect(wrapper.props().loading).toBe(undefined);
  });
});