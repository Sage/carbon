import { aegeanTheme } from "..";

export default (() => {
  console.warn(`"Medium Theme" has been renamed to "Aegean".
All references to that theme should be updated to:
import { aegeanTheme } from "carbon-react/lib/style/themes"`);

  return aegeanTheme;
})();
