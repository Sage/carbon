---
name: carbon-component-note
description: Carbon Note component props and usage examples.
---

# Note

## Import
`import Note from "carbon-react/lib/components/note";`

## Source
- Export: `./components/note`
- Props interface: `NoteProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| createdDate | string | Yes |  | Adds a created on date to the Note footer |  |
| noteContent | string | Yes |  | The rich text content to display in the Note |  |
| inlineControl | React.ReactNode | No |  | renders a control for the Note |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| name | string \| undefined | No |  | Adds a name to the Note footer |  |
| onLinkAdded | ((url: string) => void) \| undefined | No |  | Callback to report a url when a link is added |  |
| previews | React.ReactNode | No |  | The previews to display of any links added to the Editor |  |
| status | { text: string; timeStamp: string; } \| undefined | No |  | Adds a status and tooltip to the Note footer |  |
| title | React.ReactNode | No |  | Adds a Title to the Note |  |
| width | number \| undefined | No |  | Set a percentage-based width for the whole Note component, relative to its parent. | 100 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | The aria-label to be used when no title is present |  |

## Examples
### Default

**Render**

```tsx
() => {
  const noteContent = "Here is some plain text content";
  return (
    <Box width="50%">
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
}
```


### With Rich Text

**Render**

```tsx
() => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i> Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
  <ul><li>unordered</li></ul>
  <ol><li>ordered</li></ol></br>
  <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
  <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;

  return (
    <Box width="50%">
      <Note
        noteContent={html}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
}
```


### With Title

**Render**

```tsx
() => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i> Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
  <ul><li>unordered</li></ul>
  <ol><li>ordered</li></ol></br>
  <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
  <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;
  const titleNode = <Typography variant="h3">Here is a Title Node</Typography>;

  return (
    <Box width="50%">
      <Note
        title={titleNode}
        noteContent={html}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
}
```


### With Inline Controls

**Render**

```tsx
() => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i> Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
  <ul><li>unordered</li></ul>
  <ol><li>ordered</li></ol></br>
  <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
  <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;

  const inlineControl = (
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    </ActionPopover>
  );
  return (
    <Box width="50%">
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        noteContent={html}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
}
```


### With Status

**Render**

```tsx
() => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i> Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
  <ul><li>unordered</li></ul>
  <ol><li>ordered</li></ol></br>
  <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
  <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;

  const inlineControl = (
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    </ActionPopover>
  );
  return (
    <Box width="50%">
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
        status={{ text: "Edited", timeStamp: "23 May 2020, 12:08 PM" }}
        noteContent={html}
      />
    </Box>
  );
}
```


### With Previews

**Render**

```tsx
() => {
  const json = JSON.stringify({
    root: {
      children: [
        {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "www.bbc.co.uk",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "autolink",
              version: 1,
              rel: null,
              target: null,
              title: null,
              url: "https://www.bbc.co.uk",
              isUnlinked: false,
            },
            { type: "linebreak", version: 1 },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "www.sage.com",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "autolink",
              version: 1,
              rel: null,
              target: null,
              title: null,
              url: "https://www.sage.com",
              isUnlinked: false,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });

  const inlineControl = (
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    </ActionPopover>
  );
  const previews = [
    <LinkPreview
      key="link1"
      title="This is an example of a title"
      url="https://www.bbc.co.uk"
      description="Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?"
    />,
    <LinkPreview
      key="link2"
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?"
    />,
  ];
  return (
    <Box width="50%">
      <Note
        title="Here is a Title"
        inlineControl={inlineControl}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
        status={{ text: "Edited", timeStamp: "23 May 2020, 12:08 PM" }}
        noteContent={json}
        previews={previews}
      />
    </Box>
  );
}
```


### With Margin

**Render**

```tsx
() => {
  const noteContent = "Here is some plain text content";
  return (
    <Box width="50%">
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m={1}
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m={3}
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m={5}
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m="16px"
      />
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
        m="32px"
      />
    </Box>
  );
}
```


### Plain text with links

**Render**

```tsx
() => {
  const noteContent =
    "Hello, World! www.bbc.co.uk http://www.google.com https://www.sage.com";
  return (
    <Box width="50%">
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
}
```

