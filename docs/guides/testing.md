# Testing Tips

* Be sure to familiarize yourself with [Enzyme's API](http://airbnb.io/enzyme/docs/api/index.html) and the different options available for rendering components in tests.

## General

* In general, use `shallow` to render components and only test the component itself (rather than its children). Only use `mount` or `render` for specific tests that require a full DOM instance (see below).

* When writing new specs, pay attention to any errors appearing in the console output and make sure you address them. They are often signs that your tests are not testing the component correctly. In some cases, they highlight problems with the component code itself.

## Lifecycle methods

* React lifecycle methods should never be called directly in tests. Instead the component should be run through a simulated lifecycle to trigger the desired lifecycle method.

* The easiest way to test the mount and unmount lifecycle methods is to use the Enzyme `mount` api.

 e.g.

 ```javascript
  import { mount } from 'enzyme';
  ...
  let wrapper;

  describe('componentWillMount', () => {
    it('calls myMethod ', () => {
      spyOn(myObject, myMethod);
      wrapper = mount(<MyComponent />);
      expect(myObject.myMethod).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('calls myUnmountMethod ', () => {
      spyOn(myObject, myUnmountMethod);
      wrapper = mount(<MyComponent />);
      wrapper.unmount();
      expect(myObject.myUnmountMethod).toHaveBeenCalled();
    });
  });
```

* To test `componentWillReceiveProps` or `componentWillUpdate`, use Enzyme's [`setProps` method](https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/setProps.md) with `shallow` render.
