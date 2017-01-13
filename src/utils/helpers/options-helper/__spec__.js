import React from 'react';
import OptionsHelper from './options-helper';

describe('OptionsHelper', () => {
  describe("config data", () => {
    it("alignBinary()", () => {
      expect(OptionsHelper.alignBinary()).toEqual([
        'left',
        'right'
      ]);
    });
    it("alignFull()", () => {
      expect(OptionsHelper.alignFull()).toEqual([
        'center',
        'left',
        'right'
      ]);
    });
    it("buttonColors()", () => {
      expect(OptionsHelper.buttonColors()).toEqual([
        'blue',
        'grey',
        'magenta',
        'red',
        'white'
      ]);
    });
    it("colors()", () => {
      expect(OptionsHelper.colors()).toEqual([
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
    it("commonBooleans()", () => {
      expect(OptionsHelper.commonBooleans()).toEqual([
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
      ]);
    });
    it("commonEvents()", () => {
      expect(OptionsHelper.commonEvents()).toEqual([
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
      ]);
    });
    it("icons()", () => {
      expect(OptionsHelper.icons()).toEqual([
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
    it("inputDecoratorDemoProps()", () => {
      expect(OptionsHelper.inputDecoratorDemoProps()).toEqual({
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
      });
    });
    it("nonDemoFormProps()", () => {
      expect(OptionsHelper.nonDemoFormProps()).toEqual([
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
      ]);
    });
    it("pageSizes()", () => {
      expect(OptionsHelper.pageSizes()).toEqual({
        immutable: true,
        value: [
          { id: 10, name: 10 },
          { id: 20, name: 20 },
          { id: 50, name: 50 }
        ]
      });
    });
    it("positions()", () => {
      expect(OptionsHelper.positions()).toEqual([
        'bottom',
        'left',
        'right',
        'top'
      ]);
    });
    it("sizesFull()", () => {
      expect(OptionsHelper.sizesFull()).toEqual([
        'extra-small',
        'small',
        'medium-small',
        'medium',
        'medium-large',
        'large',
        'extra-large'
      ]);
    });
    it("sizesPod()", () => {
      expect(OptionsHelper.sizesPod()).toEqual([
        'extra-small',
        'small',
        'medium',
        'large',
        'extra-large'
      ]);
    });
    it("sizesRestricted()", () => {
      expect(OptionsHelper.sizesRestricted()).toEqual([
        'small',
        'medium',
        'large'
      ]);
    });
    it("sizesBinary()", () => {
      expect(OptionsHelper.sizesBinary()).toEqual([
        'small',
        'large'
      ]);
    });
    it("themesBinary()", () => {
      expect(OptionsHelper.themesBinary()).toEqual([
        'primary',
        'secondary'
      ]);
    });
    it("themesFull()", () => {
      expect(OptionsHelper.themesFull()).toEqual([
        'primary',
        'secondary',
        'tertiary',
        'tile',
        'transparent'
      ]);
    });
    it("tooltipDecoratorDemoProps()", () => {
      expect(OptionsHelper.tooltipDecoratorDemoProps()).toEqual({
        tooltipAlign: 'center',
        tooltipMessage: 'Test tooltip message',
        tooltipPosition: 'top'
      });
    });
  });
});
