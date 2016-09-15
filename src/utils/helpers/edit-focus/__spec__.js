import ReactDOM from 'react-dom';
import editFocus from './edit-focus';

describe('edit-focus', () => {
  it('focuses on the input field of the passed in ref', () => {
    let node = jasmine.createSpyObj(['focus', 'select']);
    spyOn(ReactDOM, 'findDOMNode').and.returnValue(node);
    editFocus('fakeRef');
    expect(node.focus).toHaveBeenCalled();
    expect(node.select).toHaveBeenCalled();
  });
});
