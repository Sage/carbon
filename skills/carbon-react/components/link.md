---
name: carbon-component-link
description: Carbon Link component props and usage examples.
---

# Link

Navigates the user to another location.

## Choose instead

- **ButtonNext:** The element performs an on-page action rather than navigation.

## Pitfalls

- Provide href for navigation even when onClick handles client-side routing, so Link renders an anchor rather than a button styled as a link.
- If underline is set to never, ensure the surrounding context still makes the link identifiable.

## Import
`import Link from "carbon-react/lib/components/link";`

## Source
- Export: `./components/link`
- Props interface: `LinkProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ariaLabel | string \| undefined | No |  |  |  | Aria label for accessibility purposes |  |
| bold | boolean \| undefined | No |  |  |  | Sets the link style to bold | false |
| children | React.ReactNode | No |  |  |  | Child content to render in the link. |  |
| download | any | No |  |  |  |  |  |
| hasFocus | boolean \| undefined | No |  |  |  |  |  |
| href | string \| undefined | No |  |  |  | An href for an anchor tag. |  |
| icon | IconType \| undefined | No | target \| filter \| reset \| accessibility_web \| add \| admin \| airplay \| alert \| alert_on \| analysis \| app_facebook \| app_instagram \| app_tiktok \| app_twitter \| app_youtube \| apps \| arrow \| arrow_bottom_right_circle \| arrow_down \| arrow_left \| arrow_left_boxed \| arrow_left_right_small \| arrow_left_small \| arrow_right \| arrow_right_small \| arrow_top_left_circle \| arrow_top_right_circle \| arrow_up \| arrows_left_right \| at_sign \| attach \| bank \| bank_with_card \| basket \| basket_with_squares \| batch \| bed \| bill_paid \| bill_unpaid \| bin \| biometric \| blocked \| blocked_square \| block_arrow_right \| bold \| box_arrow_left \| box_arrow_right \| boxed_shapes \| bulk_destroy \| bullet_list \| bullet_list_dotted \| bullet_list_numbers \| business \| calendar \| calendar_pay_date \| calendar_today \| call \| camera \| car_lock \| car_money \| car_repair \| card_wallet \| card_view \| caret_down \| caret_left \| caret_right \| caret_up \| caret_up_down \| caret_large_down \| caret_large_left \| caret_large_right \| caret_large_up \| cart \| cash \| chat \| chart_bar \| chart_bar_arrow_up \| chart_line \| chart_pie \| chat_notes \| check_all \| check_none \| chevron_down \| chevron_first \| chevron_first_pagination \| chevron_last \| chevron_last_pagination \| chevron_left \| chevron_right \| chevron_up \| chevron_down_thick \| chevron_left_thick \| chevron_right_thick \| chevron_up_thick \| chromecast \| circle_with_dots \| circles_connection \| clear \| clock \| clock_add \| close \| code \| cloud_co2 \| coins \| collaborate \| color_picker \| computer_clock \| connect \| connect_circle \| connect_off \| construction \| contacts \| contact_card \| copy \| create \| credit_card \| credit_card_slash \| cross \| cross_circle \| csv \| dashboard \| delete \| delivery \| diagonal_arrows_up \| disputed \| disconnect \| document_right_align \| document_tick \| document_vertical_lines \| download \| double_tick \| drag \| drag_hover \| drag_vertical \| draft \| drill \| dropdown \| duplicate \| edit \| edited \| email \| email_switch \| entry \| envelope_dollar \| envelope_euro \| ellipsis_horizontal \| ellipsis_vertical \| error \| error_square \| euro \| expand \| export \| factory \| favourite \| favourite_lined \| fax \| feedback \| file_excel \| file_generic \| file_image \| file_pdf \| file_word \| files_leaning \| filter_new \| fit_height \| fit_width \| flag \| flash \| folder \| form_refresh \| framerate \| fullscreen \| get_quote \| gift \| go \| graduation_hat \| graph \| graphql \| grid \| heart \| hand_cash_coins \| hand_cash_note \| heart_pulse \| help \| hide \| hierarchy \| home \| image \| import \| in_progress \| in_transit \| individual \| info \| intranet \| ipad \| italic \| job_seeked \| key \| laptop \| leaf \| ledger \| ledger_arrow_left \| ledger_arrow_right \| like \| like_no \| link \| lightbulb_off \| lightbulb_on \| link_card \| link_cloud \| link_on \| list_view \| locked \| login \| location \| logout \| lookup \| marker \| marker_off \| message \| microphone \| minimise \| minus \| minus_large \| mobile \| money_bag \| mute \| none \| normalscreen \| old_warning \| page \| palm_tree \| palette \| pause \| pause_circle \| pdf \| pin \| people \| people_switch \| percentage_boxed \| person \| person_add \| person_info \| person_tick \| petrol_pump \| phone \| picture_in_picture \| piggy_bank \| placeholder \| plane \| play \| play_circle \| plus \| plus_circle \| plus_large \| pound \| print \| progress \| progressed \| protect \| question \| question_hollow \| question_mark \| recruiting \| refresh \| refresh_clock \| remove \| replay \| sage_coin \| save \| scan \| send \| search \| services \| settings \| settings_old \| share \| shield_with_tick \| shield_with_tick_outline \| shop \| sort_down \| sort_up \| source_code \| spanner \| speaker \| split \| split_container \| squares_nine \| stacked_boxes \| stacked_squares \| stop \| stop_circle \| submitted \| subtitles \| support_online \| system_Android \| system_iOS \| sync \| tag \| talk \| target_man \| theatre_masks \| three_boxes \| tick \| tick_circle \| tick_thick \| time_zone \| true_tick \| u_turn_left \| u_turn_right \| underline \| undo \| unlocked \| upload \| uploaded \| user_groups \| video \| view \| volume_high \| volume_low \| volume_medium \| volunteering \| warning \| website \| welfare \| worldwide_location |  |  | An icon to display next to the link. |  |
| iconAlign | "left" \| "right" \| undefined | No | left \| right |  |  | Which side of the link to the render the link. | "left" |
| inverse | boolean \| undefined | No |  |  |  | Whether to apply inverse styling. |  |
| isSkipLink | boolean \| undefined | No |  |  |  | Allows to create skip link |  |
| linkSize | "medium" \| "large" \| undefined | No | medium \| large |  |  | Sets the correct link size | "medium" |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when the mouse is clicked. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a key is pressed. |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a mouse down event triggers. |  |
| rel | string \| undefined | No |  |  |  | allows to set rel property in <a> tag |  |
| target | string \| undefined | No |  |  |  | Target property in which link should open ie: _blank, _self, _parent, _top |  |
| underline | "always" \| "hover" \| "never" \| undefined | No | always \| hover \| never |  |  | Specifies when the link underline should be displayed. | "always" |
| variant | Variants \| undefined | No | default \| subtle \| typical \| neutral \| negative |  |  | Allows link styling to be updated for light or dark backgrounds | "typical" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-activedescendant | string \| undefined | No |  |  |  | Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. |  |
| aria-atomic | Booleanish \| undefined | No |  |  |  | Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. |  |
| aria-autocomplete | "none" \| "inline" \| "list" \| "both" \| undefined | No | none \| inline \| list \| both |  |  | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made. |  |
| aria-braillelabel | string \| undefined | No |  |  |  | Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. Defines a string value that labels the current element, which is intended to be converted into Braille. |  |
| aria-brailleroledescription | string \| undefined | No |  |  |  | Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille. |  |
| aria-busy | Booleanish \| undefined | No |  |  |  |  |  |
| aria-checked | boolean \| "true" \| "false" \| "mixed" \| undefined | No |  |  |  | Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. |  |
| aria-colcount | number \| undefined | No |  |  |  | Defines the total number of columns in a table, grid, or treegrid. |  |
| aria-colindex | number \| undefined | No |  |  |  | Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. |  |
| aria-colindextext | string \| undefined | No |  |  |  | Defines a human readable text alternative of aria-colindex. |  |
| aria-colspan | number \| undefined | No |  |  |  | Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. |  |
| aria-controls | string \| undefined | No |  |  |  | Identifies the element (or elements) whose contents or presence are controlled by the current element. |  |
| aria-current | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  |  |  | Indicates the element that represents the current item within a container or set of related elements. |  |
| aria-describedby | string \| undefined | No |  |  |  | Identifies the element (or elements) that describes the object. |  |
| aria-description | string \| undefined | No |  |  |  | Defines a string value that describes or annotates the current element. |  |
| aria-details | string \| undefined | No |  |  |  | Identifies the element that provides a detailed, extended description for the object. |  |
| aria-disabled | Booleanish \| undefined | No |  |  |  | Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. |  |
| aria-errormessage | string \| undefined | No |  |  |  | Identifies the element that provides an error message for the object. |  |
| aria-expanded | Booleanish \| undefined | No |  |  |  | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. |  |
| aria-flowto | string \| undefined | No |  |  |  | Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order. |  |
| aria-haspopup | boolean \| "grid" \| "dialog" \| "menu" \| "true" \| "false" \| "listbox" \| "tree" \| undefined | No |  |  |  | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |  |
| aria-hidden | Booleanish \| undefined | No |  |  |  | Indicates whether the element is exposed to an accessibility API. |  |
| aria-invalid | boolean \| "true" \| "false" \| "grammar" \| "spelling" \| undefined | No |  |  |  | Indicates the entered value does not conform to the format expected by the application. |  |
| aria-keyshortcuts | string \| undefined | No |  |  |  | Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. |  |
| aria-label | string \| undefined | No |  |  |  | Defines a string value that labels the current element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element (or elements) that labels the current element. |  |
| aria-level | number \| undefined | No |  |  |  | Defines the hierarchical level of an element within a structure. |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No | off \| assertive \| polite |  |  | Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. |  |
| aria-modal | Booleanish \| undefined | No |  |  |  | Indicates whether an element is modal when displayed. |  |
| aria-multiline | Booleanish \| undefined | No |  |  |  | Indicates whether a text box accepts multiple lines of input or only a single line. |  |
| aria-multiselectable | Booleanish \| undefined | No |  |  |  | Indicates that the user may select more than one item from the current selectable descendants. |  |
| aria-orientation | "horizontal" \| "vertical" \| undefined | No | horizontal \| vertical |  |  | Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. |  |
| aria-owns | string \| undefined | No |  |  |  | Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. |  |
| aria-placeholder | string \| undefined | No |  |  |  | Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. |  |
| aria-posinset | number \| undefined | No |  |  |  | Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-pressed | boolean \| "true" \| "false" \| "mixed" \| undefined | No |  |  |  | Indicates the current "pressed" state of toggle buttons. |  |
| aria-readonly | Booleanish \| undefined | No |  |  |  | Indicates that the element is not editable, but is otherwise operable. |  |
| aria-relevant | "text" \| "additions" \| "additions removals" \| "additions text" \| "all" \| "removals" \| "removals additions" \| "removals text" \| "text additions" \| "text removals" \| undefined | No | text \| additions \| additions removals \| additions text \| all \| removals \| removals additions \| removals text \| text additions \| text removals |  |  | Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. |  |
| aria-required | Booleanish \| undefined | No |  |  |  | Indicates that user input is required on the element before a form may be submitted. |  |
| aria-roledescription | string \| undefined | No |  |  |  | Defines a human-readable, author-localized description for the role of an element. |  |
| aria-rowcount | number \| undefined | No |  |  |  | Defines the total number of rows in a table, grid, or treegrid. |  |
| aria-rowindex | number \| undefined | No |  |  |  | Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. |  |
| aria-rowindextext | string \| undefined | No |  |  |  | Defines a human readable text alternative of aria-rowindex. |  |
| aria-rowspan | number \| undefined | No |  |  |  | Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. |  |
| aria-selected | Booleanish \| undefined | No |  |  |  | Indicates the current "selected" state of various widgets. |  |
| aria-setsize | number \| undefined | No |  |  |  | Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-sort | "none" \| "ascending" \| "descending" \| "other" \| undefined | No | none \| ascending \| descending \| other |  |  | Indicates if items in a table or grid are sorted in ascending or descending order. |  |
| aria-valuemax | number \| undefined | No |  |  |  | Defines the maximum allowed value for a range widget. |  |
| aria-valuemin | number \| undefined | No |  |  |  | Defines the minimum allowed value for a range widget. |  |
| aria-valuenow | number \| undefined | No |  |  |  | Defines the current value for a range widget. |  |
| aria-valuetext | string \| undefined | No |  |  |  | Defines the human readable text alternative of aria-valuenow for a range widget. |  |
| disabled | boolean \| undefined | No |  | Yes | The disabled state of the link. This prop is deprecated and will soon be removed. |  | false |
| isDarkBackground | boolean \| undefined | No |  | Yes | The 'isDarkBackground' prop in Link is deprecated and will soon be removed. Please use 'inverse' prop instead. |  |  |
| tooltipMessage | string \| undefined | No |  | Yes | The tooltipMessage prop in Link is deprecated and will soon be removed. | [Legacy] A message to display as a tooltip to the link. |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No | left \| right \| bottom \| top | Yes | The tooltipPosition prop in Link is deprecated and will soon be removed. | [Legacy] Positions the tooltip with the link. |  |
| aria-dropeffect | "copy" \| "link" \| "none" \| "execute" \| "move" \| "popup" \| undefined | No | copy \| link \| none \| execute \| move \| popup | Yes | in ARIA 1.1 | Indicates what functions can be performed when a dragged object is released on the drop target. |  |
| aria-grabbed | Booleanish \| undefined | No |  | Yes | in ARIA 1.1 | Indicates an element's "grabbed" state in a drag-and-drop operation. |  |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [As Skip Link](../examples/link/as-skip-link.md) — Allow keyboard users to bypass repeated navigation and move to the main content.