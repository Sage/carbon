# File Input

A file input uploads a single file or multiple files selected by a user as part of a form.

**Category:** Inputs

## Quick Start

```javascript
import FileInput from "carbon-react/lib/components/file-input";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Default

Basic file upload input with a drag-and-drop area and a "Select file" button. Use `onChange` to receive the selected `File` object.

See: `examples/Default.md`

### With inputHint

Use the `inputHint` prop to display a hint text (e.g. accepted formats or max file size) below the upload area.

See: `examples/WithInputHint.md`

### Required

You can use the `required` prop to indicate if the field is mandatory.

See: `examples/Required.md`

### Size variations

By default the component has a width of `280px`. This allows both the text and button to render on a single line (as seen in all the examples above).

You can increase the width and/or height of the component by setting the `maxWidth` and/or `minHeight` props. You might need to do this to fit especially long
explanatory text, or to match the precise width/height of a particular design. Examples of increasing width and height are shown below:

#### Increased height

See: `examples/IncreasedHeight.md`

#### Both height and width increased

See: `examples/IncreasedBoth.md`

#### Full width example

Note that any valid CSS values can be used for these props, and that you can therefore set the `maxWidth` to `"100%"` to fill out the entire container width:

See: `examples/FullWidth.md`

#### Responsive width example

You can use the CSS `min` function to set the width to grow to fill the available space if the container is wider than `280px`. This is useful for responsive
designs where the component should grow to fill the available space. You may also set the `minWidth` prop to allow the component to shrink to a smaller width
if the container is narrower than `280px`.

See: `examples/ResponsiveWidth.md`

#### Vertical layout

One common variation is to have the text vertically stacked below the button, which can be achieved by setting the `isVertical` boolean prop to `true`.
Note that this will automatically be the case if the button and text no longer fit onto a single line, even if the `isVertical` prop is set to `false`.

See: `examples/Vertical.md`

### Accept

The `accept` prop is passed directly to the underlying HTML `<input type="file">` element, and helps guide users towards uploading files of the correct format or type.

Please see the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more details on this attribute. Note that it does not prevent the user
from uploading a file of the incorrect type, for example via drag and drop - so you might still want to use the `onChange` prop to add an error message as soon as an
inappropriate file is added. And of course nothing takes away the need for validation on the server side. However the `accept` prop is still recommended to guide the user -
when selecting a file via the "select file" button, the operating system's file picker will either highlight the appropriate files, or make it impossible to select
incorrect ones.

See: `examples/Accept.md`

### Validation of file type

Here is a simple example showing how the `onChange` and `error` props can be used in conjunction with `accept` to warn the user if they have chosen an inappropriate
file.

See: `examples/FileTypeValidation.md`

### Tracking upload status

The `uploadStatus` prop is used to indicate when a file has been added, as well as to display the current status or progress of its upload —
including options to cancel or remove the uploaded file. You must provide this prop (as a `FileUploadStatusProps` object) in order for users
to see any visual indication of the uploaded file.

Note, that this component supports uploading a single file at a time. While the `uploadStatus` prop accepts an array, this is intended for
reuse of the component across uploads — not for handling multiple files in a single selection.

For this reason the `onChange` function prop is mandatory - without providing an implementation for this event handler that updates the
components `uploadStatus`, there will be no visual change once a file has been added to the input.

#### Client side example

Here is a relatively simple example of using a [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) to track progress purely
on the client side, resulting in storing the file locally as a `data:` URL. This is a way to show users a preview of their file if you do not intend
to track upload progress on the server, or do not actually send the files to a server until form submission.

Note the use of a `ref` to store the `FileReader` object - this is not essential but avoids having to create a new `FileReader` object more than once in the
lifecycle of the component.

This example also contains validation to restrict the user from uploading large files - this is useful because storing a large file in memory may make the
browser freeze or even crash. If your application needs to process large files on the client side then consider
[reading the file into an ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer) and processing that piece-by-piece.

See: `examples/UploadStatusClient.md`

#### Other approaches

This example mocks an alternative approach where files added to the file input are immediately sent to the server, and the UI tracks the progress of the upload.
This simple example mocks the progress (and the possibility of errors, such as network errors) with random numbers - in a real scenario this would poll an
alternative endpoint for the upload progress, or use WebSocket messages sent from the server to update progress.

See: `examples/UploadStatusAlternative.md`

#### Uploading without progress percentage

Note that you can set the `uploading` without the `progress` property, to render an
animated LoaderBar component, rather
than a [ProgressTracker](../progress-tracker/index.md) as it does when `progress` is provided.

See: `examples/UploadStatusNoProgress.md`

## Props

### File Input

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (files: FileList) => void | Yes |  | onChange event handler. Accepts a list of all files currently entered to the input. |  |
| accept | string \| undefined | No |  | Which file format(s) to accept. Will be passed to the underlying HTML input. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept |  |
| buttonText | string \| undefined | No |  | Text to appear on the main button. Defaults to "Select file" |  |
| dragAndDropText | string \| undefined | No |  | Explanatory text to appear inside the input area. Defaults to "or drag and drop your file" |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  | HTML id attribute of the input |  |
| inputHint | React.ReactNode | No |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| isVertical | boolean \| undefined | No |  | Sets the default layout to vertical - with the button below the explanatory text rather than next to it. This is the equivalent of removing the maxHeight prop - it will be over-ridden if this prop is set explicitly. |  |
| label | string \| undefined | No |  | Label content |  |
| maxHeight | string \| undefined | No |  | A valid CSS string for the max-height CSS property. |  |
| maxWidth | string \| undefined | No |  | A valid CSS string for the max-width CSS property. Defaults to the same as the minWidth. |  |
| minHeight | string \| undefined | No |  | A valid CSS string for the min-height CSS property. |  |
| minWidth | string \| undefined | No |  | A valid CSS string for the min-width CSS property. |  |
| name | string \| undefined | No |  | Name of the input |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory. |  |
| uploadStatus | FileUploadStatusProps \| FileUploadStatusProps[] \| undefined | No |  | used to control how to display the progress of uploaded file(s) within the component |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the FileInput |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### File Upload Status

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| filename | string | Yes |  | the name of the file |  |
| onAction | () => void | Yes |  | a function to be executed when the user clicks the appropriate action button (Clear/Delete File/Cancel Upload) |  |
| status | "uploading" | Yes |  | the status of the upload |  |
| iconType | IconType \| undefined | No |  | The icon to use for the file during or after upload | "file_generic" |
| message | string \| undefined | No |  | The status message. Used to display the current upload progress, including error messages where appropriate. Not used for the `previously` status. |  |
