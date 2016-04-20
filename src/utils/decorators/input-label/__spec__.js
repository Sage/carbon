import React from 'react';
import InputLabel from './input-label';

class BasicClass {
  props = {
    name: 'foo',
    label: 'test label',
    labelInline: true,
    labelWidth: 20
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
    validations: ['foo', { asterisk: true }],
    value: 'qux'
  };

  context = {
    form: {
      model: 'model_4'
    }
  };
}


class AltValidationClass {
  props = {
    name: 'foo',
    label: 'Validate Label',
    validations: ['foo'],
    value: 'qux',
    id: 'bar'
  };

  context = {
    form: {
      model: 'model_4'
    }
  };
}

class NamelessClass {
  props = {
  };

  context = {
    form: {
      model: 'model_2'
    }
  };
}


class LabelHelpClass {
  props = {
    name: 'foo',
    label: 'test label',
    labelHelp: 'help label',
    labelInline: true,
    labelWidth: 20
  };

  context = {
    form: {
      model: 'model_1'
    }
  };
}

describe('InputLabel', () => {
  let instanceBasic, instanceFalse, instanceUnNamed,
      instanceValidation, instanceAltValidation, instanceNameless,
      instanceLabelHelp;

  beforeEach(() => {
    let ExtendedClassOne = InputLabel(BasicClass);
    instanceBasic = new ExtendedClassOne();

    let ExtendedClassTwo = InputLabel(FalseLabelClass);
    instanceFalse = new ExtendedClassTwo();

    let ExtendedClassThree = InputLabel(UnnamedClass);
    instanceUnNamed = new ExtendedClassThree();

    let ExtendedClassFour = InputLabel(ValidationClass);
    instanceValidation = new ExtendedClassFour();

    let ExtendedClassFive = InputLabel(AltValidationClass);
    instanceAltValidation = new ExtendedClassFive();

    let ExtendedClassSix = InputLabel(NamelessClass);
    instanceNameless = new ExtendedClassSix();

    let ExtendedClassSeven = InputLabel(LabelHelpClass);
    instanceLabelHelp = new ExtendedClassSeven();
  });

  describe('labelHTML', () => {
    describe('when label is set to false', () => {
      it('does not add a label', () => {
        expect(instanceFalse.labelHTML).not.toBeDefined();
      });
    });

    describe('when no name is provided', () => {
      it('does not add a label', () => {
        expect(instanceNameless.labelHTML).not.toBeDefined();
      });
    });

    describe('when no label is provided', () => {
      it('titleizes the name to provide the label text', () => {
        let label = instanceUnNamed.labelHTML;
        expect(label.props.children).toEqual('Bar Qux');
      });
    });

    describe('when the input has a label', () => {
      it('sets the labelText to the passed in label', () => {
        let label = instanceBasic.labelHTML;
        expect(label.props.children).toEqual('test label');
      });

      describe('when the input has a validation with asterisk enabled', () => {
        it('adds additional symbols to the label', () => {
          let label = instanceValidation.labelHTML;
          expect(label.props.children).toEqual('Validate Label*');
        });
      });

      describe('when the input does not have a validation with asterisk enabled', () => {
        it('does not add additional symbols to the label', () => {
          let label = instanceAltValidation.labelHTML;
          expect(label.props.children).toEqual('Validate Label');
        });
      });
    });

    describe('when label width is passed', () => {
      it('sets a width for the label', () => {
        expect(instanceBasic.labelHTML.props.style.width).toEqual('20%');
      });
    });
  });

  describe('labelHelpHTML', () => {
    describe('when label help is provided', () => {
      it('renders the help within a span', () => {
        let help = instanceLabelHelp.labelHelpHTML;
        expect(help.type).toEqual('span');
        expect(help.props.children).toEqual('help label');
      });
    });

    describe('when label help is not provided', () => {
      it('does not return a help span', () => {
        expect(instanceBasic.labelHelpHTML).toBeUndefined();
      });
    });
  });

  describe('inputProps', () => {
    describe('inputProps are passed', () => {
      it('builds the id with random guid', () => {
        expect(instanceBasic.inputProps.id).toEqual(instanceBasic._guid);
      });
    });
  });

  describe('fieldProps', () => {
    describe('when label has a width', () => {
      it('sets a width for the field', () => {
        expect(instanceBasic.fieldProps.style.width).toEqual('80%');
      });
    });

    describe('when label does not have a width', () => {
      it('does not set a width for the field', () => {
        expect(instanceFalse.fieldProps.style).toBe(undefined);
      });
    });
  });

  describe('mainClasses', () => {
    it('adds the label inline class if input is inline', () => {
      expect(instanceBasic.mainClasses).toEqual('common-input--label-inline');
    });

    it('does not add the label inline class if input is inline', () => {
      expect(instanceFalse.mainClasses).toEqual('');
    });
  });
});
