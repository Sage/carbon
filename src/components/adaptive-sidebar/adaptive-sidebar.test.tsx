import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useMemo, useState } from "react";

import AdaptiveSidebar, {
  AdaptiveSidebarProps,
} from "./adaptive-sidebar.component";
import Box from "../box";
import Button from "../button";
import Typography from "../typography";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import useMediaQuery from "../../hooks/useMediaQuery";
import SplitButton from "../split-button";
import Divider from "../divider";

const MockApp = ({
  ...props
}: Omit<AdaptiveSidebarProps, "children" | "open" | "setOpen">) => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <Button
            data-role="adaptive-sidebar-control-button"
            mb={2}
            onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          >
            {adaptiveSidebarOpen ? "Close" : "Open"}
          </Button>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
            odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu
            sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec
            ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan.
            Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor
            ullamcorper. Praesent eu elit eget lacus fermentum porta at ut dui.
          </Typography>
        </Box>
        <AdaptiveSidebar open={adaptiveSidebarOpen} {...props}>
          <span id="accessible-name">My Content</span>
          <Button data-role="custom-close-button" onClick={() => {}}>
            Custom close
          </Button>
        </AdaptiveSidebar>
      </Box>
    </>
  );
};

const MockWithHiddenSupport = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(false);
  const [adaptiveSidebarHidden, setAdaptiveSidebarHidden] = useState(false);

  const buttonText = useMemo(() => {
    if (adaptiveSidebarHidden) {
      return "Show";
    } else if (adaptiveSidebarOpen) {
      return "Close";
    } else {
      return "Open";
    }
  }, [adaptiveSidebarHidden, adaptiveSidebarOpen]);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          data-role="adaptive-sidebar-control-button"
          onClick={() => {
            if (adaptiveSidebarHidden) {
              setAdaptiveSidebarHidden(false);
              return;
            }
            if (adaptiveSidebarOpen) {
              setAdaptiveSidebarOpen(false);
              return;
            }
            setAdaptiveSidebarOpen(true);
          }}
          mb={2}
        >
          {buttonText}
        </Button>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>
      <AdaptiveSidebar
        hidden={adaptiveSidebarHidden}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <SplitButton
            text="Hide"
            onClick={() => setAdaptiveSidebarHidden(true)}
          >
            <Button
              onClick={() => {
                setAdaptiveSidebarOpen(false);
              }}
            >
              Close
            </Button>
          </SplitButton>
        </Box>
        <Divider type="horizontal" my={0} mx={0} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>My content</Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};

jest.mock("../../hooks/__internal__/useIsAboveBreakpoint");
jest.mock("../../hooks/useMediaQuery");

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;
const mockUseIsAboveBreakpoint = useIsAboveBreakpoint as jest.MockedFunction<
  typeof useIsAboveBreakpoint
>;

beforeEach(() => {
  jest.clearAllMocks();
});

[
  { adaptiveBreakpoint: true, reduceMotion: true },
  { adaptiveBreakpoint: true, reduceMotion: false },
  { adaptiveBreakpoint: false, reduceMotion: true },
  { adaptiveBreakpoint: false, reduceMotion: false },
].forEach(({ adaptiveBreakpoint, reduceMotion }) => {
  test(`should render correctly if the user has set 'reduced motion' in their OS settings to ${reduceMotion} and the adaptive breakpoint ${adaptiveBreakpoint ? "has" : "has not"} been reached`, async () => {
    mockUseIsAboveBreakpoint.mockReturnValue(adaptiveBreakpoint);
    mockUseMediaQuery.mockReturnValue(reduceMotion);

    const user = userEvent.setup();

    render(<MockApp />);

    expect(screen.queryByText("My Content")).not.toBeInTheDocument();

    const openButton = screen.getByTestId("adaptive-sidebar-control-button");

    await user.click(openButton);

    expect(screen.getByText("My Content")).toBeInTheDocument();
  });
});

test("should handle changes in screen size and motion preferences", async () => {
  mockUseIsAboveBreakpoint.mockReturnValue(true);
  mockUseMediaQuery.mockReturnValue(false);

  const user = userEvent.setup();

  const { rerender } = render(<MockApp />);

  expect(screen.queryByText("My Content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  expect(screen.getByText("My Content")).toBeInTheDocument();

  mockUseIsAboveBreakpoint.mockReturnValue(false);

  rerender(<MockApp />);

  expect(screen.getByTestId("modal-background")).toBeInTheDocument();
  mockUseIsAboveBreakpoint.mockReturnValue(true);

  rerender(<MockApp />);

  expect(screen.queryByTestId("modal-background")).not.toBeInTheDocument();
});

test("should render the AdaptiveSidebar component as a modal", async () => {
  const user = userEvent.setup();

  render(<MockApp renderAsModal />);

  expect(screen.queryByText("My Content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  expect(screen.getByText("My Content")).toBeInTheDocument();

  expect(screen.getByTestId("modal-background")).toBeInTheDocument();
});

test("when rendered as a modal, the accessible name of the modal is set via `aria-label`", async () => {
  const user = userEvent.setup();

  render(<MockApp renderAsModal aria-label="sidebar" />);

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  const modal = screen.getByRole("dialog");

  expect(modal).toHaveAccessibleName("sidebar");
});

test("when rendered as a modal, the accessible name of the modal is set via `aria-labelledby`", async () => {
  const user = userEvent.setup();

  render(<MockApp renderAsModal aria-labelledby="accessible-name" />);

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  const modal = screen.getByRole("dialog");

  expect(modal).toHaveAccessibleName("My Content");
});

test("should close the AdaptiveSidebar component when the control button is clicked", async () => {
  const user = userEvent.setup();

  render(<MockApp />);

  expect(screen.queryByText("My Content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  expect(screen.getByText("My Content")).toBeInTheDocument();

  await user.click(openButton);
  expect(screen.queryByText("My Content")).not.toBeInTheDocument();
});

["app", "black", "white"].forEach((backgroundColor) => {
  test(`should render with a background color of ${backgroundColor}`, async () => {
    const user = userEvent.setup();

    render(
      <MockApp
        backgroundColor={
          backgroundColor as AdaptiveSidebarProps["backgroundColor"]
        }
      />,
    );

    expect(screen.queryByText("My Content")).not.toBeInTheDocument();

    const openButton = screen.getByTestId("adaptive-sidebar-control-button");
    await user.click(openButton);

    expect(screen.getByText("My Content")).toBeInTheDocument();
  });
});

test("should render with a custom close button", async () => {
  mockUseIsAboveBreakpoint.mockReturnValue(true);
  const user = userEvent.setup();

  render(<MockApp />);

  expect(screen.queryByText("My Content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  expect(screen.getByText("My Content")).toBeInTheDocument();
  const customButton = screen.getByTestId("custom-close-button");

  expect(customButton).toBeInTheDocument();
  expect(customButton).toHaveTextContent("Custom close");
});

test("should render with a left border if the `borderColor` prop is set to a design token value (`var(--colorsUtilityYin050)`)", async () => {
  const user = userEvent.setup();

  render(<MockApp borderColor="--colorsUtilityYin050" />);

  expect(screen.queryByText("My Content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  expect(screen.getByText("My Content")).toBeInTheDocument();
  expect(screen.getByTestId("adaptive-sidebar")).toHaveStyleRule(
    "border-left",
    `1px solid var(--colorsUtilityYin050)`,
  );
});

test("should not render with a left border if the `borderColor` prop is set to `none`", async () => {
  const user = userEvent.setup();

  render(<MockApp borderColor="none" />);

  expect(screen.queryByText("My Content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  expect(screen.getByText("My Content")).toBeInTheDocument();
  expect(screen.getByTestId("adaptive-sidebar")).not.toHaveStyleRule(
    "border-left",
  );
});

test("hides the sidebar when the `hidden` prop is set to `true`", async () => {
  const user = userEvent.setup();
  mockUseIsAboveBreakpoint.mockReturnValue(true);

  render(<MockWithHiddenSupport />);

  expect(screen.queryByText("My content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  expect(screen.getByTestId("adaptive-sidebar")).not.toHaveStyleRule(
    "display",
    "none",
  );
  expect(screen.getByText("My content")).toBeInTheDocument();

  expect(openButton).toHaveTextContent("Close");
  const hideButton = screen.getByText("Hide");

  await user.click(hideButton);

  expect(openButton).toHaveTextContent("Show");

  expect(screen.getByTestId("adaptive-sidebar")).toHaveStyleRule(
    "display",
    "none",
  );
  expect(screen.getByText("My content")).toBeInTheDocument();
  expect(screen.getByText("My content")).not.toBeVisible();

  await user.click(openButton);

  expect(screen.getByTestId("adaptive-sidebar")).not.toHaveStyleRule(
    "display",
    "none",
  );
  expect(screen.getByText("My content")).toBeVisible();
});

test("hides the sidebar when the `hidden` prop is set to `true` and below the scren breakpoint", async () => {
  const user = userEvent.setup();
  mockUseIsAboveBreakpoint.mockReturnValue(false);

  render(<MockWithHiddenSupport />);

  expect(screen.queryByText("My content")).not.toBeInTheDocument();

  const openButton = screen.getByTestId("adaptive-sidebar-control-button");
  await user.click(openButton);

  let sidebar = screen.getByRole("dialog");

  expect(sidebar).not.toHaveStyleRule("display", "block");

  const withinSidebar = within(sidebar);
  expect(withinSidebar.getByText("My content")).toBeInTheDocument();

  expect(openButton).toHaveTextContent("Close");
  const hideButton = screen.getByText("Hide");

  await user.click(hideButton);

  expect(openButton).toHaveTextContent("Show");

  sidebar = screen.getByTestId("adaptive-sidebar-modal-view");

  expect(sidebar).toHaveStyleRule("display", "none");

  expect(screen.getByText("My content")).toBeInTheDocument();
  expect(screen.getByText("My content")).not.toBeVisible();

  await user.click(openButton);

  sidebar = screen.getByRole("dialog");

  expect(sidebar).not.toHaveStyleRule("display", "block");
  expect(screen.getByText("My content")).toBeVisible();
});
