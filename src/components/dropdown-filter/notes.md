#Designer Notes
- The user can select an item using the mouse or keyboard, and also enter a search term to filter the list items presented - this is particularly helpful for very long lists (e.g. a list of customers or suppliers).
Useful to show more than about 5 options.
- The Create configuration allows the user to add a term they enter to the list.
- The Suggest configuration removes the menu handle, and only shows options to the user once they enter 3 characters of a search term. For example, if users need to select from a very long list of business classification terms (e.g. SIC codes), showing a menu on field focus may mean users tend to choose from the top of the list, rather than filter and select the best option. This configuration makes the component behave more like a search field.
- Use placeholder content like ‘Please select…’ to make it clear to the user that the Dropdown is unset.
Consider a ‘smart default’ selection, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.

# Related Components
- Dropdown filter with Ajax? [Try Dropdown Filter Ajax](/components/dropdown-filter-ajax "Try Dropdown Filter Ajax").
- Don’t need to filter or add new items? [Try Dropdown](/components/dropdown "Try Dropdown").
- Choosing one option from a shorter list? [Try Radio Button](/components/radio-button "Try Radio Button").
- Choosing more than one option? [Try Checkbox](/components/checkbox "Try Checkbox").
- Choosing one option from a highly visible range? [Try Button Toggle](/components/button-toggle "Try Button Toggle").
