# Designer Notes

- Presents a static message which stays on screen.
- Useful for messages which are longer or more important, where the user needs time to interpret them, or might need to refer back to them during an activity.
- Various types are available.
- **Error** - tells the user about a negative outcome that has already happened. Try to focus the message text on the action the user needs to take to be successful, rather than what went wrong.
- **Info** - gives context or advice to the user where there’s no risk of a negative outcome.
- **Success** - indicates that an activity was successful. A good example could also present the user with onward options, such as ‘View a list of items’ or ‘Create another’.
- **Warning** - warns the user about a potential negative outcome that hasn’t happened yet.
- The Transparent configuration is useful if you’d like the message to be more visually subtle, perhaps in a Dialog.

- Classic theme supports also:
- **Default**
- **Help**
- **Maintenance**
- **New**
- Classic theme supports two additional props: border (default: true) and roundedCorners (default: true) which are not available in small/medium/large theme.

# Related Components

- Simple positive or negative confirmation? [Try Flash](/components/flash "Flash").
- Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast "Toast").
- Error or warning message that interrupts activity? [Try Alert](/components/alert "Alert").
