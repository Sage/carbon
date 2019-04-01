# Designer Notes
- Nest any Carbon input into this component.
- Configure Pod and Fieldset components to work together, or choose this pre-configured Show/Edit Pod component.
- The Show/Edit Pod Component automatically presents content as a read-only Pod, until the user clicks an edit icon, which shows the same information in an editable Fieldset.
- But, configuring Pod and Fieldset components manually will give you more customization options.
- Choose whether the editable state has a disabled or enabled Save button, a Cancel button, or a Delete button, and their alignment.
- Choose from various visual options, including borders, and primary, secondary, or tertiary appearance.
- Set the pod to flex to the width of its content, or take up the full width of its container.
- Top-aligned labels (Carbon default) or inline right-aligned labels are usually fastest for users.
- Create a single path to completion with your inputs, and between your inputs and the primary action Button.
- Indicate mandatory, or optional fields, whichever is the minority. Think carefully before collecting optional data - don’t collect information you don’t need! Try suffixing ‘(optional)’ after your field label.
- More guidance is available for each of the individual inputs you might place inside this component.

# Related Components
- Editing a number of closely related inputs? [Try Fieldset](/components/fieldset "Try Fieldset").
- Filling in a broad series of inputs? [Try Form](/components/form "Try Form").
- Viewing content that’s grouped together visually? [Try Pod](/components/pod "Try Pod").
- Creating a new entity that is usually presented in a pod? [Try Create](/components/create "Try Create").