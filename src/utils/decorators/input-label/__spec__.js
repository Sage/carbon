import React from 'react';
import InputLabel from './index';

class BasicClass {
  props = {
    name: 'foo',
    label: 'test label'
  };

  context = {
    form: {
      model: 'model_1'
    }
  };
}

class FalseLabelClass {
  props = {
    name: 'bar',
    label: false
  };

  context = {
    form: {
      model: 'model_2'
    }
  };
}


class UnnamedClass {
  props = {
    name: 'bar'
  };

  context = {
    form: {
      model: 'model_3'
    }
  };
}

class ValidationClass {
  props = {
    name: 'foo',
    label: 'Validate Label',
    validations: true
  };

  context = {
    form: {
      model: 'model_4'
    }
  };
}

describe('InputLabel', () => {

  let instance, instanceTwo, instanceThree, instanceFour;

  beforeEach(() => {
    let ExtendedClassOne = InputLabel(BasicClass);
    instance = new ExtendedClassOne();

    let ExtendedClassTwo = InputLabel(FalseLabelClass);
    instanceTwo = new ExtendedClassTwo();

    let ExtendedClassThree = InputLabel(UnnamedClass);
    instanceThree = new ExtendedClassThree();

    let ExtendedClassFour = InputLabel(ValidationClass);
    instanceFour = new ExtendedClassFour();
  });

  describe('labelHTML', () => {
    describe('when label is set to false', () => {
      it('does not add a label', () => {
        expect(instanceTwo.labelHTML).not.toBeDefined;
      });
    });

    describe('when no label is provided', () => {
      it('titleizes the name to provide the label text', () => {
        var label = instanceThree.labelHTML;
        expect(label.props.children).toEqual('Bar');
      });
    });

    describe('when the input has a label', () => {
      it('sets the labelText to the passed in label', () => {
        var label = instance.labelHTML;
        expect(label.props.children).toEqual('test label');
      });

      describe('when the input has validations', () => {
        it('adds additional symbols to the label', () => {
          var label = instanceFour.labelHTML;
          expect(label.props.children).toEqual('Validate Label*');
        });
      });
    });
  });

  describe('inputProps', () => {
    describe('inputProps are passed', () => {
      it('builds the id with provided inputProps', () => {
        expect(instance.inputProps.id).toEqual('model_1[foo]');
      });
    });
  });
});
