---
name: carbon-component-number
description: Carbon Number component props and usage examples.
---

# Number

## Import
`import Number from "carbon-react/lib/components/number";`

## Source
- Export: `./components/number`
- Props interface: `NumberProps`
- Deprecated: Yes
- Deprecation reason: `Number` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Specify a callback triggered on change |  |
| value | string | Yes |  |  |  | Value passed to the input |  |
| about | string \| undefined | No |  |  |  |  |  |
| accept | string \| undefined | No |  |  |  |  |  |
| accessKey | string \| undefined | No |  |  |  |  |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  |  |  | Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |  |
| align | "left" \| "right" \| undefined | No |  |  |  |  |  |
| alt | string \| undefined | No |  |  |  |  |  |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| autoCapitalize | (string & {}) \| "none" \| "off" \| "on" \| "sentences" \| "words" \| "characters" \| undefined | No |  |  |  |  |  |
| autoComplete | HTMLInputAutoCompleteAttribute \| undefined | No |  |  |  |  |  |
| autoCorrect | string \| undefined | No |  |  |  |  |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true the Component will be focused when rendered |  |
| autoSave | string \| undefined | No |  |  |  |  |  |
| capture | boolean \| "user" \| "environment" \| undefined | No |  |  |  |  |  |
| characterLimit | number \| undefined | No |  |  |  | Character limit of the textarea |  |
| checked | boolean \| undefined | No |  |  |  |  |  |
| children | React.ReactNode | No |  |  |  | Content to be rendered next to the input |  |
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
| draggable | Booleanish \| undefined | No |  |  |  |  |  |
| enterKeyHint | "go" \| "send" \| "search" \| "enter" \| "done" \| "next" \| "previous" \| undefined | No |  |  |  |  |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| exportparts | string \| undefined | No |  |  |  |  |  |
| fieldHelp | React.ReactNode | No |  |  |  | [Legacy] Help content to be displayed under an input. |  |
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
| id | string \| undefined | No |  |  |  | Unique identifier for the input. Label id will be based on it, using following pattern: [id]-label. Will use a randomly generated GUID if none is provided. |  |
| info | string \| boolean \| undefined | No |  |  |  | [Legacy] Indicate additional information. |  |
| inlist | any | No |  |  |  |  |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputIcon | IconType \| undefined | No |  |  |  | Type of the icon that will be rendered next to the input |  |
| inputMode | "none" \| "email" \| "search" \| "text" \| "tel" \| "url" \| "numeric" \| "decimal" \| undefined | No |  |  |  | Hints at the type of data that might be entered by the user while editing the element or its contents |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| is | string \| undefined | No |  |  |  | Specify that a standard HTML element should behave like a defined custom built-in element |  |
| itemID | string \| undefined | No |  |  |  |  |  |
| itemProp | string \| undefined | No |  |  |  |  |  |
| itemRef | string \| undefined | No |  |  |  |  |  |
| itemScope | boolean \| undefined | No |  |  |  |  |  |
| itemType | string \| undefined | No |  |  |  |  |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelAlign | "left" \| "right" \| undefined | No |  |  |  | Label alignment |  |
| labelHelp | React.ReactNode | No |  |  |  | [Legacy] Text applied to label help tooltip. When opted into new design validations it will render as a hint above the input, unless an `inputHint` prop is also passed. |  |
| labelInline | boolean \| undefined | No |  |  |  | [Legacy] When true label is inline. |  |
| labelSpacing | 1 \| 2 \| undefined | No |  |  |  | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8). |  |
| labelWidth | number \| undefined | No |  |  |  | [Legacy] Label width as a percentage when label is inline. |  |
| lang | string \| undefined | No |  |  |  |  |  |
| leftChildren | React.ReactNode | No |  |  |  | Additional child elements to display before the input |  |
| list | string \| undefined | No |  |  |  |  |  |
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
| multiple | boolean \| undefined | No |  |  |  |  |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | Name of the input |  |
| nonce | string \| undefined | No |  |  |  |  |  |
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
| onBeforeInput | InputEventHandler<T> \| undefined | No |  |  |  |  |  |
| onBeforeInputCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the blur event |  |
| onBlurCapture | FocusEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlay | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayThrough | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayThroughCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onChangeCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onChangeDeferred | (() => void) \| undefined | No |  |  |  | Deferred callback to be called after the onChange event |  |
| onClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on click |  |
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
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the focus event |  |
| onFocusCapture | FocusEventHandler<T> \| undefined | No |  |  |  |  |  |
| onGotPointerCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onGotPointerCaptureCapture | PointerEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInput | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInputCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInvalid | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onInvalidCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| onKeyDownCapture | KeyboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onKeyUp | KeyboardEventHandler<T> \| undefined | No |  |  |  |  |  |
| onKeyUpCapture | KeyboardEventHandler<T> \| undefined | No |  |  |  |  |  |
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
| part | string \| undefined | No |  |  |  |  |  |
| pattern | string \| undefined | No |  |  |  |  |  |
| placeholder | string \| undefined | No |  |  |  | Placeholder string to be displayed in input |  |
| positionedChildren | React.ReactNode | No |  |  |  | Container for DatePicker or SelectList components |  |
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
| size | "large" \| "small" \| "medium" \| undefined | No |  |  |  | Size of an input |  |
| slot | string \| undefined | No |  |  |  |  |  |
| spellCheck | Booleanish \| undefined | No |  |  |  |  |  |
| src | string \| undefined | No |  |  |  |  |  |
| step | string \| number \| undefined | No |  |  |  |  |  |
| style | CSSProperties \| undefined | No |  |  |  |  |  |
| suppressContentEditableWarning | boolean \| undefined | No |  |  |  |  |  |
| suppressHydrationWarning | boolean \| undefined | No |  |  |  |  |  |
| tabIndex | number \| undefined | No |  |  |  |  |  |
| title | string \| undefined | No |  |  |  |  |  |
| tooltipId | string \| undefined | No |  |  |  | The id attribute for the validation tooltip |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  |  |  | [Legacy] Overrides the default tooltip position. |  |
| translate | "yes" \| "no" \| undefined | No |  |  |  |  |  |
| typeof | string \| undefined | No |  |  |  |  |  |
| unselectable | "off" \| "on" \| undefined | No |  |  |  |  |  |
| validationIconId | string \| undefined | No |  |  |  | Id of the validation icon |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set |  |
| validationOnLabel | boolean \| undefined | No |  |  |  | [Legacy] When true, validation icon will be placed on label instead of being placed on the input. |  |
| vocab | string \| undefined | No |  |  |  |  |  |
| warning | string \| boolean \| undefined | No |  |  |  | Indicate that warning has occurred. |  |
| width | string \| number \| undefined | No |  |  |  |  |  |
| data-component | string \| undefined | No |  |  |  |  |  |
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
| aria-label | string \| undefined | No |  |  |  | Defines a string value that labels the current element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
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
| aria-dropeffect | "none" \| "copy" \| "link" \| "execute" \| "move" \| "popup" \| undefined | No |  | Yes | in ARIA 1.1 | Indicates what functions can be performed when a dragged object is released on the drop target. |  |
| aria-grabbed | Booleanish \| undefined | No |  | Yes | in ARIA 1.1 | Indicates an element's "grabbed" state in a drag-and-drop operation. |  |

## Examples
No Storybook examples found.