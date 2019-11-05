/**
 * Override a SyntheticEvent with a custom event.target
 * This is intended to be used by Carbon components that provide a formatted value or those that need
 * to provide a name or value that does no appear in the DOM e.g. a component that has two controls associated with one
 * input.
 */
export default function createEvent(event, overrides) {
  if (!event) {
    throw new Error('Unable to extend event because event does not exist');
  }

  if (!overrides) {
    throw new Error('Unable to extend event because no overrides were provided');
  }

  const { name = event.target.name, id = event.target.id, value = event.target.value } = overrides;

  event.target = {
    ...(value !== undefined && { value }),
    ...(name && { name }),
    ...(id && { id })
  };

  return event;
}
