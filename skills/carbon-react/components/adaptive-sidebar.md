---
name: carbon-component-adaptive-sidebar
description: Carbon AdaptiveSidebar component props and usage examples.
---

# AdaptiveSidebar

## Import
`import AdaptiveSidebar from "carbon-react/lib/components/adaptive-sidebar";`

## Source
- Export: `./components/adaptive-sidebar`
- Props interface: `AdaptiveSidebarProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  | Whether the sidebar is open or closed |  |
| adaptiveBreakpoint | number \| undefined | No |  | The breakpoint (in pixels) at which the sidebar will convert to a dialog-based sidebar | 768 |
| animationTimeout | number \| undefined | No |  | The time in milliseconds for the sidebar to animate |  |
| backgroundColor | "white" \| "black" \| "app" \| undefined | No |  | The background color of the sidebar | "white" |
| borderColor | string \| undefined | No |  | The color to use for the left-hand border of the sidebar. Should be a design token e.g. `--colorsUtilityYang100` | "none" |
| children | React.ReactNode | No |  | The content of the sidebar |  |
| height | string \| undefined | No |  | The height of the sidebar, relative to the wrapping component | "100%" |
| hidden | boolean \| undefined | No |  | Whether the sidebar is hidden from view. In this state, the adaptive sidebar will continue to receive updates, etc. but will not be visible to users | false |
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
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| renderAsModal | boolean \| undefined | No |  | Whether to render the sidebar as a modal component instead of as an inline sidebar | false |
| restoreFocusOnClose | boolean \| undefined | No |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. | false |
| width | string \| undefined | No |  | The width of the sidebar | "320px" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the component, applied when the component is rendered as a modal |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby property of the component, applied when the component is rendered as a modal |  |

## Examples
### Basic

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>
      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box p={2} display="flex" flexDirection="column">
          <Button onClick={() => setAdaptiveSidebarOpen(false)} mb={2}>
            Close
          </Button>
          Adaptive sidebar content
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### Default

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>
      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
        </Box>
        <Divider type="horizontal" my={0} mx={0} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>
            This is the main content of the adaptive sidebar
          </Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### Complex

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <>
      <GlobalHeader aria-label="Global header component with basic menu">
        Example
        <Menu menuType="black" flex="1" flexDirection="row-reverse">
          <MenuItem
            onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          >
            Help
          </MenuItem>
        </Menu>
      </GlobalHeader>
      <Box position="fixed" top="40px" display="flex" flexDirection="row">
        <Box display="inline-flex" flexDirection="row" height="100vh">
          <Box display="flex" flexDirection="column">
            <Typography variant="h1">Content</Typography>
            <Typography variant="h2">Sub-header</Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu
              sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec
              ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan.
              Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor
              ullamcorper. Praesent eu elit eget lacus fermentum porta at ut
              dui.
            </Typography>
          </Box>
          <AdaptiveSidebar
            aria-label="adaptive-sidebar"
            open={adaptiveSidebarOpen}
            width="500px"
          >
            <Box display="flex" flexDirection="column" pb={5}>
              <Button onClick={() => setAdaptiveSidebarOpen(false)} m={2}>
                Close
              </Button>
              <Typography variant="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                consequat facilisis sapien, vitae tempor nulla tempor cursus.
                Mauris et efficitur urna. Sed nibh metus, suscipit vitae maximus
                eu, consequat in nibh. Vivamus eu felis diam. Vestibulum est
                libero, rhoncus in neque ut, posuere faucibus nunc. Praesent
                porttitor sodales viverra. Curabitur ultricies varius mattis.
              </Typography>

              <Typography variant="p">
                Duis varius rutrum risus, ac tincidunt dui tristique in. Nulla
                et iaculis massa. Suspendisse finibus eleifend sodales. Nulla
                facilisi. Nunc eleifend risus lorem, ac dignissim libero
                venenatis non. Sed tristique nunc vel arcu pharetra, sit amet
                tincidunt leo dictum. Nam et mi in quam consectetur pretium.
                Curabitur id tempus massa, eget lacinia nisi. Nullam quis urna
                ac ante interdum scelerisque. Integer pretium cursus orci nec
                malesuada. Aenean nec est in diam suscipit bibendum. Proin
                viverra justo nec nulla laoreet, sit amet aliquam massa dictum.
                Nam ac mauris ac elit commodo convallis. Sed in tortor lobortis
                mi rhoncus congue a ut dolor. Etiam faucibus a nisl et
                convallis.
              </Typography>

              <Typography variant="p">
                Ut interdum vel nulla vel posuere. Nullam a odio viverra, tempus
                lorem et, commodo justo. Ut eget massa molestie, fringilla ante
                et, sagittis lorem. Donec feugiat sodales dignissim. Ut auctor
                eget ante a interdum. Integer sem risus, bibendum sit amet
                porttitor a, ultricies non elit. Nam nunc quam, scelerisque non
                mauris vel, mollis rhoncus leo. Proin in ligula sapien.
              </Typography>

              <Typography variant="p">
                Quisque sed elementum nibh, sit amet imperdiet turpis. Duis
                fermentum lacus in aliquet auctor. Nam tortor mauris, elementum
                nec urna ut, sollicitudin congue felis. Nunc porta, tellus ac
                vestibulum malesuada, quam libero mollis augue, ac lobortis
                metus quam semper lacus. Orci varius natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Sed erat odio,
                lacinia nec urna quis, elementum tristique nisi. Donec commodo
                lacinia tortor a sagittis.{" "}
              </Typography>
            </Box>
          </AdaptiveSidebar>
        </Box>
      </Box>
    </>
  );
}
```


### With Custom Width

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        open={adaptiveSidebarOpen}
        width="70%"
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Divider type="horizontal" my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### With Custom Height

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100%"
      backgroundColor="#f2f5f6"
    >
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        open={adaptiveSidebarOpen}
        height="98vh"
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Divider type="horizontal" my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### Background Variants

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const [colour, setColour] = useState("white");

  const colours = useMemo(() => {
    switch (colour) {
      case "app":
        return {
          backgroundColor: "var(--colorsUtilityMajor025)",
          color: "var(--colorsUtilityYin090)",
        };
      case "black":
        return {
          backgroundColor: "var(--colorsUtilityYin100)",
          color: "var(--colorsUtilityYang100)",
        };
      case "white":
      default:
        return {
          backgroundColor: "var(--colorsUtilityYang100)",
          color: "var(--colorsUtilityYin090)",
        };
    }
  }, [colour]);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Box display="flex" flexDirection="row" gap={4}>
          <Box width="300px">
            <Select
              name="color"
              id="color"
              label="Background Color"
              labelInline
              onChange={(e) => setColour(e.target.value)}
              value={colour}
            >
              {[
                { label: "App", value: "app" },
                { label: "Black", value: "black" },
                { label: "White", value: "white" },
              ].map(({ label, value }) => (
                <Option text={label} key={value} value={value} />
              ))}
            </Select>
          </Box>
          <Button
            onClick={() => {
              setAdaptiveSidebarOpen(!adaptiveSidebarOpen);
            }}
            mb={2}
          >
            Toggle Sidebar
          </Button>
        </Box>
        <Typography variant="p" mt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>

      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        backgroundColor={colour as "white" | "black" | "app"}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3" {...colours}>
              Content
            </Typography>
            <Button
              buttonType="primary"
              onClick={() => setAdaptiveSidebarOpen(false)}
            >
              Close
            </Button>
          </Box>
          <Divider type="horizontal" my={0} />
          <Box display="flex" flexDirection="column">
            <Typography {...colours}>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### With Adaptive Breakpoint

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        adaptiveBreakpoint={650}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Divider type="horizontal" my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### Render As Dialog

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        renderAsModal
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box display="flex" flexDirection="column" m={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Divider type="horizontal" my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### With Custom Border Color

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>
      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        open={adaptiveSidebarOpen}
        width="300px"
        borderColor="--colorsActionMajor500"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
        </Box>
        <Divider type="horizontal" my={0} mx={0} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>
            This is the main content of the adaptive sidebar
          </Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```


### Hidden

**Render**

```tsx
() => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const [adaptiveSidebarHidden, setAdaptiveSidebarHidden] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let handle: ReturnType<typeof setInterval>;
    if (adaptiveSidebarOpen || adaptiveSidebarHidden) {
      handle = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => clearTimeout(handle);
  }, [adaptiveSidebarOpen, adaptiveSidebarHidden]);

  const buttonText = useMemo(() => {
    if (adaptiveSidebarHidden) {
      return "Show";
    } else if (adaptiveSidebarOpen) {
      return "Close";
    } else {
      return "Open";
    }
  }, [adaptiveSidebarHidden, adaptiveSidebarOpen]);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          onClick={() => {
            if (adaptiveSidebarHidden) {
              setAdaptiveSidebarHidden(false);
              return;
            }
            if (adaptiveSidebarOpen) {
              setCount(0);
              setAdaptiveSidebarOpen(false);
              return;
            }
            setAdaptiveSidebarOpen(true);
          }}
          mb={2}
        >
          {buttonText}
        </Button>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>
      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        hidden={adaptiveSidebarHidden}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <SplitButton
            text="Hide"
            onClick={() => setAdaptiveSidebarHidden(true)}
          >
            <Button
              onClick={() => {
                setCount(0);
                setAdaptiveSidebarOpen(false);
              }}
            >
              Close
            </Button>
          </SplitButton>
        </Box>
        <Divider type="horizontal" my={0} mx={0} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>
            This counter will update every second when the sidebar is open or
            hidden: {count}
          </Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
}
```

