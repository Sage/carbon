```tsx
export const DarkBackground: Story = () => {
  const noop = () => {};
  return (
    <>
      <Box backgroundColor="#262626" p={2}>
        <Box mb={1}>
          <Pill pillRole="status" mr={1} isDarkBackground>
            neutral
          </Pill>
          <Pill pillRole="status" fill mr={1} isDarkBackground>
            neutral
          </Pill>
          <Pill pillRole="status" onDelete={noop} mr={1} isDarkBackground>
            neutral
          </Pill>
          <Pill pillRole="status" onDelete={noop} fill isDarkBackground>
            neutral
          </Pill>
        </Box>

        <Box mb={1}>
          <Pill
            pillRole="status"
            colorVariant="positive"
            mr={1}
            isDarkBackground
          >
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            fill
            mr={1}
            isDarkBackground
          >
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            onDelete={noop}
            mr={1}
            isDarkBackground
          >
            positive
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="positive"
            onDelete={noop}
            fill
            isDarkBackground
          >
            positive
          </Pill>
        </Box>

        <Box mb={1}>
          <Pill
            pillRole="status"
            colorVariant="negative"
            mr={1}
            isDarkBackground
          >
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            fill
            mr={1}
            isDarkBackground
          >
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            onDelete={noop}
            mr={1}
            isDarkBackground
          >
            negative
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="negative"
            onDelete={noop}
            fill
            isDarkBackground
          >
            negative
          </Pill>
        </Box>

        <Box mb={1}>
          <Pill
            pillRole="status"
            colorVariant="warning"
            mr={1}
            isDarkBackground
          >
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            fill
            mr={1}
            isDarkBackground
          >
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            onDelete={noop}
            mr={1}
            isDarkBackground
          >
            warning
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="warning"
            onDelete={noop}
            fill
            isDarkBackground
          >
            warning
          </Pill>
        </Box>

        <Box mb={1}>
          <Pill
            pillRole="status"
            colorVariant="information"
            mr={1}
            isDarkBackground
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            fill
            mr={1}
            isDarkBackground
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            onDelete={noop}
            mr={1}
            isDarkBackground
          >
            information
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="information"
            onDelete={noop}
            fill
            isDarkBackground
          >
            information
          </Pill>
        </Box>

        <Box mb={1}>
          <Pill
            pillRole="status"
            colorVariant="neutralWhite"
            fill
            mr={1}
            isDarkBackground
          >
            neutralWhite
          </Pill>
          <Pill
            pillRole="status"
            colorVariant="neutralWhite"
            onDelete={noop}
            fill
            isDarkBackground
          >
            neutralWhite
          </Pill>
        </Box>
      </Box>
    </>
  );
};
```