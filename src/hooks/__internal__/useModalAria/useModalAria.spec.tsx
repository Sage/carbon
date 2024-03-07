import React, { useRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useModalManager from "../useModalManager";
import useModalAria from ".";
import CarbonProvider from "../../../components/carbon-provider/carbon-provider.component";
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

describe("useModalAria", () => {
  describe("with one dialog", () => {
    beforeEach(() => {
      render(
        <CarbonProvider>
          <ModalComponent openButtonText="open" closeButtonText="close" />
        </CarbonProvider>
      );
    });

    it("the open button is in the accessibility tree", () => {
      expect(screen.queryByRole("button", { name: "open" })).not.toBeNull();
    });

    it("after opening the modal, the open button is no longer in the accessibility tree", async () => {
      await userEvent.click(screen.getByRole("button", { name: "open" }));
      expect(screen.queryByRole("button", { name: "open" })).toBeNull();
    });

    it("after opening and then closing the modal, the open button is in the accessibility tree", async () => {
      await userEvent.click(screen.getByRole("button", { name: "open" }));
      await userEvent.click(screen.getByRole("button", { name: "close" }));
      expect(screen.queryByRole("button", { name: "open" })).not.toBeNull();
    });

    it("adds the aria-modal attribute to the dialog when open", async () => {
      await userEvent.click(screen.getByRole("button", { name: "open" }));
      expect(screen.queryByRole("dialog")).toHaveAttribute(
        "aria-modal",
        "true"
      );
    });
  });

  describe("with nested dialogs", () => {
    beforeEach(() => {
      render(
        <CarbonProvider>
          <NestedModals />
        </CarbonProvider>
      );
    });

    describe("before opening the first dialog", () => {
      it("the first open button is in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 1" })
        ).not.toBeNull();
      });

      it("the second open button is not in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 2" })
        ).toBeNull();
      });
    });

    describe("after opening the first dialog but before opening the second", () => {
      beforeEach(async () => {
        await userEvent.click(
          screen.getByRole("button", { name: "Open modal 1" })
        );
      });

      it("the first open button is not in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 1" })
        ).toBeNull();
      });

      it("the second open button is in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 2" })
        ).not.toBeNull();
      });

      it("the first dialog has the aria-modal attribute", () => {
        expect(
          screen.queryByRole("dialog", { name: "dialog 1" })
        ).toHaveAttribute("aria-modal", "true");
      });
    });

    describe("after opening both dialogs", () => {
      beforeEach(async () => {
        await userEvent.click(
          screen.getByRole("button", { name: "Open modal 1" })
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Open modal 2" })
        );
      });

      it("the first open button is not in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 1" })
        ).toBeNull();
      });

      it("the second open button is not in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 2" })
        ).toBeNull();
      });

      it("the first dialog does not have the aria-modal attribute", () => {
        expect(
          screen.queryByRole("dialog", { name: "dialog 1" })
        ).toHaveAttribute("aria-modal", "false");
      });

      it("the second dialog has the aria-modal attribute", () => {
        expect(
          screen.queryByRole("dialog", { name: "dialog 2" })
        ).toHaveAttribute("aria-modal", "true");
      });
    });

    describe("after opening both dialogs then closing the inner one", () => {
      beforeEach(async () => {
        await userEvent.click(
          screen.getByRole("button", { name: "Open modal 1" })
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Open modal 2" })
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Close modal 2" })
        );
      });

      it("the first open button is not in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 1" })
        ).toBeNull();
      });

      it("the second open button is in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 2" })
        ).not.toBeNull();
      });

      it("the first dialog has the aria-modal attribute", () => {
        expect(
          screen.queryByRole("dialog", { name: "dialog 1" })
        ).toHaveAttribute("aria-modal", "true");
      });
    });

    describe("after opening both dialogs and then closing them", () => {
      beforeEach(async () => {
        await userEvent.click(
          screen.getByRole("button", { name: "Open modal 1" })
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Open modal 2" })
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Close modal 2" })
        );
        await userEvent.click(
          screen.getByRole("button", { name: "Close modal 1" })
        );
      });

      it("the first open button is in the accessibility tree", () => {
        expect(
          screen.queryByRole("button", { name: "Open modal 1" })
        ).not.toBeNull();
      });

      it("the second open button is not in the accessibility tree", async () => {
        await waitFor(() =>
          expect(
            screen.queryByRole("button", { name: "Open modal 2" })
          ).toBeNull()
        );
      });
    });
  });

  describe("with aria-hidden or inert previously set", () => {
    beforeEach(() => {
      render(
        <CarbonProvider>
          <div data-role="old-aria-hidden" aria-hidden="false" />
          <ModalComponent openButtonText="open" closeButtonText="close" />
          {/* need to ts-ignore as inert is not recognised by React yet - see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60822
          and https://github.com/facebook/react/pull/24730 */
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore:next-line */}
          <div data-role="old-inert" inert="foo" />
        </CarbonProvider>
      );
    });

    it("overrides the properties when the modal is opened", async () => {
      await userEvent.click(screen.getByRole("button", { name: "open" }));
      await waitFor(() =>
        expect(
          screen.getByTestId("old-aria-hidden").getAttribute("aria-hidden")
        ).toBe("true")
      );
      await waitFor(() =>
        expect(screen.getByTestId("old-inert").getAttribute("inert")).toBe("")
      );
    });

    it("restores to their previous values when closed", async () => {
      await userEvent.click(screen.getByRole("button", { name: "open" }));
      await userEvent.click(screen.getByRole("button", { name: "close" }));
      await waitFor(() =>
        expect(
          screen.getByTestId("old-aria-hidden").getAttribute("aria-hidden")
        ).toBe("false")
      );
      await waitFor(() =>
        expect(screen.getByTestId("old-inert").getAttribute("inert")).toBe(
          "foo"
        )
      );
    });
  });

  describe("with additional content in a portal", () => {
    it("without the inertOptOut flag, the portal content is not in the accessibility tree", async () => {
      render(
        <CarbonProvider>
          <ModalWithButtonInPortal />
        </CarbonProvider>
      );

      await userEvent.click(screen.getByRole("button", { name: "open modal" }));
      expect(
        screen.queryByRole("button", { name: "button inside portal" })
      ).toBeNull();
    });

    it("with the inertOptOut flag, the portal content is in the accessibility tree", async () => {
      render(
        <CarbonProvider>
          <ModalWithButtonInPortal inertOptOut />
        </CarbonProvider>
      );

      await userEvent.click(screen.getByRole("button", { name: "open modal" }));
      expect(
        screen.queryByRole("button", { name: "button inside portal" })
      ).not.toBeNull();
    });
  });
});
