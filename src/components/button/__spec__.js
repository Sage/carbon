import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from './button';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import snapShotTest from '../../utils/helpers/spec/snapshot';

describe('Button', () => {
  let component, tree;
  const spy = jasmine.createSpy('spy');

  describe('snapshots', () => {
    describe('A basic button', () => {
      it('renders a button with defaults', () => {
        component = renderer.create(<Button>Save</Button>);
        snapShotTest(component);
      });
    });

    describe('A primary button', () => {
      it('renders a primary button', () => {
        component = renderer.create(
          <Button as='primary' onClick={ spy }>
            Primary
          </Button>
        );
        snapShotTest(component);
      });
    });

    describe('A secondary button', () => {
      it('renders a secondary button', () => {
        component = renderer.create(
          <Button className='customClass' theme='red'>Secondary</Button>
        );
        snapShotTest(component);
      });
    });

    describe('A small button', () => {
      it('renders a small button', () => {
        component = renderer.create(<Button size='small'>Small</Button>);
        snapShotTest(component);
      });
    });

    describe('A large button', () => {
      it('renders a large button', () => {
        component = renderer.create(<Button size='large'>Large</Button>);
        snapShotTest(component);
      });
    });

    describe('A disabled button', () => {
      it('renders a disabled button', () => {
        component = renderer.create(<Button disabled>Disabled</Button>);
        snapShotTest(component);
      });
    });

    describe('when a to prop is passed', () => {
      it('renders an anchor', () => {
        component = renderer.create(<Button to='/foo'>Anchor</Button>);
        snapShotTest(component);
      });
    });

    describe('when an href prop is passed', () => {
      it('renders an anchor', () => {
        component = renderer.create(<Button href='/foo'>To</Button>);
        snapShotTest(component);
      });
    });
  });

  describe('Passing a custom onClick', () => {
    it('triggers when the button is clicked', () => {
      const wrapper = shallow(<Button onClick={ spy }>Test</Button>);
      wrapper.find('.carbon-button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('tags on component', () => {
    it('includes correct component, element and role data tags', () => {
      const wrapper = shallow(<Button data-element='bar' data-role='baz'>Test</Button>);
      rootTagTest(wrapper, 'button', 'bar', 'baz');
    });
  });
});
