```tsx
export const InsideButtons: Story = {
  render: () => (
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
  ),
};
```