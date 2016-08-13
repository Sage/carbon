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
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h4');
        expect(header.textContent).toEqual('Title');
      });

      describe('when pod is collapsible', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(<Pod title='Title' collapsed={true} />);
        });

        it('Adds a additional collaspsible arrow to the the header', () => {
          let arrow = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-pod__arrow');
          expect(arrow.className).toEqual('ui-icon ui-pod__arrow ui-pod__arrow--true icon-dropdown');
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

  describe('mainClasses', () => {
    describe('if border is enabled and there is no footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.mainClasses).toEqual('ui-pod ui-pod--primary');
      });
    });

    describe('if border is disabled and there is a footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={<div />} />);
        expect(instance.mainClasses).toEqual('ui-pod ui-pod--primary ui-pod--no-border ui-pod--footer');
      });
    });
  });

  describe('contentClasses', () => {
    describe('if border is enabled and there is no footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.contentClasses).toEqual('ui-pod__content ui-pod__content--primary ui-pod--padding-medium');
      });
    });

    describe('if border is disabled and there is a footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={<div />} />);
        expect(instance.contentClasses).toEqual('ui-pod__content ui-pod__content--primary ui-pod--padding-medium ui-pod__content--footer ui-pod--no-border');
      });
    });
  });

  describe('footerClasses', () => {
    describe('if border is enabled and there is no footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.footerClasses).toEqual('ui-pod__footer ui-pod__footer--primary ui-pod__footer--padding-medium');
      });
    });

    describe('if border is disabled and there is a footer', () => {
      it('renders relevant classes', () => {
        instance = TestUtils.renderIntoDocument(<Pod border={ false } />);
        expect(instance.footerClasses).toEqual('ui-pod__footer ui-pod__footer--primary ui-pod__footer--padding-medium ui-pod--no-border');
      });
    });
  });

  describe('footer', () => {
    describe('if there is no footer', () => {
      it('returns null', () => {
        instance = TestUtils.renderIntoDocument(<Pod />);
        expect(instance.footer).toBe(null);
      });
    });

    describe('if there is a footer', () => {
      it('returns the footer', () => {
        instance = TestUtils.renderIntoDocument(<Pod footer={ <div /> } />);
        let footer = instance.footer;
        expect(footer.props.className).toEqual(instance.footerClasses);
      });
    });   
  });

  describe('edit', () => {
    describe('if no prop is passed', () => {
      it('returns nothing', () => {
        expect(instance.edit).toBe(null);
      });
    });

    describe('if a string is passed', () => {
      it('returns a link with a href prop', () => {
        instance = TestUtils.renderIntoDocument(<Pod onEdit="foo" />);
        expect(instance.edit.props.to).toEqual('foo');
      });
    });

    describe('if a function is passed', () => {
      it('returns a link with an onClick prop', () => {
        let foo = () => {};
        instance = TestUtils.renderIntoDocument(<Pod onEdit={ foo } />);
        expect(instance.edit.props.onClick).toEqual(foo);
      });
    });

    describe('if an object is passed', () => {
      it('returns a link with a object as props', () => {
        let foo = { foo: "foo", bar: "bar" };
        instance = TestUtils.renderIntoDocument(<Pod onEdit={ foo } />);
        expect(instance.edit.props.foo).toEqual("foo");
        expect(instance.edit.props.bar).toEqual("bar");
      });
    });
  });

  describe('render', () => {
    it('applies all props to the pod', () => {
      instance = TestUtils.renderIntoDocument(<Pod foo="bar" />);
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.props.foo).toEqual("bar");
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
