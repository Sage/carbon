# Carbon Component Catalog

### Actions

| Component | Description | Deprecated |
| --- | --- | --- |
| [ActionPopover](components/action-popover/) | ActionPopovers present a handy list of actions the user can perform on a whole table, a specific row within a table, or a tile. Click the ellipsis icon to show actions the user can take on a specific table row, for example, emailing the invoice. | No |
| [Batch Selection](components/batch-selection/) | Batch Selection Component could be used to select multiple items, and apply a common action to all the items selected. It renders a toolbar with a selected-item count and a row of action buttons (IconButtons, Buttons or Links). | No |
| [Button](components/button/) | A Button triggers a single action or event. Use it to submit a form (Save), to advance to the next step in a process (Next), or to create a new item (New). **This documentation is for the newer implementation of Button. If you are still using the older implementation, please use the Button documentation.** | No |
| [Button](components/button-legacy/) | A Button triggers a single action or event. Use it to submit a form (Save), to advance to the next step in a process (Next), or to create a new item (New). | Yes |
| [Button Bar](components/button-bar/) | A deprecated component that groups `Button` and `ButtonMinor` elements side-by-side in a row with shared border styling. Use individual `Button` components or a `Box` with flex layout in new implementations. | Yes |
| [Button Minor](components/button-minor/) | A deprecated smaller-scale variant of the `Button` component sharing the same `primary`, `secondary`, and `tertiary` types. Use `Button` with the appropriate `size` prop in new implementations. | Yes |
| [Draggable](components/draggable/) | Pick, move and replace an order. Draggable is a great component if you need to have interactive components with possibility to change their order with drag and drop mechanics | No |
| [Icon Button](components/icon-button/) | A deprecated icon-only clickable button. Wrap a Carbon `Icon` as children to render an accessible button without visible text. Use `Button` with an icon-only composition in new implementations. | Yes |
| [Multi Action Button](components/multi-action-button/) | A button with a dropdown list of secondary actions. Clicking the main label triggers the primary action. Clicking the chevron opens a menu of additional child buttons. | No |
| [Split Button](components/split-button/) | A button that combines a primary action (left side) with a dropdown of secondary actions (right side, opened via a chevron). Use when a primary action has closely related secondary options. | No |

### Feedback

| Component | Description | Deprecated |
| --- | --- | --- |
| [Badge](components/badge/) | A badge is a small numerical indicator positioned next to interactive elements. It shows when something needs action or review, typically used for notifications within navigation, and to show that filters have been applied. | No |
| [Loader](components/loader/) | Use the `Loader` component to clearly indicate that a task or data is still loading, helping users understand they should wait rather than refresh the page or abandon the process. The `Loader` component offers three loading types: `standalone` (with `typical` and `ai` variants), `ring` (with `inline`, `stacked`, `ai-stacked` and `ai-inline` variants) and `star` for clear visual feedback. | No |
| [Loader](components/loader-legacy/) | A deprecated animated loading spinner. Use the newer `Loader` from `carbon-react/lib/components/loader/__next__` in new implementations. | Yes |
| [Loader Spinner](components/loader-spinner/) | Use the loader spinner to help users understand why they are waiting. Can be used to demonstrate a known or unknown wait time. | Yes |
| [Loader Star](components/loader-star/) | A deprecated animated star-shaped loading indicator. Use `Loader` in new implementations. | Yes |
| [LoaderBar](components/loader-bar/) | Use the LoaderBar component to let users know a task or loading data is still in progress. Showing a LoaderBar helps the user to understand that they should wait, rather than reload the page or abandon a process. In general, place a LoaderBar in the centre and middle of the page or container it relates to. | Yes |
| [Message](components/message/) | Presents a static message which stays on screen. | No |
| [Pill](components/pill/) | Compact visual indicators that help things in common stand out. | No |
| [Preview](components/preview/) | Applies a preview loading state animation. | No |
| [Profile](components/profile/) | A profile represents a person, user, or organization. It displays a portrait and some details. | No |
| [ProgressTracker](components/progress-tracker/) | Use the `ProgressTracker` component to let users know a task or loading data is still in progress. Showing a `ProgressTracker` helps the user to understand that they should wait, rather than reload the page or abandon a process. In general, place a `ProgressTracker` in the centre and middle of the page or container it relates to. | No |
| [Toast](components/toast/) | A deprecated notification component that renders a temporary message overlay anchored to the viewport. Supports multiple variants (`success`, `info`, `neutral`, `error`, `warning`, `notice`, `notification`), configurable horizontal and vertical alignment, auto-dismiss with a timeout, stacking via `targetPortalId`, and an optional dismiss button. | Yes |

### Inputs

| Component | Description | Deprecated |
| --- | --- | --- |
| [Advanced Color Picker](components/advanced-color-picker/) | Selects a single colour from a defined set. Renders a dialog-style picker showing a grid of swatches; clicking a swatch selects that colour and closes the picker. | No |
| [Button Toggle](components/button-toggle/) | Press one of the buttons to make selection. This component should be used when user has to make a choice between a small number of options. Use `ButtonToggleGroup` to manage selection state across a set of `ButtonToggle` items. | No |
| [Checkbox](components/checkbox/) | Checkbox provides a way to check an individual option, or check multiple options from a list. | No |
| [CheckboxGroup](components/checkbox-group/) | CheckboxGroup provides a way to check one or more items from a list of options. | No |
| [Date](components/date/) | A date picker captures a single date selected or entered by a user. | No |
| [Date Range](components/date-range/) | Captures a start and end date. Used to filter a Table of data according to a start and end date, or to set two dates which are related to each other, for example, a hotel booking. | No |
| [Decimal](components/decimal/) | Captures a number with a decimal point, or a currency value. | No |
| [Duelling Picklist](components/duelling-picklist/) | A deprecated two-panel selection component. Items are moved between a "source" and a "destination" list using add/remove controls. Supports search, grouped items and drag-and-drop-free keyboard navigation. | Yes |
| [Fieldset](components/fieldset/) | This component can be used within a Form component to group related fields together.  It will render a `` element with a `` element to provide a title for the group of fields. | No |
| [File Input](components/file-input/) | A file input uploads a single file or multiple files selected by a user as part of a form. | No |
| [Filterable Select](components/filterable-select/) | Select one of available options from the drop-down menu using filter. Filterable Select is a Carbon styled implementation of WAI-ARIA Combobox with Inline Autocomplete. | No |
| [Form](components/form/) | Represents a document section containing interactive controls for submitting information. | No |
| [GroupedCharacter](components/grouped-character/) | A deprecated masked text input that formats user input into segmented character groups (e.g. `12-34-56`). Configure segment lengths with the `groups` array prop and the delimiter with `separator`. Use `Textbox` in new implementations. | Yes |
| [Inline Inputs](components/inline-inputs/) | A deprecated layout component that renders multiple inputs side-by-side on the same row, sharing a single label. Use `Fieldset` with `orientation="horizontal"` in new implementations. | Yes |
| [MultiSelect](components/multi-select/) | Component that allows to choose multiple options from the drop-down list. | No |
| [Number](components/number/) | A deprecated numeric text input that restricts entry to integer values. Use `Textbox` with custom validation in new implementations. | Yes |
| [Numeral Date](components/numeral-date/) | For dates far from today, use this Numeral Date component. It is advised to use Three inputs consisting of day, month, and year. For dates close to today, we advise the use of a standard datepicker. If you require this, please see the "Date Input" component. | No |
| [Password](components/password/) | Provide a way for the user to securely enter a password. | No |
| [Radio Button](components/radio-button/) | Provides a set of mutually exclusive options. Use `RadioButtonGroup` to wrap individual `RadioButton` components; only one button in the group can be selected at a time. | No |
| [Search](components/search/) | This search component should be used if you require the user to conduct a search. | No |
| [Simple Color Picker](components/simple-color-picker/) | A color picker lets a user select a single color from a defined set. It indicates the currently selected color. | No |
| [Simple Select](components/simple-select/) | Select one of available options from the drop-down menu. Simple Select is a Carbon styled equivalent of HTML Select Element. | No |
| [Switch](components/switch/) | A Switch lets a user toggle a single setting on or off. It gives an immediate response — the state change takes effect as soon as the user interacts with it. | No |
| [Text Editor](components/text-editor/) | Provides an interactive Text Editor that allows users to format text with various styles and save the content as JSON or HTML. For further documentation on this component, please read our documentation regarding Lexical | No |
| [Textarea](components/textarea/) | - Useful for collecting a significant amount of text (e.g. notes about clients, or a short email message). - If content in a textarea is read-only, remove the field border so it appears as static text. - Use placeholder text to give the user context or examples of what to write. | No |
| [Textbox](components/textbox/) | A text input captures text entered or edited by a user. | No |
| [TileSelect](components/tile-select/) | Tile Select is an input visualized as a single or grouped set of tiles. It behaves like a `radio` or a `checkbox` depending on the mode it operates in. | No |
| [Time](components/time/) | A pair of numeric inputs for entering hours and minutes. Optionally includes an AM/PM toggle for 12-hour clock formats. | No |

### Modal

| Component | Description | Deprecated |
| --- | --- | --- |
| [Adaptive Sidebar](components/adaptive-sidebar/) | The `AdaptiveSidebar` component is a non-floating, non-modal sidebar that can be used to display content on the side of the screen. It can be opened and closed by the user, and can be used to display additional information or actions. | No |
| [Alert](components/alert/) | A deprecated small modal dialog that displays a message with a title, subtitle and a close button. Use `Confirm` or `Dialog` for new implementations. | Yes |
| [Confirm](components/confirm/) | A deprecated modal dialog that asks the user to confirm or cancel an action. Renders a title, optional subtitle, body content, and configurable Confirm/Cancel buttons. Use `Dialog` for new implementations. | Yes |
| [Dialog](components/dialog/) | A dialog displays content in context without navigating the user to a different page. It remains on screen and blocks the user workflow until the user performs an action, cancels an action, or acknowledges something. | No |
| [Portal](components/portal/) | The Portal component allows you to render children into a different part of the DOM, whilst also allowing the use of styling using the Design System's `design-tokens` package. | No |
| [Sidebar](components/sidebar/) | A modal side panel that slides in from the right (or left) of the screen. Unlike `Drawer`, `Sidebar` traps focus and dims the background until it is dismissed. Use it for secondary tasks that need a large display area without leaving the current page. | No |

### Navigation

| Component | Description | Deprecated |
| --- | --- | --- |
| [Anchor Navigation](components/anchor-navigation/) | An anchor navigation provides context and instant animated scrolling on a long page. It lets a user move quickly up and down the page. It's sticky, so it's visible even when a user scrolls and indicates the current section of the page that's displayed. | No |
| [Breadcrumbs](components/breadcrumbs/) | Breadcrumbs are a secondary navigation aid that helps users easily understand their location and navigate to previous pages. | No |
| [Global Header](components/global-header/) | `GlobalHeader` is a wrapper component designed for creating site-wide navigation layouts. | No |
| [Link](components/link/) | Navigates the user to another location. | No |
| [LinkPreview](components/link-preview/) | Displays a rich preview card for a URL, showing a title, description, and optional thumbnail image. Renders as a focusable anchor when a URL is provided, or as a non-interactive `div` in loading or edit mode. Supports a close icon for removal in edit contexts. | No |
| [Menu](components/menu/) | Provides navigation for an app, which can be used via mouse or keyboard. | No |
| [Navigation Bar](components/navigation-bar/) | This component is used as a wrapper for the Menu component when used as a navigation layout. | No |
| [Pages](components/pages/) | A deprecated multi-page wizard container that renders child `Page` components with animated slide transitions between them. Use `Dialog` with step-based navigation in new implementations. | Yes |
| [ResponsiveVerticalMenu](components/responsive-vertical-menu/) | A vertical menu that is responsive to the screen size. It can be used as a menu in one of two modes: a dual-column layout (default) or a single-column layout (responsive mode). | No |
| [Tabs](components/tabs/) | Tabs organise content, and let a user easily navigate and switch between content. Use tabs to structure content that does not need to be visible all at the same time. Responsive sizes should limit the number of tabs used to no more than 5. **This documentation is for the newer implementation of Tabs. If you are still using the older implementation, please use the Tabs documentation.** | No |
| [Tabs](components/tabs-legacy/) | Switch between content panes or filtered views of tables. | Yes |
| [VerticalMenu](components/vertical-menu/) | Provides a vertical navigation for an app, which can be used via mouse or keyboard. | No |

### UI presentation

| Component | Description | Deprecated |
| --- | --- | --- |
| [Accordion](components/accordion/) | An accordion is used to group, hide, and reveal content using progressive disclosure. When closed, an accordion shows top-level information only. A user can open the accordion and quickly access more information. | No |
| [Box](components/box/) | Basic component that gives access to a number of styling options. Should be used to achieve more precise layouts when required. Gives access to Spacing, Color, Layout and FlexBox attributes. Acts as a styled `div` (or any element via `as`) that accepts CSS-in-JS styled-system props. | No |
| [Card](components/card/) | A container for interactive content and controls related to a single subject. | No |
| [Content](components/content/) | A deprecated layout component that renders a labelled block of content with a title and body. It supports primary and secondary visual variants as well as an inline mode where the title and body sit side-by-side. | Yes |
| [Definition List](components/definition-list/) | Renders a semantic HTML `` definition list using `Dl`, `Dt` (term) and `Dd` (description) sub-components. Use it to display key–value pairs such as record details, contact information or form summaries. | No |
| [Detail](components/detail/) | A deprecated text display component that renders a labelled detail value, optionally with a footnote and an icon. Use `Typography` or `DefinitionList` in new implementations. | Yes |
| [DismissibleBox](components/dismissible-box/) | A deprecated container with a close button that hides its content when dismissed. Use `Message` or a custom dismissible pattern in new implementations. | Yes |
| [Divider](components/divider/) | Provides a vertical or horizontal dividing line to make the adjacent components feel distinctly separate from one another. | No |
| [Drawer](components/drawer/) | A collapsible side panel that sits alongside the main page content. The `sidebar` prop holds the panel content; the main children are always visible. Unlike `Dialog` or `Sidebar`, the drawer is non-modal and does not trap focus. | No |
| [Flat Table](components/flat-table/) | A table structures content in a grid and controls the display of data using filters. | No |
| [Flat Table expandable options](components/flat-table-expandable/) | Extends `FlatTable` with collapsible parent rows. Each expandable `FlatTableRow` can contain any number of sub-rows that are revealed or hidden when the user clicks the row or its expand icon. Rows can be uncontrolled (open/close handled internally) or controlled via the `expanded` and `onClick` props. | No |
| [FlatTable color theming](components/flat-table-themes/) | The `colorTheme` prop on `FlatTable` controls the background colour of the header row and the overall table appearance. Four built-in themes are available: `"dark"`, `"light"`, `"transparent-base"`, and `"transparent-white"`. Additional props such as `isZebra`, `hasStickyHead`, and custom borders can be combined with any theme. | No |
| [Grid](components/grid/) | A deprecated 12-column CSS Grid layout system composed of `GridContainer` and `GridItem` components. Supports responsive breakpoints, item reordering and alignment. Use `Box` with `display="grid"` in new implementations. | Yes |
| [Heading](components/heading/) | A deprecated page or section heading component that combines a title, optional subheader, pills, help icon, back link and a horizontal divider. Use `Typography` in new implementations. | Yes |
| [Help](components/help/) | Typically triggered by the user hovering on an icon, displaying a single, short sentence. Useful for explaining the difference between commands represented with icons, for example, batch table actions. Bear in mind that tooltips may not work well (or at all) on mobile devices, so alternatives may be needed. | No |
| [Hr](components/hr/) | Provides a horizontal dividing line to make the above and below components feel distinctly separate from one another. | Yes |
| [Icon](components/icon/) | Carbon comes with more than 100 standard icons to choose from. See list of icons for full reference. Many other components allow you to specify one of the standard Carbon icons to associate with them, for example, the Link component. | No |
| [Image](components/image/) | Basic component that allows either the rendering of an `img` element or a `div` with a `background-image`. This component also gives access to a number of styling options such as `margin`, and `layout`. | No |
| [Note](components/note/) | The `Note` was created using the `lexical` framework which allows rich text content to be rendered. For further documentation on this component, please read our documentation regarding Lexical | No |
| [Pager](components/pager/) | A pagination control bar that lets users navigate through a dataset split across multiple pages. Shows first/prev/next/last buttons, a current-page input, total records and a page-size selector. | No |
| [Pod](components/pod/) | A deprecated card-like container that groups related content under an optional title, subtitle, and footer. Supports edit and delete actions, soft-delete state, configurable padding, borders, and primary/secondary/tertiary visual variants. | Yes |
| [Popover Container](components/popover-container/) | A floating panel that appears when a trigger element is clicked. Use it for contextual controls — filters, quick actions or small forms — that should appear inline without navigating away from the page. | No |
| [Portrait](components/portrait/) | A portrait visually represents a person, user, or organization. Use initials rather than an avatar if you prefer. | No |
| [Settings Row](components/settings-row/) | A deprecated layout component for settings pages that renders a two-column row: a label/description column on the left and form inputs on the right, separated by a bottom divider. | Yes |
| [Step Flow](components/step-flow/) | Provide a way to represent an end-to-end journey that a user can complete in one go. This component has a specific start and end point, as well as showing the current step in the journey. Use a step flow to help a user complete tasks in a specific order, based on their needs. | No |
| [StepSequence](components/step-sequence/) | Indicate the progress of a step flow. Progress indicators always directly mirror the number of pages, not general categories. Try to keep label text for each step as short as possible. For users on small screens or instances where horizontal space is limited, use the vertical version of this component. | No |
| [Tile](components/tile/) | Tiles are containers for static content such as text, and don't contain controls. | No |
| [Tooltip](components/tooltip/) | A deprecated contextual overlay that displays a short text message when its child element is focused or hovered. Supports four positions, automatic flip behaviour, error styling, and full colour overrides. | Yes |
| [Typography](components/typography/) | Manages text styles and content hierarchies. | No |
| [VerticalDivider](components/vertical-divider/) | Provides a vertical dividing line to make the adjacent components feel distinctly separate from one another. | Yes |

### Other

| Component | Description | Deprecated |
| --- | --- | --- |
| [Carbon Provider](components/carbon-provider/) | A React context provider that supplies global settings such as theme styling and Carbon feature flags to your components. | No |
| [Tokens Wrapper](components/tokens-wrapper/) | The `TokensWrapper` component provides a way to apply design tokens to your application. Doing so will ensure the tokens required by Carbon's components are available and in scope as CSS custom properties. | No |
