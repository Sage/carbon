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
    name: 'bar qux'
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
    validations: true,
    value: 'qux'
  };

  context = {
    form: {
      model: 'model_4'
    }
  };
}

describe('InputLabel', () => {

  let instanceBasic, instanceFalse, instanceUnNamed, instanceValidation;

  beforeEach(() => {
    let ExtendedClassOne = InputLabel(BasicClass);
    instanceBasic = new ExtendedClassOne();

    let ExtendedClassTwo = InputLabel(FalseLabelClass);
    instanceFalse = new ExtendedClassTwo();

    let ExtendedClassThree = InputLabel(UnnamedClass);
    instanceUnNamed = new ExtendedClassThree();

    let ExtendedClassFour = InputLabel(ValidationClass);
    instanceValidation = new ExtendedClassFour();
  });

  describe('labelHTML', () => {
    describe('when label is set to false', () => {
      it('does not add a label', () => {
        expect(instanceFalse.labelHTML).not.toBeDefined();
      });
    });

    describe('when no label is provided', () => {
      it('titleizes the name to provide the label text', () => {
        var label = instanceUnNamed.labelHTML;
        expect(label.props.children).toEqual('Bar Qux');
      });
    });

    describe('when the input has a label', () => {
      it('sets the labelText to the passed in label', () => {
        var label = instanceBasic.labelHTML;
        expect(label.props.children).toEqual('test label');
      });

      describe('when the input has validations', () => {
        it('adds additional symbols to the label', () => {
          var label = instanceValidation.labelHTML;
          expect(label.props.children).toEqual('Validate Label*');
        });
      });
    });
  });

  describe('inputProps', () => {
    describe('inputProps are passed', () => {
      it('builds the id with provided inputProps', () => {
        expect(instanceBasic.inputProps.id).toEqual('model_1[foo]');
      });
    });
  });
});
