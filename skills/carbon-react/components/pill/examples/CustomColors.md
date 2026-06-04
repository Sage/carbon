```tsx
export const CustomColors: Story = () => {
  const noop = () => {};
  return (
    <>
      <Box mb={1}>
        <Pill borderColor="--colorsSemanticCaution500" mr={1}>
          tag
        </Pill>
        <Pill borderColor="--colorsSemanticCaution500" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="--colorsSemanticCaution500" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="--colorsSemanticCaution500" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="brilliantGreenShade20" mr={1}>
          tag
        </Pill>
        <Pill borderColor="brilliantGreenShade20" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="brilliantGreenShade20" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="brilliantGreenShade20" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="red" mr={1}>
          tag
        </Pill>
        <Pill borderColor="red" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="red" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="red" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="#123456" mr={1}>
          tag
        </Pill>
        <Pill borderColor="#123456" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="#123456" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="#123456" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="rgb(0, 123, 10)" mr={1}>
          tag
        </Pill>
        <Pill borderColor="rgb(0, 123, 10)" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="rgb(0, 123, 10)" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="rgb(0, 123, 10)" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="hsl(317, 40%, 64%)" mr={1}>
          tag
        </Pill>
        <Pill borderColor="hsl(317, 40%, 64%)" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="hsl(317, 40%, 64%)" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="hsl(317, 40%, 64%)" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
    </>
  );
};
```