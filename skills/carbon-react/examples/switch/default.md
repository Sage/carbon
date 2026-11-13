# Switch: Default

```tsx
import { useState } from "react";
import Switch from "carbon-react/lib/components/switch";

export const SwitchDefaultExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
```
