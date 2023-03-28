import { screen, waitForElementToBeRemoved } from "@testing-library/dom";
import Announcer from ".";

describe("Announcer", () => {
  afterEach(() => {
    Announcer.cleanup();
  });

  it("when announcePolitely is called, inserts passed message into polite live region", () => {
    const message = "foo";
    Announcer.announcePolitely(message);

    const region = screen.getByRole("status");
    expect(region).toHaveTextContent(message);
  });

  it("when announcePolitely is called, inserted message is cleared after delay", async () => {
    const message = "bar";
    Announcer.announcePolitely(message);

    const region = screen.getByRole("status");
    expect(region).toHaveTextContent(message);
    await waitForElementToBeRemoved(() => screen.queryByText(message));
  });

  it("when announcePolitely is called and polite live region exists in document, do not recreate", () => {
    Announcer.announcePolitely("some message");

    expect(screen.queryByRole("status")).toBeInTheDocument();

    Announcer.announcePolitely("new message");
    expect(screen.queryAllByRole("status")).toHaveLength(1);
  });

  it("when announceAssertively is called, inserts passed message into assertive live region", () => {
    const message = "baz";
    Announcer.announceAssertively(message);

    const region = screen.getByRole("alert");
    expect(region).toHaveTextContent(message);
  });

  it("when announceAssertively is called,inserted message is cleared after delay", async () => {
    const message = "buzz";
    Announcer.announceAssertively(message);

    const region = screen.getByRole("alert");
    expect(region).toHaveTextContent(message);
    await waitForElementToBeRemoved(() => screen.queryByText(message));
  });

  it("when announceAssertively is called and assertive live region exists in document, do not recreate", () => {
    Announcer.announceAssertively("some message");

    expect(screen.queryByRole("alert")).toBeInTheDocument();

    Announcer.announceAssertively("new message");
    expect(screen.queryAllByRole("alert")).toHaveLength(1);
  });
});
