// __spec__.js
import React from 'react';
import { mount } from 'enzyme';

import DraggableContext from './../draggable-context';
import WithDrag from './with-drag';
import { DragSource } from 'react-dnd';

fdescribe('WithDrag', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <DraggableContext>
        <div>
          <WithDrag>
            <div>foo</div>
          </WithDrag>
        </div>
      </DraggableContext>
    );
  });

  describe('canDrag', () => {
    describe('with no custom method defined', () => {
      it('returns true', () => {
        let w = DragSource;
        debugger
        expect(wrapper.canDrag()).toEqual(true);
      });
    });
  });
});
