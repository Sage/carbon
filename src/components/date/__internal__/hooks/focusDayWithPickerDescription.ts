/**
 * Focuses a day and describes it until it loses focus. Screen readers can skip
 * the dialog description when focus moves straight to a day, and the attribute
 * must already be present when focus lands for it to be announced.
 * Returns a cleanup function that removes the description.
 */
const focusDayWithPickerDescription = (
  day: HTMLElement,
  descriptionId: string,
) => {
  const removeDescription = () => day.removeAttribute("aria-describedby");

  day.setAttribute("aria-describedby", descriptionId);
  day.addEventListener("blur", removeDescription, { once: true });
  day.focus();

  return () => {
    day.removeEventListener("blur", removeDescription);
    removeDescription();
  };
};

export default focusDayWithPickerDescription;
