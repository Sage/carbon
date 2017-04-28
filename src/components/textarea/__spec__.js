import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Textarea from './textarea';

describe('Textarea', () => {
  let baseInstance, expandableInstance;
  let spy = jasmine.createSpy('spy')

  beforeEach(() => {
    baseInstance = TestUtils.renderIntoDocument(<Textarea
      id='Dummy Area'
      value={ 'foo' }
      label={ 'Label' }
      cols={10}
      rows={10}
      onChange={ spy }
    />);

    expandableInstance = TestUtils.renderIntoDocument(<Textarea
      value={ 'foo' }
      label={ 'Label' }
      expandable={ true }
      cols={10}
      rows={10}
      characterLimit='100'
      onChange={ spy }
    />);
  });

  describe('componentDidMount', () => {
    describe('when textarea can be expanded', () => {

      it('adds a event listener to the window', () => {
        spyOn(window, 'addEventListener');
        expandableInstance.componentDidMount();
        expect(window.addEventListener).toHaveBeenCalledWith(
          'resize', expandableInstance.expandTextarea
        );
      });

      it('sets the minHeight to the rendered client height', () => {
        expect(expandableInstance.minHeight).toEqual(
          expandableInstance._input.clientHeight
        );
      });

      it('calls expandTextarea', () => {
        spyOn(expandableInstance, 'expandTextarea');
        expandableInstance.componentDidMount();
        expect(expandableInstance.expandTextarea).toHaveBeenCalled();
      });
    });

    describe('when textarea cannot be expanded', () => {
      it('does not setup the textarea for expanding', () => {
        spyOn(window, 'addEventListener');
        spyOn(baseInstance, 'expandTextarea');
        baseInstance.componentDidMount();
        expect(window.addEventListener).not.toHaveBeenCalled();
        expect(baseInstance.expandTextarea).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      spyOn(window, 'removeEventListener');
    });

    describe('when textarea can be expanded', () => {
      let wrapper = shallow(
        <Textarea
          value={ 'foo' }
          label={ 'Label' }
          expandable={ true }
          cols={10}
          rows={10}
          characterLimit='100'
          onChange={ spy }
        />
      );

      it('removes the event listener from the window', () => {
        wrapper.unmount();
        expect(window.removeEventListener).toHaveBeenCalledWith(
          'resize',jasmine.any(Function)
        );
      });
    });

    describe('when textarea cannot be expanded', () => {
      let wrapper = shallow(
        <Textarea
          id='Dummy Area'
          value={ 'foo' }
          label={ 'Label' }
          cols={10}
          rows={10}
          onChange={ spy }
        />
      );

      it('does not remove event listener from the window', () => {
        wrapper.unmount();
        expect(window.removeEventListener).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentDidUpdate', () => {
    describe('when textarea can be expanded', () => {
      beforeEach(() => {
        spyOn(expandableInstance, 'expandTextarea');
      });
      it('should call to resize the textarea', () => {
        expandableInstance.valLength = 2000;
        expandableInstance.componentDidUpdate({});
        expect(expandableInstance.expandTextarea).toHaveBeenCalled();
      });
    });

    describe('when textarea cannot be expanded', () => {
      beforeEach(() => {
        spyOn(baseInstance, 'expandTextarea');
        baseInstance.valLength = 2000;
        baseInstance.componentDidUpdate({});
      });

      it('does not resize the textarea', () => {
        expect(baseInstance.expandTextarea).not.toHaveBeenCalled();
      });
    });
  });

  describe('expandTextarea', () => {
    describe('when scrollHeight is greater than the min height', () => {
      it('sets the textareas height to fit the content', () => {
        expandableInstance._input = {
          scrollHeight: 100,
          value: 'foo',
          style: { height: 0 }
        }
        expandableInstance.expandTextarea();
        expect(expandableInstance._input.style.height).toEqual('100px');
      });
    });

    describe('when the scrollHeight is less than the minHeight', () => {
      it('does not update the textarea', () => {
        expandableInstance._input = {
          scrollHeight: 5,
          value: 'foo',
          style: { height: 0 }
        }
        expandableInstance.minHeight = 20;
        expandableInstance.expandTextarea();
        expect(expandableInstance._input.style.height).toEqual(0);
      });
    });
  });

  describe('mainClasses', () => {
    it('returns carbon-textarea and additional decorated classes', () => {
      expect(baseInstance.mainClasses).toEqual('carbon-textarea common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns carbon-textarea__input and additional decorated classes', () => {
      expect(baseInstance.inputClasses).toEqual('carbon-textarea__input common-input__input');
    });

    describe('if the textarea is expandable', () => {
      it('returns an additional disable-scroll class', () => {
        expect(expandableInstance.inputClasses).toEqual('carbon-textarea__input carbon-textarea__input--disable-scroll common-input__input')
      });
    });
  });

  describe('characterCount', () => {
    describe('when characterLimit is set', () => {
      it('returns character limit div', () => {
        let counter = TestUtils.findRenderedDOMComponentWithClass(expandableInstance, 'carbon-textarea__character-limit');
        expect(counter.textContent).toEqual('You have used 3 of 100 characters');
      });
    });

    describe('when characterLimit is not set', () => {
      it('returns null', () => {
        expect(baseInstance.characterCount).toBeUndefined();
      });
    });
  });

  describe('render', () => {
    it('renders a parent div', () => {
      let textareaNode = TestUtils.scryRenderedDOMComponentsWithTag(baseInstance, 'div')[0];
      expect(textareaNode.classList[0]).toEqual('carbon-textarea');
    });

    it('renders with a visible input with rows and columns', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(baseInstance, 'textarea')
      expect(input.rows).toBe(10);
      expect(input.cols).toBe(10);
    });

    it('is decorated with a label', () => {
      let label = TestUtils.findRenderedDOMComponentWithTag(baseInstance, 'label')
      expect(label.getAttribute('for')).toEqual('Dummy Area');
    });

    it('is decorated with a validation if a error is present', () => {
      baseInstance.setState({errorMessage: 'Error', valid: false});
      let errorDiv = TestUtils.findRenderedDOMComponentWithClass(baseInstance, 'common-input__message--error')
      expect(errorDiv.textContent).toEqual('Error')
    });

    describe('when characterLimit is set', () => {
      describe('and enforceCharacterLimit is true', () => {
        it('sets a maxLength on the input', () => {
          let input = TestUtils.findRenderedDOMComponentWithTag(expandableInstance, 'textarea')
          expect(input.maxLength).toEqual(100);
        });
      });

      describe('and enforceCharacterLimit is false', () => {
        it('does not set a maxLength on the input', () => {
          let instance = TestUtils.renderIntoDocument(
            <Textarea
              label={ 'Label' }
              characterLimit='100'
              enforceCharacterLimit={ false }
            />
          );
          let input = TestUtils.findRenderedDOMComponentWithTag(instance, 'textarea')
          expect(input.maxLength).toEqual(-1);
        });
      });
    });
  });

  describe('mainClasses', () => {
    it('returns carbon-textarea and additional decorated classes', () => {
      expect(baseInstance.mainClasses).toEqual('carbon-textarea common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns carbon-textarea__input and additional decorated classes', () => {
      expect(baseInstance.inputClasses).toEqual('carbon-textarea__input common-input__input');
    });
  });

  describe('Passing a custom onChange', () => {
    it('triggers the custom function', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(baseInstance, 'textarea');
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('component tags', () => {
    let wrapper = shallow(
      <Textarea
        id='Dummy Area'
        value={ 'foo' }
        label={ 'Label' }
        cols={10}
        rows={10}
        onChange={ spy }
        data-element='bar'
        data-role='baz'
      />
    );

    describe('on component', () => {
      it('includes correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'textarea', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      it("adds element tags to it's children", () => {
        elementsTagTest(wrapper, ['character-limit']);
      });
    });
  });
});
