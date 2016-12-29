import React from 'react';
import DefinitionHelper from './definition-helper';

describe('definition', () => {
  describe("prepare demo props", () => {
    let stubbedDefaultProps = { a: 1 },
        stubbedDemoProps =    { b: 2 };

    it("uses the definition props in the demo props, setting them as empty strings as default", () => {
      let stubbedDefinition = {
        props: { a: null }
      };

      expect(DefinitionHelper.prepareDemoProps(stubbedDefinition)).toEqual({ a: '' });
    });

    it("over-rides the definition props with any default props handed in (replaces or adds)", () => {
      let stubbedDefinition = {
            props: { a: null, b: null, c: null }
          },
          stubbedDefaultProps = {
            a: 1,
            b: 2
          };

      expect(DefinitionHelper.prepareDemoProps(stubbedDefinition, stubbedDefaultProps)).toEqual({ a: 1, b: 2, c: '' });
    });
  });

  describe("config data", () => {
    it("alignBinary()", () => {
      expect(DefinitionHelper.alignBinary()).toEqual([
        'left',
        'right'
      ]);
    });
    it("alignPlusCenter()", () => {
      expect(DefinitionHelper.alignPlusCenter()).toEqual([
        'center',
        'left',
        'right'
      ]);
    });
    it("buttonColors()", () => {
      expect(DefinitionHelper.buttonColors()).toEqual([
        'blue',
        'grey',
        'magenta',
        'red',
        'white'
      ]);
    });
    it("colors()", () => {
      expect(DefinitionHelper.colors()).toEqual([
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
      expect(DefinitionHelper.commonBooleans()).toEqual([
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
        'shrink',
        'tabbable',
        'transparent',
        'triggerEditOnContent',
        'validateOnMount'
      ]);
    });
    it("commonEvents()", () => {
      expect(DefinitionHelper.commonEvents()).toEqual([
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
      ]);
    });
    it("icons()", () => {
      expect(DefinitionHelper.icons()).toEqual([
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
      expect(DefinitionHelper.inputDecoratorDemoProps()).toEqual({
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
    it("pageSizes()", () => {
      expect(DefinitionHelper.pageSizes()).toEqual([
        10,
        20,
        50
      ]);
    });
    it("positions()", () => {
      expect(DefinitionHelper.positions()).toEqual([
        'bottom',
        'left',
        'right',
        'top'
      ]);
    });
    it("sizesFull()", () => {
      expect(DefinitionHelper.sizesFull()).toEqual([
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
      expect(DefinitionHelper.sizesPod()).toEqual([
        'extra-small',
        'small',
        'medium',
        'large',
        'extra-large'
      ]);
    });
    it("sizesRestricted()", () => {
      expect(DefinitionHelper.sizesRestricted()).toEqual([
        'small',
        'medium',
        'large'
      ]);
    });
    it("sizesBinary()", () => {
      expect(DefinitionHelper.sizesBinary()).toEqual([
        'small',
        'large'
      ]);
    });
    it("themesBinary()", () => {
      expect(DefinitionHelper.themesBinary()).toEqual([
        'primary',
        'secondary'
      ]);
    });
    it("themesFull()", () => {
      expect(DefinitionHelper.themesFull()).toEqual([
        'primary',
        'secondary',
        'tertiary',
        'tile',
        'transparent'
      ]);
    });
    it("tooltipDecoratorDemoProps()", () => {
      expect(DefinitionHelper.tooltipDecoratorDemoProps()).toEqual({
        tooltipAlign: 'center',
        tooltipMessage: 'Test tooltip message',
        tooltipPosition: 'top'
      });
    });
  });
});
