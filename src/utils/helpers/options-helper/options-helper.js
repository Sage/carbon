// TODO: refactor these options into seperate files which are consumed by both
// the components and the demo site.
//
// For example the PropTypes for align props can use this to know which options
// are available - as well as the demo site when rendering dropdowns.
let OptionsHelper = {
  alignBinary: [
    'left',
    'right'
  ],

  alignFull: [
    'center',
    'left',
    'right'
  ],

  alignAroundEdges: [
    'bottom',
    'center',
    'left',
    'right',
    'top'
  ],

  buttonColors: [
    'blue',
    'grey',
    'magenta',
    'red',
    'white'
  ],

  colors: [
    'default',
    'error',
    'help',
    'info',
    'maintenance',
    'new',
    'success',
    'warning'
  ],

  icons: [
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
  ],

  pageSizes: [10, 25, 50],

  positions: [
    'bottom',
    'left',
    'right',
    'top'
  ],

  shapes: [
    'circle',
    'rounded-rect',
    'square'
  ],

  shapesVaried: [
    'standard',
    'circle',
    'leaf'
  ],

  sizesFull: [
    'extra-small',
    'small',
    'medium-small',
    'medium',
    'medium-large',
    'large',
    'extra-large'
  ],

  sizesPod: [
    'extra-small',
    'small',
    'medium',
    'large',
    'extra-large'
  ],

  sizesRestricted: [
    'small',
    'medium',
    'large'
  ],

  sizesBinary: [
    'small',
    'large'
  ],

  themesBinary: [
    'primary',
    'secondary'
  ],

  themesFull: [
    'primary',
    'secondary',
    'tertiary',
    'tile',
    'transparent'
  ]
};

export default OptionsHelper;
