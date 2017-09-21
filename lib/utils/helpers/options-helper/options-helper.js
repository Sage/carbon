'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO: refactor these options into seperate files which are consumed by both
// the components and the demo site.
//
// For example the PropTypes for align props can use this to know which options
// are available - as well as the demo site when rendering dropdowns.
var OptionsHelper = {
  alignBinary: ['left', 'right'],

  alignFull: ['center', 'left', 'right'],

  alignAroundEdges: ['bottom', 'center', 'left', 'right', 'top'],

  buttonColors: ['blue', 'grey', 'magenta', 'red', 'white'],

  colors: ['default', 'error', 'help', 'info', 'maintenance', 'new', 'success', 'warning'],

  icons: ['add', 'alert', 'analysis', 'arrow_down', 'arrow_left', 'arrow_right', 'arrow_up', 'attach', 'blocked', 'blocked_square', 'bulk_destroy', 'business', 'calendar', 'call', 'camera', 'card_view', 'caret_down', 'cart', 'chat', 'chart_bar', 'chart_line', 'chart_pie', 'chat_notes', 'chevron_down', 'chevron_left', 'chevron_right', 'chevron_up', 'clock', 'close', 'collaborate', 'copy', 'connect', 'credit_card', 'cross', 'csv', 'delete', 'delivery', 'disputed', 'download', 'drag', 'drag_vertical', 'draft', 'dropdown', 'duplicate', 'edit', 'edited', 'email', 'error', 'favourite', 'favourite_lined', 'fax', 'feedback', 'filter', 'filter_new', 'fit_height', 'fit_width', 'folder', 'gift', 'graph', 'grid', 'help', 'home', 'in_progress', 'info', 'image', 'key', 'link', 'list_view', 'locked', 'logout', 'marker', 'message', 'messages', 'minus', 'mobile', 'pdf', 'people', 'person', 'phone', 'plus', 'print', 'progressed', 'question', 'refresh', 'save', 'search', 'services', 'settings', 'share', 'shop', 'sort_down', 'sort_up', 'sync', 'tick', 'unlocked', 'upload', 'uploaded', 'view', 'warning'],

  pageSizes: [10, 25, 50],

  positions: ['bottom', 'left', 'right', 'top'],

  shapes: ['circle', 'rounded-rect', 'square'],

  shapesVaried: ['standard', 'circle', 'leaf'],

  sizesFull: ['extra-small', 'small', 'medium-small', 'medium', 'medium-large', 'large', 'extra-large'],

  sizesPod: ['extra-small', 'small', 'medium', 'large', 'extra-large'],

  sizesRestricted: ['small', 'medium', 'large'],

  sizesBinary: ['small', 'large'],

  themesBinary: ['primary', 'secondary'],

  themesFull: ['primary', 'secondary', 'tertiary', 'tile', 'transparent']
};

exports.default = OptionsHelper;