---
name: carbon-component-toast
description: Carbon Toast component props and usage examples.
---

# Toast

## Import
`import Toast from "carbon-react/lib/components/toast";`

## Source
- Export: `./components/toast`
- Props interface: `ToastProps`
- Deprecated: Yes
- Deprecation reason: `Toast` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The rendered children of the component. |  |
| align | AlignOptions \| undefined | No |  | Sets the horizontal alignment of the component. |  |
| alignY | AlignYOptions \| undefined | No |  | Sets the vertical alignment of the component |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  | Data tag prop bag for close Button |  |
| disableAutoFocus | boolean \| undefined | No |  | Disables auto focus functionality when the Toast has a close icon |  |
| id | string \| undefined | No |  | Custom id |  |
| maxWidth | string \| undefined | No |  | Maximum toast width |  |
| onDismiss | ((ev?: KeyboardEvent \| React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback for when dismissed. |  |
| open | boolean \| undefined | No |  | Determines if the Toast is open. |  |
| targetPortalId | string \| undefined | No |  | Target Portal ID where the Toast will render |  |
| timeout | string \| number \| undefined | No |  | Time for Toast to remain on screen |  |
| variant | ToastVariants \| undefined | No |  | Sets Toast variant |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-default">
      <StyledButton
        id="button-default"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast id="toast-default" variant="success" open={isOpen}>
        My message
      </Toast>
    </Box>
  );
}
```


### Info

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-info">
      <StyledButton
        id="button-variant-info"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="info" id="toast-variant-info" open={isOpen}>
        My Info
      </Toast>
    </Box>
  );
}
```


### Neutral

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-neutral">
      <StyledButton
        id="button-variant-neutral"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="neutral" id="toast-variant-neutral" open={isOpen}>
        My Neutral Toast
      </Toast>
    </Box>
  );
}
```


### Error

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-error">
      <StyledButton
        id="button-variant-error"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="error" id="toast-variant-error" open={isOpen}>
        My Info
      </Toast>
    </Box>
  );
}
```


### Warning

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-variant-warning">
      <StyledButton
        id="button-variant-warning"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast variant="warning" id="toast-variant-warning" open={isOpen}>
        My Info
      </Toast>
    </Box>
  );
}
```


### Notice

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-alternative">
      <StyledButton
        id="button-alternative"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        id="toast-alternative"
        open={isOpen}
        onDismiss={onDismissClick}
        variant="notice"
      >
        <Icon type="warning" color="--colorsSemanticNeutralYang100" /> My Info
      </Toast>
    </Box>
  );
}
```


### Notification

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-notification">
      <StyledButton
        id="button-notification"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast id="toast-notification" variant="notification" open={isOpen}>
        My message
      </Toast>
    </Box>
  );
}
```


### Aligned Left

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-left-aligned">
      <StyledButton
        id="button-left-aligned"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        align="left"
        variant="warning"
        id="toast-left-aligned"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Aligned Center

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-center-aligned">
      <StyledButton
        id="button-center-aligned"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        align="center"
        variant="warning"
        id="toast-center-aligned"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Aligned Right

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-right-aligned">
      <StyledButton
        id="button-right-aligned"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        align="right"
        variant="warning"
        id="toast-right-aligned"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Aligned Y Top

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-top-alignedY">
      <StyledButton
        id="button-top-alignedY"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        alignY="top"
        variant="warning"
        id="toast-top-alignedY"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Aligned Y Center

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-center-alignedY">
      <StyledButton
        id="button-center-alignedY"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        alignY="center"
        variant="warning"
        id="toast-center-alignedY"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Aligned Y Bottom

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-bottom-alignedY">
      <StyledButton
        id="button-bottom-alignedY"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        alignY="bottom"
        variant="warning"
        id="toast-bottom-alignedY"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Custom Max Width

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-custom-width">
      <StyledButton
        id="button-custom-width"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-custom-width"
        open={isOpen}
        onDismiss={onDismissClick}
        maxWidth="550px"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        cupiditate doloremque earum, excepturi ipsum libero provident sint?
        Animi aperiam atque consectetur error, facilis minima perferendis
        perspiciatis quas quo, soluta voluptatibus?
      </Toast>
    </Box>
  );
}
```


### Dismissible

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-dismissible">
      <StyledButton
        id="button-toast-dismissible"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Dismissible with timeout

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);

  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-dismissible">
      <StyledButton
        id="button-toast-dismissible"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
        timeout={2000}
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Dismissible without autoFocus

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const onDismissClick = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };
  const handleToggle = () => {
    if (!isOpen) {
      window.scrollTo(0, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box id="wrapper-dismissible">
      <StyledButton
        id="button-toast-dismissible"
        key="button"
        onClick={handleToggle}
        isOpen={isOpen}
      >
        Toggle - Preview is: {isOpen ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
        disableAutoFocus
      >
        My text
      </Toast>
    </Box>
  );
}
```


### Stacked Delayed

**Render**

```tsx
() => {
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onDismissClickA = () => {
    setIsOpenA(!isOpenA);
  };
  const onDismissClickB = () => {
    setIsOpenB(!isOpenB);
  };

  const handleToggle = () => {
    if (!isOpenA) {
      window.scrollTo(0, 0);
    }
    if (!isOpenA && !isOpenB) {
      setIsOpenA(true);
      setButtonDisabled(true);
      setTimeout(() => {
        setIsOpenB(true);
        setButtonDisabled(false);
      }, 1000);
    } else {
      setButtonDisabled(true);
      setIsOpenA(false);
      setTimeout(() => {
        setIsOpenB(false);
        setButtonDisabled(false);
      }, 1000);
    }
  };

  return (
    <Box id="wrapper-stacked-delayed">
      <StyledButton
        id="button-stacked-delayed"
        key="button"
        onClick={handleToggle}
        disabled={buttonDisabled}
        isOpen={isOpenA || isOpenB}
      >
        Toggle - Preview is: {isOpenA || isOpenB ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        id="toast-stacked-delayed-a"
        variant="warning"
        open={isOpenA}
        onDismiss={onDismissClickA}
        targetPortalId="stacked-delay"
      >
        My toast A
      </Toast>
      <Toast
        id="toast-stacked-delayed-b"
        variant="error"
        open={isOpenB}
        onDismiss={onDismissClickB}
        targetPortalId="stacked-delay"
      >
        My toast B
      </Toast>
    </Box>
  );
}
```


### Stacked

**Render**

```tsx
() => {
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const onDismissClickA = () => {
    setIsOpenA(!isOpenA);
  };
  const onDismissClickB = () => {
    setIsOpenB(!isOpenB);
  };

  const handleToggle = () => {
    if (!isOpenA) {
      window.scrollTo(0, 0);
    }
    if (!isOpenA && !isOpenB) {
      setIsOpenA(true);
      setIsOpenB(true);
    } else {
      setIsOpenA(false);
      setIsOpenB(false);
    }
  };

  return (
    <Box id="wrapper-stacked">
      <StyledButton
        id="button-stacked"
        key="button"
        onClick={handleToggle}
        isOpen={isOpenA || isOpenB}
      >
        Toggle - Preview is: {isOpenA || isOpenB ? "ON" : "OFF"}
      </StyledButton>
      <Toast
        id="toast-stacked-a"
        variant="success"
        open={isOpenA}
        onDismiss={onDismissClickA}
        targetPortalId="stacked"
      >
        My Toast A
      </Toast>
      <Toast
        id="toast-stacked-b"
        variant="warning"
        open={isOpenB}
        onDismiss={onDismissClickB}
        targetPortalId="stacked"
      >
        My Toast B
      </Toast>
    </Box>
  );
}
```


### MDX Example 1

**Args**

```tsx
## Examples

### Controlled
```


### MDX Example 2

**Args**

```tsx
It can be used as a uncontrolled component.

### Uncontrolled
```

