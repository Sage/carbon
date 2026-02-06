import { renderOpen } from "../popover-container.component";

/**
 * This component exports are marked as uncovered by SWC instrumentation.
 * Also unable to instanbul ignore exports.
 * @see https://github.com/vercel/next.js/discussions/49504
 */
test("`renderOpen` is defined", () => {
  expect(renderOpen).toBeDefined();
});
