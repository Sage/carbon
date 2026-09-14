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
| enableBackgroundUI | boolean \| undefined | No |  |  |  | Set this prop to false to hide the translucent background when the dialog is open. |  |
| focusableContainers | React.RefObject<HTMLElement>[] \| undefined | No |  |  |  | an optional array of refs to containers whose content should also be reachable by tabbing from the sidebar |  |
| focusableSelectors | string \| undefined | No |  |  |  | Optional selector to identify the focusable elements, if not provided a default selector is used |  |
| focusFirstElement | React.MutableRefObject<HTMLElement \| null> \| undefined | No |  |  |  | Optional reference to an element meant to be focused on open |  |
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### Responsive Behavior

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
          leftSideButtons={<Button buttonType="tertiary">Cancel</Button>}
          saveButton={<Button buttonType="primary">Save</Button>}
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
}
```


### Custom Padding Around Content

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [contentPadding, setContentPadding] = useState<"none" | "large">(
    "large",
  );

  return (
    <>
      <Button
        onClick={() => {
          setContentPadding("none");
          setIsOpen(true);
        }}
      >
        Open with no padding
      </Button>
      <Button
        ml={2}
        onClick={() => {
          setContentPadding("large");
          setIsOpen(true);
        }}
      >
        Open with 32px padding
      </Button>
      <Sidebar
        aria-label="Sidebar with custom content padding"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        p={contentPadding === "none" ? 0 : "var(--global-space-comp-2-xl)"}
      >
        <Box mb={2}>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          <Button iconType="chevron_left_thick" buttonType="tertiary">
            Action
          </Button>
        }
      >
        <Box mb={2}>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        <Box mb="3000px">Long content</Box>
      </Sidebar>
    </>
  );
}
```


### With Typography

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        position="left"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar Header"
      >
        <Form
          rightSideButtons={<Button>Action button</Button>}
          stickyFooter
          buttonAlignment="right"
        >
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
            massa, suscipit vitae pellentesque quis, facilisis non ante.
            Curabitur fringilla sapien non ante elementum venenatis. Curabitur
            viverra, massa ac congue imperdiet, purus ligula dictum quam, id
            tincidunt diam risus quis eros. Vivamus semper sem ac tempor
            malesuada. Proin nec sollicitudin mi. Nunc egestas ipsum ac lorem
            pretium blandit. Quisque ac ultricies lacus. Phasellus vel enim id
            est ornare finibus eget vitae ipsum. Maecenas non accumsan dolor.
            Morbi sed mauris mollis lorem finibus feugiat. Maecenas scelerisque
            nec orci ac finibus. Nulla dictum, quam vel gravida lobortis, nisl
            eros vulputate augue, eget malesuada lacus elit sed leo. In a ex id
            metus vulputate sollicitudin at eget neque. Aliquam cursus quis odio
            in consequat.
          </Typography>
          <Typography variant="p">
            In a finibus tellus, non rutrum est. Nam sed cursus diam. Sed
            commodo metus laoreet, tristique velit in, scelerisque lectus.
            Nullam suscipit eu nulla vel porttitor. Donec aliquet faucibus nunc
            consequat feugiat. Donec libero arcu, consequat in laoreet eu,
            maximus a nunc. Sed tincidunt nisl vitae diam dapibus, eu varius
            ipsum vestibulum. Suspendisse auctor mattis turpis, in placerat nunc
            ornare vitae. Phasellus id ante a mi ultricies pellentesque. Donec
            laoreet lectus sit amet blandit varius. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Nullam quis est tempus, posuere elit in, hendrerit risus.
          </Typography>
          <Typography variant="p">
            In ac nisi ante. Duis ut tellus lacus. Mauris vitae ultrices ipsum.
            Integer pretium non risus a convallis. Vivamus eu egestas magna, in
            blandit elit. In at efficitur urna. Quisque nec interdum nisi. Sed
            pharetra neque ac ipsum bibendum semper. Ut et egestas metus. Nullam
            nec porttitor turpis. Pellentesque a dapibus libero.
          </Typography>
          <Typography variant="p">
            Duis accumsan luctus risus. Ut eu nisi sed mi sodales sodales.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Etiam id turpis et diam varius sollicitudin
            quis ullamcorper orci. Vivamus et est eget ante pellentesque
            commodo. Sed sed lacus vitae arcu ullamcorper fermentum et in
            mauris. Fusce tempor tellus vitae nibh sodales hendrerit. Cras erat
            purus, feugiat vitae tellus in, iaculis aliquet elit. In nec neque
            tristique, faucibus dui a, fermentum ipsum. Vestibulum rutrum, augue
            eget bibendum mattis, purus augue commodo urna, nec porta mi turpis
            eget risus. Curabitur ut tincidunt tellus. Fusce vel elit bibendum,
            varius eros sit amet, convallis nisl. Nunc venenatis sed lacus at
            consectetur. Etiam tincidunt varius lorem. Aliquam finibus finibus
            rutrum.
          </Typography>
          <Typography variant="p">
            Nam augue urna, congue ac dictum vel, porttitor ac tortor. Phasellus
            in dictum sem, ut fringilla nibh. Vivamus efficitur tortor auctor
            augue aliquet ullamcorper. Aliquam et velit ut turpis tempor rutrum
            at et erat. Nam imperdiet sapien eros, a mollis felis tristique
            quis. Suspendisse sed ipsum sit amet eros scelerisque volutpat quis
            non libero. Vivamus non venenatis orci, at consequat leo.
            Suspendisse non turpis quis odio malesuada vehicula dignissim non
            est. Ut eu tortor at ligula venenatis porttitor. Vestibulum euismod
            felis et elementum luctus. Integer in libero at turpis sodales
            aliquam. Donec pellentesque metus sit amet lorem ullamcorper, ac
            ullamcorper odio tincidunt.
          </Typography>
        </Form>
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
  const [isToast1Open, setIsToast1Open] = useState(false);
  const [isToast2Open, setIsToast2Open] = useState(false);
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsSidebarOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isSidebarOpen}
        onCancel={() => setIsSidebarOpen(false)}
        header="Sidebar header"
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Form
          stickyFooter
          height="500px"
          leftSideButtons={
            <Button onClick={() => setIsSidebarOpen(false)}>Cancel</Button>
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
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
          <Box display="flex" gap={2}>
            <Button onClick={() => setIsToast1Open(true)}>
              Show first toast
            </Button>
            <Button buttonType="primary" onClick={() => setIsToast2Open(true)}>
              Show second toast
            </Button>
          </Box>
        </Form>
      </Sidebar>
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
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
        header="Sidebar Header — 16px padding"
        p="var(--global-space-comp-2-xl)"
        headerPadding={{ p: "var(--global-space-comp-l)" }}
      >
        <Form
          rightSideButtons={<Button>Action button</Button>}
          stickyFooter
          buttonAlignment="right"
        >
          <Box mb={2}>Content padding: 32px (--global-space-comp-2-xl).</Box>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
            massa, suscipit vitae pellentesque quis, facilisis non ante.
            Curabitur fringilla sapien non ante elementum venenatis. Curabitur
            viverra, massa ac congue imperdiet, purus ligula dictum quam, id
            tincidunt diam risus quis eros. Vivamus semper sem ac tempor
            malesuada. Proin nec sollicitudin mi. Nunc egestas ipsum ac lorem
            pretium blandit. Quisque ac ultricies lacus. Phasellus vel enim id
            est ornare finibus eget vitae ipsum. Maecenas non accumsan dolor.
            Morbi sed mauris mollis lorem finibus feugiat. Maecenas scelerisque
            nec orci ac finibus. Nulla dictum, quam vel gravida lobortis, nisl
            eros vulputate augue, eget malesuada lacus elit sed leo. In a ex id
            metus vulputate sollicitudin at eget neque. Aliquam cursus quis odio
            in consequat.
          </Typography>
        </Form>
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
      <Confirm
        open={isOpenDialogFullScreen && isOpenAll}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        title="Confirm"
        onConfirm={() => {}}
      >
        <Textbox label="Confirm textbox" value="" onChange={() => {}} />
      </Confirm>
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

