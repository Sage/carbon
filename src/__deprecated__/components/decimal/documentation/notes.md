# Designer Notes
- For currency values, show currency symbols outside the field rather than inserting one for the user dynamically.
- Carbon offers a Precision configuration, so you can choose how many decimal places to show.
- Decimals are usually right-aligned, so that the decimal places of numbers presented in rows line up for easy comparison by the user.
- Even if the user just enters a string of numbers, consider presenting them into a format with the separators which apply in the user’s country (e.g. £12,345.67 for the UK, and €12 345,67 for France).
- Where it’s clear a field only accepts numerals, you could disable entry of other characters - but remember to cater for a minus sign if necessary.

# Related Components
- Entering whole numbers without a decimal point? [Try Number Input](/components/number-input "Number Input").