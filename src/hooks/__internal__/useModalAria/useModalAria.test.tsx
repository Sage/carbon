import React, { useRef, useState } from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import useModalManager from "../useModalManager";
import useModalAria from ".";
import Portal from "../../../components/portal";

interface ModalComponentProps {
  openButtonText: string;
  closeButtonText: string;
  dialogLabel?: string;
  children?: React.ReactNode;
}

const MockModal = ({
  children,
  open,
}: {
  children?: React.ReactNode;
  open: boolean;
}) => {
  const modalRef = useRef(null);
  useModalManager({ open, modalRef, closeModal: () => {} });

  const content = open ? children : null;

  return <div ref={modalRef}>{content}</div>;
};

const ModalComponent = ({
  openButtonText,
  closeButtonText,
  dialogLabel = "dialog",
  children,
}: ModalComponentProps) => {
  const modalRef = useRef(null);
  const isTopModal = useModalAria(modalRef);
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        {openButtonText}
      </button>
      <MockModal open={isOpen}>
        <div
          aria-label={dialogLabel}
          role="dialog"
          ref={modalRef}
          aria-modal={isTopModal}
        >
          <button type="button" onClick={closeModal}>
            {closeButtonText}
          </button>
          {children}
        </div>
      </MockModal>
    </>
  );
};

const NestedModals = () => {
  return (
    <ModalComponent
      openButtonText="Open modal 1"
      closeButtonText="Close modal 1"
      dialogLabel="dialog 1"
    >
      <ModalComponent
        openButtonText="Open modal 2"
        closeButtonText="Close modal 2"
        dialogLabel="dialog 2"
      >
        Some content
      </ModalComponent>
    </ModalComponent>
  );
};

const ModalWithButtonInPortal = ({
  inertOptOut,
}: {
  inertOptOut?: boolean;
}) => {
  return (
    <>
      <Portal inertOptOut={inertOptOut}>
        <button type="button">button inside portal</button>
      </Portal>
      <ModalComponent openButtonText="open modal" closeButtonText="close modal">
        modal content
      </ModalComponent>
    </>
  );
};

describe("with one dialog", () => {
  it("the open button is in the accessibility tree", () => {
    render(<ModalComponent openButtonText="open" closeButtonText="close" />);

    expect(screen.getByRole("button", { name: "open" })).toBeInTheDocument();
  });

  it("after opening the modal, the open button is no longer in the accessibility tree", async () => {
    const user = userEvent.setup();
    render(<ModalComponent openButtonText="open" closeButtonText="close" />);

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(
      screen.queryByRole("button", { name: "open" }),
    ).not.toBeInTheDocument();
  });

  it("after opening and then closing the modal, the open button is in the accessibility tree", async () => {
    const user = userEvent.setup();
    render(<ModalComponent openButtonText="open" closeButtonText="close" />);

    await user.click(screen.getByRole("button", { name: "open" }));
    await user.click(screen.getByRole("button", { name: "close" }));

    expect(screen.getByRole("button", { name: "open" })).toBeInTheDocument();
  });

  it("adds the aria-modal attribute to the dialog when open", async () => {
    const user = userEvent.setup();
    render(<ModalComponent openButtonText="open" closeButtonText="close" />);

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.queryByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });
});

describe("with nested dialogs", () => {
  it("verifies only the first dialog open button is accessible when no dialogs are open", () => {
    render(<NestedModals />);
    expect(
      screen.getByRole("button", { name: "Open modal 1" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open modal 2" }),
    ).not.toBeInTheDocument();
  });

  it("verifies only the first dialog and its contents are accessible when opened", async () => {
    const user = userEvent.setup();
    render(<NestedModals />);

    await user.click(screen.getByRole("button", { name: "Open modal 1" }));

    expect(screen.getByRole("dialog", { name: "dialog 1" })).toHaveAttribute(
      "aria-modal",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Open modal 2" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open modal 1" }),
    ).not.toBeInTheDocument();
  });

  it("verifies only the second dialog and its contents are accessible when opened", async () => {
    const user = userEvent.setup();
    render(<NestedModals />);

    await user.click(screen.getByRole("button", { name: "Open modal 1" }));
    await user.click(screen.getByRole("button", { name: "Open modal 2" }));

    expect(screen.getByRole("dialog", { name: "dialog 2" })).toHaveAttribute(
      "aria-modal",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Close modal 2" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: "dialog 1" })).toHaveAttribute(
      "aria-modal",
      "false",
    );
    expect(
      screen.queryByRole("button", { name: "Open modal 1" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open modal 2" }),
    ).not.toBeInTheDocument();
  });

  it("verifies only first modal and its contents are accessible after closing the second modal", async () => {
    const user = userEvent.setup();
    render(<NestedModals />);

    await user.click(screen.getByRole("button", { name: "Open modal 1" }));
    await user.click(screen.getByRole("button", { name: "Open modal 2" }));
    await user.click(screen.getByRole("button", { name: "Close modal 2" }));

    expect(screen.getByRole("dialog", { name: "dialog 1" })).toHaveAttribute(
      "aria-modal",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Open modal 2" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: "dialog 2" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open modal 1" }),
    ).not.toBeInTheDocument();
  });

  it("verifies only the first dialog open button is accessible after closing both modals", async () => {
    const user = userEvent.setup();
    render(<NestedModals />);

    await user.click(screen.getByRole("button", { name: "Open modal 1" }));
    await user.click(screen.getByRole("button", { name: "Open modal 2" }));
    await user.click(screen.getByRole("button", { name: "Close modal 2" }));
    await user.click(screen.getByRole("button", { name: "Close modal 1" }));

    expect(
      screen.getByRole("button", { name: "Open modal 1" }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: "Open modal 2" }),
      ).not.toBeInTheDocument(),
    );
  });
});

it("overrides any pre-existing aria-hidden and inert properties when modal is opened", async () => {
  const user = userEvent.setup();
  render(
    <>
      <div data-role="old-aria-hidden" aria-hidden="false" />
      <ModalComponent openButtonText="open" closeButtonText="close" />
      {/* @ts-expect-error inert property not recognised by React. Support to be added in React 19 https://github.com/facebook/react/pull/24730 */}
      <div data-role="old-inert" inert="foo" />
    </>,
  );

  await user.click(screen.getByRole("button", { name: "open" }));

  await waitFor(() =>
    expect(screen.getByTestId("old-aria-hidden")).toHaveAttribute(
      "aria-hidden",
      "true",
    ),
  );
  await waitFor(() =>
    expect(screen.getByTestId("old-inert")).toHaveAttribute("inert", ""),
  );
});

it("restores any previously-overridden aria-hidden and inert properties when modal is closed", async () => {
  const user = userEvent.setup();
  render(
    <>
      <div data-role="old-aria-hidden" aria-hidden="false" />
      <ModalComponent openButtonText="open" closeButtonText="close" />
      {/* @ts-expect-error inert property not recognised by React. Support to be added in React 19 https://github.com/facebook/react/pull/24730 */}
      <div data-role="old-inert" inert="foo" />
    </>,
  );

  await user.click(screen.getByRole("button", { name: "open" }));
  await user.click(screen.getByRole("button", { name: "close" }));

  await waitFor(() =>
    expect(screen.getByTestId("old-aria-hidden")).toHaveAttribute(
      "aria-hidden",
      "false",
    ),
  );
  await waitFor(() =>
    expect(screen.getByTestId("old-inert")).toHaveAttribute("inert", "foo"),
  );
});

describe("with additional content in a portal", () => {
  it("without the inertOptOut flag, the portal content is not in the accessibility tree", async () => {
    const user = userEvent.setup();
    render(<ModalWithButtonInPortal />);

    await user.click(screen.getByRole("button", { name: "open modal" }));

    expect(
      screen.queryByRole("button", { name: "button inside portal" }),
    ).not.toBeInTheDocument();
  });

  it("with the inertOptOut flag, the portal content is in the accessibility tree", async () => {
    const user = userEvent.setup();
    render(<ModalWithButtonInPortal inertOptOut />);

    await user.click(screen.getByRole("button", { name: "open modal" }));

    expect(
      screen.getByRole("button", { name: "button inside portal" }),
    ).toBeInTheDocument();
  });
});
