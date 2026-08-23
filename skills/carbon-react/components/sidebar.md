---
name: carbon-component-sidebar
description: Carbon Sidebar component props and usage examples.
---

# Sidebar

## Import
`import Sidebar from "carbon-react/lib/components/sidebar";`

## Source
- Export: `./components/sidebar`
- Props interface: `SidebarProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  |  |  | Sets the open state of the modal |  |
| children | React.ReactNode | No |  |  |  | Modal content |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  |  |  | Data tag prop bag for close Button |  |
| disableAutoFocus | boolean \| undefined | No |  |  |  |  |  |
| disableEscKey | boolean \| undefined | No |  |  |  | Determines if the Esc Key closes the modal |  |
| disableStickyOnSmallScreen | boolean \| undefined | No |  |  |  | When true, header and footer become non-sticky and scroll with content for accessibility on small screen devices. |  |
| enableBackgroundUI | boolean \| undefined | No |  |  |  | Set this prop to false to hide the translucent background when the dialog is open. |  |
| focusableContainers | React.RefObject<HTMLElement>[] \| undefined | No |  |  |  | an optional array of refs to containers whose content should also be reachable by tabbing from the sidebar |  |
| focusableSelectors | string \| undefined | No |  |  |  | Optional selector to identify the focusable elements, if not provided a default selector is used |  |
| focusFirstElement | React.MutableRefObject<HTMLElement \| null> \| undefined | No |  |  |  | Optional reference to an element meant to be focused on open |  |
| footer | React.ReactNode | No |  |  |  | Footer content to be rendered at the bottom of the Sidebar. |  |
| gradientKeyLine | boolean \| undefined | No |  |  |  | Adds the Carbon AI gradient keyline to the header. |  |
| header | React.ReactNode | No |  |  |  | Node that will be used as sidebar header. |  |
| headerPadding | PaddingProps | No |  |  |  | Padding to be set on the Sidebar header |  |
| headerVariant | "typical" \| "dark" \| "light" \| "inverse" \| undefined | No |  |  |  | Header background variant for the sidebar. `light` and `dark` are deprecated aliases - use `typical` and `inverse` instead. |  |
| onCancel | ((ev: React.KeyboardEvent<HTMLElement> \| KeyboardEvent \| React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | A custom close event handler |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| restoreFocusOnClose | boolean \| undefined | No |  |  |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. |  |
| role | string \| undefined | No |  |  |  | The ARIA role to be applied to the component container |  |
| stickyFooter | boolean \| undefined | No |  |  |  | Makes the footer stick to the bottom of the Sidebar when content scrolls. |  |
| subHeader | React.ReactNode | No |  |  |  | Node that will be used as sidebar subheader. |  |
| subHeaderPadding | PaddingProps | No |  |  |  | Padding to be set on the Sidebar subheader |  |
| topModalOverride | boolean \| undefined | No |  |  |  | Manually override the internal modal stacking order to set this as top |  |
| width | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | The width utility parses a component's `width` prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles. |  |
| widthAnimation | boolean \| undefined | No |  |  |  | Enables width animation when the sidebar width changes. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Prop to specify the aria-describedby property of the component |  |
| aria-label | string \| undefined | No |  |  |  | Provides an explicit accessible name for the component, overriding the automatic association with the header. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element that provides an explicit accessible name for the component, overriding the automatic association with the header. |  |
| position | "left" \| "right" \| undefined | No |  | Yes | This prop will be removed in a future release. Sidebar will always be positioned on the right. Update the layout to support a right-positioned Sidebar if it is set to left, otherwise remove the prop. |  |  |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "medium-small" \| "medium-large" \| "extra-large" \| undefined | No |  | Yes | Use `width` to customise the Sidebar width. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open sidebar
      </Button>
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### Sticky Form Footer: Responsive Behavior

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Responsive sidebar"
      >
        <Form
          leftSideButtons={<Button variantType="tertiary">Cancel</Button>}
          saveButton={<Button variantType="primary">Save</Button>}
          stickyFooter
          onSubmit={(event) => event.preventDefault()}
        >
          <Box height="1000px">Long content</Box>
        </Form>
      </Sidebar>
    </>
  );
}
```


### Custom Footer (Sticky)

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar with custom footer"
        footer={
          <>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variantType="primary">Save</Button>
          </>
        }
        stickyFooter
      >
        <Box height="1000px">Long content</Box>
      </Sidebar>
    </>
  );
}
```


### Custom Footer (Non-sticky)

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar with non-sticky custom footer"
        footer={
          <>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variantType="primary">Save</Button>
          </>
        }
      >
        <Box height="1000px">Long content</Box>
      </Sidebar>
    </>
  );
}
```


### SmallScreenBehavior

**Args**

```tsx
{
    open: isChromatic(),
    header: "Small screen sidebar",
    disableStickyOnSmallScreen: true,
  }
```

**Render**

```tsx
function SmallScreenBehaviorRender({
    onCancel,
    ...args
  }: Partial<SidebarProps>) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open sidebar
        </Button>
        <Typography mt={2}>
          Although <code>stickyFooter</code> is enabled{" "}
          <code>disableStickyOnSmallScreen</code>
          disables sticky behavior on small screens at 768px and below. The
          header, content, and custom footer then scroll together
        </Typography>
        <Sidebar
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focus(), 0);
          }}
          footer={
            <>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variantType="primary">Save</Button>
            </>
          }
          stickyFooter
        >
          <Box height="1000px">Long content</Box>
        </Sidebar>
      </>
    );
  }
```


### Without Automatic Focus Restoration

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
        Open sidebar
      </Button>
      {showMessage && (
        <Message
          ref={messageRef}
          variant="info"
          onDismiss={() => setShowMessage(false)}
        >
          Sidebar closed; focus moved to this message.
        </Message>
      )}
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        restoreFocusOnClose={false}
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### Content Padding (p Prop)

**Args**

```tsx
{
    p: "var(--global-space-comp-xl)",
  }
```

**Render**

```tsx
function CustomPaddingAroundContentRender({
    p,
  }: Partial<SidebarProps>) {
    const [isOpen, setIsOpen] = useState(defaultOpenState);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
        <Typography mt={2}>
          Use the <code>p</code> control to override the default content
          padding. Set it to <code>var(--global-space-comp-none)</code> for
          edge-to-edge content.
        </Typography>
        <Sidebar
          aria-label="Sidebar with custom content padding"
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          p={p}
        >
          <Box mb={2}>
            <Button variantType="primary">Test</Button>
            <Button variantType="secondary" ml={2}>
              Last
            </Button>
          </Box>
          Main Content
        </Sidebar>
      </>
    );
  }
```


### With Header

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### With Header And Subheader

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
        subHeader={
          <Button iconType="chevron_left_thick" variantType="tertiary">
            Action
          </Button>
        }
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### With Inverse Header

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
        headerVariant="inverse"
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### With Gradient Keyline

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
        gradientKeyLine
      >
        Main Content
      </Sidebar>
    </>
  );
}
```


### With Scroll

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        <Box mb="3000px">Long content</Box>
      </Sidebar>
    </>
  );
}
```


### Other Focusable Containers

**Render**

```tsx
() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessage1Open, setIsMessage1Open] = useState(false);
  const [isMessage2Open, setIsMessage2Open] = useState(false);
  const message1Ref = useRef(null);
  const message2Ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsSidebarOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isSidebarOpen}
        onCancel={() => setIsSidebarOpen(false)}
        header="Sidebar header"
        focusableContainers={[message1Ref, message2Ref]}
      >
        <Form
          stickyFooter
          height="500px"
          leftSideButtons={
            <Button onClick={() => setIsSidebarOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button variantType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
          <Box display="flex" gap={2}>
            <Button onClick={() => setIsMessage1Open(true)}>
              Show first message
            </Button>
            <Button
              variantType="primary"
              onClick={() => setIsMessage2Open(true)}
            >
              Show second message
            </Button>
          </Box>
        </Form>
      </Sidebar>
      {(isMessage1Open || isMessage2Open) && (
        <Box mt={2}>
          <Message
            open={isMessage1Open}
            onDismiss={() => setIsMessage1Open(false)}
            ref={message1Ref}
          >
            Message 1
          </Message>
          <Message
            open={isMessage2Open}
            onDismiss={() => setIsMessage2Open(false)}
            ref={message2Ref}
          >
            Message 2
          </Message>
        </Box>
      )}
    </>
  );
}
```


### Custom Width

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        width="25%"
        header="Sidebar"
      >
        <Box
          mb={2}
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          gap={1}
        >
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### Header Padding

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar Header"
        headerPadding={{ p: "var(--global-space-comp-l)" }}
      >
        <Typography variant="p">
          The header uses <code>headerPadding</code> with the compact
          <code>comp-l</code> token. Content retains the default padding.
        </Typography>
      </Sidebar>
    </>
  );
}
```


### Custom Header and Content Padding

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar Header"
        headerPadding={{ p: "var(--global-space-comp-l)" }}
        p="var(--global-space-comp-none)"
      >
        <Typography variant="p">
          The header uses compact padding while the <code>p</code> prop removes
          content padding for edge-to-edge content.
        </Typography>
      </Sidebar>
    </>
  );
}
```


### Top Modal Override

**Render**

```tsx
() => {
  const [isOpenAll, setIsOpenAll] = useState(defaultOpenState);
  const [isOpenDialogFullScreen, setIsOpenDialogFullScreen] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(true);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpenAll(true);
          setIsOpenDialogFullScreen(true);
          setIsOpenSidebar(true);
          setIsOpenDialog(true);
        }}
      >
        Open dialogs
      </Button>
      <Dialog
        open={isOpenDialogFullScreen && isOpenAll}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        role="alertdialog"
        title="Confirm"
        showCloseIcon={false}
      >
        <Textbox label="Confirm textbox" value="" onChange={() => {}} />
        <Box mt="var(--spacing600)" display="flex" justifyContent="flex-end">
          <Button onClick={() => setIsOpenDialogFullScreen(false)}>
            Cancel
          </Button>
          <Button variantType="primary" ml="var(--spacing110)">
            Confirm
          </Button>
        </Box>
      </Dialog>
      <Sidebar
        open={isOpenSidebar && isOpenAll}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
        topModalOverride
      >
        <Textbox label="Sidebar textbox" value="" onChange={() => {}} />
      </Sidebar>
      <Dialog
        open={isOpenDialog && isOpenAll}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
      >
        <Textbox label="Dialog textbox" value="" onChange={() => {}} />
      </Dialog>
    </>
  );
}
```

