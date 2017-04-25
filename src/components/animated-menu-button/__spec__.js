import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import AnimatedMenuButton from './animated-menu-button';
import Row from 'components/row';
import Button from 'components/button';
import Pod from 'components/pod';
import Device from './../../utils/helpers/devices';

describe('AnimatedMenuButton', () => {
  let basicWidget, labelWidget, customClassWidget, rightWidget, largeWidget, contentWidget, button;

  beforeEach(() => {
    basicWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton />
    );

    labelWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton label="Create..." />
    );

    customClassWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton className='quick-create'/>
    );

    rightWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton direction='right'/>
    );

    largeWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton size='large'/>
    );

    contentWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton>
        <Row>
          <Pod>
            <h2 className="title">Column 1</h2>
            Finances
          </Pod>
          <Pod>
            <h2 className="title">Column 2</h2>
            <Button>Forecast</Button>
          </Pod>
          <Pod>
            <h2 className="title">Column 3</h2>
            <a href='#'>Budget</a>
          </Pod>
        </Row>
      </AnimatedMenuButton>
    );

    spyOn(basicWidget, 'setState').and.callThrough();
  });

  describe('a mouse enter event', () => {
    it('expands the menu', () => {
      TestUtils.Simulate.mouseEnter(basicWidget._button);
      expect(basicWidget.setState).toHaveBeenCalledWith({open: true });
      expect(basicWidget.blockBlur).toBeTruthy();
    });
  });

  describe('a mouse leave event', () => {
    it('contracts the menu', () => {
      TestUtils.Simulate.mouseLeave(basicWidget._button);
      expect(basicWidget.setState).toHaveBeenCalledWith({open: false });
      expect(basicWidget.blockBlur).toBeFalsy();
    });
  });

  describe('focusing on the button', () => {
    it('opens the menu', () => {
      TestUtils.Simulate.focus(basicWidget._button);
      expect(basicWidget.setState).toHaveBeenCalledWith({open: true });
      expect(basicWidget.blockBlur).toBeTruthy();
    });
  });

  describe('losing focus of the menu', () => {
    describe('if blockBlur is active', () => {
      it('does not close the menu', () => {
        basicWidget.blockBlur = true;
        TestUtils.Simulate.blur(basicWidget._button);
        expect(basicWidget.setState).not.toHaveBeenCalled();
      });
    });

    describe('if blockBlur is not active', () => {
      it('closes the menu', () => {
        TestUtils.Simulate.blur(basicWidget._button);
        expect(basicWidget.setState).toHaveBeenCalledWith({open: false });
      });
    });
  });

  describe('a touch event', () => {
    beforeEach(() => {
      basicWidget.setState({ touch: true });
    });

    describe('when the menu is open', () => {
      beforeEach(() => {
        basicWidget.setState({ open: true });
        basicWidget.blockBlur = true;
      });

      it('closes the menu', () => {
        basicWidget.setState.calls.reset();
        let closeIcon = basicWidget._closeIcon.children[0];

        TestUtils.Simulate.touchEnd(closeIcon);
        expect(basicWidget.setState).toHaveBeenCalled();
      });
    });

    describe('when the menu is closed', () => {
      beforeEach(() => {
        basicWidget.setState({ open: false });
        basicWidget.blockBlur = false;
      });

      it('opens the menu', () => {
      TestUtils.Simulate.touchEnd(basicWidget._button);
      expect(basicWidget.state.open).toBeTruthy();
      expect(basicWidget.blockBlur).toBeTruthy();
      });
    });
  });

  describe('close handler', () => {
    it('closes the menu', () => {
      basicWidget.closeHandler();
      expect(basicWidget.setState).toHaveBeenCalled();
      expect(basicWidget.blockBlur).toBeFalsy();
    });
  });

  describe('labelHTML', () => {
    describe('when no label is passed', () => {
      it('returns an empty string', () => {
        expect(basicWidget.labelHTML()).toBeFalsy();
      });
    });

    describe ('when a label is passed', () => {
      it('returns the HTML for the label', () => {
        expect(labelWidget.labelHTML().props.className).toEqual('carbon-animated-menu-button__label');
        expect(labelWidget.labelHTML().props.children).toEqual('Create...');
      });
    });
  });

  describe('innerHTML', () => {
    it('returns the HTML for the content', () => {
      expect(contentWidget.innerHTML().props.className).toEqual('carbon-animated-menu-button__content');
      expect(contentWidget.innerHTML().props.children.length).toEqual(3);
    });

    describe('when it is a touch device', () => {
      it('adds a close icon to the content HTML', () => {
        basicWidget.setState({ touch: true });
        expect(basicWidget.innerHTML().props.children[0].props.children.props.type).toEqual('close');
      });
    });

    describe('when it is not a touch device', () => {
      it('does not add a close icon to the content HTML', () => {
        basicWidget.setState({ touch: false });
        expect(basicWidget.innerHTML().props.children[1]).not.toBeDefined();
      });
    });
  });

  describe('mainClasses', () => {
    describe('a basic widget', () => {
      it('returns the default main classes', () => {
        expect(basicWidget.mainClasses()).toMatch('carbon-animated-menu-button');
        expect(basicWidget.mainClasses()).toMatch('carbon-animated-menu-button--medium');
        expect(basicWidget.mainClasses()).toMatch('carbon-animated-menu-button--left');
        expect(basicWidget.mainClasses()).toMatch('');
      });
    });

    describe('when a custom class is provided', () => {
      it('returns the custom class name as well', () => {
        expect(customClassWidget.mainClasses()).toMatch('quick-create');
      });
    });

    describe('when a different opening direction or size is specified', () => {
      it('adds the corresponding classNames', () => {
        expect(rightWidget.mainClasses()).toMatch('carbon-animated-menu-button--right');
        expect(largeWidget.mainClasses()).toMatch('carbon-animated-menu-button--large');
      });
    });
  });

  describe('componentProps', () => {
    describe('when it is a touch device', () => {
      it('adds a touch handler', () => {
        basicWidget.setState({ touch: true });
        expect(basicWidget.componentProps().onTouchEnd).toBeDefined();
      });
    });

    describe('when it is not a touch device', () => {
      it('does not add the touch handler', () => {
        basicWidget.setState({ touch: false });
        expect(basicWidget.componentProps().onTouchEnd).toBeFalsy();
      });
    });
  });

  describe('closeIcon', () => {
    it('returns the HTML for the close Icon', () => {
      expect(basicWidget.closeIcon().props.children.props.type).toEqual('close');
    });
  });

  describe('render', () => {
    describe('when the menu is expanded', () => {
      it('renders the content', () => {
        TestUtils.Simulate.mouseEnter(basicWidget._button);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(basicWidget, 'carbon-animated-menu-button__content').length).toEqual(1);
      });
    });

    describe('when the menu is closed', () => {
      it('does not render the content', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(basicWidget, 'carbon-animated-menu-button__content').length).toEqual(0);
      });
    });
  });
});
