let OptionsHelper = {
  alignBinary: () => {
    return [
      'left',
      'right'
    ];
  },

  alignFull: () => {
    return [
      'center',
      'left',
      'right'
    ];
  },

  buttonColors: () => {
    return [
      'blue',
      'grey',
      'magenta',
      'red',
      'white'
    ];
  },

  colors: () => {
    return [
      'default',
      'error',
      'help',
      'info',
      'maintenance',
      'new',
      'success',
      'warning'
    ];
  },

  commonBooleans: () => {
    return [
      'bodyFullWidth',
      'border',
      'collapsed',
      'columnDivide',
      'darkBackground',
      'defaultChecked',
      'disabled',
      'disableEscKey',
      'displayEditButtonOnHover',
      'divider',
      'editContentFullWidth',
      'enableBackgroundUI',
      'enforceCharacterLimit',
      'expandable',
      'fieldHelpInline',
      'fill',
      'highlightable',
      'inline',
      'internalEditButton',
      'isVisible',
      'labelInline',
      'labelsInline',
      'large',
      'legacyEditStyles',
      'open',
      'paginate',
      'renderHiddenTabs',
      'reverse',
      'roundedCorners',
      'selectable',
      'separator',
      'showCloseIcon',
      'showPageSizeSelection',
      'shrink',
      'suggest',
      'tabbable',
      'transparent',
      'triggerEditOnContent',
      'validateOnMount'
    ];
  },

  commonEvents: () => {
    return [
      'afterFormValidation',
      'additionalActions',
      'beforeFormValidation',
      'create',
      'onCancel',
      'onChange',
      'onConfirm',
      'onDismiss',
      'onEdit',
      'onHighlight',
      'onPageSizeChange',
      'onSelect',
      'onSubmit',
      'onTabChange'
    ];
  },

  icons: () => {
    return [
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
    ];
  },

  inputDecoratorDemoProps: () => {
    return {
      className: '',
      fieldHelp: 'Test help',
      fieldHelpInline: true,
      inputWidth: '70',
      label: 'Test Label',
      labelAlign: 'left',
      labelHelp: 'Test label help',
      labelInline: false,
      labelWidth: '25',
      validations: [],
      warnings: [],
    };
  },

  nonDemoFormProps: () => {
    return [
      'activeInput',
      'cacheVisibleValue',
      'className',
      'editFields',
      'footer',
      'initialSlideIndex',
      'key',
      'options',
      'transitionName',
      'validations',
      'warnings'
    ];
  },

  pageSizes: () => {
    return {
      immutable: true,
      value: [
        { id: 10, name: 10 },
        { id: 20, name: 20 },
        { id: 50, name: 50 }
      ]
    };
  },

  positions: () => {
    return [
      'bottom',
      'left',
      'right',
      'top'
    ];
  },

  shapes: () => {
    return [
      'circle',
      'rounded-rect',
      'square'
    ];
  },

  shapesVaried: () => {
    return [
      'standard',
      'circle',
      'leaf'
    ];
  },

  sizesFull: () => {
    return [
      'extra-small',
      'small',
      'medium-small',
      'medium',
      'medium-large',
      'large',
      'extra-large'
    ];
  },

  sizesPod: () => {
    return [
      'extra-small',
      'small',
      'medium',
      'large',
      'extra-large'
    ];
  },

  sizesRestricted: () => {
    return [
      'small',
      'medium',
      'large'
    ];
  },

  sizesBinary: () => {
    return [
      'small',
      'large'
    ];
  },

  themesBinary: () => {
    return [
      'primary',
      'secondary'
    ];
  },

  themesFull: () => {
    return [
      'primary',
      'secondary',
      'tertiary',
      'tile',
      'transparent'
    ];
  },

  tooltipDecoratorDemoProps: () => {
    return {
      tooltipAlign: 'center',
      tooltipMessage: 'Test tooltip message',
      tooltipPosition: 'top'
    };
  }
};

export default OptionsHelper;
