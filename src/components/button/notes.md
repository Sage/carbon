# Designer Notes
- Avoid using buttons for navigation (taking the user somewhere else) - use them for performing an action or command.
- Use a Primary configuration for positive actions that are the main goal for the user (e.g. Save, Submit, Continue).
- Avoid placing Secondary actions on a form if you can.
- If an action is particularly destructive (e.g. Delete or Clear), consider using Red configuration. It might be a good idea to show a confirmation dialog, or the ability to undo it too.
- Try to create a single path to completion by aligning your action with your inputs.
- You can disable a Button, but try to avoid this. If you need to, make it clear what the user needs to do in order to activate the Button. A good case for disabling an action is to prevent a form being submitted twice (e.g. on a payment page).

# Related Components
- Range of buttons where one is more important? [Try Split Button](/components/split-button "Try Split Button").
- Range of buttons all of the same importance? [Try Action Button](/components/action-button "Try Action Button").
- Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle "Try Button Toggle").