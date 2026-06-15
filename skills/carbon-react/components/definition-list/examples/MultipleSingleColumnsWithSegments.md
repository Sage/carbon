```tsx
export const MultipleSingleColumnsWithSegments: Story = () => (
  <Box width="65%" px={2} pt={4} pb={3}>
    <Box width="90%">
      <Typography color="rgba(0,0,0,0.55)" variant="h4">
        Segment Header
      </Typography>
      <Divider type="horizontal" ml={0} mt={2} />
    </Box>
    <Box mb={3} display="flex">
      <Box flexGrow={1}>
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
      <Box flexGrow={1}>
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
    </Box>
    <Box width="90%">
      <Typography color="rgba(0,0,0,0.55)" variant="segment-subheader-alt">
        Segment Header
      </Typography>
      <Divider type="horizontal" ml={0} mt={2} />
    </Box>
    <Box display="flex">
      <Box width="100%">
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
      <Box width="100%">
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
    </Box>
    <Box width="90%">
      <Divider type="horizontal" ml={0} mt={1} />
    </Box>
  </Box>
);
```