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
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Child elements |  |
| stickyNavigation | React.ReactNode | No |  | The AnchorNavigationItems components to be rendered in the sticky navigation. It is important to maintain proper structure. List of AnchorNavigationItems has to be wrapped in React.Fragment |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

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
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
          <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
          <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
          <AnchorNavigationItem target={ref4}>
            Navigation item with very long label
          </AnchorNavigationItem>
          <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
        </>
      }
    >
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
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
      >
        <AnchorNavigation
          stickyNavigation={
            <>
              <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
              <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
              <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
              <AnchorNavigationItem target={ref4}>
                Navigation item with very long label
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
            </>
          }
        >
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

- Pass proper structure of `AnchorNavigationItem`'s with assigned `refs` to `stickyNavigation` prop.

- Pass children where elements which are meant to serve as sections have `refs` assigned.

- Keep in mind that to assign a `ref` to a component it either has to be a `Class` component or it has to be wrapped in `React.forwardRef()` in case of a function component.

- **It is necessary to maintain the same order of navigation items and children when assigning the `refs`**

- **It is necessary to maintain `stickyNavigation` prop structure as shown below**
```

