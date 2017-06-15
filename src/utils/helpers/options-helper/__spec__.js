import OptionsHelper from './options-helper';

describe('OptionsHelper', () => {
  it('alignBinary', () => {
    expect(OptionsHelper.alignBinary).toEqual([
      'left',
      'right'
    ]);
  });
  it('alignFull', () => {
    expect(OptionsHelper.alignFull).toEqual([
      'center',
      'left',
      'right'
    ]);
  });
  it('buttonColors', () => {
    expect(OptionsHelper.buttonColors).toEqual([
      'blue',
      'grey',
      'magenta',
      'red',
      'white'
    ]);
  });
  it('colors', () => {
    expect(OptionsHelper.colors).toEqual([
      'default',
      'error',
      'help',
      'info',
      'maintenance',
      'new',
      'success',
      'warning'
    ]);
  });
  it('icons', () => {
    expect(OptionsHelper.icons).toEqual([
      'add',
      'alert',
      'analysis',
      'arrow_down',
      'arrow_left',
      'arrow_right',
      'arrow_up',
      'blocked',
      'business',
      'calendar',
      'card_view',
      'cart',
      'chevron_down',
      'chevron_left',
      'chevron_right',
      'chevron_up',
      'clock',
      'copy',
      'csv',
      'delete',
      'download',
      'draft',
      'dropdown',
      'duplicate',
      'edit',
      'edited',
      'error',
      'favourite',
      'fax',
      'feedback',
      'gift',
      'home',
      'key',
      'link',
      'list_view',
      'logout',
      'marker',
      'message',
      'minus',
      'mobile',
      'pdf',
      'people',
      'person',
      'phone',
      'print',
      'progressed',
      'save',
      'search',
      'settings',
      'shop',
      'sort_down',
      'sort_up',
      'tick',
      'upload',
      'uploaded',
      'warning'
    ]);
  });
  it('pageSizes', () => {
    expect(OptionsHelper.pageSizes).toEqual([
      10, 25, 50
    ]);
  });
  it('positions', () => {
    expect(OptionsHelper.positions).toEqual([
      'bottom',
      'left',
      'right',
      'top'
    ]);
  });
  it('sizesFull', () => {
    expect(OptionsHelper.sizesFull).toEqual([
      'extra-small',
      'small',
      'medium-small',
      'medium',
      'medium-large',
      'large',
      'extra-large'
    ]);
  });
  it('sizesPod', () => {
    expect(OptionsHelper.sizesPod).toEqual([
      'extra-small',
      'small',
      'medium',
      'large',
      'extra-large'
    ]);
  });
  it('sizesRestricted', () => {
    expect(OptionsHelper.sizesRestricted).toEqual([
      'small',
      'medium',
      'large'
    ]);
  });
  it('sizesBinary', () => {
    expect(OptionsHelper.sizesBinary).toEqual([
      'small',
      'large'
    ]);
  });
  it('themesBinary', () => {
    expect(OptionsHelper.themesBinary).toEqual([
      'primary',
      'secondary'
    ]);
  });
  it('themesFull', () => {
    expect(OptionsHelper.themesFull).toEqual([
      'primary',
      'secondary',
      'tertiary',
      'tile',
      'transparent'
    ]);
  });
});
