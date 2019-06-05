# Designer Notes

- Presents a message in a dialog at the top-right of the screen that animates in. 
The user can manually dismiss it, and it animates out.
- Useful for instant notifications, or information which is time sensitive 
(e.g. a ‘push notification’ style). If the message isn’t time sensitive, consider the Message component.
- The message stays on-screen until dismissed, giving the user time to interpret the message.
- Various types are available. ‘Error’ and ‘Success’ are by far the most useful - 
others are present for completeness by may not be practically used very often:
- *Error* - tells the user about a negative outcome that has already happened. Try to focus the message text on the 
action the user needs to take to be successful, rather than what went wrong (e.g. ‘Payment failed, please try again’).
- *Help* - not frequently used.
- *Info* - gives context or advice to the user where there’s no risk of a negative outcome 
(e.g. ‘Your monthly statements are ready to review’).
- *Maintenance* - warns the user if a particular service or feature may go offline shortly.
- *New* - highlights a new feature to the user (e.g. ‘You can now send batch statements in Sage One’).
- *Success* - indicates that an activity was successful (e.g. ‘Your subscription upgrade was successful’).
- *Warning* - warns the user about a potential negative outcome that hasn’t happened yet.

# Related Components

- Simple positive or negative confirmation? [Try Flash](/components/flash "Try Flash").
- Longer message which stays on-screen? [Try Message](/components/message "Try Message").
- Error or warning message that interrupts activity? [Try Alert](/components/alert "Try Alert").