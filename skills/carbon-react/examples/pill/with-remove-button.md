# Pill: With Remove Button

Make a pill removable by providing onDelete, and customise its accessible label when needed.

Source story: `src/components/pill/pill.stories.tsx#WithRemoveButton`

```tsx
import { useState } from "react";
import Button from "carbon-react/lib/components/button";
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";

export const PillWithRemoveButtonExample = () => {
const [isPillVisible, setIsPillVisible] = useState(true);
const hidePill = () => setIsPillVisible(false);
const showPill = () => setIsPillVisible(true);
return (
  <>
    <Button onClick={showPill}>Reset example</Button>
    <Box m={1}>{isPillVisible && <Pill onDelete={hidePill}>Pill</Pill>}</Box>
  </>
);
;
```
