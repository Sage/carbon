import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Pod from './pod';
import Button from './../button';

describe('Pod', () => {
  let instance;

  describe('componentWillMount', () => {
    describe('when collapsed is passed as a prop', () => {
      it('sets the collapsed state to the passed value', () => {
        instance = TestUtils.renderIntoDocument(<Pod collapsed={true} />);
        expect(instance.state.collapsed).toBeTruthy();
      });
    });

    describe('when collapsed is not passed as a prop', () => {
      it('sets the collapsed state is not defined', () => {
        instance = TestUtils.renderIntoDocument(<Pod/>);
        expect(instance.state.collapsed).toBeUndefined();
      });
    });
  });

  describe('podHeader', () => {
    describe('when title is not passed as a prop', () => {
      it('returns null', () => {
        instance = TestUtils.renderIntoDocument(<Pod/>);
        expect(instance.podHeader).toBeUndefined();
      });
    });

    describe('when title is passed as a prop', () => {
      it('Adds a title to the pod', () => {
        instance = TestUtils.renderIntoDocument(<Pod title='Title'/>);
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        expect(header.textContent).toEqual('Title');
      });

      describe('when pod is collapsible', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(<Pod title='Title' collapsed={true} />);
        });

        it('Adds a additional collaspsible arrow to the the header', () => {
          let arrow = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-pod__arrow');
          expect(arrow.className).toEqual('ui-pod__arrow ui-pod__arrow--true icon-dropdown');
        });

        it('Adds a additonal class header', () => {
          let header = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-pod__header');
          expect(header.className).toEqual('ui-pod__header unselectable ui-pod__header--true');
        });

        it('Adds a onClick handler to the header', () => {
          spyOn(instance, 'setState');
          let header = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-pod__header');
          TestUtils.Simulate.click(header);
          expect(instance.setState).toHaveBeenCalledWith({ collapsed: false });
        });
      });

      describe('when pod is NOT collapsible', () => {
        it('does not add additional collapsible arrow', () => {
          instance = TestUtils.renderIntoDocument(<Pod title='Title'/>);
          let arrows = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-pod__arrow');
          expect(arrows.length).toEqual(0);
        });
      });
    });
  });

  describe('podDescription', () => {
    describe('when description is passed as a prop', () => {
      it('renders a description div', () => {
        instance = TestUtils.renderIntoDocument(
          <Pod title='Title' description='This is the pod description'/>
        );
        let description = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-pod__description');
        expect(description.textContent).toEqual('This is the pod description');
      });
    });

    describe('when description is not passed as a prop', () => {
      it('does not render a description', () => {
        instance = TestUtils.renderIntoDocument(<Pod/>);
        let description = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-pod__description');
        expect(description.length).toEqual(0);
      });
    });
  });

  describe('render', () => {
    it('renders a parent div with a pod CSS class', () => {
      instance = TestUtils.renderIntoDocument(<Pod/>);
      let podNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0]
      expect(podNode.className).toEqual('ui-pod');
    });

    describe('when a custom className is passed', () => {
      it('adds the class to the surrounding parent div', () => {
        instance = TestUtils.renderIntoDocument(<Pod className="CustomClass"/>);
        let podNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0]
        expect(podNode.className).toEqual('ui-pod CustomClass');
      });
    });

    describe('pod content', () => {
      describe('when pod is closed', () => {
        it('does not render the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod collapsed={true} ><Button>Button</Button> </Pod>
          );
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(0);
        });
      });

      describe('when pod is open', () => {
        it('renders the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod collapsed={false} ><Button>Button</Button> </Pod>
          );
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(1);
        });
      });

      describe('when pod is not collapsible', () => {
        instance = TestUtils.renderIntoDocument(
          <Pod><Button>Button</Button> </Pod>
        );
        it('renders the pods content', () => {
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons.length).toEqual(1);
        });
      });
    });

    it('renders all children passed to it', () => {
      instance = TestUtils.renderIntoDocument(
        <Pod>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </Pod>
      );

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
      expect(buttons.length).toEqual(3);
    });
  });
});
