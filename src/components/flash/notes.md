# Designer Notes
- Presents a short confirmation message to the user in a banner which can animate quickly in, and out, at the bottom of the browser window.
- Success messages disappear after a set timeout. Error messages stay on-screen until dismissed by the user.
- Useful for general success and failure messages that the user doesn’t need time to interpret. Try to place only a very short message in a Flash of just a few characters, e.g. ‘Changes Saved’.
- Various types are available. ‘Error’ and ‘Success’ are by far the most useful - others are present for completeness by may not be used in practice very often, because a Flash isn’t suitable for longer messages.

# Related Components
- Longer message which stays on-screen? [Try Message](/components/message "Try Message").
- Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast "Try Toast").
- Error or warning message that interrupts activity? [Try Alert](/components/alert "Try Alert").
