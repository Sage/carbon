/**
 * Helper methods for constructing definitions.
 */
let DefinitionHelper = {
  prepareDemoProps: (definition, demoDefaults = {}) => {
    let demoProps = Object.assign({}, definition.defaultProps, demoDefaults);

    for (var prop in definition.props) {
      if (!demoProps[prop]) {
        demoProps[prop] = '';
      }
      if (demoDefaults[prop]) {
        demoProps[prop] = demoDefaults[prop];
      }
    }

    return demoProps;
  },

  alignBinary: () => {
    return [
      'left',
      'right'
    ];
  },

  alignPlusCenter: () => {
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
      'highlightable',
      'inline',
      'isVisible',
      'labelInline',
      'labelsInline',
      'legacyEditStyles',
      'open',
      'paginate',
      'renderHiddenTabs',
      'roundedCorners',
      'separator',
      'showCloseIcon',
      'showPageSizeSelection',
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
      fieldHelp: 'Test help',
      fieldHelpInline: true,
      inputWidth: '70',
      label: 'Test Label',
      labelAlign: 'left',
      labelHelp: 'Test label help',
      labelInline: false,
      labelWidth: '25'
    }
  },

  pageSizes: () => {
    return [
      10,
      20,
      50
    ];
  },

  positions: () => {
    return [
      'bottom',
      'left',
      'right',
      'top'
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
    }
  }
};

export default DefinitionHelper;
