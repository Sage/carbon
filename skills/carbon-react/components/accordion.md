---
name: carbon-component-accordion
description: Carbon Accordion component props and usage examples.
---

# Accordion

## Import
`import { Accordion } from "carbon-react/lib/components/accordion";`

## Source
- Export: `./components/accordion`
- Props interface: `AccordionProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| title | React.ReactNode | Yes |  | Sets accordion title |  |
| borders | "default" \| "full" \| "none" \| undefined | No |  | Toggles left and right borders, set to none when variant is subtle |  |
| children | React.ReactNode | No |  | Content of the Accordion component |  |
| defaultExpanded | boolean \| undefined | No |  | Set the default state of expansion of the Accordion if component is meant to be used as uncontrolled |  |
| disableContentPadding | boolean \| undefined | No |  | Disable padding for the content |  |
| error | string \| undefined | No |  | An error message to be displayed in the tooltip |  |
| expanded | boolean \| undefined | No |  | Sets the expansion state of the Accordion if component is meant to be used as controlled |  |
| headerSpacing | SpaceProps | No |  | Styled system spacing props provided to Accordion Title |  |
| iconAlign | "left" \| "right" \| undefined | No |  | Sets icon alignment |  |
| iconType | "chevron_down" \| "chevron_down_thick" \| "dropdown" \| undefined | No |  | Sets icon type |  |
| id | string \| undefined | No |  |  |  |
| info | string \| undefined | No |  | An info message to be displayed in the tooltip |  |
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
| onChange | ((event: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void) \| undefined | No |  | Callback fired when expansion state changes |  |
| openTitle | string \| undefined | No |  | When the Accordion is open the title can change to this |  |
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
| size | "large" \| "small" \| undefined | No |  | Sets accordion size |  |
| subTitle | string \| undefined | No |  | Sets accordion sub title |  |
| variant | "standard" \| "subtle" \| undefined | No |  | Sets accordion variant |  |
| warning | string \| undefined | No |  | A warning message to be displayed in the tooltip |  |
| width | string \| undefined | No |  | Sets accordion width |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Content Padding Disabled

**Render**

```tsx
() => {
  const [accordionExpanded, setAccordionExpanded] = useState<boolean>(true);
  const toggleAccordion = () => {
    setAccordionExpanded(!accordionExpanded);
  };

  return (
    <Accordion
      disableContentPadding
      title="Heading"
      expanded={accordionExpanded}
      onChange={toggleAccordion}
    >
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### Custom Width

**Render**

```tsx
() => {
  return (
    <Accordion width="500px" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### Default

**Render**

```tsx
() => {
  return (
    <Accordion title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### Full Border

**Render**

```tsx
() => {
  return (
    <Accordion borders="full" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### Grouped

**Render**

```tsx
() => {
  return (
    <AccordionGroup>
      <Accordion title="First Accordion">
        <Box p={2}>
          <Textbox
            label="Textbox in an Accordion"
            value=""
            onChange={() => {}}
          />
        </Box>
      </Accordion>
      <Accordion title="Second Accordion">
        <Box p={2}>
          <Textbox
            label="Textbox in an Accordion"
            value=""
            onChange={() => {}}
          />
        </Box>
      </Accordion>
      <Accordion title="Third Accordion">
        <Box p={2}>
          <Box>Content</Box>
          <Box>Content</Box>
          <Box>Content</Box>
        </Box>
      </Accordion>
    </AccordionGroup>
  );
}
```


### Left-Aligned Icon

**Render**

```tsx
() => {
  return (
    <Accordion iconAlign="left" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### MDX Example 1

**Args**

```tsx
Accordions can be used as a controlled component where the expansion state is controlled externally; in that case, both the `onChange` and `expanded` props are required.
```


### MDX Example 2

**Args**

```tsx
An Accordion can also be used as an uncontrolled component where the expansion state is controlled internally; to define the initial expansion state, set the `defaultExpanded` prop. The `onChange` prop can be used to hook a callback onto the component for state changes, should it be required.
```


### No Border

**Render**

```tsx
() => {
  return (
    <Accordion title="Heading" borders="none">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### Small

**Render**

```tsx
() => {
  return (
    <Accordion size="small" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### Subtitle

**Render**

```tsx
() => {
  return (
    <Accordion subTitle="Sub title" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### Subtle Variant

**Render**

```tsx
() => {
  return (
    <Accordion title="Heading" variant="subtle">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### With Complex Title

**Render**

```tsx
() => {
  return (
    <Accordion
      title={
        <Typography variant="h4" backgroundColor="blue" color="yellow">
          Title
        </Typography>
      }
    >
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### With Custom Padding And Margins

**Render**

```tsx
() => {
  return (
    <>
      <Accordion m={0} p={0} title="First Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={1} p={1} title="Second Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={2} p={2} title="Third Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={3} p={3} title="Fourth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={4} p={4} title="Fifth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={5} p={5} title="Sixth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={6} p={6} title="Seventh Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
}
```


### With Custom Title Padding And Margins

**Render**

```tsx
() => {
  return (
    <>
      <Accordion headerSpacing={{ p: 0 }} title="First Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 1 }} title="Second Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 2 }} title="Third Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 3 }} title="Fourth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 4 }} title="Fifth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 5 }} title="Sixth Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 6 }} title="Seventh Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
}
```


### With Dynamic Content

**Render**

```tsx
() => {
  const [contentCount, setContentCount] = useState(3);
  const modifyContentCount = (modifier: number) => {
    if (modifier === 1) {
      setContentCount(contentCount + 1);
    }
    if (modifier === -1 && contentCount > 0) {
      setContentCount(contentCount - 1);
    }
  };

  return (
    <>
      <Button onClick={() => modifyContentCount(1)}>Add content</Button>
      <Button onClick={() => modifyContentCount(-1)} ml={2}>
        Remove content
      </Button>
      <Accordion mt={2} title="Title">
        {Array.from(Array(contentCount).keys()).map((value) => (
          <Box key={value} mt={2}>
            Content
          </Box>
        ))}
      </Accordion>
    </>
  );
}
```


### With Title

**Render**

```tsx
() => {
  return (
    <Accordion title="Title">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
}
```


### With Validation Icon

**Render**

```tsx
() => {
  const [firstAccordionExpanded, setFirstAccordionExpanded] =
    useState<boolean>(true);
  const [secondAccordionExpanded, setSecondAccordionExpanded] =
    useState<boolean>(true);
  const [thirdAccordionExpanded, setThirdAccordionExpanded] =
    useState<boolean>(true);

  const toggleFirstAccordion = () => {
    setFirstAccordionExpanded(!firstAccordionExpanded);
  };
  const toggleSecondAccordion = () => {
    setSecondAccordionExpanded(!secondAccordionExpanded);
  };
  const toggleThirdAccordion = () => {
    setThirdAccordionExpanded(!thirdAccordionExpanded);
  };

  return (
    <AccordionGroup>
      <Accordion
        title="First Heading"
        expanded={firstAccordionExpanded}
        onChange={toggleFirstAccordion}
        error="This is an error state"
      >
        <Typography>Content</Typography>
      </Accordion>
      <Accordion
        title="Second Heading"
        expanded={secondAccordionExpanded}
        onChange={toggleSecondAccordion}
        warning="This is a warning state"
      >
        <Typography>Content</Typography>
      </Accordion>
      <Accordion
        title="Third Heading"
        expanded={thirdAccordionExpanded}
        onChange={toggleThirdAccordion}
        info="This is an info state"
      >
        <Typography>Content</Typography>
      </Accordion>
    </AccordionGroup>
  );
}
```

