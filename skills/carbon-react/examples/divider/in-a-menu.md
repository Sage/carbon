# Divider: In a Menu

```tsx
import Box from "carbon-react/lib/components/box";
import { Menu, MenuItem } from "carbon-react/lib/components/menu";
import Divider from "carbon-react/lib/components/divider";

export const DividerInAMenuExample = () => {
  return (
    <Box minHeight={120}>
      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <Divider height={24} p={1} />
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
```
