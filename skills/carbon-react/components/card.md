---
name: carbon-component-card
description: Carbon Card component props and usage examples.
---

# Card

## Import
`import Card from "carbon-react/lib/components/card";`

## Source
- Export: `./components/card`
- Props interface: `CardProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Child nodes |  |
| draggable | boolean \| undefined | No |  |  |  | Flag to indicate if card is draggable |  |
| footer | React.ReactNode | No |  |  |  | The footer to render underneath the Card content |  |
| header | React.ReactNode | No |  |  |  | The header to render above the Card content |  |
| height | string \| undefined | No |  |  |  | Height of the component (any valid CSS value) |  |
| href | string \| undefined | No |  |  |  | The path to navigate to. Renders an anchor element when passed and no draggable prop set |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| onClick | ((event: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLDivElement> \| React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLDivElement>) => void) \| undefined | No |  |  |  | Action to be executed when card is clicked or enter pressed. Renders a button when passed and no draggable or href props set |  |
| rel | string \| undefined | No |  |  |  | String for rel property when card has an href prop set |  |
| rightChildren | React.ReactNode | No |  |  |  | Slot rendered on the opposite side of the drag handle, only visible when `draggable` is true. Intended for accessibility controls (e.g. move-up / move-down buttons) for keyboard users. |  |
| roundness | "large" \| "default" \| "moderate" \| "curved" \| undefined | No |  |  |  | Sets the level of roundness of the corners. "moderate" is 16px and "curved" is 20px. **Note:** The values "default" and "large" are deprecated. Use "moderate" or "curved" instead. | "moderate" |
| spacing | "small" \| "medium" \| "large" \| "none" \| "extra-small" \| undefined | No |  |  |  | Size padding applied to the card. | "medium" |
| target | string \| undefined | No |  |  |  | Target property in which link should open ie: _blank, _self, _parent, _top |  |
| variant | "standard" \| "outlined" \| undefined | No |  |  |  | Visual style variant of the card | "standard" |
| width | string \| undefined | No |  |  |  | Style value for width of card | "500px" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify an aria-label for the component |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Yes | Design token for custom Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Card component. |  |  |
| hoverBoxShadow | BoxShadowsType \| undefined | No |  | Yes | Design token for custom Box Shadow on hover. One of `onClick` or `href` props must be true. Note: please check that the box shadow design token you are using is compatible with the Card component. |  |  |

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
          <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="24px" pb="24px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <Typography variant="h2">More text</Typography>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
}
```


### draggable spacing sizes

**Render**

```tsx
() => {
  return (
    <>
      {(["none", "extra-small", "small", "medium", "large"] as const).map(
        (spacing) => (
          <Card
            key={spacing}
            draggable
            rightChildren={
              <ActionPopover m={0} rightAlignMenu>
                <ActionPopoverItem onClick={() => {}}>
                  Move up
                </ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>
                  Move down
                </ActionPopoverItem>
              </ActionPopover>
            }
            spacing={spacing}
            mb="16px"
            footer={
              <CardFooter>
                <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
                  <Typography mb="0" textAlign="center">
                    <Link icon="link" href="https://carbon.sage.com/">
                      Footer link
                    </Link>
                  </Typography>
                </Box>
              </CardFooter>
            }
          >
            <Box display="flex">
              <Box flexGrow={1} minWidth={0}>
                <Typography variant="h1">Spacing: {spacing}</Typography>
                <Typography m={0}>Additional text</Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <Icon type="image" />
              </Box>
            </Box>
          </Card>
        ),
      )}
    </>
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
            <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h1">Heading</Typography>
            <Typography m={0}>Additional text</Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <Typography textAlign="center" variant="h2">
              More text
            </Typography>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
      <Card
        height="500px"
        href="#"
        footer={
          <CardFooter>
            <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h1">Heading</Typography>
            <Typography m={0}>Additional text</Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <Typography textAlign="center" variant="h2">
              More text
            </Typography>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
}
```


### InteractiveFocusedWithFooter

**Render**

```tsx
() => (
    <Card
      onClick={() => {}}
      footer={
        <CardFooter>
          <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Focused Card</Typography>
          <Typography m={0}>Card with footer in focused state</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
    </Card>
  )
```


### InteractiveFocusedWithoutFooter

**Render**

```tsx
() => (
    <Card onClick={() => {}}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Focused Card</Typography>
          <Typography m={0}>Card without footer in focused state</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
    </Card>
  )
```


### DeprecatedCardRowAndColumn

**Render**

```tsx
() => (
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
  )
```


### DeprecatedCardRowWithPadding

**Render**

```tsx
() => (
    <Card
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow pt={2} pb={0}>
        <CardColumn align="left">
          <Typography variant="h1">Stripe - [account name]</Typography>
          <Typography size="L" m={0}>
            user.name@sage.com
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography m={0} weight="medium">
            Stripe Balance
          </Typography>
          <Typography variant="h2">£ 0.00</Typography>
          <Typography>LAST ENTRY: 5 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography m={0} weight="medium">
            Stripe Balance
          </Typography>
          <Typography variant="h2">£ 0.00</Typography>
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  )
```


### DeprecatedCardRowSpacingSizes

**Render**

```tsx
() => (
    <>
      {(["small", "medium", "large"] as const).map((spacing) => (
        <Card
          key={spacing}
          spacing={spacing}
          mb="16px"
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
              <Typography variant="h1">Spacing: {spacing}</Typography>
              <Typography m={0}>Additional text</Typography>
            </CardColumn>
            <CardColumn align="right">
              <Icon type="image" />
            </CardColumn>
          </CardRow>
          <CardRow>
            <CardColumn>
              <Typography m={0} weight="medium">
                Body text
              </Typography>
              <Typography variant="h2">More text</Typography>
            </CardColumn>
          </CardRow>
        </Card>
      ))}
    </>
  )
```


### DeprecatedCardRowWithInteractive

**Render**

```tsx
() => (
    <Card
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
          <Heading title="Interactive Card" divider={false} />
          <Typography fontSize="16px" m={0}>
            Click me!
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
    </Card>
  )
```


### Playground

**Args**

```tsx
{
    spacing: "medium",
    roundness: "moderate",
    width: undefined,
    height: undefined,
    draggable: false,
  }
```

**Render**

```tsx
(args) => {
    return (
      <Card
        {...args}
        rightChildren={
          args.draggable ? (
            <ActionPopover m={0} rightAlignMenu>
              <ActionPopoverItem onClick={() => {}}>Move up</ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>
                Move down
              </ActionPopoverItem>
              <ActionPopoverDivider />
              <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
            </ActionPopover>
          ) : undefined
        }
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h1">Heading</Typography>
            <Typography m={0}>Additional text</Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <Typography variant="h2" textAlign="center">
              More text
            </Typography>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
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
        footer={
          <CardFooter>
            <Box
              pl="var(--global-space-comp-l)"
              pr="var(--global-space-comp-l)"
              pt="var(--global-space-comp-xl)"
              pb="var(--global-space-comp-xl)"
              flexGrow={1}
            >
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h1">Heading</Typography>
            <Typography m={0}>Additional text</Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h2">More text</Typography>
            </div>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
    );
  }
```


### Without Footer

**Render**

```tsx
() => {
  return (
    <Card>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="24px" pb="24px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <Typography variant="h2" textAlign="center">
            More text
          </Typography>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
}
```


### Without Footer - Interactive

**Render**

```tsx
() => {
  const [clickCounter, setClickCounter] = useState(0);
  return (
    <Box>
      <Typography variant="b" mb={2}>
        Card has been clicked {clickCounter} times
      </Typography>
      <Card
        onClick={() => setClickCounter((prevCounter) => prevCounter + 1)}
        aria-label="Interactive card without footer"
      >
        <Box display="flex" width="100%">
          <Box flexGrow={1}>
            <Typography textAlign="left" variant="h1">
              Heading
            </Typography>
            <Typography textAlign="left" m={0}>
              Additional text
            </Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px" width="100%">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <Typography variant="h2" textAlign="center">
              More text
            </Typography>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
```


### No Spacing

**Render**

```tsx
() => {
  return (
    <Card
      spacing="none"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
}
```


### Extra Small Spacing

**Render**

```tsx
() => {
  return (
    <Card
      spacing="extra-small"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex" width="100%">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="16px" pb="16px" width="100%">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
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
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box
        display="flex"
        pt="var(--global-space-comp-xl)"
        pb="var(--global-space-comp-xl)"
      >
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
}
```


### Medium Spacing

**Render**

```tsx
() => {
  return (
    <Card
      spacing="medium"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="24px" pb="24px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
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
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
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
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
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
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
}
```


### With Curved Roundness

**Render**

```tsx
() => {
  return (
    <Card
      roundness="curved"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
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
            <Box
              pl="var(--global-space-comp-l)"
              pr="var(--global-space-comp-l)"
              pt="var(--global-space-comp-xl)"
              pb="var(--global-space-comp-xl)"
              flexGrow={1}
            >
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pt="var(--global-space-comp-xl)">
          <Box flexGrow={1}>
            <Typography size="L" m={0} weight="medium" textAlign="center">
              This Card is a button as it has an onClick prop
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        href="#"
        target="_blank"
        rel="noreferrer"
        aria-label="Card with anchor element"
        footer={
          <CardFooter>
            <Box
              pl="var(--global-space-comp-l)"
              pr="var(--global-space-comp-l)"
              pt="var(--global-space-comp-xl)"
              pb="var(--global-space-comp-xl)"
              flexGrow={1}
            >
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pt="var(--global-space-comp-xl)">
          <Box flexGrow={1}>
            <Typography size="L" m={0} weight="medium" textAlign="center">
              This Card is a link as it has an href prop
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
```


### Draggable

**Render**

```tsx
() => {
  return (
    <Card
      draggable
      rightChildren={
        <ActionPopover m={0} rightAlignMenu>
          <ActionPopoverItem onClick={() => {}}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => {}}>Move down</ActionPopoverItem>
          <ActionPopoverDivider />
          <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
          <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
        </ActionPopover>
      }
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="24px" pb="24px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <Typography variant="h2" textAlign="center">
            More text
          </Typography>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
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
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex" pt="var(--global-space-comp-xl)" pb="0">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="0" pb="var(--global-space-comp-l)">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
      <Box display="flex" pt={0} pb={4}>
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
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
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={2} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={3} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={4} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={2}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
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
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                  mr="8px"
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                  mr="8px"
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                  mr="8px"
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                />
              </Box>
              <Box>
                <Button variantType="tertiary"> Button </Button>
                <Button variantType="primary" ml={2}>
                  Button
                </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
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
                variantType="tertiary"
                mr={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                variantType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
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
                variantType="tertiary"
                mr={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                variantType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
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
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
```

