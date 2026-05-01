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
| disableStickyOnSmallScreen | boolean \| undefined | No |  |  |  | When true, header and sticky footer become unstickied for accessibility on small screen devices. On small screen devices, the dialog becomes full width and has no dimmer. |  |
| enableBackgroundUI | boolean \| undefined | No |  |  |  | Determines if the background is disabled when the modal is open |  |
| focusableContainers | React.RefObject<HTMLElement>[] \| undefined | No |  |  |  | an optional array of refs to containers whose content should also be reachable by tabbing from the dialog |  |
| focusableSelectors | string \| undefined | No |  |  |  | Optional selector to identify the focusable elements, if not provided a default selector is used |  |
| focusFirstElement | HTMLElement \| React.RefObject<HTMLElement> \| null \| undefined | No |  |  |  | Optional reference to an element meant to be focused on open |  |
| footer | React.ReactNode | No |  |  |  | Footer content to be rendered at the bottom of the dialog |  |
| gradientKeyLine | boolean \| undefined | No |  |  |  | Adds a gradient keyline to the dialog header |  |
| greyBackground | boolean \| undefined | No |  |  |  | Change the background color of the content to grey |  |
| headerChildren | React.ReactNode | No |  |  |  | Container for components to be displayed in the header |  |
| height | string \| undefined | No |  |  |  | Allows developers to specify a specific height for the dialog. |  |
| help | string \| undefined | No |  |  |  | Adds Help tooltip to Header |  |
| onCancel | ((ev: React.KeyboardEvent<HTMLElement> \| KeyboardEvent \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | A custom close event handler |  |
| restoreFocusOnClose | boolean \| undefined | No |  |  |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. |  |
| role | string \| undefined | No |  |  |  | The ARIA role to be applied to the Dialog container |  |
| showCloseIcon | boolean \| undefined | No |  |  |  | Determines if the close icon is shown |  |
| size | "auto" \| "extra-small" \| Size \| "medium-small" \| "medium-large" \| "extra-large" \| "maximise" \| undefined | No |  |  |  | Size — accepts both legacy values (extra-small, medium-small, etc.) and new values (small, medium, large, fullscreen). |  |
| stickyFooter | boolean \| undefined | No |  |  |  | Makes the footer stick to the bottom of the dialog when content scrolls |  |
| subtitle | React.ReactNode | No |  |  |  | Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. |  |
| title | React.ReactNode | No |  |  |  | Title displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to title prop. |  |
| topModalOverride | boolean \| undefined | No |  |  |  | Manually override the internal modal stacking order to set this as top |  |
| data-component | string \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Prop to specify the aria-describedby property of the Dialog component |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the Dialog component. To be used only when the title prop is not defined, and the component is not labelled by any internal element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the Dialog component To be used when the title prop is a custom React Node, or the component is labelled by an internal element other than the title. |  |
| disableClose | boolean \| undefined | No |  | Yes |  |  |  |
| disableContentPadding | boolean \| undefined | No |  | Yes | Use `contentPadding` instead. |  |  |
| fullscreen | boolean \| undefined | No |  | Yes | Use `size="fullscreen"` instead. |  |  |
| highlightVariant | string \| undefined | No |  | Yes | Use `gradientKeyLine` instead. |  |  |
| pagesStyling | boolean \| undefined | No |  | Yes |  |  |  |

## Examples
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
          <div tabIndex={0}>
            <Box margin={2}>{children}</Box>
          </div>
        </Dialog>
      </>
    );
  }
```


### DefaultStory

**Args**

```tsx
{
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  }
```

**Render**

```tsx
function DefaultRender({ onCancel, ...args }: DialogProps) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          footer={<Buttons />}
        >
          {dialogContent}
        </Dialog>
      </>
    );
  }
```


### DefaultWithForm

**Args**

```tsx
{
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  }
```

**Render**

```tsx
function DefaultWithFormRender({ onCancel, ...args }: DialogProps) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
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


### SmallSize

**Args**

```tsx
{
    ...DefaultStory.args,
    size: "small",
  }
```


### GradientKeyLine

**Args**

```tsx
{
    ...DefaultStory.args,
    gradientKeyLine: true,
  }
```


### MediumSize

**Args**

```tsx
{
    ...DefaultStory.args,
    size: "medium",
  }
```


### LargeSize

**Args**

```tsx
{
    ...DefaultStory.args,
    size: "large",
  }
```


### Size: Full Screen

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const buttonRef = useRef<ButtonHandle>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        size="fullscreen"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focusButton(), 0);
        }}
        title="Title"
        subtitle="Subtitle"
        footer={<Buttons />}
      >
        {dialogContent}
      </Dialog>
    </>
  );
}
```


### ResponsiveBehavior

**Args**

```tsx
{
    open: isChromatic(),
    title: "Responsive Dialog",
    subtitle: "Dialog shrinks to fit viewport",
    size: "large",
  }
```

**Render**

```tsx
function ResponsiveBehaviorRender({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Typography mt={2}>
          Resize your browser window to see the dialog responsively shrink while
          staying centered. The dialog has a minimum width of 288px.
        </Typography>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
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
              This dialog will shrink responsively when the viewport is smaller
              than the dialog&apos;s max-width.
            </Typography>
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
          </Form>
        </Dialog>
      </>
    );
  }
```


### SmallScreenBehavior

**Args**

```tsx
{
    open: isChromatic(),
    title: "Small Screen Dialog",
    subtitle: "Header and footer are not sticky on small screens",
    size: "medium",
    disableStickyOnSmallScreen: true,
  }
```

**Render**

```tsx
function SmallScreenBehaviorRender({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Typography mt={2}>
          On small screen devices (below 600px), the dialog becomes full width,
          the dimmer is removed, and the header/footer are no longer sticky.
          This improves accessibility on mobile devices.
        </Typography>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          footer={<Buttons />}
        >
          <Typography>
            This dialog demonstrates small screen accessibility behavior.
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
        </Dialog>
      </>
    );
  }
```


### StickyFooter

**Args**

```tsx
{
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
    stickyFooter: true,
  }
```

**Render**

```tsx
function StickyFooterRender({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          footer={<Buttons />}
        >
          <Typography>
            This is an example of a dialog with a sticky footer using the
            Dialog&apos;s own <code>stickyFooter</code> and <code>footer</code>{" "}
            props.
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
        </Dialog>
      </>
    );
  }
```


### StickyFooterWithForm

**Args**

```tsx
{
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  }
```

**Render**

```tsx
function StickyFooterWithFormRender({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
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
              This is an example of a dialog using a Form component with its own
              sticky footer. The Form manages the footer internally.
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


### WithHeight

**Args**

```tsx
{
    ...DefaultStory.args,
    height: "500",
  }
```


### WithHeaderChildren

**Args**

```tsx
{
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  }
```

**Render**

```tsx
function WithHeaderChildrenRender({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          headerChildren={
            <Box display="flex" gap={1} mt={2}>
              <Button>Action 1</Button>
              <Button>Action 2</Button>
            </Box>
          }
          footer={<Buttons />}
        >
          {dialogContent}
        </Dialog>
      </>
    );
  }
```


### WithContentPadding

**Args**

```tsx
{
    ...DefaultStory.args,
    contentPadding: { p: 0 },
  }
```


### WithContentPaddingCustom

**Args**

```tsx
{
    ...DefaultStory.args,
    contentPadding: { py: 5, px: 8 },
  }
```


### MDX Example 1

**Args**

```tsx
## Related Components

- Need to refer back to the underlying page? [Try Sidebar](../?path=/docs/sidebar--docs).

## Examples

### Default

A `Dialog` requires an `open` prop and an `onCancel` handler. Use the `footer` prop to render action buttons at the bottom of the dialog. The call-to-action element should always be focused when the `Dialog` is closed — the example below shows how to programmatically restore focus to the trigger element for consistent behaviour across all browsers.

<Canvas of={DialogStories.DefaultStory} />

### With a Form

When including a `Form` inside a `Dialog`, the `Form` can manage its own sticky footer independently.

<Canvas of={DialogStories.DefaultWithForm} />

### Sizes

The `size` prop controls the maximum width of the dialog. The default is `"medium"`.

#### Small (540px)

<Canvas of={DialogStories.SmallSize} />

#### Medium (850px) — Default

<Canvas of={DialogStories.MediumSize} />

#### Large (1080px)

<Canvas of={DialogStories.LargeSize} />

#### Full Screen

<Canvas of={DialogStories.FullScreenSize} />

### Responsive behavior

The dialog shrinks to fit the viewport when the viewport is narrower than the dialog's maximum width. The minimum width is 288px.

<Canvas of={DialogStories.ResponsiveBehavior} />

### Small screen behavior

When `disableStickyOnSmallScreen` is set, the header and footer are no longer sticky on small screen devices (below 600px). On these devices the dialog also becomes full width and the dimmer is removed, improving accessibility on mobile.

<Canvas of={DialogStories.SmallScreenBehavior} />

### Sticky footer

Use the `stickyFooter` prop together with `footer` to keep the footer visible when dialog content scrolls.

<Canvas of={DialogStories.StickyFooter} />

### Sticky footer with Form

<Canvas of={DialogStories.StickyFooterWithForm} />

### With a custom height

Use the `height` prop to set a fixed height on the dialog.

<Canvas of={DialogStories.WithHeight} />

### With header children

Use the `headerChildren` prop to render additional content — such as action buttons — in the dialog header.

<Canvas of={DialogStories.WithHeaderChildren} />

### Gradient keyline

Setting `gradientKeyLine` adds a decorative gradient keyline below the dialog header.

<Canvas of={DialogStories.GradientKeyLine} />

### Overriding content padding

Use the `contentPadding` prop to override the default padding applied to the dialog content area.

<Canvas of={DialogStories.WithContentPadding} />

### Preventing focus from being restored when Dialog closes

When `restoreFocusOnClose` is `false`, focus will not be returned to the element that was focused before the `Dialog` was opened. You can instead programmatically apply focus to another element — for example, a message that has just appeared.

<Canvas of={DialogStories.RestoreFocusOnClose} />

### Loading content

For content that cannot be rendered immediately — such as data from an external API — use conditional rendering with the `Loader` component:

<Canvas of={DialogStories.LoadingContent} />

The first interactive element in the loaded content has `autoFocus` set, which is recommended so that assistive technology users are informed of the updated content.

### Overriding the first focused element

By default, when a dialog opens it focuses the first focusable element in its children. There are two ways to override this:

- Pass a ref to `focusFirstElement` to focus a specific element on open.
- Use `disableAutoFocus` and set `autoFocus` directly on the element you want focused.

To achieve this, forward a custom ref handle to the `Dialog` component using the `DialogHandle` type:
```


### MDX Example 2

**Args**

```tsx
The handle exposes the `focus()` method of the Dialog's root DOM node:
```

