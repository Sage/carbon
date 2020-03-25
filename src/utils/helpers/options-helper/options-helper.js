// TODO: refactor these options into seperate files which are consumed by both
// the components and the demo site.
//
// For example the PropTypes for align props can use this to know which options
// are available - as well as the demo site when rendering dropdowns.
const OptionsHelper = {
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

  actionOptions: [
    'Button',
    'Link'
  ],

  additionalActionAlignments: [
    'additionalActions',
    'leftAlignedActions',
    'rightAlignedActions'
  ],

  buttonColors: [
    'blue',
    'grey',
    'magenta',
    'magenta-dull',
    'red',
    'white'
  ],

  buttonIconPositions: [
    'before',
    'after'
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

  pillColors: [
    'neutral',
    'negative',
    'positive'
  ],

  pillRoles: [
    'tag',
    'status'
  ],

  pillSizesRestricted: [
    'S',
    'M',
    'L',
    'XL'
  ],

  toast: [
    'success',
    'error'
  ],

  messages: [
    'info',
    'error',
    'success',
    'warning'
  ],

  flatTableThemes: [
    'dark',
    'light',
    'white',
    'transparent'
  ],

  iconBackgrounds: [
    'info',
    'error',
    'success',
    'warning',
    'business',
    'none'
  ],

  iconColors: [
    'default',
    'on-light-background',
    'on-dark-background',
    'business-color'
  ],

  icons: [
    'add',
    'alert',
    'analysis',
    'arrow_down',
    'arrow_left',
    'arrow_left_boxed',
    'arrow_left_small',
    'arrow_right',
    'arrow_right_small',
    'arrow_up',
    'attach',
    'bank',
    'basket',
    'basket_with_squares',
    'bin',
    'blocked',
    'blocked_square',
    'block_arrow_right',
    'boxed_shapes',
    'bulk_destroy',
    'business',
    'calendar',
    'calendar_today',
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
    'circles_connection',
    'clock',
    'close',
    'coins',
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
    'document_right_align',
    'document_tick',
    'document_vertical_lines',
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
    'error_square',
    'factory',
    'favourite',
    'favourite_lined',
    'fax',
    'feedback',
    'files_leaning',
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
    'ledger',
    'ledger_arrow_left',
    'ledger_arrow_right',
    'link',
    'list_view',
    'locked',
    'location',
    'logout',
    'lookup',
    'marker',
    'message',
    'messages',
    'minus',
    'minus_large',
    'mobile',
    'money_bag',
    'pause_circle',
    'pdf',
    'people',
    'person',
    'person_tick',
    'phone',
    'play',
    'play_circle',
    'plus',
    'plus_large',
    'print',
    'progress',
    'progressed',
    'question',
    'refresh',
    'refresh_clock',
    'remove',
    'save',
    'scan',
    'search',
    'services',
    'settings',
    'share',
    'shop',
    'sort_down',
    'sort_up',
    'spanner',
    'split',
    'split_container',
    'stacked_boxes',
    'stacked_squares',
    'submitted',
    'sync',
    'tag',
    'three_boxes',
    'tick',
    'unlocked',
    'upload',
    'uploaded',
    'video',
    'view',
    'warning'
  ],

  orientation: [
    'horizontal',
    'vertical'
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

  shapesPortrait: [
    'circle',
    'square'
  ],

  sizesPortrait: [
    'XS',
    'S',
    'M',
    'ML',
    'L',
    'XL',
    'XXL'
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

  sizesTile: [
    'XS',
    'S',
    'M',
    'L',
    'XL'
  ],

  steps: [
    'complete',
    'current',
    'incomplete'
  ],

  buttonTypes: [
    'primary',
    'secondary',
    'tertiary',
    'darkBackground'
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
  ],

  tableThemes: [
    'primary',
    'secondary',
    'tertiary',
    'dark',
    'light',
    'transparent'
  ],

  tableSizes: [
    'compact',
    'small',
    'medium',
    'large'
  ],

  tileThemes: [
    'tile',
    'transparent'
  ],

  validationTypes: [
    'error',
    'warning',
    'info'
  ],

  inputTypes: [
    'textbox',
    'textarea',
    'date',
    'decimal',
    'select'
  ],

  formButtonOptions: [
    'save',
    'cancel'
  ],

  positionDatePicker: [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right'
  ],

  tableCellTypes: [
    'header',
    'rowHeader',
    'cell'
  ]
};

export default OptionsHelper;
