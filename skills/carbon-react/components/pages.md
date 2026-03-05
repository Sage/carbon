---
name: carbon-component-pages
description: Carbon Pages component props and usage examples.
---

# Pages

## Import
`import Pages from "carbon-sage/lib/components/pages";`

## Source
- Export: `./components/pages`
- Props interface: `PagesProps`
- Deprecated: Yes
- Deprecation reason: `Pages` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Individual Page components |  |
| initialpageIndex | string \| number \| undefined | No |  | The selected tab on page load | 0 |
| pageIndex | string \| number \| undefined | No |  | The current page's index |  |
| theme | Partial<ThemeObject> \| undefined | No |  |  |  |
| transition | string \| undefined | No |  | Controls which transition to use (fade or slide). | "slide" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setPageIndex(0);
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Preview</Button>
      <Dialog
        fullscreen
        pagesStyling
        open={isOpen}
        onCancel={handleCancel}
        aria-label="Full-screen dialog"
      >
        <Pages pageIndex={pageIndex}>
          <Page title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to second page
            </Button>
          </Page>
          <Page
            title={
              <Heading title="My Second Page" backLink={handleBackClick} />
            }
          >
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to third page
            </Button>
          </Page>
          <Page
            title={<Heading title="My Third Page" backLink={handleBackClick} />}
          >
            Third Page
          </Page>
        </Pages>
      </Dialog>
    </>
  );
}
```


### With Initial Page Index

**Render**

```tsx
() => {
  const initialpageIndex = 1;
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(
    Number(initialpageIndex) ? Number(initialpageIndex) : 0,
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    if (!initialpageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(initialpageIndex));
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Preview</Button>
      <Dialog fullscreen pagesStyling open={isOpen} onCancel={handleCancel}>
        <Pages initialpageIndex={initialpageIndex} pageIndex={pageIndex}>
          <Page title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to second page
            </Button>
          </Page>
          <Page
            title={
              <Heading title="My Second Page" backLink={handleBackClick} />
            }
          >
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to third page
            </Button>
          </Page>
          <Page
            title={<Heading title="My Third Page" backLink={handleBackClick} />}
          >
            Third Page
          </Page>
        </Pages>
      </Dialog>
    </>
  );
}
```


### Inside Full-Screen Dialog

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setPageIndex(0);
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Preview</Button>
      <Dialog fullscreen pagesStyling open={isOpen} onCancel={handleCancel}>
        <Pages pageIndex={pageIndex}>
          <Page title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to second page
            </Button>
          </Page>
          <Page
            title={
              <Heading title="My Second Page" backLink={handleBackClick} />
            }
          >
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to third page
            </Button>
          </Page>
          <Page
            title={<Heading title="My Third Page" backLink={handleBackClick} />}
          >
            Third Page
          </Page>
        </Pages>
      </Dialog>
    </>
  );
}
```


### Overriding Content Padding

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setPageIndex(0);
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Preview</Button>
      <Dialog fullscreen pagesStyling open={isOpen} onCancel={handleCancel}>
        <Pages pageIndex={pageIndex}>
          <Page p={0} title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to Last page
            </Button>
          </Page>
          <Page
            p={0}
            title={<Heading title="My Last Page" backLink={handleBackClick} />}
          >
            <Button onClick={handleBackClick} disabled={isDisabled}>
              Go to First page
            </Button>
          </Page>
        </Pages>
      </Dialog>
    </>
  );
}
```

