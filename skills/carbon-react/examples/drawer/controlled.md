# Drawer: Controlled

```tsx
import { useState } from "react";
import Drawer from "carbon-react/lib/components/drawer";
import ButtonNext from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import Box from "carbon-react/lib/components/box";

export const DrawerControlledExample = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Drawer
        expanded={isExpanded}
        height="225px"
        sidebar={<Box p={3}>Drawer content</Box>}
        title={<Typography variant="h2">Filters</Typography>}
      >
        <Box p={3}>Main body content</Box>
      </Drawer>

      <ButtonNext mt={2} onClick={() => setIsExpanded((previous) => !previous)}>
        {isExpanded ? "Hide filters" : "Show filters"}
      </ButtonNext>
    </>
  );
};
```
