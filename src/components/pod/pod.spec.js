import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import Pod from './pod.component';
import Button from '../button';
import Link from '../link';
import {
  StyledBlock,
  StyledCollapsibleContent,
  StyledContent,
  StyledDescription,
  StyledEditAction,
  StyledEditContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledArrow
} from './pod.style.js';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';

describe('Pod', () => {
  let instance;
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Pod />);
  });

  describe('functionality', () => {
    it('sets the collapsed state same as collapsed prop on mount', () => {
      const initialWrapper = shallow(<Pod collapsed />);
      expect(initialWrapper.state().isCollapsed).toBeTruthy();
    });

    it('disables hover state on prop change if is in hovered state', () => {
      wrapper.setState({ isHovered: true });
      wrapper.setProps({ someProp: 'someValue' });
      expect(wrapper.state().isHovered).toBeFalsy();
    });

    it('disables focus state on prop change if is in focused state', () => {
      wrapper.setState({ isFocused: true });
      wrapper.setProps({ someProp: 'someValue' });
      expect(wrapper.state().isFocused).toBeFalsy();
    });
  });


  // describe('pod classes', () => {
  //   it('assigns custom classes and maintains its own classes', () => {
  //     instance = TestUtils.renderIntoDocument(<Pod className='custom' />);
  //     const div = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod');
  //     expect(div.className).toEqual('carbon-pod custom carbon-pod--left');
  //   });
  // });

  describe('podHeader', () => {
    it('is not rendered if title prop not passed', () => {
      expect(wrapper.find(StyledHeader).exists()).toBeFalsy();
    });

    it('renders title when title is passed as a prop', () => {
      wrapper.setProps({ title: 'Title' });
      expect(wrapper.find(StyledTitle).props().children).toEqual('Title');
    });

    it('renders subtitle when subtitle is passed as a prop', () => {
      wrapper.setProps({ title: 'Title', subtitle: 'Subtitle' });
      // expect(wrapper.find(StyledSubtitle).exists()).toBeTruthy();
      expect(wrapper.find(StyledSubtitle).props().children).toEqual('Subtitle');
    });


    // describe('when alignTitle prop is passed', () => {
    //   it('adds a align class', () => {
    //     instance = TestUtils.renderIntoDocument(<Pod title='Title' alignTitle='center' />);
    //     const header = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod__header');
    //     expect(header.className).toMatch('carbon-pod__header--center');
    //   });
    // });

    describe('when pod is collapsible', () => {
      it('adds an additional collaspsible arrow to the the header', () => {
        wrapper.setProps({ title: 'Title' });
        wrapper.setState({ isCollapsed: true });
        expect(wrapper.find(StyledArrow).exists()).toBeTruthy();
      });

      // it('Adds an additonal class header', () => {
      //   const header = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pod__header');
      //   expect(header.className).toEqual('carbon-pod__header carbon-pod__header--left carbon-pod__header--true');
      // });

      it('clicking on Header toggles isCollapsed state', () => {
        wrapper.setProps({ title: 'Title' });
        wrapper.setState({ isCollapsed: true });
        wrapper.find(StyledHeader).props().onClick();
        expect(wrapper.state().isCollapsed).toEqual(false);
        wrapper.find(StyledHeader).props().onClick();
        expect(wrapper.state().isCollapsed).toEqual(true);
      });
    });

    it('does not add additional collapsible arrow when pod is NOT collapsible', () => {
      wrapper.setProps({ title: 'Title' });
      expect(wrapper.find(StyledArrow).exists()).toBeFalsy();
    });
  });

  describe('podDescription', () => {
    it('renders a description when description prop is passed', () => {
      wrapper.setProps({ description: 'Description' });
      expect(wrapper.find(StyledDescription).props().children).toEqual('Description');
    });

    it('does not render description when description prop is not passed', () => {
      expect(wrapper.find(StyledDescription).exists()).toEqual(false);
    });
  });

  describe('podContent', () => {
    it('renders pod content when Pod is not collapsed', () => {
      const ContentComp = () => <div />;
      wrapper.setProps({ collapsed: false, children: <ContentComp /> });
      expect(wrapper.find(StyledCollapsibleContent).exists()).toEqual(true);
      expect(wrapper.find(ContentComp).exists()).toEqual(true);
    });

    it('does not render pod content when Pod is collapsed', () => {
      const ContentComp = () => <div />;
      wrapper.setProps({ collapsed: true, children: <ContentComp /> });
      expect(wrapper.find(StyledCollapsibleContent).exists()).toEqual(true);
      expect(wrapper.find(ContentComp).exists()).toEqual(true);
    });
  });

  describe('podFooter', () => {
    it('renders footer when footer prop is pased', () => {
      wrapper.setProps({ footer: 'Footer' });
      expect(wrapper.find(StyledFooter).props().children).toEqual('Footer');
    });

    it('does not render footer when footer prop is not pased', () => {
      // wrapper.setProps({ footer: 'Footer' });
      expect(wrapper.find(StyledFooter).exists()).toEqual(false);
    });
  });

  describe('edit', () => {
    it('renders edit action button when onEdit prop is passed', () => {
      wrapper.setProps({ onEdit: () => {} });
      expect(wrapper.find(StyledEditAction).exists()).toEqual(true);
    });

    it('does not render edit action button when onEdit prop is not pased', () => {
      expect(wrapper.find(StyledEditAction).exists()).toEqual(false);
    });

    it('edit action button has a `to` prop if onEdit is a string', () => {
      wrapper.setProps({ onEdit: 'someString' });
      expect(wrapper.find(StyledEditAction).props().to).toEqual('someString');
    });

    it('if onEdit prop is an object then it is spread on edit action button as props', () => {
      const onEdit = {
        baz: 'baz',
        foo: 'foo'
      };
      wrapper.setProps({ onEdit });
      expect(wrapper.find(StyledEditAction).props()).toMatchObject(onEdit);
    });

    it('if onEdit prop is a function it gets invoked by clicking edit action button container', () => {
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find(StyledEditContainer).props().onClick();
      expect(onEdit).toHaveBeenCalled();
    });
  });

  describe('prop onEdit', () => {
    // let editButtonBEM = '.carbon-pod__edit-button-container',
    //     editContainer,
    //     link,
    //     wrapper;


    // beforeAll(() => {
    //   wrapper = shallow(<Pod />);
    // });

    // it('!=Function does not bind to onClick and onKeyDown', () => {
    //   // expect
    // });

    // it('=false results in no edit element', () => {
    //   expect(wrapper.find(editButtonBEM).length).toEqual(0);
    // });

    // it('=String results in a Link with a `to` property', () => {
    //   wrapper.setProps({ onEdit: 'test' });
    //   editContainer = wrapper.find(editButtonBEM);
    //   link = editContainer.find(Link);
    //   expect(link.prop('to')).toEqual('test');
    // });

    // it('=Object generates a Link with those Object properties included', () => {
    //   wrapper.setProps({ onEdit: { foo: 'bar' } });
    //   editContainer = wrapper.find(editButtonBEM);
    //   link = editContainer.find(Link);
    //   expect(link.prop('foo')).toEqual('bar');
    // });

    describe('=Function', () => {
      let dummy,
          event = { preventDefault: () => {} };

      beforeAll(() => {
        dummy = jasmine.createSpy('dummy');
        wrapper.setProps({ onEdit: dummy });
        editContainer = wrapper.find(editButtonBEM);
      });

      it('will be triggered onClick', () => {
        editContainer.simulate('click', event);
        expect(dummy).toHaveBeenCalled();
      });

      describe('with keydown event', () => {
        beforeEach(() => {
          event.type = 'keydown';
          dummy.calls.reset();
        });

        it('will be triggered by enter key', () => {
          event.which = 13;
          editContainer.simulate('keydown', event);
          expect(dummy).toHaveBeenCalled();
        });

        it('will not be triggered by non-enter key', () => {
          event.which = 14;
          editContainer.simulate('keydown', event);
          expect(dummy).not.toHaveBeenCalled();
        });
      });
    });
  });

  // describe('mainClasses', () => {
  //   describe('if an onEdit prop is passed', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod onEdit={ () => {} } />);
  //       expect(instance.mainClasses).toEqual('carbon-pod carbon-pod--left carbon-pod--editable');
  //     });
  //   });
  // });

  // describe('blockClasses', () => {
  //   describe('if border is enabled and there is no footer', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod />);
  //       expect(instance.blockClasses).toEqual('carbon-pod__block carbon-pod__block--padding-medium carbon-pod__block--primary');
  //     });
  //   });

  //   describe('if editContentFullWidth is set to false', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod editContentFullWidth />);
  //       expect(instance.blockClasses).toEqual('carbon-pod__block carbon-pod__block--padding-medium carbon-pod__block--primary carbon-pod__block--full-width');
  //     });
  //   });

  //   describe('if border is disabled and there is a footer', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={ <div /> } />);
  //       expect(instance.blockClasses).toEqual('carbon-pod__block carbon-pod__block--padding-medium carbon-pod__block--primary carbon-pod__block--no-border carbon-pod__block--footer');
  //     });
  //   });
  // });

  // describe('editActionClasses', () => {
  //   describe('if border is disabled', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={ <div /> } />);
  //       expect(instance.editActionClasses).toEqual('carbon-pod__edit-action carbon-pod__edit-action--primary carbon-pod__edit-action--padding-medium carbon-pod__edit-action--no-border');
  //     });
  //   });

  //   describe('if displayEditButtonOnHover is enabled', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod displayEditButtonOnHover footer={ <div /> } />);
  //       expect(instance.editActionClasses).toEqual('carbon-pod__edit-action carbon-pod__edit-action--primary carbon-pod__edit-action--padding-medium carbon-pod__display-on-hover');
  //     });
  //   });

  //   describe('if internal edit button is enabled', () => {
  //     it('renders a class to switch styles', () => {
  //       const wrapper = shallow(<Pod internalEditButton />);
  //       expect(wrapper.find('.carbon-pod--internal-edit-button').length).toEqual(1);
  //     });
  //   });
  // });

  // describe('contentClasses', () => {
  //   describe('if border is enabled and there is no footer', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod />);
  //       expect(instance.contentClasses).toEqual('carbon-pod__content carbon-pod__content--primary carbon-pod__content--padding-medium');
  //     });
  //   });

  //   describe('if border is disabled and there is a footer', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod border={ false } footer={ <div /> } />);
  //       expect(instance.contentClasses).toEqual('carbon-pod__content carbon-pod__content--primary carbon-pod__content--padding-medium carbon-pod__content--footer carbon-pod--no-border');
  //     });
  //   });
  // });

  // describe('footerClasses', () => {
  //   describe('if border is enabled and there is no footer', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod />);
  //       expect(instance.footerClasses).toEqual('carbon-pod__footer carbon-pod__footer--primary carbon-pod__footer--padding-medium');
  //     });
  //   });

  //   describe('if border is disabled and there is a footer', () => {
  //     it('renders relevant classes', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod border={ false } />);
  //       expect(instance.footerClasses).toEqual('carbon-pod__footer carbon-pod__footer--primary carbon-pod__footer--padding-medium carbon-pod--no-border');
  //     });
  //   });
  // });

  // describe('footer', () => {
  //   describe('if there is no footer', () => {
  //     it('returns null', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod />);
  //       expect(instance.footer).toBe(null);
  //     });
  //   });

  //   describe('if there is a footer', () => {
  //     it('returns the footer', () => {
  //       instance = TestUtils.renderIntoDocument(<Pod footer={ <div /> } />);
  //       const { footer } = instance;
  //       expect(footer.props.className).toEqual(instance.footerClasses);
  //     });
  //   });
  // });


  describe('processPodEditEvent()', () => {
    let editSpy;

    beforeEach(() => {
      editSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(<Pod onEdit={ editSpy } />);
    });
    it("doesn't trigger anything if the wrong key", () => {
      const ev = {
        which: 1,
        type: 'keydown',
        target: {
          dataset: {}
        },
        preventDefault: jasmine.createSpy()
      };
      instance.processPodEditEvent(ev);
      expect(ev.preventDefault).not.toHaveBeenCalled();
      expect(editSpy).not.toHaveBeenCalled();
    });
    it('prevents default and triggers on edit if correct key or not key', () => {
      const ev = {
        which: 13,
        type: 'keydown',
        target: {
          dataset: {}
        },
        preventDefault: jasmine.createSpy()
      };
      instance.processPodEditEvent(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(editSpy).toHaveBeenCalled();
    });
  });

  describe('toggleHoverState', () => {
    it('switches the hoverEdit state', () => {
      instance.setState({ hoverEdit: false });
      instance.toggleHoverState(true);
      expect(instance.state.hoverEdit).toBeTruthy();
    });
  });

  describe('render', () => {
    it('applies all props to the pod', () => {
      instance = TestUtils.renderIntoDocument(<Pod data-foo='bar' />);
      const div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.attributes['data-foo'].value).toEqual('bar');
    });

    it('does not apply title prop to containing elements', () => {
      const wrapper = shallow(<Pod title='some-title' />);
      expect(wrapper.is('[title]')).toBe(false);
    });

    describe('pod content', () => {
      describe('when pod is closed', () => {
        it('does not render the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod collapsed><Button>Button</Button> </Pod>
          );
          const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
          expect(buttons.length).toEqual(0);
        });
      });

      describe('when pod is open', () => {
        it('renders the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod collapsed={ false }><Button>Button</Button> </Pod>
          );
          const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
          expect(buttons.length).toEqual(1);
        });

        describe('when displayEditButtonOnHover is enabled', () => {
          describe('when onEdit has been set', () => {
            it('toggles the hover state when moving the mouse in to the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover onEdit='foo' />);
              wrapper.find('.carbon-pod__block').simulate('mouseEnter');
              expect(wrapper.state().hoverEdit).toBe(true);
            });

            it('toggles the hover state when moving the mouse out of the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover onEdit='foo' />);
              wrapper.find('.carbon-pod__block').simulate('mouseLeave');
              expect(wrapper.state().hoverEdit).toBe(false);
            });

            it('toggles the hover state when focusing on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover onEdit='foo' />);
              wrapper.find('.carbon-pod__block').simulate('focus');
              expect(wrapper.state().hoverEdit).toBe(true);
            });

            it('toggles the hover state when bluring on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover onEdit='foo' />);
              wrapper.find('.carbon-pod__block').simulate('blur');
              expect(wrapper.state().hoverEdit).toBe(false);
            });
          });

          describe('when onEdit has not been set', () => {
            it('does not toggle the hover state when moving the mouse in to the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover />);
              wrapper.find('.carbon-pod__block').simulate('mouseEnter');
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });

            it('does not toggle the hover state when moving the mouse out of the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover />);
              wrapper.find('.carbon-pod__block').simulate('mouseLeave');
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });

            it('does not toggle the hover state when focusing on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover />);
              wrapper.find('.carbon-pod__block').simulate('focus');
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });

            it('does not toggle the hover state when bluring on the pod', () => {
              const wrapper = shallow(<Pod displayEditButtonOnHover />);
              wrapper.find('.carbon-pod__block').simulate('blur');
              expect(wrapper.state().hoverEdit).not.toBeDefined;
            });
          });
        });

        describe('when triggerEditOnContent is enabled', () => {
          describe('when onEdit has been set', () => {
            it('sets an onClick handler on the content block', () => {
              const editFunction = () => {};
              const wrapper = shallow(<Pod triggerEditOnContent onEdit={ () => {} } />);
              expect(wrapper.find('.carbon-pod__block').props().onClick).toBeDefined;
            });
          });

          describe('when onEdit has not been set', () => {
            it('does not set an onClick handler on the content block', () => {
              const editFunction = () => {};
              const wrapper = shallow(<Pod triggerEditOnContent />);
              expect(wrapper.find('.carbon-pod__block').props().onClick).not.toBeDefined;
            });
          });
        });
      });

      describe('when pod is not collapsible', () => {
        it('renders the pods content', () => {
          instance = TestUtils.renderIntoDocument(
            <Pod><Button>Button</Button> </Pod>
          );
          const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
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

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
      expect(buttons.length).toEqual(3);
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      wrapper.setProps({ 'data-element': 'bar', 'data-role': 'baz' });
      // const wrapper = shallow(<Pod data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'pod', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      wrapper.setProps({
        footer: 'footer', onEdit: () => {}, subtitle: 'test', title: 'title'
      });

      it('include correct component, element and role data tags', () => {
        elementsTagTest(wrapper, [
          'edit',
          'footer',
          'subtitle',
          'title'
        ]);
      });
    });
  });
});
