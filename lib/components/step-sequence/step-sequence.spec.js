'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _stepSequence = require('./step-sequence');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<StepSequence />', function () {
  var stepSequence = void 0;

  beforeAll(function () {
    stepSequence = (0, _enzyme.shallow)(_react2.default.createElement(
      _stepSequence.StepSequence,
      null,
      _react2.default.createElement(
        'div',
        null,
        'Children'
      )
    ));
  });

  test('basic render', function () {
    expect(stepSequence).toMatchSnapshot();
  });
});