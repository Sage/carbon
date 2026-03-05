---
name: carbon-component-card
description: Carbon Card component props and usage examples.
---

# Card

## Import
`import Card from "carbon-sage/lib/components/card";`

## Source
- Export: `./components/card`
- Props interface: `CardProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Child nodes |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Design token for custom Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Card component. |  |
| draggable | boolean \| undefined | No |  | Flag to indicate if card is draggable |  |
| footer | React.ReactNode | No |  | The footer to render underneath the Card content |  |
| height | string \| undefined | No |  | Height of the component (any valid CSS value) |  |
| hoverBoxShadow | BoxShadowsType \| undefined | No |  | Design token for custom Box Shadow on hover. One of `onClick` or `href` props must be true. Note: please check that the box shadow design token you are using is compatible with the Card component. |  |
| href | string \| undefined | No |  | The path to navigate to. Renders an anchor element when passed and no draggable prop set |  |
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
| onClick | ((event: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLDivElement> \| React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLDivElement>) => void) \| undefined | No |  | Action to be executed when card is clicked or enter pressed. Renders a button when passed and no draggable or href props set |  |
| rel | string \| undefined | No |  | String for rel property when card has an href prop set |  |
| roundness | "large" \| "default" \| undefined | No |  | Sets the level of roundness of the corners, "default" is 8px and "large" is 16px | "default" |
| spacing | "small" \| "medium" \| "large" \| undefined | No |  | Size of card for applying padding | "medium" |
| target | string \| undefined | No |  | Target property in which link should open ie: _blank, _self, _parent, _top |  |
| width | string \| undefined | No |  | Style value for width of card | "500px" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify an aria-label for the component |  |

## Examples
### default

**Render**

```tsx
(
  args: Omit<CardProps, "onClick" | "children" | "footer">,
) => {
  return (
    <Card
      {...args}
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Body text
          </Typography>
          <Heading title="More text" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### CustomHeight

**Render**

```tsx
() => {
  return (
    <>
      <Card
        height="500px"
        onClick={() => {}}
        footer={
          <CardFooter>
            <CardColumn>
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn align="left">
            <Heading title="Heading" divider={false} />
            <Typography fontSize="16px" m={0}>
              Additional text
            </Typography>
          </CardColumn>
          <CardColumn align="right">
            <Icon type="image" />
          </CardColumn>
        </CardRow>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" m={0} fontWeight="bold">
              Body text
            </Typography>
            <Heading title="More text" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        height="500px"
        href="#"
        footer={
          <CardFooter>
            <CardColumn>
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn align="left">
            <Heading title="Heading" divider={false} />
            <Typography fontSize="16px" m={0}>
              Additional text
            </Typography>
          </CardColumn>
          <CardColumn align="right">
            <Icon type="image" />
          </CardColumn>
        </CardRow>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" m={0} fontWeight="bold">
              Body text
            </Typography>
            <Heading title="More text" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </>
  );
}
```


### Default

**Render**

```tsx
(args: CardProps) => {
    return (
      <Card
        {...args}
        onClick={() => {}}
        footer={
          <CardFooter>
            <CardColumn>
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn align="left">
            <Heading title="Heading" divider={false} />
            <Typography fontSize="16px" m={0}>
              Additional text
            </Typography>
          </CardColumn>
          <CardColumn align="right">
            <Icon type="image" />
          </CardColumn>
        </CardRow>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" m={0} fontWeight="500">
              Body text
            </Typography>
            <Heading title="More text" headingType="h2" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
    );
  }
```


### Small Spacing

**Render**

```tsx
() => {
  return (
    <Card
      spacing="small"
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### Large Spacing

**Render**

```tsx
() => {
  return (
    <Card
      spacing="large"
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### With Width Provided

**Render**

```tsx
() => {
  return (
    <Card
      width="500px"
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### With Custom Height

**Render**

```tsx
() => {
  return (
    <Card
      height="500px"
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### With Extra Roundness

**Render**

```tsx
() => {
  return (
    <Card
      roundness="large"
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### Interactive

**Render**

```tsx
() => {
  const [clickCounter, setClickCounter] = useState(0);
  return (
    <Box>
      <Typography variant="b">
        Card has been clicked {clickCounter} times
      </Typography>
      <Card
        onClick={() => setClickCounter((prevCounter) => prevCounter + 1)}
        aria-label="Card with button element"
        footer={
          <CardFooter>
            <CardColumn>
              <Link href="https://carbon.sage.com/">Footer link</Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow pt={3}>
          <CardColumn>
            <Typography fontSize="24px" m={0} fontWeight="bold">
              This Card is a button as it has an onClick prop
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        href="#"
        target="_blank"
        rel="noreferrer"
        aria-label="Card with anchor element"
        footer={
          <CardFooter>
            <CardColumn>
              <Link href="https://carbon.sage.com/">Footer link</Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow pt={3}>
          <CardColumn>
            <Typography fontSize="24px" m={0} fontWeight="bold">
              This Card is a link as it has an href prop
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </Box>
  );
}
```


### With Custom Box Shadow

**Render**

```tsx
() => {
  return (
    <Card
      boxShadow="boxShadow400"
      hoverBoxShadow="boxShadow200"
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### Different Card Row Padding

**Render**

```tsx
() => {
  return (
    <Card
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow pt={2} pb={0}>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
}
```


### Different Card Footer Padding

**Render**

```tsx
() => {
  return (
    <Box>
      <Card
        footer={
          <CardFooter px={1} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={2} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={3} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={4} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={2}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </Box>
  );
}
```


### More Examples of Card Footer

**Render**

```tsx
() => {
  return (
    <Box>
      <Card
        footer={
          <CardFooter p={1}>
            <Box
              alignItems="center"
              width="100%"
              display="flex"
              justifyContent="space-around"
            >
              <Box flexGrow={1}>
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
              </Box>
              <Box>
                <Button buttonType="tertiary"> Button </Button>
                <Button buttonType="primary" ml={2}>
                  Button
                </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        width="400px"
        footer={
          <CardFooter px={2} py={1}>
            <Box
              width="100%"
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        width="400px"
        footer={
          <CardFooter variant="transparent" px={2} py={1}>
            <Box
              width="100%"
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter p={2}>
            <Box display="flex" width="100%" justifyContent="center">
              <Link icon="link" href="https://carbon.sage.com/">
                View Stripe Dashboard
              </Link>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </Box>
  );
}
```


### With String as Child

**Render**

```tsx
() => {
  return <Card>String passed as child</Card>;
}
```

