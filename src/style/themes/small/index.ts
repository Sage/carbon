import { mintTheme } from "..";

export default (() => {
  console.warn(`"Small Theme" has been renamed to "Mint".
All references to that theme should be updated to:
import { mintTheme } from 'carbon-react/lib/style/themes'`);

  return mintTheme;
})();
