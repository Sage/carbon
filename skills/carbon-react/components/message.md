---
name: carbon-component-message
description: Carbon Message component props and usage examples.
---

# Message

## Import
`import Message from "carbon-react/lib/components/message";`

## Source
- Export: `./components/message`
- Props interface: `MessageProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Set the component's content |  |
| closeButtonAriaLabel | string \| undefined | No |  |  |  | Set custom aria-label for component's close button |  |
| id | string \| undefined | No |  |  |  | Set custom id to component root |  |
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
| onDismiss | ((e: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered on dismiss |  |
| open | boolean \| undefined | No |  |  |  | Flag to determine if the message is rendered |  |
| size | "medium" \| "large" \| undefined | No |  |  |  | Set the component's size |  |
| title | React.ReactNode | No |  |  |  | Set message title |  |
| variant | MessageVariant \| undefined | No |  |  |  | Set the component's variant |  |
| width | string \| undefined | No |  |  |  | Set the component's width, accepts any valid css string |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| showCloseIcon | boolean \| undefined | No |  | Yes | Flag to determine if the close button is rendered |  |  |
| transparent | boolean \| undefined | No |  | Yes | Set transparent styling |  |  |

## Examples
### Default

**Render**

```tsx
(args) => <Message {...args}>Some custom message</Message>
```


### WithCloseButton

**Render**

```tsx
(args) => (
    <Message onDismiss={() => {}} {...args}>
      Some custom message
    </Message>
  )
```


### Programmatic Focus

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(true);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messageRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        ref={messageRef}
        onDismiss={() => setIsOpen(false)}
        variant="error"
      >
        Some custom message
      </Message>
    </>
  );
}
```


### WithTitle

**Args**

```tsx
{
    title: "Title",
  }
```

**Render**

```tsx
(args) => <Message {...args}>Some custom message</Message>
```


### Variant

**Args**

```tsx
{
    mb: 2,
  }
```

**Render**

```tsx
(args) => (
    <>
      <Message onDismiss={() => {}} variant="success" title="Success" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="error" title="Error" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="warning" title="Warning" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="info" title="Info" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="ai" title="AI" {...args}>
        Some custom message
      </Message>
    </>
  )
```


### SubtleVariant

**Args**

```tsx
{
    mb: 2,
  }
```

**Render**

```tsx
(args) => (
    <>
      <Message
        onDismiss={() => {}}
        variant="success-subtle"
        title="Success"
        {...args}
      >
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="error-subtle"
        title="Error"
        {...args}
      >
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="warning-subtle"
        title="Warning"
        {...args}
      >
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="info-subtle"
        title="Info"
        {...args}
      >
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="ai-subtle" title="AI" {...args}>
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="callout-subtle"
        title="Callout"
        {...args}
      >
        Some custom message
      </Message>
    </>
  )
```


### SizeLarge

**Args**

```tsx
{
    title: "Large",
    size: "large",
    mb: 2,
  }
```

**Render**

```tsx
(args) => (
    <>
      <Message onDismiss={() => {}} {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="info-subtle" {...args}>
        Some custom message
      </Message>
    </>
  )
```


### Show Close Icon

**Render**

```tsx
() => {
  return (
    <Message showCloseIcon={false}>
      A longer custom message which now shows the close icon is not rendered and
      padding is equal on both sides
    </Message>
  );
}
```


### Transparent

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      {!isOpen && (
        <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
          Open Message
        </Button>
      )}
      <Message
        open={isOpen}
        onDismiss={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
        transparent
      >
        Some custom message
      </Message>
    </>
  );
}
```

