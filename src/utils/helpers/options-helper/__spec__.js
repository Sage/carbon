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
      'magenta-dull',
      'red',
      'white'
    ]);
  });
  it('buttonIconPositions', () => {
    expect(OptionsHelper.buttonIconPositions).toEqual([
      'before',
      'after'
    ]);
  });
  it('cardSectionPositions', () => {
    expect(OptionsHelper.cardSectionPositions).toEqual({
      footer: 'footer',
      header: 'header',
      middle: 'middle'
    });
  });
  it('cardTextTypes', () => {
    expect(OptionsHelper.cardTextTypes).toEqual({
      primary: 'primary',
      secondary: 'secondary',
      tertiary: 'tertiary'
    });
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
  it('pillColors', () => {
    expect(OptionsHelper.pillColors).toEqual([
      'neutral',
      'negative',
      'positive'
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
      'attach',
      'basket',
      'bin',
      'blocked',
      'blocked_square',
      'bulk_destroy',
      'business',
      'calendar',
      'call',
      'camera',
      'card_view',
      'caret_down',
      'cart',
      'chat',
      'chart_bar',
      'chart_line',
      'chart_pie',
      'chat_notes',
      'chevron_down',
      'chevron_left',
      'chevron_right',
      'chevron_up',
      'clock',
      'close',
      'collaborate',
      'copy',
      'connect',
      'credit_card',
      'credit_card_slash',
      'cross',
      'csv',
      'delete',
      'delivery',
      'disputed',
      'download',
      'drag',
      'drag_vertical',
      'draft',
      'dropdown',
      'duplicate',
      'edit',
      'edited',
      'email',
      'ellipsis_horizontal',
      'ellipsis_vertical',
      'error',
      'favourite',
      'favourite_lined',
      'fax',
      'feedback',
      'filter',
      'filter_new',
      'fit_height',
      'fit_width',
      'folder',
      'gift',
      'graph',
      'grid',
      'help',
      'home',
      'image',
      'in_progress',
      'in_transit',
      'info',
      'individual',
      'key',
      'link',
      'list_view',
      'locked',
      'location',
      'logout',
      'marker',
      'message',
      'messages',
      'minus',
      'mobile',
      'pdf',
      'people',
      'person',
      'phone',
      'play',
      'plus',
      'print',
      'progressed',
      'question',
      'refresh',
      'remove',
      'save',
      'search',
      'services',
      'settings',
      'share',
      'shop',
      'sort_down',
      'sort_up',
      'submitted',
      'sync',
      'tick',
      'unlocked',
      'upload',
      'uploaded',
      'video',
      'view',
      'warning',
      'white-tick'
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
  it('buttonTypes', () => {
    expect(OptionsHelper.buttonTypes).toEqual([
      'primary',
      'secondary',
      'tertiary',
      'destructive',
      'darkBackground'
    ]);
  });
  it('themesBinary', () => {
    expect(OptionsHelper.themesBinary).toEqual([
      'primary',
      'secondary',
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
  it('formButtonOptions', () => {
    expect(OptionsHelper.formButtonOptions).toEqual([
      'save',
      'cancel'
    ]);
  });
  it('additionalActionAlignments', () => {
    expect(OptionsHelper.actionOptions).toEqual([
      'Button',
      'Link'
    ]);
  });
  it('additionalActionAlignments', () => {
    expect(OptionsHelper.additionalActionAlignments).toEqual([
      'additionalActions',
      'leftAlignedActions',
      'rightAlignedActions'
    ]);
  });
});
