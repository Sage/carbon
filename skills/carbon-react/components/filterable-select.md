---
name: carbon-component-filterable-select
description: Carbon FilterableSelect component props and usage examples.
---

# FilterableSelect

## Import
`import { FilterableSelect } from "carbon-react/lib/components/select";`

## Source
- Export: `./components/select`
- Props interface: `FilterableSelectProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Child components (such as Option or OptionRow) for the SelectList |  |
| onChange | (ev: CustomSelectChangeEvent \| React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Specify a callback triggered on change |  |
| value | string \| Record<string, unknown> | Yes |  |  |  | The selected value(s) |  |
| about | string \| undefined | No |  |  |  |  |  |
| accept | string \| undefined | No |  |  |  |  |  |
| accessibilityLabelId | string \| undefined | No |  |  |  | Id of the element containing the currently displayed value to be read by voice readers |  |
| accessKey | string \| undefined | No |  |  |  |  |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  |  |  | Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |  |
| align | "left" \| "right" \| undefined | No |  |  |  |  |  |
| alt | string \| undefined | No |  |  |  |  |  |
| ariaLabel | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the component input |  |
| ariaLabelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component input |  |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| autoCapitalize | (string & {}) \| "none" \| "off" \| "on" \| "sentences" \| "words" \| "characters" \| undefined | No |  |  |  |  |  |
| autoComplete | HTMLInputAutoCompleteAttribute \| undefined | No |  |  |  |  |  |
| autoCorrect | string \| undefined | No |  |  |  |  |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true the Component will be focused when rendered |  |
| autoSave | string \| undefined | No |  |  |  |  |  |
| capture | boolean \| "user" \| "environment" \| undefined | No |  |  |  |  |  |
| checked | boolean \| undefined | No |  |  |  |  |  |
| className | string \| undefined | No |  |  |  |  |  |
| color | string \| undefined | No |  |  |  |  |  |
| content | string \| undefined | No |  |  |  |  |  |
| contentEditable | "inherit" \| Booleanish \| "plaintext-only" \| undefined | No |  |  |  |  |  |
| contextMenu | string \| undefined | No |  |  |  |  |  |
| dangerouslySetInnerHTML | { __html: string \| TrustedHTML; } \| undefined | No |  |  |  |  |  |
| datatype | string \| undefined | No |  |  |  |  |  |
| defaultChecked | boolean \| undefined | No |  |  |  |  |  |
| deferTimeout | number \| undefined | No |  |  |  | Integer to determine a timeout for the deferred callback |  |
| dir | string \| undefined | No |  |  |  |  |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| disableDefaultFiltering | boolean \| undefined | No |  |  |  | Boolean to disable automatic filtering and highlighting of options. This allows custom filtering and option styling to be performed outside of the component when the filter text changes. |  |
| draggable | Booleanish \| undefined | No |  |  |  |  |  |
| enableVirtualScroll | boolean \| undefined | No |  |  |  | Set this prop to enable a virtualised list of options. If it is not used then all options will be in the DOM at all times, which may cause performance problems on very large lists |  |
| enterKeyHint | "go" \| "send" \| "search" \| "enter" \| "done" \| "next" \| "previous" \| undefined | No |  |  |  |  |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| exportparts | string \| undefined | No |  |  |  |  |  |
| fieldHelp | React.ReactNode | No |  |  |  | [Legacy] Help content to be displayed under an input. |  |
| flipEnabled | boolean \| undefined | No |  |  |  | Use the opposite list placement if the set placement does not fit |  |
| form | string \| undefined | No |  |  |  |  |  |
| formAction | string \| undefined | No |  |  |  |  |  |
| formattedValue | string \| undefined | No |  |  |  | An optional alternative for props.value, this is useful if the real value is an ID but you want to show a human-readable version. |  |
| formEncType | string \| undefined | No |  |  |  |  |  |
| formMethod | string \| undefined | No |  |  |  |  |  |
| formNoValidate | boolean \| undefined | No |  |  |  |  |  |
| formTarget | string \| undefined | No |  |  |  |  |  |
| height | string \| number \| undefined | No |  |  |  |  |  |
| helpAriaLabel | string \| undefined | No |  |  |  | [Legacy] Aria label for rendered help component. |  |
| hidden | boolean \| undefined | No |  |  |  |  |  |
| iconOnClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for click event on Textbox icon |  |
| iconOnMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for mouse down event on Textbox icon |  |
| iconTabIndex | number \| undefined | No |  |  |  | Overrides the default tabindex of the component |  |
| id | string \| undefined | No |  |  |  | Id attribute of the input element |  |
| info | string \| boolean \| undefined | No |  |  |  | [Legacy] Indicate additional information. |  |
| inlist | any | No |  |  |  |  |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputIcon | IconType \| undefined | No |  |  |  | Type of the icon that will be rendered next to the input |  |
| inputMode | "email" \| "none" \| "search" \| "text" \| "tel" \| "url" \| "numeric" \| "decimal" \| undefined | No |  |  |  | Hints at the type of data that might be entered by the user while editing the element or its contents |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| is | string \| undefined | No |  |  |  | Specify that a standard HTML element should behave like a defined custom built-in element |  |
| isLoading | boolean \| undefined | No |  |  |  | If true the loader animation is displayed in the option list |  |
| itemID | string \| undefined | No |  |  |  |  |  |
| itemProp | string \| undefined | No |  |  |  |  |  |
| itemRef | string \| undefined | No |  |  |  |  |  |
| itemScope | boolean \| undefined | No |  |  |  |  |  |
| itemType | string \| undefined | No |  |  |  |  |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelAlign | "left" \| "right" \| undefined | No |  |  |  | Label alignment |  |
| labelHelp | React.ReactNode | No |  |  |  | [Legacy] A message that the Help component will display |  |
| labelId | string \| undefined | No |  |  |  | Label id passed from Select component |  |
| labelInline | boolean \| undefined | No |  |  |  | [Legacy] When true label is inline |  |
| labelSpacing | 1 \| 2 \| undefined | No |  |  |  | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8). |  |
| labelWidth | number \| undefined | No |  |  |  | [Legacy] Label width |  |
| lang | string \| undefined | No |  |  |  |  |  |
| leftChildren | React.ReactNode | No |  |  |  | Additional child elements to display before the input |  |
| list | string \| undefined | No |  |  |  |  |  |
| listActionButton | boolean \| React.ReactElement<ButtonProps, string \| React.JSXElementConstructor<any>> \| undefined | No |  |  |  | True for default text button or a Button Component to be rendered |  |
| listMaxHeight | number \| undefined | No |  |  |  | Maximum list height - defaults to 180 |  |
| listPlacement | ListPlacement \| undefined | No |  |  |  | Placement of the select list in relation to the input element |  |
| listWidth | number \| undefined | No |  |  |  | Override the default width of the list element. Number passed is converted into pixel value |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| max | string \| number \| undefined | No |  |  |  |  |  |
| maxLength | number \| undefined | No |  |  |  |  |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| min | string \| number \| undefined | No |  |  |  |  |  |
| minLength | number \| undefined | No |  |  |  |  |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| multiColumn | boolean \| undefined | No |  |  |  | When true component will work in multi column mode. Children should consist of OptionRow components in this mode |  |
| multiple | boolean \| undefined | No |  |  |  |  |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | Name attribute of the input element |  |
| nonce | string \| undefined | No |  |  |  |  |  |
| noResultsMessage | string \| undefined | No |  |  |  | A custom message to be displayed when any option does not match the filter text |  |
| onAbort | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAbortCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAnimationEnd | AnimationEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAnimationEndCapture | AnimationEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAnimationIteration | AnimationEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAnimationIterationCapture | AnimationEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAnimationStart | AnimationEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAnimationStartCapture | AnimationEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAuxClick | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onAuxClickCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onBeforeInput | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onBeforeInputCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onBlurCapture | FocusEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlay | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayThrough | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayThroughCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onChangeCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onChangeDeferred | (() => void) \| undefined | No |  |  |  | Deferred callback to be called after the onChange event |  |
| onClick | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on click |  |
| onClickCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCompositionEnd | CompositionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCompositionEndCapture | CompositionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCompositionStart | CompositionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCompositionStartCapture | CompositionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCompositionUpdate | CompositionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCompositionUpdateCapture | CompositionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onContextMenu | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onContextMenuCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCopy | ClipboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCopyCapture | ClipboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCut | ClipboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCutCapture | ClipboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDoubleClick | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDoubleClickCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDrag | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragEnd | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragEndCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragEnter | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragEnterCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragExit | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragExitCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragLeave | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragLeaveCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragOver | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragOverCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragStart | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDragStartCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDrop | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDropCapture | DragEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDurationChange | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onDurationChangeCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onEmptied | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onEmptiedCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onEncrypted | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onEncryptedCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onEnded | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onEndedCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onError | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onErrorCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onFilterChange | ((filterText: string) => void) \| undefined | No |  |  |  | A custom callback for when the input text changes |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on focus |  |
| onFocusCapture | FocusEventHandler<T> \| undefined | No |  |  |  |  |  |
| onGotPointerCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onGotPointerCaptureCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInput | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInputCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInvalid | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInvalidCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered onKeyDown |  |
| onKeyDownCapture | KeyboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onKeyUp | KeyboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onKeyUpCapture | KeyboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onListAction | (() => void) \| undefined | No |  |  |  | A callback for when the Action Button is triggered |  |
| onListScrollBottom | (() => void) \| undefined | No |  |  |  | A callback that is triggered when a user scrolls to the bottom of the list |  |
| onLoad | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLoadCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLoadedData | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLoadedDataCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLoadedMetadata | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLoadedMetadataCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLoadStart | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLoadStartCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLostPointerCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onLostPointerCaptureCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Event handler for the mouse down event |  |
| onMouseDownCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseEnter | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseLeave | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseMove | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseMoveCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseOut | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseOutCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseOver | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseOverCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseUp | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onMouseUpCapture | MouseEventHandler<T> \| undefined | No |  |  |  |  |  |
| onOpen | (() => void) \| undefined | No |  |  |  | A custom callback for when the dropdown menu opens |  |
| onPaste | ClipboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPasteCapture | ClipboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPause | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPauseCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPlay | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPlayCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPlaying | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPlayingCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerCancel | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerCancelCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerDown | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerDownCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerEnter | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerLeave | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerMove | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerMoveCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerOut | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerOutCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerOver | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerOverCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerUp | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onPointerUpCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onProgress | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onProgressCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onRateChange | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onRateChangeCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onReset | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onResetCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onResize | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onResizeCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onScroll | UIEventHandler<T> \| undefined | No |  |  |  |  |  |
| onScrollCapture | UIEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSeeked | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSeekedCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSeeking | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSeekingCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSelect | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSelectCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onStalled | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onStalledCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSubmit | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSubmitCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSuspend | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onSuspendCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTimeUpdate | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTimeUpdateCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchCancel | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchCancelCapture | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchEnd | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchEndCapture | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchMove | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchMoveCapture | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchStart | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTouchStartCapture | TouchEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTransitionEnd | TransitionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onTransitionEndCapture | TransitionEventHandler<T> \| undefined | No |  |  |  |  |  |
| onVolumeChange | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onVolumeChangeCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onWaiting | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onWaitingCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onWheel | WheelEventHandler<T> \| undefined | No |  |  |  |  |  |
| onWheelCapture | WheelEventHandler<T> \| undefined | No |  |  |  |  |  |
| openOnFocus | boolean \| undefined | No |  |  |  | If true the Component opens on focus |  |
| part | string \| undefined | No |  |  |  |  |  |
| pattern | string \| undefined | No |  |  |  |  |  |
| placeholder | string \| undefined | No |  |  |  | Placeholder string to be displayed in input |  |
| prefix | string \| undefined | No |  |  |  | Emphasized part of the displayed text |  |
| property | string \| undefined | No |  |  |  |  |  |
| radioGroup | string \| undefined | No |  |  |  |  |  |
| readOnly | boolean \| undefined | No |  |  |  | If true, the component will be read-only |  |
| rel | string \| undefined | No |  |  |  |  |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| resource | string \| undefined | No |  |  |  |  |  |
| results | number \| undefined | No |  |  |  |  |  |
| rev | string \| undefined | No |  |  |  |  |  |
| reverse | boolean \| undefined | No |  |  |  | Reverses label and input display |  |
| role | AriaRole \| undefined | No |  |  |  |  |  |
| security | string \| undefined | No |  |  |  |  |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of an input |  |
| slot | string \| undefined | No |  |  |  |  |  |
| spellCheck | Booleanish \| undefined | No |  |  |  |  |  |
| src | string \| undefined | No |  |  |  |  |  |
| step | string \| number \| undefined | No |  |  |  |  |  |
| style | CSSProperties \| undefined | No |  |  |  |  |  |
| suppressContentEditableWarning | boolean \| undefined | No |  |  |  |  |  |
| suppressHydrationWarning | boolean \| undefined | No |  |  |  |  |  |
| tabIndex | number \| undefined | No |  |  |  |  |  |
| tableHeader | React.ReactNode | No |  |  |  | SelectList table header, should consist of multiple th elements. Works only in multiColumn mode |  |
| title | string \| undefined | No |  |  |  |  |  |
| tooltipId | string \| undefined | No |  |  |  | The id attribute for the validation tooltip |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  |  |  | [Legacy] Overrides the default tooltip position |  |
| translate | "yes" \| "no" \| undefined | No |  |  |  |  |  |
| typeof | string \| undefined | No |  |  |  |  |  |
| unselectable | "off" \| "on" \| undefined | No |  |  |  |  |  |
| validationIconId | string \| undefined | No |  |  |  | Id of the validation icon |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set |  |
| validationOnLabel | boolean \| undefined | No |  |  |  | [Legacy] When true, validation icon will be placed on label instead of being placed on the input. |  |
| virtualScrollOverscan | number \| undefined | No |  |  |  | The number of options to render into the DOM at once, either side of the currently-visible ones. Higher values make for smoother scrolling but may impact performance. Only used if the `enableVirtualScroll` prop is set. |  |
| vocab | string \| undefined | No |  |  |  |  |  |
| warning | string \| boolean \| undefined | No |  |  |  | Indicate that warning has occurred. |  |
| width | string \| number \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-activedescendant | string \| undefined | No |  |  |  | Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. |  |
| aria-atomic | Booleanish \| undefined | No |  |  |  | Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. |  |
| aria-autocomplete | "none" \| "inline" \| "list" \| "both" \| undefined | No |  |  |  | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made. |  |
| aria-braillelabel | string \| undefined | No |  |  |  | Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. Defines a string value that labels the current element, which is intended to be converted into Braille. |  |
| aria-brailleroledescription | string \| undefined | No |  |  |  | Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille. |  |
| aria-busy | Booleanish \| undefined | No |  |  |  |  |  |
| aria-checked | boolean \| "true" \| "false" \| "mixed" \| undefined | No |  |  |  | Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. |  |
| aria-colcount | number \| undefined | No |  |  |  | Defines the total number of columns in a table, grid, or treegrid. |  |
| aria-colindex | number \| undefined | No |  |  |  | Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. |  |
| aria-colindextext | string \| undefined | No |  |  |  | Defines a human readable text alternative of aria-colindex. |  |
| aria-colspan | number \| undefined | No |  |  |  | Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. |  |
| aria-controls | string \| undefined | No |  |  |  | Identifies the element (or elements) whose contents or presence are controlled by the current element. |  |
| aria-current | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  |  |  | Indicates the element that represents the current item within a container or set of related elements. |  |
| aria-describedby | string \| undefined | No |  |  |  | The ID of the input's description, is set along with hint text and error message. |  |
| aria-description | string \| undefined | No |  |  |  | Defines a string value that describes or annotates the current element. |  |
| aria-details | string \| undefined | No |  |  |  | Identifies the element that provides a detailed, extended description for the object. |  |
| aria-disabled | Booleanish \| undefined | No |  |  |  | Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. |  |
| aria-errormessage | string \| undefined | No |  |  |  | Identifies the element that provides an error message for the object. |  |
| aria-expanded | Booleanish \| undefined | No |  |  |  | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. |  |
| aria-flowto | string \| undefined | No |  |  |  | Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order. |  |
| aria-haspopup | boolean \| "grid" \| "dialog" \| "menu" \| "true" \| "false" \| "listbox" \| "tree" \| undefined | No |  |  |  | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |  |
| aria-hidden | Booleanish \| undefined | No |  |  |  | Indicates whether the element is exposed to an accessibility API. |  |
| aria-invalid | boolean \| "true" \| "false" \| "grammar" \| "spelling" \| undefined | No |  |  |  | Indicates the entered value does not conform to the format expected by the application. |  |
| aria-keyshortcuts | string \| undefined | No |  |  |  | Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the component input |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component input |  |
| aria-level | number \| undefined | No |  |  |  | Defines the hierarchical level of an element within a structure. |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  |  |  | Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. |  |
| aria-modal | Booleanish \| undefined | No |  |  |  | Indicates whether an element is modal when displayed. |  |
| aria-multiline | Booleanish \| undefined | No |  |  |  | Indicates whether a text box accepts multiple lines of input or only a single line. |  |
| aria-multiselectable | Booleanish \| undefined | No |  |  |  | Indicates that the user may select more than one item from the current selectable descendants. |  |
| aria-orientation | "horizontal" \| "vertical" \| undefined | No |  |  |  | Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. |  |
| aria-owns | string \| undefined | No |  |  |  | Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. |  |
| aria-placeholder | string \| undefined | No |  |  |  | Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. |  |
| aria-posinset | number \| undefined | No |  |  |  | Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-pressed | boolean \| "true" \| "false" \| "mixed" \| undefined | No |  |  |  | Indicates the current "pressed" state of toggle buttons. |  |
| aria-readonly | Booleanish \| undefined | No |  |  |  | Indicates that the element is not editable, but is otherwise operable. |  |
| aria-relevant | "text" \| "additions" \| "additions removals" \| "additions text" \| "all" \| "removals" \| "removals additions" \| "removals text" \| "text additions" \| "text removals" \| undefined | No |  |  |  | Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. |  |
| aria-required | Booleanish \| undefined | No |  |  |  | Indicates that user input is required on the element before a form may be submitted. |  |
| aria-roledescription | string \| undefined | No |  |  |  | Defines a human-readable, author-localized description for the role of an element. |  |
| aria-rowcount | number \| undefined | No |  |  |  | Defines the total number of rows in a table, grid, or treegrid. |  |
| aria-rowindex | number \| undefined | No |  |  |  | Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. |  |
| aria-rowindextext | string \| undefined | No |  |  |  | Defines a human readable text alternative of aria-rowindex. |  |
| aria-rowspan | number \| undefined | No |  |  |  | Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. |  |
| aria-selected | Booleanish \| undefined | No |  |  |  | Indicates the current "selected" state of various widgets. |  |
| aria-setsize | number \| undefined | No |  |  |  | Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-sort | "none" \| "ascending" \| "descending" \| "other" \| undefined | No |  |  |  | Indicates if items in a table or grid are sorted in ascending or descending order. |  |
| aria-valuemax | number \| undefined | No |  |  |  | Defines the maximum allowed value for a range widget. |  |
| aria-valuemin | number \| undefined | No |  |  |  | Defines the minimum allowed value for a range widget. |  |
| aria-valuenow | number \| undefined | No |  |  |  | Defines the current value for a range widget. |  |
| aria-valuetext | string \| undefined | No |  |  |  | Defines the human readable text alternative of aria-valuenow for a range widget. |  |
| onKeyPress | KeyboardEventHandler<T> \| undefined | No |  | Yes | Use `onKeyUp` or `onKeyDown` instead |  |  |
| onKeyPressCapture | KeyboardEventHandler<T> \| undefined | No |  | Yes | Use `onKeyUpCapture` or `onKeyDownCapture` instead |  |  |
| aria-dropeffect | "copy" \| "link" \| "none" \| "execute" \| "move" \| "popup" \| undefined | No |  | Yes | in ARIA 1.1 | Indicates what functions can be performed when a dragged object is released on the drop target. |  |
| aria-grabbed | Booleanish \| undefined | No |  | Yes | in ARIA 1.1 | Indicates an element's "grabbed" state in a drag-and-drop operation. |  |

## Examples
### MDX Example 1

**Args**

```tsx
Always insert `Option` Components inside the `FilterableSelect`, analogous to the `<select>` and `<option>` HTML Elements.

If you type printable characters in the Textbox, you can filter through the existing options leaving only those that match the text you typed.

## Examples

### Default

<Canvas of={FilterableSelectStories.Default} />

### List placement

By default, the placement of the select list is below the input element and will automatically adjust its position if there is not enough space.
However, you can use `listPlacement` prop to manually set the initial position of the select list relative to the input element.

<Canvas of={FilterableSelectStories.ListPlacement} />

### List height

You can use `listMaxHeight` prop to override default max height value of select list.

<Canvas of={FilterableSelectStories.ListHeight} />

### List width

You can use `listWidth` prop to override the width of the select list. By default the list
will have the same width as the input.

<Canvas of={FilterableSelectStories.ListWidth}/>

### Open on focus

<Canvas of={FilterableSelectStories.OpenOnFocus} />

### Disabled

<Canvas of={FilterableSelectStories.Disabled} />

### Read Only

<Canvas of={FilterableSelectStories.Readonly} />

### With multiple columns

<Canvas of={FilterableSelectStories.WithMultipleColumns} />

### With multiple columns and nested tags/components

<Canvas of={FilterableSelectStories.WithMultipleColumnsAndNested} />

### With Action Button

Default Action Button will be rendered when the `listActionButton` prop is set to `true` on the Component.

A custom `Button` Component could be passed as the `listActionButton` value.

<Canvas of={FilterableSelectStories.WithActionButton} />

### With isLoading prop

When `isLoading` prop is passed, a loader will be appended at the end of the Select List. That functionality could be used to load the options asynchronously.

<Canvas of={FilterableSelectStories.WithIsLoadingProp} />

### Infinite scroll example

The `isLoading` prop in combination with the `onListScrollBottom` prop can be used to implement infinite scroll.
This prop will be called every time a user scrolls to the bottom of the list.

<Canvas of={FilterableSelectStories.WithInfiniteScroll} />

### With custom maxWidth

In this example the `maxWidth` prop is 50%.

<Canvas of={FilterableSelectStories.WithCustomMaxWidth} />

### Required

You can use the `required` prop to indicate if the field is mandatory.

<Canvas of={FilterableSelectStories.Required} />

### With object as value

Option values could be passed as objects, useful when custom data is associated with an option.
When the `id` property is set, objects will be compared based on that property (could be used when the list is recreated after an API call).
If there is no `id` prop specified on an object, then the exact objects will be compared.

<Canvas of={FilterableSelectStories.WithObjectAsValue} />

### Virtual scrolling

The `enableVirtualScroll` prop can be used to enable "virtual scrolling" to only render a few options into the DOM at any one time.
This allows an unlimited amount of children to be passed with little impact on rendering performance.

By default this will render 5 not-currently-visible options into the DOM on either side of the currently-visible ones - this value can
be customised if desired using the `virtualScrollOverscan` prop. Higher values will make scrolling smoother but may negatively impact performance.

<Canvas of={FilterableSelectStories.Virtualised} />

### Selection confirmed

A change event is emitted each time an option is navigated via keyboard as it sets the value of the
Select input. For those that need to trigger further actions when the user makes a selection, there is
a `selectionConfirmed` property on the emitted event when the enter key is pressed or an option is clicked.

<Canvas of={FilterableSelectStories.SelectionConfirmedStory} />

### Custom filtering and option styles

By default, filtering and highlighting of options is handled by the component itself. In order to use custom filtering behaviour, or to use custom styling of option values, the
default filtering can be disabled using the `disableDefaultFiltering` prop.

This allows use-cases like server-side filtering of options, or rich formatting of options.

<Canvas of={FilterableSelectStories.CustomFilterAndOptionStyle} />

## Validation States

This component supports input validation, see our [Validations](../?path=/docs/documentation-validations--docs) documentation page for more information.

## Testing

For testing interactions with `FilterableSelect` as part of a broader user journey, we recommend testing within a browser environment using tools like Playwright or Cypress, rather than Node-based environments like JSDOM. Since JSDOM does not render visual content, mocking will be required to ensure the component's internal layout calculations function correctly, making your tests less effective.

### JSDOM tests (if required)

If you need to test within JSDOM, we provide a utility function for setting up any required global mocks:
```

