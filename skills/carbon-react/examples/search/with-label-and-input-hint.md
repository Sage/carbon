# Search: With Label and Input Hint

```tsx
import { useState } from "react";
import Search from "carbon-react/lib/components/search";

export const SearchWithLabelAndInputHintExample = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Search
      label="Search"
      inputHint="Hint text (optional)."
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
```
