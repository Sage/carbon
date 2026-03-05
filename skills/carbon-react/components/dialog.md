---
name: carbon-component-dialog
description: Carbon Dialog component props and usage examples.
---

# Dialog

## Import
`import Dialog from "carbon-react/lib/components/dialog";`

## Source
- Export: `./components/dialog`
- Props interface: `DialogProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  |  |  | Sets the open state of the modal |  |
| ariaRole | string \| undefined | No |  |  |  | The ARIA role to be applied to the modal |  |
| bespokeFocusTrap | ((ev: KeyboardEvent, firstElement?: HTMLElement, lastElement?: HTMLElement) => void) \| undefined | No |  |  |  | Function to replace focus trap |  |
| children | React.ReactNode | No |  |  |  | Child elements |  |
| className | string \| undefined | No |  |  |  |  |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  |  |  | Data tag prop bag for close Button |  |
| contentPadding | ContentPaddingInterface \| undefined | No |  |  |  | Padding to be set on the Dialog content |  |
| contentRef | React.ForwardedRef<HTMLDivElement> \| undefined | No |  |  |  | Reference to the scrollable content element |  |
| disableAutoFocus | boolean \| undefined | No |  |  |  |  |  |
| disableEscKey | boolean \| undefined | No |  |  |  | Determines if the Esc Key closes the modal |  |
| disableFocusTrap | boolean \| undefined | No |  |  |  |  |  |
| enableBackgroundUI | boolean \| undefined | No |  |  |  | Determines if the background is disabled when the modal is open |  |
| focusableContainers | React.RefObject<HTMLElement>[] \| undefined | No |  |  |  | an optional array of refs to containers whose content should also be reachable by tabbing from the dialog |  |
| focusableSelectors | string \| undefined | No |  |  |  | Optional selector to identify the focusable elements, if not provided a default selector is used |  |
| focusFirstElement | HTMLElement \| React.RefObject<HTMLElement> \| null \| undefined | No |  |  |  | Optional reference to an element meant to be focused on open |  |
| fullscreen | boolean \| undefined | No |  |  |  | Whether the dialog is full-screen |  |
| greyBackground | boolean \| undefined | No |  |  |  | Change the background color of the content to grey |  |
| headerChildren | React.ReactNode | No |  |  |  | Container for components to be displayed in the header |  |
| height | string \| undefined | No |  |  |  | Allows developers to specify a specific height for the dialog. |  |
| help | string \| undefined | No |  |  |  | Adds Help tooltip to Header |  |
| highlightVariant | string \| undefined | No |  |  |  |  |  |
| onCancel | ((ev: React.KeyboardEvent<HTMLElement> \| KeyboardEvent \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | A custom close event handler |  |
| restoreFocusOnClose | boolean \| undefined | No |  |  |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. |  |
| role | string \| undefined | No |  |  |  | The ARIA role to be applied to the Dialog container |  |
| showCloseIcon | boolean \| undefined | No |  |  |  | Determines if the close icon is shown |  |
| size | "auto" \| "small" \| "medium" \| "large" \| "extra-small" \| "medium-small" \| "medium-large" \| "extra-large" \| "maximise" \| undefined | No |  |  |  | Size of dialog, default size is 750px |  |
| subtitle | React.ReactNode | No |  |  |  | Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. |  |
| title | React.ReactNode | No |  |  |  | Title displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to title prop. |  |
| topModalOverride | boolean \| undefined | No |  |  |  | Manually override the internal modal stacking order to set this as top |  |
| data-component | string \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Prop to specify the aria-describedby property of the Dialog component |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the Dialog component. To be used only when the title prop is not defined, and the component is not labelled by any internal element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the Dialog component To be used when the title prop is a custom React Node, or the component is labelled by an internal element other than the title. |  |
| disableClose | boolean \| undefined | No |  | Yes | Determines if the Dialog can be closed |  |  |
| disableContentPadding | boolean \| undefined | No |  | Yes | Use `contentPadding` instead. | [Legacy] Flag to remove padding from content. |  |
| pagesStyling | boolean \| undefined | No |  | Yes | For legacy styling when used with Pages component. Do not use this unless using Pages within a full-screen Dialog |  |  |

## Examples
### DefaultStory

**Args**

```tsx
{
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
  }
```

**Render**

```tsx
function DefaultStory({ onCancel, ...args }: Partial<DialogProps>) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focus(), 0);
          }}
        >
          <Form
            stickyFooter
            leftSideButtons={
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            }
            saveButton={
              <Button buttonType="primary" type="submit">
                Save
              </Button>
            }
          >
            <Typography>
              This is an example of a dialog with a Form as content
            </Typography>
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
            <Textbox label="Address" value="" onChange={() => {}} />
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
            <Textbox label="Address" value="" onChange={() => {}} />
          </Form>
        </Dialog>
      </>
    );
  }
```


### With Restore Focus On Close

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
          setShowMessage(false);
        }}
        mb={showMessage ? 5 : 0}
      >
        Open Dialog
      </Button>
      {showMessage && (
        <Message
          ref={messageRef}
          variant="error"
          onDismiss={() => setShowMessage(false)}
        >
          Some custom message
        </Message>
      )}
      <Dialog
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        title="Title"
        subtitle="Subtitle"
        restoreFocusOnClose={false}
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
        </Form>
      </Dialog>
    </>
  );
}
```


### MaxSize

**Args**

```tsx
{
    ...DefaultStory.args,
    size: "maximise",
  }
```


### With Help

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Add an address"
        help="Some help text"
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Box p="24px" bg="slateTint90" ml="88px">
            <Textbox
              labelInline
              label="Property Name"
              value=""
              onChange={() => {}}
            />
            <Fieldset>
              <Textbox
                labelInline
                label="Address Line 1"
                value=""
                onChange={() => {}}
              />
              <Textbox
                labelInline
                label="Address Line 2"
                value=""
                onChange={() => {}}
              />
              <Textbox labelInline label="Town" value="" onChange={() => {}} />
              <Textbox labelInline label="City" value="" onChange={() => {}} />
              <Textbox
                labelInline
                label="Postcode"
                value=""
                onChange={() => {}}
              />
            </Fieldset>
          </Box>
        </Form>
      </Dialog>
    </>
  );
}
```


### Loading Content

**Render**

```tsx
() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  const handleOpen = () => {
    setIsLoading(true);
    setIsOpen(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        size="medium"
        open={isOpen}
        title="Dialog with dynamic content"
        onCancel={() => setIsOpen(false)}
      >
        {isLoading ? (
          <Loader loaderType="ring" />
        ) : (
          <>
            <Textbox
              label="Textbox 1"
              labelInline
              autoFocus
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 2"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 3"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 4"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 5"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 6"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 7"
              labelInline
              value=""
              onChange={() => {}}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
```


### Focusing a Different First Element

**Render**

```tsx
() => {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsOpenOne(true)}>
        Open Demo using focusFirstElement
      </Button>
      <Dialog
        focusFirstElement={ref}
        open={isOpenOne}
        onCancel={() => setIsOpenOne(false)}
        aria-label="Demo using focusFirstElement"
      >
        <Typography>
          Focus an element that does not support autofocus
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="150px"
        >
          <Button onClick={() => setIsOpenOne(false)}>Not focused</Button>
          <Button ref={ref} onClick={() => setIsOpenOne(false)}>
            This should be focused first now
          </Button>
        </Box>
        <Textbox label="Not focused" value="" onChange={() => {}} />
      </Dialog>
      <Button ml={2} onClick={() => setIsOpenTwo(true)}>
        Open Demo using autoFocus
      </Button>
      <Dialog
        disableAutoFocus
        open={isOpenTwo}
        onCancel={() => setIsOpenTwo(false)}
        aria-label="Demo using autoFocus"
      >
        <Typography>Focus an element that supports autoFocus</Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="150px"
        >
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
        </Box>
        <Textbox
          autoFocus
          label="This should be focused first now"
          value=""
          onChange={() => {}}
        />
      </Dialog>
    </>
  );
}
```


### OverridingContentPadding

**Args**

```tsx
{
    ...DefaultStory.args,
    contentPadding: { p: 0 },
  }
```


### Other Focusable Containers

**Render**

```tsx
() => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isToast1Open, setIsToast1Open] = useState(false);
  const [isToast2Open, setIsToast2Open] = useState(false);
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        title="Title"
        subtitle="Subtitle"
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Button onClick={() => setIsToast1Open(true)}>
            Show first toast
          </Button>
          <Button
            ml={2}
            buttonType="primary"
            onClick={() => setIsToast2Open(true)}
          >
            Show second toast
          </Button>
        </Form>
      </Dialog>
      <Toast
        open={isToast1Open}
        onDismiss={() => setIsToast1Open(false)}
        ref={toast1Ref}
        targetPortalId="stacked"
      >
        Toast message 1
      </Toast>
      <Toast
        open={isToast2Open}
        onDismiss={() => setIsToast2Open(false)}
        ref={toast2Ref}
        targetPortalId="stacked"
      >
        Toast message 2
      </Toast>
    </>
  );
}
```


### Responsive

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const largeScreen = useMediaQuery("(min-width: 1260px)");
  const mediumScreen = useMediaQuery("(min-width: 960px)");
  const smallScreen = useMediaQuery("(min-width: 600px)");
  const setCorrectScreenSize = () => {
    if (largeScreen) return "large";
    if (mediumScreen) return "medium";
    if (smallScreen) return "small";
    return "auto";
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        size={setCorrectScreenSize()}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
        </Form>
      </Dialog>
    </>
  );
}
```


### Using Handle

**Render**

```tsx
() => {
  const dialogHandle = useRef<DialogHandle>(null);

  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [state, setState] = useState("");

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsSubmitted(true);
    dialogHandle.current?.focus();
  }

  function setValue(ev: React.ChangeEvent<HTMLInputElement>) {
    setState(ev.target.value);
  }

  return (
    <CarbonProvider validationRedesignOptIn>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={isSubmitted ? "Thank you for your feedback." : "Give feedback"}
        showCloseIcon
        ref={dialogHandle}
      >
        {isSubmitted ? (
          <Typography>
            Your feedback helps us continually improve our software.
          </Typography>
        ) : (
          <Form
            stickyFooter
            saveButton={<Button type="submit">Submit</Button>}
            onSubmit={handleSubmit}
          >
            <Textarea
              label="What would you like to tell us?"
              characterLimit={1000}
              value={state}
              onChange={setValue}
            />
          </Form>
        )}
      </Dialog>
    </CarbonProvider>
  );
}
```


### Top Modal Override

**Render**

```tsx
() => {
  const [isOpenAll, setIsOpenAll] = useState(defaultOpenState);
  const [isOpenDialog1, setIsOpenDialog1] = useState(true);
  const [isOpenDialog2, setIsOpenDialog2] = useState(true);
  const [isOpenDialog3, setIsOpenDialog3] = useState(true);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpenAll(true);
          setIsOpenDialog1(true);
          setIsOpenDialog2(true);
          setIsOpenDialog3(true);
        }}
      >
        Open dialogs
      </Button>
      <Dialog
        open={isOpenDialog1 && isOpenAll}
        onCancel={() => setIsOpenDialog1(false)}
        title="I rendered first"
        subtitle="Yet I am not the bottom modal"
        topModalOverride
      >
        <Textbox label="First Name" value="" onChange={() => {}} />
        <Textbox label="Middle Name" value="" onChange={() => {}} />
      </Dialog>
      <Dialog
        open={isOpenDialog2 && isOpenAll}
        onCancel={() => setIsOpenDialog2(false)}
        title="I rendered second"
        subtitle="Yet I am the top modal"
        topModalOverride
      >
        <Textbox label="First Name" value="" onChange={() => {}} />
        <Textbox label="Middle Name" value="" onChange={() => {}} />
      </Dialog>
      <Dialog
        open={isOpenDialog3 && isOpenAll}
        onCancel={() => setIsOpenDialog3(false)}
        title="I rendered last"
        subtitle="Yet I am the bottom modal"
      >
        <Textbox label="First Name" value="" onChange={() => {}} />
        <Textbox label="Middle Name" value="" onChange={() => {}} />
      </Dialog>
    </>
  );
}
```


### GreyBackground

**Args**

```tsx
{
    ...DefaultStory.args,
    greyBackground: true,
  }
```


### HighlightVariant

**Args**

```tsx
{
    ...DefaultStory.args,
    highlightVariant: "ai",
  }
```


### Fullscreen: Default

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
        title="Title"
        subtitle="Subtitle"
      >
        <Form
          // stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Box>
            This is an example of a full screen Dialog with a Form as content
          </Box>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
        </Form>
      </Dialog>
    </>
  );
}
```


### WithScrollableContent

**Args**

```tsx
{
    children: childrenText.repeat(2),
    title: "Dialog with scrollable content",
    subtitle: "amet non ornare suspendisse tempor.",
    height: "200px",
  }
```

**Render**

```tsx
function WithScrollableContentExample(args) {
    const { children, open, ...rest } = args;
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog open={isOpen} onCancel={() => setIsOpen(false)} {...rest}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div tabIndex={0}>{children}</div>
        </Dialog>
      </>
    );
  }
```


### MDX Example 1

**Args**

```tsx
## Related Components

- Need to refer back to the underlying page? [Try Sidebar](../?path=/docs/sidebar--docs).

## Examples

### Default

The call-to-action element should always be focused when the `Dialog` is closed. However, in some instances it may not receive focus
due to specific browser design choices. The below example shows how to programmatically focus the call-to-action element when the `Dialog` is closed
to ensure behaviour is consistent across all browsers.

<Canvas of={DialogStories.DefaultStory} />

### Preventing focus from being restored when Dialog closes

When the `restoreFocusOnClose` prop is `false`, focus will not be restored to the element that was focused before the `Dialog` was opened.
Focus can instead be programmatically applied to another element if appropriate.

<Canvas of={DialogStories.RestoreFocusOnCloseStory} />

### With Maximum Size

When the `size` prop is `"maximise"` the height and width of the `Dialog`'s modal extends to the majority of the viewport.

<Canvas of={DialogStories.MaxSize} />

### With help

<Canvas of={DialogStories.WithHelp} />

### Overriding the first focused element

By default, when a dialog is opened it will automatically focus the first element within its children that can be focussed.
However, there are a couple of ways of overriding this default behaviour. The `focusFirstElement` prop accepts a reference
to the element you wish to focus on open (an example of this can be seen by clicking the first button below). If the element
you want to focus supports `autoFocus` then the you can override the default behaviour by using the `disableAutoFocus` prop
and setting the `autoFocus` on the element you wish to be focused instead (click the second button to see an example).

<Canvas of={DialogStories.FocusingADifferentFirstElement} />

### Loading content

For situations where content cannot be rendered immediately, such as content dependent on data from an external API, conditional rendering and the `Loader` component can be used to create a loading pattern:

<Canvas of={DialogStories.LoadingContent} />

Note in the previous example, the first `Textbox` in the loaded content has autofocus, which is recommended so assistive technology users are informed of the updated content.

### Focusing Dialog programmatically

When dialog content changes dynamically, you can programmatically move focus back to the `Dialog` container. Most screen readers will then announce the updated title, indicating to users that the dialog has changed:

<Canvas of={DialogStories.UsingHandle} />

To achieve this, forward a custom ref handle to the `Dialog` component using the `DialogHandle` type:
```


### MDX Example 2

**Args**

```tsx
The handle exposes the `focus()` method of the Dialog's root DOM node:
```

