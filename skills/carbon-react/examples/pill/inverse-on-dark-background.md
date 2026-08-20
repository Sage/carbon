# Pill: Inverse on Dark Background

Use inverse styling when pills appear on a dark surface.

Source story: `src/components/pill/pill.stories.tsx#InverseOnDarkBackground`

```tsx
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";

export const PillInverseOnDarkBackgroundExample = () => {
  const args = {
    children: "Label",
    variant: "blue",
    size: "M",
    onDelete: undefined,
    icon: undefined,
  };
  return (
    <Box backgroundColor="#262626" p={2} display="flex" gap={1}>
      <Pill {...args} inverse>
        {args.children}
      </Pill>
      <Pill {...args} inverse fill>
        {args.children}
      </Pill>
    </Box>
  );
};
```
