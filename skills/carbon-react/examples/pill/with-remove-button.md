# Pill: With Remove Button

Source story: `src/components/pill/pill.stories.tsx#WithRemoveButton`

```tsx
import { useState } from "react";
import Button from "carbon-react/lib/components/button/__next__";
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";

export const PillWithRemoveButtonExample = () => {
  const [isPillVisible, setIsPillVisible] = useState(true);
  const hidePill = () => setIsPillVisible(false);
  const showPill = () => setIsPillVisible(true);
  return (
    <>
      <Button onClick={showPill}>Reset example</Button>
      <Box m={1}>
        {isPillVisible && (
          <Pill ariaLabelOfRemoveButton="Remove Pill" onDelete={hidePill}>
            Pill
          </Pill>
        )}
      </Box>
    </>
  );
};
```
