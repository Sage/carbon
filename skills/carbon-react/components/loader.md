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
| isActive | boolean \| undefined | No |  | Applies slate color. Available only when isInsideButton is true. | true |
| isInsideButton | boolean \| undefined | No |  | Applies white color. | false |
| loaderLabel | string \| undefined | No |  | Specify a custom accessible label for the Loader. This label is visible to users who have enabled the reduce motion setting in their operating system. It is also available to assistive technologies. |  |
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
| size | "small" \| "medium" \| "large" \| undefined | No |  | Size of the loader. | "medium" |
| variant | string \| undefined | No |  | Toggle between the default variant and gradient variant | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Inside Buttons

**Render**

```tsx
() => (
    <>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="ai-inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            inverse
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
            inverse
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


### Default

**Render**

```tsx
() => {
  return <Loader />;
}
```


### With Gradient Variant

**Render**

```tsx
() => <Loader variant="gradient" />
```


### Small

**Render**

```tsx
() => {
  return <Loader size="small" />;
}
```


### Large

**Render**

```tsx
() => {
  return <Loader size="large" />;
}
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

