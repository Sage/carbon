# Divider: In a Flex Container

```tsx
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Divider from "carbon-react/lib/components/divider";

export const DividerInAFlexContainerExample = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={24}>
      <Icon type="home" />
      <Divider h={16} />
      <Icon type="settings" />
      <Divider h={16} />
      <Icon type="add" />
      <Divider h={16} />
      <Icon type="minus" />
      <Divider h={16} />
      <Icon type="info" />
      <Divider h={16} />
      <Icon type="warning" />
      <Divider h={16} />
      <Icon type="chevron_up" />
      <Divider h={16} />
      <Icon type="chevron_down" />
      <Divider h={16} />
      <Icon type="edit" />
    </Box>
  );
};
```
