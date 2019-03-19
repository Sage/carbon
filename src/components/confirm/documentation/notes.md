# Designer Notes
- Shows a static message in a dialog which asks the user to confirm or cancel an action they’ve initiated.
- Useful to confirm actions which may be difficult to undo, or potentially harmful.
- Include a Message component within the Alert component (a warning Message component may be particularly useful for a potentially harmful choice), use plain text, or apply a standard Carbon Error or Warning icon.
- This component has the same options and properties as the Dialog component.
- A good example could be confirming deletion of a large number of records.

# Related Components
- Simple positive or negative confirmation? [Try Flash](/components/flash "Flash").
- Longer message which stays on-screen? [Try Message](/components/message "Message").
- Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast "Toast").
- Error or warning message that interrupts activity? [Try Alert](/components/alert "Alert").
- Simple task in context? [Try Dialog](/components/dialog "Dialog").