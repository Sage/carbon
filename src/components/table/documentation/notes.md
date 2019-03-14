# Designer Notes

- Shows relational data to the user.
- The content of rows and columns can be plain or styled text, Icons, or even inputs. Achieve this by nesting components inside a Table component.
- Don’t add too many columns for the user’s available viewport width. Aiming for a screen width of 1366 pixels is a good target, but also consider how your table may look for tablet or mobile devices. Avoid the need for horizontal scrolling, either on the page as a whole, or within a Table component.
- To save space, you could show multiple lines of data within a cell (e.g. the constituents of an address).
- If there is likely to be a large number of rows, you can specify how many rows to show, and whether to add a pagination control to the bottom of the table. Consider the data load on your application and infrastructure to decide this. Some applications apply this configuration as an application-wide setting.
- The Selectable configuration places a checkbox at the start of each row, and the ability for a user to select one or more rows. This is useful to allow the user to perform single or batch actions.
- The Highlightable configuration allows the user to click an option, and for the option to be marked visually. This could be useful if the user can select an option which then loads in a Sidebar, for example.
