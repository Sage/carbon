import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import PortraitContainer from './portrait-container';
import Portrait from './../portrait';
import Content from './../content';

describe('PortraitContainer', () => {
  let instance;

  describe('render', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <PortraitContainer
          gravatar={ 'madeup@home.com' }
          size={ 'medium-small' }
          containerTitle={ 'Fred Spanner' }
          containerSubtitle={ 'A subtitle' }
          />
      );
    });

    it('renders PortraitContainer', () => {
      expect(instance.mainClasses).toEqual('ui-portrait-container');
    });

    it('renders Content', () => {
      let content = TestUtils.findRenderedComponentWithType(instance, Content);
      expect(content).toBeDefined();
      expect(content.props.title).toEqual('Fred Spanner');

      let node = ReactDOM.findDOMNode(content);
      expect(node.innerHTML).toContain("A subtitle");
    });

    it('renders Portrait', () => {
      let portrait = TestUtils.findRenderedComponentWithType(instance, Portrait);
      expect(portrait).toBeDefined();
      expect(portrait.props.gravatar).toEqual('madeup@home.com');
      expect(portrait.props.initials).toEqual('FS');
      expect(portrait.props.size).toEqual('medium-small');
    });

    describe('getInitials', () => {
      it('returns the initials from containerTitle', () => {
        expect(instance.getInitials).toEqual('FS');
      });

      it('returns the initials passed in as containerInitials', () => {
        instance = TestUtils.renderIntoDocument(
          <PortraitContainer
            gravatar={ 'madeup@home.com' }
            size={ 'medium-small' }
            containerTitle={ 'Fred Spanner' }
            containerInitials={ 'DR' }
            containerSubtitle={ 'A subtitle' }
            />
        );
        expect(instance.getInitials).toEqual('DR');
      });

      it('returns 1 initial if a single string', () => {
        instance = TestUtils.renderIntoDocument(
          <PortraitContainer
            gravatar={ 'madeup@home.com' }
            size={ 'medium-small' }
            containerTitle={ 'Fred' }
            containerInitials={ '' }
            containerSubtitle={ 'A subtitle' }
            />
        );
        expect(instance.getInitials).toEqual('F');
      });
    });
  });
});
