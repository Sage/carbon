import React from 'react';
import LabelIcon from './label-icon';

class BasicClass {
  props = {
    name: 'foo'
  };
};

  class LabelClass {
    props = {
      name: 'bar',
      labelIconType: 'info'
    };
  }

describe('label-icon', () => {
  let instanceBasic, instanceLabel;

  beforeEach(() => {
    let ExtendedClassOne = LabelIcon(BasicClass);
    instanceBasic = new ExtendedClassOne();

    let ExtendedClassTwo = LabelIcon(LabelClass);
    instanceLabel = new ExtendedClassTwo();
  });

  describe('when a label-icon type is passed', () => {
    it('adds the icon to the label', () => {
      expect(instanceBasic.labelIconHTML).not.toBeDefined();
    });
  });

  describe('when a label-icon type is not passed', () => {
    it('does not render a label icon', () => {
      expect(instanceLabel.labelIconHTML.props.type).toEqual('info');
    });
  });
});
