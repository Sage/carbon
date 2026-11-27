---
name: carbon-component-multi-select
description: Carbon MultiSelect component props and usage examples.
---

# MultiSelect

## Import
`import { MultiSelect } from "carbon-react/lib/components/select";`

## Source
- Export: `./components/select`
- Props interface: `MultiSelectProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Child components (such as Option or OptionRow) for the SelectList |  |
| onChange | (ev: CustomSelectChangeEvent \| React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Specify a callback triggered on change |  |
| value | string[] \| Record<string, unknown>[] | Yes |  |  |  | The selected value(s) |  |
| about | string \| undefined | No |  |  |  |  |  |
| accept | string \| undefined | No |  |  |  |  |  |
| accessKey | string \| undefined | No |  |  |  |  |  |
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
| dir | string \| undefined | No |  |  |  |  |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| draggable | Booleanish \| undefined | No |  |  |  |  |  |
| enableVirtualScroll | boolean \| undefined | No |  |  |  | Set this prop to enable a virtualised list of options. If it is not used then all options will be in the DOM at all times, which may cause performance problems on very large lists |  |
| enterKeyHint | "go" \| "send" \| "search" \| "enter" \| "done" \| "next" \| "previous" \| undefined | No | go \| send \| search \| enter \| done \| next \| previous |  |  |  |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| exportparts | string \| undefined | No |  |  |  |  |  |
| flipEnabled | boolean \| undefined | No |  |  |  | Use the opposite list placement if the set placement does not fit | true |
| form | string \| undefined | No |  |  |  |  |  |
| formAction | string \| undefined | No |  |  |  |  |  |
| formattedValue | string \| undefined | No |  |  |  | An optional alternative for props.value, this is useful if the real value is an ID but you want to show a human-readable version. |  |
| formEncType | string \| undefined | No |  |  |  |  |  |
| formMethod | string \| undefined | No |  |  |  |  |  |
| formNoValidate | boolean \| undefined | No |  |  |  |  |  |
| formTarget | string \| undefined | No |  |  |  |  |  |
| height | string \| number \| undefined | No |  |  |  |  |  |
| hidden | boolean \| undefined | No |  |  |  |  |  |
| id | string \| undefined | No |  |  |  | Id attribute of the input element |  |
| inlist | any | No |  |  |  |  |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputMode | "email" \| "none" \| "search" \| "text" \| "tel" \| "url" \| "numeric" \| "decimal" \| undefined | No | email \| none \| search \| text \| tel \| url \| numeric \| decimal |  |  | Hints at the type of data that might be entered by the user while editing the element or its contents |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| is | string \| undefined | No |  |  |  | Specify that a standard HTML element should behave like a defined custom built-in element |  |
| isLoading | boolean \| undefined | No |  |  |  | If true the loader animation is displayed in the option list |  |
| itemID | string \| undefined | No |  |  |  |  |  |
| itemProp | string \| undefined | No |  |  |  |  |  |
| itemRef | string \| undefined | No |  |  |  |  |  |
| itemScope | boolean \| undefined | No |  |  |  |  |  |
| itemType | string \| undefined | No |  |  |  |  |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelInline | boolean \| undefined | No |  |  |  | [Legacy] When true label is inline |  |
| lang | string \| undefined | No |  |  |  |  |  |
| list | string \| undefined | No |  |  |  |  |  |
| listMaxHeight | number \| undefined | No |  |  |  | Maximum list height in pixels. Defaults to five and a half options for the selected size. |  |
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
| onBeforeInput | InputEventHandler<T> \| undefined | No |  |  |  |  |  |
| onBeforeInputCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onBlurCapture | FocusEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlay | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayThrough | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onCanPlayThroughCapture | ReactEventHandler<T> \| undefined | No |  |  |  |  |  |
| onChangeCapture | FormEventHandler<T> \| undefined | No |  |  |  |  |  |
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
| openOnFocus | boolean \| undefined | No |  |  |  | If true the Component opens on focus | false |
| part | string \| undefined | No |  |  |  |  |  |
| pattern | string \| undefined | No |  |  |  |  |  |
| prefix | string \| undefined | No |  |  |  | Emphasized part of the displayed text |  |
| property | string \| undefined | No |  |  |  |  |  |
| radioGroup | string \| undefined | No |  |  |  |  |  |
| readOnly | boolean \| undefined | No |  |  |  | If true, the component will be read-only |  |
| rel | string \| undefined | No |  |  |  |  |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| resource | string \| undefined | No |  |  |  |  |  |
| results | number \| undefined | No |  |  |  |  |  |
| rev | string \| undefined | No |  |  |  |  |  |
| role | AriaRole \| undefined | No |  |  |  |  |  |
| security | string \| undefined | No |  |  |  |  |  |
| size | "small" \| "medium" \| "large" \| undefined | No | small \| medium \| large |  |  | Size of an input | "medium" |
| slot | string \| undefined | No |  |  |  |  |  |
| spellCheck | Booleanish \| undefined | No |  |  |  |  |  |
| src | string \| undefined | No |  |  |  |  |  |
| step | string \| number \| undefined | No |  |  |  |  |  |
| style | CSSProperties \| undefined | No |  |  |  |  |  |
| suppressContentEditableWarning | boolean \| undefined | No |  |  |  |  |  |
| suppressHydrationWarning | boolean \| undefined | No |  |  |  |  |  |
| tabIndex | number \| undefined | No |  |  |  |  |  |
| title | string \| undefined | No |  |  |  |  |  |
| translate | "yes" \| "no" \| undefined | No | yes \| no |  |  |  |  |
| type | HTMLInputTypeAttribute \| undefined | No |  |  |  |  |  |
| typeof | string \| undefined | No |  |  |  |  |  |
| unselectable | "off" \| "on" \| undefined | No | off \| on |  |  |  |  |
| validationIconId | string \| undefined | No |  |  |  | Id of the validation icon |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set |  |
| virtualScrollOverscan | number \| undefined | No |  |  |  | The number of options to render into the DOM at once, either side of the currently-visible ones. Higher values make for smoother scrolling but may impact performance. Only used if the `enableVirtualScroll` prop is set. |  |
| vocab | string \| undefined | No |  |  |  |  |  |
| warning | string \| boolean \| undefined | No |  |  |  | Indicate that warning has occurred. |  |
| width | string \| number \| undefined | No |  |  |  |  |  |
| wrapPillText | boolean \| undefined | No |  |  |  | Wraps the pill text when it would overflow the input width | true |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-activedescendant | string \| undefined | No |  |  |  | Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. |  |
| aria-atomic | Booleanish \| undefined | No |  |  |  | Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. |  |
| aria-autocomplete | "none" \| "inline" \| "list" \| "both" \| undefined | No | none \| inline \| list \| both |  |  | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made. |  |
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
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No | off \| assertive \| polite |  |  | Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. |  |
| aria-modal | Booleanish \| undefined | No |  |  |  | Indicates whether an element is modal when displayed. |  |
| aria-multiline | Booleanish \| undefined | No |  |  |  | Indicates whether a text box accepts multiple lines of input or only a single line. |  |
| aria-multiselectable | Booleanish \| undefined | No |  |  |  | Indicates that the user may select more than one item from the current selectable descendants. |  |
| aria-orientation | "horizontal" \| "vertical" \| undefined | No | horizontal \| vertical |  |  | Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. |  |
| aria-owns | string \| undefined | No |  |  |  | Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. |  |
| aria-placeholder | string \| undefined | No |  |  |  | Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. |  |
| aria-posinset | number \| undefined | No |  |  |  | Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-pressed | boolean \| "true" \| "false" \| "mixed" \| undefined | No |  |  |  | Indicates the current "pressed" state of toggle buttons. |  |
| aria-readonly | Booleanish \| undefined | No |  |  |  | Indicates that the element is not editable, but is otherwise operable. |  |
| aria-relevant | "text" \| "additions" \| "additions removals" \| "additions text" \| "all" \| "removals" \| "removals additions" \| "removals text" \| "text additions" \| "text removals" \| undefined | No | text \| additions \| additions removals \| additions text \| all \| removals \| removals additions \| removals text \| text additions \| text removals |  |  | Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. |  |
| aria-required | Booleanish \| undefined | No |  |  |  | Indicates that user input is required on the element before a form may be submitted. |  |
| aria-roledescription | string \| undefined | No |  |  |  | Defines a human-readable, author-localized description for the role of an element. |  |
| aria-rowcount | number \| undefined | No |  |  |  | Defines the total number of rows in a table, grid, or treegrid. |  |
| aria-rowindex | number \| undefined | No |  |  |  | Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. |  |
| aria-rowindextext | string \| undefined | No |  |  |  | Defines a human readable text alternative of aria-rowindex. |  |
| aria-rowspan | number \| undefined | No |  |  |  | Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. |  |
| aria-selected | Booleanish \| undefined | No |  |  |  | Indicates the current "selected" state of various widgets. |  |
| aria-setsize | number \| undefined | No |  |  |  | Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-sort | "none" \| "ascending" \| "descending" \| "other" \| undefined | No | none \| ascending \| descending \| other |  |  | Indicates if items in a table or grid are sorted in ascending or descending order. |  |
| aria-valuemax | number \| undefined | No |  |  |  | Defines the maximum allowed value for a range widget. |  |
| aria-valuemin | number \| undefined | No |  |  |  | Defines the minimum allowed value for a range widget. |  |
| aria-valuenow | number \| undefined | No |  |  |  | Defines the current value for a range widget. |  |
| aria-valuetext | string \| undefined | No |  |  |  | Defines the human readable text alternative of aria-valuenow for a range widget. |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Yes | `adaptiveLabelBreakpoint` has been deprecated. It is recommended to use `useMediaQuery` hook to implement adaptive behaviour. Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |  |  |
| align | "left" \| "right" \| undefined | No | left \| right | Yes | `align` no longer has any effect in MultiSelect. |  |  |
| deferTimeout | number \| undefined | No |  | Yes | `deferTimeout` no longer has any effect in MultiSelect. |  |  |
| fieldHelp | React.ReactNode | No |  | Yes | `fieldHelp` no longer has any effect in MultiSelect. Use `inputHint` instead. |  |  |
| helpAriaLabel | string \| undefined | No |  | Yes | `helpAriaLabel` has been deprecated, the functionality will no longer work. |  |  |
| iconOnClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Yes | `iconOnClick` is no longer called by MultiSelect. |  |  |
| iconOnMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Yes | `iconOnMouseDown` is no longer called by MultiSelect. |  |  |
| iconTabIndex | number \| undefined | No |  | Yes | `iconTabIndex` no longer has any effect in MultiSelect. |  |  |
| inert | any | No |  | Yes | `inert` is no longer applied by MultiSelect. |  |  |
| info | string \| boolean \| undefined | No |  | Yes | `info` no longer has any effect in MultiSelect. |  |  |
| inputIcon | string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal \| null \| undefined | No |  | Yes | `inputIcon` no longer has any effect in MultiSelect. |  |  |
| isRequired | boolean \| undefined | No |  | Yes | `isRequired` no longer has any effect in MultiSelect. Use `required` instead. |  |  |
| labelAlign | "left" \| "right" \| undefined | No | left \| right | Yes | `labelAlign` has been deprecated, the functionality will no longer work. |  |  |
| labelHelp | React.ReactNode | No |  | Yes | `labelHelp` no longer has any effect in MultiSelect. Use `inputHint` instead. |  |  |
| labelSpacing | 1 \| 2 \| undefined | No | 1 \| 2 | Yes | `labelSpacing` has been deprecated, the functionality will no longer work. |  |  |
| labelWidth | number \| undefined | No |  | Yes | `labelWidth` no longer has any effect in MultiSelect. |  |  |
| leftChildren | React.ReactNode | No |  | Yes | `leftChildren` no longer has any effect in MultiSelect. |  |  |
| listPlacement | ListPlacement \| undefined | No | bottom \| top \| top-start \| bottom-start \| top-end \| bottom-end | Yes | `listPlacement` no longer has any effect; the list is positioned automatically. |  |  |
| listWidth | number \| undefined | No |  | Yes | `listWidth` no longer has any effect in MultiSelect. |  |  |
| multiColumn | boolean \| undefined | No |  | Yes | `multiColumn` no longer enables multi-column options in MultiSelect. |  |  |
| onChangeDeferred | ((ev: React.ChangeEvent<HTMLInputElement>) => void) \| undefined | No |  | Yes | `onChangeDeferred` is no longer called by MultiSelect. |  |  |
| onKeyPress | KeyboardEventHandler<T> \| undefined | No |  | Yes | Use `onKeyUp` or `onKeyDown` instead |  |  |
| onKeyPressCapture | KeyboardEventHandler<T> \| undefined | No |  | Yes | Use `onKeyUpCapture` or `onKeyDownCapture` instead |  |  |
| placeholder | string \| undefined | No |  | Yes | `placeholder` no longer has any effect in MultiSelect. |  |  |
| reverse | boolean \| undefined | No |  | Yes | `reverse` has been deprecated, the functionality will no longer work. |  |  |
| tableHeader | React.ReactNode | No |  | Yes | `tableHeader` is no longer rendered by MultiSelect. |  |  |
| tooltipId | string \| undefined | No |  | Yes | `tooltipId` has been deprecated, the functionality will no longer work. |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No | left \| right \| bottom \| top | Yes | `tooltipPosition` no longer has any effect in MultiSelect. |  |  |
| transparent | boolean \| undefined | No |  | Yes | `transparent` no longer has any effect in MultiSelect. |  |  |
| validationOnLabel | boolean \| undefined | No |  | Yes | `validationOnLabel` has been deprecated, the functionality will no longer work. |  |  |
| aria-dropeffect | "copy" \| "link" \| "none" \| "execute" \| "move" \| "popup" \| undefined | No | copy \| link \| none \| execute \| move \| popup | Yes | in ARIA 1.1 | Indicates what functions can be performed when a dragged object is released on the drop target. |  |
| aria-grabbed | Booleanish \| undefined | No |  | Yes | in ARIA 1.1 | Indicates an element's "grabbed" state in a drag-and-drop operation. |  |

## Examples
### Playground

**Args**

```tsx
{
    label: "Color",
    inputHint: "Select an option",
    size: "medium",
    disabled: false,
    readOnly: false,
    required: false,
    isLoading: false,
    openOnFocus: false,
    labelInline: false,
    flipEnabled: true,
    enableVirtualScroll: false,
    virtualScrollOverscan: 5,
    value: [],
  }
```

**Render**

```tsx
(args) => <PlaygroundStory {...args} />
```


### With Custom Colored Pills

**Render**

```tsx
() => {
  const [value, setValue] = useState<string[]>(["1", "3"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box height={250}>
      <MultiSelect
        name="simple"
        id="simple"
        label="color"
        value={value}
        onChange={onChangeHandler}
      >
        <Option text="Grey" value="1" variant="grey" />
        <Option text="Green" value="2" variant="green" fill />
        <Option text="Red" value="3" variant="red" />
        <Option text="Orange" value="4" variant="orange" />
        <Option text="Blue" value="5" variant="blue" />
        <Option text="Purple" value="6" variant="purple" />
        <Option text="Teal" value="7" variant="teal" fill />
        <Option text="Lime" value="8" variant="lime" fill />
        <Option text="Pink" value="9" variant="pink" />
        <Option text="Slate" value="10" variant="slate" fill />
      </MultiSelect>
    </Box>
  );
}
```


### Pills with Long Text

**Render**

```tsx
() => {
  const [value, setValue] = useState<string[]>(["1"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box height={250} maxWidth="200px">
      <MultiSelect
        name="long-pill-text-wrapped"
        id="long-pill-text-wrapped"
        label="long pill text wrapped"
        wrapPillText
        value={value}
        onChange={onChangeHandler}
      >
        <Option text="Amber is the colour" value="1" />
        <Option text="Black is the colour" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
      </MultiSelect>
    </Box>
  );
}
```


### Lazy Loading

**Render**

```tsx
() => {
  const preventLoading = useRef(false);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optionList, setOptionList] = useState<React.ReactElement[]>([]);

  useEffect(
    () => () => {
      if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    },
    [],
  );

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    loadTimer.current = setTimeout(() => {
      setOptionList([
        <Option text="Amber" value="amber" key="Amber" />,
        <Option text="Black" value="black" key="Black" />,
        <Option text="Blue" value="blue" key="Blue" />,
        <Option text="Brown" value="brown" key="Brown" />,
        <Option text="Green" value="green" key="Green" />,
      ]);
      setIsLoading(false);
      loadTimer.current = null;
    }, DEMO_LOADING_DELAY);
  }

  function reset() {
    if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    loadTimer.current = null;
    setOptionList([]);
    setValue([]);
    setIsLoading(true);
    preventLoading.current = false;
  }

  return (
    <Box height={300}>
      <Button onClick={reset} mb={2}>
        Reset
      </Button>
      <MultiSelect
        name="lazyLoading"
        id="lazyLoading"
        label="Color"
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
        onOpen={loadList}
        isLoading={isLoading}
      >
        {optionList}
      </MultiSelect>
    </Box>
  );
}
```


### With infinite scroll

**Render**

```tsx
() => {
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState<string[]>(["1"]);
  const [optionCount, setOptionCount] = useState(INFINITE_SCROLL_BATCH_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => () => {
      if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    },
    [],
  );

  function loadMoreOptions() {
    if (loadTimer.current !== null) return;

    setIsLoading(true);
    loadTimer.current = setTimeout(() => {
      setOptionCount((count) => count + INFINITE_SCROLL_BATCH_SIZE);
      setIsLoading(false);
      loadTimer.current = null;
    }, DEMO_LOADING_DELAY);
  }

  function reset() {
    if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    loadTimer.current = null;
    setOptionCount(INFINITE_SCROLL_BATCH_SIZE);
    setValue(["1"]);
    setIsLoading(false);
  }

  return (
    <Box height={400}>
      <Typography mb={2}>
        Scroll to the bottom to load {INFINITE_SCROLL_BATCH_SIZE} more options.
        Currently {optionCount} options loaded.
      </Typography>
      <Button onClick={reset} mb={2}>
        Reset
      </Button>
      <MultiSelect
        name="infiniteScroll"
        id="infiniteScroll"
        label="Options"
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
        enableVirtualScroll={false}
        isLoading={isLoading}
        onListScrollBottom={loadMoreOptions}
      >
        {Array.from({ length: optionCount }, (_, index) => {
          const optionNumber = index + 1;
          return (
            <Option
              key={optionNumber}
              text={`Option ${optionNumber}`}
              value={String(optionNumber)}
            />
          );
        })}
      </MultiSelect>
    </Box>
  );
}
```


### Virtualised

**Render**

```tsx
() => {
  const [value, setValue] = useState<string[]>(["0"]);
  return (
    <Box height={320}>
      <MultiSelect
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
      >
        {Array(10000)
          .fill(undefined)
          .map((_, index) => (
            <Option
              key={`option-${index + 1}`}
              value={`${index}`}
              text={`Option ${index + 1}`}
            />
          ))}
      </MultiSelect>
    </Box>
  );
}
```


### Selection Confirmed

**Render**

```tsx
() => {
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [value, setValue] = useState<string[]>(["1"]);
  return (
    <Box height={380}>
      <Typography variant="strong">
        Selection Confirmed:{" "}
        {selectionConfirmed ? (
          <Icon type="tick" bg="primary" color="white" />
        ) : (
          <Icon type="cross" bg="red" color="white" />
        )}
      </Typography>
      <MultiSelect
        value={value}
        onChange={(event: CustomSelectChangeEvent) => {
          setSelectionConfirmed(!!event.selectionConfirmed);
          setValue(event.target.value as unknown as string[]);
        }}
        name="selection confirmed"
        id="selection confirmed"
        label="color"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </MultiSelect>
    </Box>
  );
}
```


### Dynamically Adding Options

**Render**

```tsx
() => {
  const [optionsList, setOptionsList] = useState(options);
  const [currentOptions, setCurrentOptions] = useState<string[]>(["A"]);
  useEffect(() => {
    if (currentOptions.some((option) => option !== "A")) {
      setOptionsList([...allOptions, ...options]);
    }
  }, [currentOptions]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOptions(event.target.value as unknown as string[]);
  };
  return (
    <Box height={320}>
      <MultiSelect
        label="Choose your option"
        data-role="selector"
        onChange={handleChange}
        value={currentOptions}
      >
        {optionsList.map((opt) => (
          <Option
            data-role={`option-${opt}`}
            text={opt}
            value={opt}
            key={opt}
          />
        ))}
      </MultiSelect>
    </Box>
  );
}
```


### Add Option From Dialog

**Render**

```tsx
() => {
  const selectRef = useRef<HTMLInputElement>(null);
  const nextOptionId = useRef(4);
  const shouldRestoreSelectFocus = useRef(false);
  const [value, setValue] = useState<string[]>(["option-1"]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [optionLabelError, setOptionLabelError] = useState("");
  const [optionList, setOptionList] = useState([
    { value: "option-1", text: "Dropdown item 1" },
    { value: "option-2", text: "Dropdown item 2" },
    { value: "option-3", text: "Dropdown item 3" },
  ]);

  useEffect(() => {
    if (dialogOpen || !shouldRestoreSelectFocus.current) return;

    shouldRestoreSelectFocus.current = false;
    const focusTimer = window.setTimeout(
      () => selectRef.current?.focus(),
      DIALOG_CLOSE_FOCUS_DELAY,
    );

    return () => window.clearTimeout(focusTimer);
  }, [dialogOpen]);

  const closeDialogAndFocusSelect = () => {
    setOptionLabelError("");
    shouldRestoreSelectFocus.current = true;
    setDialogOpen(false);
  };

  const addOption = () => {
    const text = newOptionLabel.trim();
    if (!text) {
      setOptionLabelError("Enter an option label.");
      return;
    }

    const optionValue = `option-${nextOptionId.current}`;
    nextOptionId.current += 1;
    setOptionList((currentOptions) => [
      ...currentOptions,
      { value: optionValue, text },
    ]);
    setNewOptionLabel("");
    closeDialogAndFocusSelect();
  };

  return (
    <Box height={300}>
      <MultiSelect
        ref={selectRef}
        name="addOption"
        id="addOption"
        label="Object"
        required
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
      >
        <ActionOption
          value="add-option"
          text="Add an option"
          leading={<Icon type="add" />}
          onClick={() => setDialogOpen(true)}
        />
        {optionList.map((option) => (
          <Option key={option.value} {...option} />
        ))}
      </MultiSelect>

      <Dialog
        open={dialogOpen}
        onCancel={closeDialogAndFocusSelect}
        restoreFocusOnClose={false}
        title="Add an option"
        footer={
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button variantType="subtle" onClick={closeDialogAndFocusSelect}>
              Cancel
            </Button>
            <Button onClick={addOption}>Add</Button>
          </Box>
        }
      >
        <Textbox
          autoFocus
          label="Option label"
          value={newOptionLabel}
          error={optionLabelError || undefined}
          onChange={(event) => {
            setNewOptionLabel(event.target.value);
            setOptionLabelError("");
          }}
        />
      </Dialog>
    </Box>
  );
}
```


### Complex Compositions

**Render**

```tsx
() => {
  const [value, setValue] = useState<string[]>(["1"]);
  return (
    <Box height={500}>
      <MultiSelect
        name="complexCompositions"
        id="complexCompositions"
        label="Option compositions"
        listMaxHeight={400}
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
      >
        <Option
          text="Option with an icon"
          value="1"
          leading={<Icon type="favourite" />}
        />
        <Option text="Option with a divider" value="2" divider />
        <OptionGroupHeader label="Option heading" />
        <Option text="Option with a prefix" value="3" prefix="New " />
        <Option
          text="Option with subtext"
          value="4"
          subtext="Some helpful subtext"
        />
        <Option
          text="Option with an icon and portrait"
          value="5"
          leading={
            <>
              <Icon type="individual" />
              <Portrait initials="JD" size="XS" />
            </>
          }
        />
      </MultiSelect>
    </Box>
  );
}
```


### MDX Example 1

**Args**

```tsx
`MultiSelect` is controlled: pass an array of selected `value`s and update it from `onChange`. Use `Option` children to build the list,
`OptionGroupHeader` to create labelled sections, and `ActionOption` for an action that does not change the selected values.
Give dynamically generated options stable React keys so their identity and accessible IDs remain stable when the list changes.

Typing in the input filters the available options by their `text` value.

Use `inputHint` to tell people what to do when no option is selected. 

## Examples

### Playground

Use the controls to explore supported sizes, validation states, loading, positioning and virtualisation.

<Canvas of={MultiSelectStories.Playground} />

<Controls of={MultiSelectStories.Playground} />

### Custom colored Pills

Change the appearance of selected pills with the `variant` and `fill` props on `Option` components.

See [Colors](../?path=/docs/documentation-colors--docs) for more information on usable colors

<Canvas of={MultiSelectStories.WithCustomColoredPills} />

### Pills with long text strings

By default the Pill text will wrap when it overflows the input width, you can override this by
setting the `wrapPillText` prop to false.

<Canvas of={MultiSelectStories.PillsWithLongText} />

### Lazy loading

`isLoading` displays a loader at the end of the list while options are fetched. An open list announces loading and newly added
options to screen readers. The component does not infer whether a request succeeded or failed when loading ends.

<Canvas of={MultiSelectStories.LazyLoading} />

### Infinite scroll example

The `isLoading` prop in combination with the `onListScrollBottom` prop can be used to implement infinite scroll.
The callback is invoked whenever the open list is scrolled to its bottom. Guard against starting duplicate requests while a request
is already in progress.
While the list is open, screen readers are informed when loading starts and when additional options are added. MultiSelect does not infer
whether a request succeeded or failed when loading ends.

<Canvas of={MultiSelectStories.WithInfiniteScroll} />

### Virtual scrolling

The `enableVirtualScroll` prop can be used to enable "virtual scrolling" to only render a few options into the DOM at any one time.
This allows an unlimited amount of children to be passed with little impact on rendering performance.

By default this will render 5 not-currently-visible options into the DOM on either side of the currently-visible ones - this value can
be customised if desired using the `virtualScrollOverscan` prop. Higher values will make scrolling smoother but may negatively impact performance.

<Canvas of={MultiSelectStories.Virtualised} />

### Selection confirmed

The `onChange` event includes `selectionConfirmed`, so a consumer can distinguish explicit selection from changes during navigation.

<Canvas of={MultiSelectStories.SelectionConfirmedStory} />

### Dynamically adding options, and the importance of the `key` property

Provide stable keys when dynamically adding or reordering `Option` children. The component uses the
[aria-activedescendant attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant)
to expose the active option to assistive technologies. Stable React keys allow each rendered option to retain that identity as the
list changes. An explicit `id` can also be supplied when a stable DOM ID is required by an integration.

<Canvas
  name="dynamically adding options"
  of={MultiSelectStories.SelectWithDynamicallyAddedOption}
/>

### Adding an option from a dialog

`ActionOption` accepts the same props and renders the same option element as `Option`, with a distinct action treatment. Its `onClick`
callback runs without changing the selected values. This example opens a dialog, adds the submitted value with a stable key, and uses
the MultiSelect's forwarded input ref to restore focus when the dialog closes. The flow can be repeated to add multiple options.

<Canvas of={MultiSelectStories.AddOptionFromDialog} />

### Complex compositions

`Option`s support rich content such as leading icons, prefixes, subtext and portraits, as well as dividers between
items. You can also pass a composed layout to the `OptionGroupHeader` via its `children` prop, which overrides any
values passed to the `icon` and `label` props.

<Canvas of={MultiSelectStories.ComplexCompositions} />

## Keyboard interaction

- Enter, Arrow Up, Arrow Down, Home and End open a closed MultiSelect.
- Arrow keys move through enabled options. Home and End move to the first and last enabled options.
- Enter selects the active option. Selected values can also be removed using their pill controls.
- Escape closes the list and returns focus to the input.
- Typing, including spaces, filters options using each Option's `text` value.

## Validation States

This component supports input validation, see our [Validations](../?path=/docs/documentation-validations--docs) documentation page for more information.

## Testing

For testing interactions with `MultiSelect` as part of a broader user journey, we recommend testing within a browser environment using Playwright, rather than Node-based environments like JSDOM. Since JSDOM does not render visual content, mocking will be required to ensure the component's internal layout calculations function correctly, making your tests less effective.

### JSDOM tests (if required)

If you need to test within JSDOM, we provide a utility function for setting up any required global mocks:
```

