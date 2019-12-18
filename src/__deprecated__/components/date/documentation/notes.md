# Designer Notes
- If the date is likely to be close to today (e.g. an invoice due date), then a datepicker may be useful. If the date is likely to be far in the past (e.g. a date of birth), then it may be better to use separate inputs for day, month, and year.
- Field focus automatically opens the datepicker, but a user can key in dates too, which many users find more convenient, especially in financial applications.
- Carbon handles a range of formats, like dd/mm/yyyy, dd/mm/yy, dd/mm, or dd. Configuration can be regional, and copes with space, slash, full stop, or colon as separators.

# Related Components
- Entering or picking a start and end date together? [Try Date Range](/components/date-range "Date Range").