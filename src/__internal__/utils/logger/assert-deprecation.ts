/* istanbul ignore file */
import { render } from "@testing-library/react";
import Logger from ".";

// Helper to assert that a deprecation warning is logged only once
interface AssertDeprecationWarning {
  component: React.ReactNode;
  deprecationMessage: string;
  method?: "deprecate" | "warn";
}

/**
 * assertDeprecationWarning
 * @param param0 - component: The React component to render that triggers the deprecation warning.
 * @param param0 - deprecationMessage: The expected deprecation warning message.
 * @param param0 - method: The Logger method to spy on, either "deprecate" or "warn". Defaults to "deprecate".
 *
 * This function renders the provided component and checks that the specified deprecation warning
 * is logged exactly once during the initial render. It then re-renders the component and verifies
 * that the warning is not logged again, ensuring that deprecation warnings are not repeated.
 */
const assertDeprecationWarning = ({
  component,
  deprecationMessage,
  method = "deprecate",
}: AssertDeprecationWarning) => {
  const loggerSpy = jest.spyOn(Logger, method);

  const { rerender } = render(component);

  // We do it this way to compensate for other logs that might be present
  // e.g. in Password, ButtonMinor is used to render the toggle
  // button. Using this helper in a test for Password would
  // also capture the deprecation warning from ButtonMinor
  // and cause issues.
  const loggedMessages = loggerSpy.mock.calls.map((call) => call[0]);
  expect(loggedMessages).toContain(deprecationMessage);

  const messageInstances = loggedMessages.filter(
    (msg) => msg === deprecationMessage,
  );
  expect(messageInstances).toHaveLength(1);

  loggerSpy.mockReset();

  rerender(component);
  const loggedMessagesAfterRerender = loggerSpy.mock.calls.map(
    (call) => call[0],
  );
  expect(loggedMessagesAfterRerender).not.toContain(deprecationMessage);

  loggerSpy.mockRestore();
};

export default assertDeprecationWarning;
