# Pill: Inverse

```tsx
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
    <div style={darkGreyBackground}>
      <Pill {...args} inverse>
        {args.children}
      </Pill>
      <Pill {...args} inverse fill>
        {args.children}
      </Pill>
    </div>
  );
};
```
