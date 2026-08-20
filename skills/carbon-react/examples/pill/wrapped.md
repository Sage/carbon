# Pill: Wrapped

Allow an unusually long label to wrap within a constrained width.

Source story: `src/components/pill/pill.stories.tsx#Wrapped`

```tsx
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";

export const PillWrappedExample = () => {
return (
  <Box mb={1}>
    <Pill maxWidth="65px" wrapText>
      Wrapped pill
    </Pill>
    <Pill ml={1} maxWidth="55px" wrapText>
      Hyphe&shy;nated&shy;pill
    </Pill>
  </Box>
);
;
```
