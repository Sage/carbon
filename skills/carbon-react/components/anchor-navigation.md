---
name: carbon-component-anchor-navigation
description: Carbon AnchorNavigation component props and usage examples.
---

# AnchorNavigation

## Import
`import { AnchorNavigation } from "carbon-react/lib/components/anchor-navigation";`

## Source
- Export: `./components/anchor-navigation`
- Props interface: `AnchorNavigationProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Child elements |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Defines a string value that labels the current element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element (or elements) that labels the current element. |  |
| stickyNavigation | React.ReactNode | No |  | Yes | Use AnchorNavigationMenu and AnchorNavigationContent. The prop will be removed in the next major version. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  const Content = ({ title, noTextbox }: ContentProps) => (
    <Box>
      <h2>{title}</h2>
      {!noTextbox && <Textbox label={title} value="" onChange={() => {}} />}
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
    </Box>
  );

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  return (
    <AnchorNavigation>
      <AnchorNavigationMenu>
        <AnchorNavigationItem initiallySelected target={ref1}>
          First
        </AnchorNavigationItem>
        <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
        <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
        <AnchorNavigationItem target={ref4}>
          Navigation item with very long label
        </AnchorNavigationItem>
        <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
      </AnchorNavigationMenu>
      <AnchorNavigationContent>
        <Box ref={ref1}>
          <Content title="First section" />
        </Box>
        <AnchorSectionDivider />
        <Box ref={ref2}>
          <Content title="Second section" />
        </Box>
        <AnchorSectionDivider />
        <Box ref={ref3}>
          <Content noTextbox title="Third section" />
        </Box>
        <AnchorSectionDivider />
        <Box ref={ref4}>
          <Content title="Fourth section" />
        </Box>
        <AnchorSectionDivider />
        <Box ref={ref5}>
          <Content title="Fifth section" />
        </Box>
      </AnchorNavigationContent>
    </AnchorNavigation>
  );
}
```


### In Full Screen Dialog

**Render**

```tsx
() => {
  const Content = ({ title, noTextbox }: ContentProps) => (
    <Box>
      <h2>{title}</h2>
      {!noTextbox && <Textbox label={title} value="" onChange={() => {}} />}
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
    </Box>
  );

  const [isOpen, setIsOpen] = useState(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open AnchorNavigation</Button>
      <Dialog
        size="fullscreen"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
      >
        <AnchorNavigation>
          <AnchorNavigationMenu>
            <AnchorNavigationItem initiallySelected target={ref1}>
              First
            </AnchorNavigationItem>
            <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
            <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
            <AnchorNavigationItem target={ref4}>
              Navigation item with very long label
            </AnchorNavigationItem>
            <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
          </AnchorNavigationMenu>
          <AnchorNavigationContent>
            <Box ref={ref1}>
              <Content title="First section" />
            </Box>
            <AnchorSectionDivider />
            <Box ref={ref2}>
              <Content title="Second section" />
            </Box>
            <AnchorSectionDivider />
            <Box ref={ref3}>
              <Content noTextbox title="Third section" />
            </Box>
            <AnchorSectionDivider />
            <Box ref={ref4}>
              <Content title="Fourth section" />
            </Box>
            <AnchorSectionDivider />
            <Box ref={ref5}>
              <Content title="Fifth section" />
            </Box>
          </AnchorNavigationContent>
        </AnchorNavigation>
      </Dialog>
    </>
  );
}
```


### MDX Example 1

**Args**

```tsx
- Create `refs` which will be used internally in `AnchorNavigation` to measure positions of the elements.

- Render `AnchorNavigationItem` components with assigned `refs` inside `AnchorNavigationMenu`.

- Render the elements that serve as sections inside `AnchorNavigationContent`.

- Set `initiallySelected` on one item to preserve the initial current location during server rendering.

- Keep in mind that to assign a `ref` to a component it either has to be a `Class` component or it has to be wrapped in `React.forwardRef()` in case of a function component.

- The navigation items register with their parent, so they can be conditional or rendered by a child component. They must still produce valid list items inside `AnchorNavigationMenu`.
```

