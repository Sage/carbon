import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import AnimatedMenuButton from './animated-menu-button';
import Row from 'components/row';
import Button from 'components/button';
import Pod from 'components/pod';

fdescribe('AnimatedMenuButton', () => {
  let basicWidget, labelWidget, customClassWidget, rightWidget, bigWidget, contentWidget;

  beforeEach(() => {
    basicWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton  />
    );

    labelWidget = TestUtils.renderIntoDocument(
        <AnimatedMenuButton label="Create..." />
      );

    customClassWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton  className='quick-create'/>
    );

    rightWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton  direction='right'/>
    );

    bigWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton size='big'/>
    );

    contentWidget = TestUtils.renderIntoDocument(
      <AnimatedMenuButton>
        <Row>
          <Pod>
            <h2 className="title">Column 1</h2>
            PEEKABOO
          </Pod>
          <Pod>
            <h2 className="title">Column 2</h2>
            <Button>A Button</Button>
          </Pod>
          <Pod>
            <h2 className="title">Column 3</h2>
            <a href='#'>This will be a link</a>
          </Pod>
        </Row>
      <AnimatedMenuButton />
    );

  describe('A basic animated menu button', () => {
    describe('a mouse over event', () => {
      it('expands the menu', () => {
        expect(basicWidget.setState).toHaveBeenCalledWith({open: true});
      })
    })
  });
});
