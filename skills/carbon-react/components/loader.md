---
name: carbon-component-loader
description: Carbon Loader component props and usage examples.
---

# Loader

## Import
`import Loader from "carbon-react/lib/components/loader";`

## Source
- Export: `./components/loader`
- Props interface: `LoaderProps`
- Deprecated: Yes
- Deprecation reason: `Loader` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| animationTime | number \| undefined | No |  | Specify a custom animation time for the loader |  |
| hasMotion | boolean \| undefined | No |  | If set to `false` all motion will be suspended | true |
| inverse | boolean \| undefined | No |  | Toggle the inverse color scheme | false |
| isError | boolean \| undefined | No |  | Enable the error state for the ring loader when it is tracked | false |
| isSuccess | boolean \| undefined | No |  | Enable the success state for the ring loader when it is tracked | false |
| isTracked | boolean \| undefined | No |  | If set to `true` the animation type will become tracked, this is used specifically for when wait times are predictable | false |
| loaderLabel | string \| undefined | No |  | Specify a label for the loader |  |
| loaderType | LOADER_TYPES \| undefined | No |  | The loader type can be specified in order to change the loader | "standalone" |
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
| showLabel | boolean \| undefined | No |  | Specify if the label should be visible or not | true |
| size | LOADER_SIZES \| undefined | No |  | The size prop allows a specific size to be set ranging from `extra-small` to `large` | "medium" |
| variant | LOADER_VARIANTS \| undefined | No |  | Toggle between the different Loader variants | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Animation Time

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" animationTime={3} mb={4} />
      <Loader loaderType="ring" animationTime={3} isTracked mb={4} />
      <Loader animationTime={3} />
    </Box>
  )
```


### Conditional Rendering

**Render**

```tsx
() => {
  const [isLoading, setIsLoading] = useState(false);
  const mimicLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const handleButtonClick = () => {
    mimicLoading();
  };

  return (
    <div aria-live="polite">
      <Button m={2} buttonType="primary" onClick={handleButtonClick}>
        Render Loader
      </Button>

      {isLoading ? <Loader /> : "Content to Load"}
    </div>
  );
}
```


### Default

**Render**

```tsx
(args: LoaderProps) => (
    <Box>
      <Loader {...args} />
    </Box>
  )
```


### Default

**Render**

```tsx
() => {
  return <Loader />;
}
```


### Disabled Motion

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" animationTime={3} mb={4} hasMotion={false} />
      <Loader
        loaderType="ring"
        animationTime={3}
        isTracked
        mb={4}
        hasMotion={false}
      />
      <Loader animationTime={3} hasMotion={false} />
    </Box>
  )
```


### Inside Button

**Render**

```tsx
() => {
  const [isLoading, setIsLoading] = useState(false);
  const mimicLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const handleButtonClick = () => {
    mimicLoading();
  };
  const buttonContent = isLoading ? <Loader isInsideButton /> : "Click me";

  return (
    <div aria-live="polite">
      <Button m={2} buttonType="primary" onClick={handleButtonClick}>
        {buttonContent}
      </Button>
    </div>
  );
}
```


### Inside Buttons

**Render**

```tsx
() => (
    <>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="primary" destructive onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}} destructive>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}} destructive>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-white" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
    </>
  )
```


### Is Tracked

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" isTracked />
    </Box>
  )
```


### Large

**Render**

```tsx
() => {
  return <Loader size="large" />;
}
```


### Ring

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" />
    </Box>
  )
```


### Ring Inline Variant

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" variant="inline" />
    </Box>
  )
```


### Ring Inline Variant Inversed

**Render**

```tsx
() => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="inline" inverse />
    </Box>
  )
```


### Ring Sizes

**Render**

```tsx
() => (
    <>
      <Box>
        <Loader loaderType="ring" size="extra-small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="large" />
      </Box>
    </>
  )
```


### Ring Stacked Variant

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" variant="stacked" />
    </Box>
  )
```


### Ring Stacked Variant Inversed

**Render**

```tsx
() => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="stacked" inverse />
    </Box>
  )
```


### Small

**Render**

```tsx
() => {
  return <Loader size="small" />;
}
```


### Standalone

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="standalone" />
    </Box>
  )
```


### Standalone AI Variant

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="standalone" variant="ai" />
    </Box>
  )
```


### Standalone AI Variant Inversed

**Render**

```tsx
() => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="standalone" variant="ai" inverse />
    </Box>
  )
```


### Standalone Sizes

**Render**

```tsx
() => (
    <>
      <Box>
        <Loader loaderType="standalone" size="small" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="large" />
      </Box>
    </>
  )
```


### Standalone Typical Variant

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="standalone" variant="typical" />
    </Box>
  )
```


### Standalone Typical Variant Inversed

**Render**

```tsx
() => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="standalone" variant="typical" inverse />
    </Box>
  )
```


### Star

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="star" />
    </Box>
  )
```


### Tracked Error State

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" isTracked isError />
    </Box>
  )
```


### Tracked Success State

**Render**

```tsx
() => (
    <Box>
      <Loader loaderType="ring" isTracked isSuccess />
    </Box>
  )
```


### With Gradient Variant

**Render**

```tsx
() => <Loader variant="gradient" />
```

