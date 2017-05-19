'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var elementsTagTest = function elementsTagTest(wrapper, elements) {
  elements.forEach(function (element) {
    it('include \'data-element="' + element + '"\'', function () {
      expect(wrapper.find({ 'data-element': element }).length).toEqual(1);
    });
  });
};

var rootTagTest = function rootTagTest(rootNode, comp, elem, role) {
  expect(rootNode.prop('data-component')).toEqual(comp);
  expect(rootNode.prop('data-element')).toEqual(elem);
  expect(rootNode.prop('data-role')).toEqual(role);
};

exports.elementsTagTest = elementsTagTest;
exports.rootTagTest = rootTagTest;