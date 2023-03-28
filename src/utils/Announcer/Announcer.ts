type Politeness = "polite" | "assertive";

/* Due to possibility of having multiple Carbon versions being used on
 * the same page, it is neccessary to maintain the same values for the
 * following ids */
const CARBON_INTERNALS__LIVE_REGION_IDS: Record<Politeness, string> = {
  polite: "carbon-polite-live-region",
  assertive: "carbon-assertive-live-region",
};

const parentNode = document.body;
const TIMEOUT_DURATION = 200;
const roles: Record<Politeness, string> = {
  polite: "status",
  assertive: "alert",
};

function getRegion(politeness: Politeness): HTMLElement {
  const region = document.getElementById(
    CARBON_INTERNALS__LIVE_REGION_IDS[politeness]
  );

  if (region) return region;

  const element: HTMLDivElement = document.createElement("div");
  const visuallyHiddenStyles: Partial<CSSStyleDeclaration> = {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  };
  element.setAttribute("id", CARBON_INTERNALS__LIVE_REGION_IDS[politeness]);
  element.setAttribute("role", roles[politeness]);
  element.setAttribute("aria-live", politeness);
  element.setAttribute("aria-atomic", "false");
  element.setAttribute("aria-relevant", "additions");
  Object.assign(element.style, visuallyHiddenStyles);

  return parentNode.appendChild(element);
}

/**
 * Dispatches a message for a screen reader to announce to users.
 * Message will be announced at the next graceful opportunity, such as
 * when the user is idle or any current announcements have finished being
 * spoken. */
function announcePolitely(message: string): void {
  const politeRegion = getRegion("polite");

  politeRegion.textContent = message;

  window.setTimeout(() => {
    politeRegion.textContent = "";
  }, TIMEOUT_DURATION);
}

/**
 * Dispatches a critical, time-sensitive message for a screen reader
 * to announce immediately to users.
 *
 * WARNING - Use sparingly to avoid overwhelming users with alerts. */
function announceAssertively(message: string): void {
  const assertiveRegion = getRegion("assertive");

  assertiveRegion.textContent = message;

  window.setTimeout(() => {
    assertiveRegion.textContent = "";
  }, TIMEOUT_DURATION);
}

/** Remove all DOM elements used by the Announcer utility */
function cleanup() {
  const politeRegion = document.getElementById(
    CARBON_INTERNALS__LIVE_REGION_IDS.polite
  );
  if (politeRegion) politeRegion.remove();
  const assertiveRegion = document.getElementById(
    CARBON_INTERNALS__LIVE_REGION_IDS.assertive
  );
  if (assertiveRegion) assertiveRegion.remove();
}

const Announcer = {
  announcePolitely,
  announceAssertively,
  cleanup,
};

export default Announcer;
