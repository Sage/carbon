# ResponsiveVerticalMenu

A vertical menu that is responsive to the screen size. It can be used as a menu in one of two modes: a dual-column layout (default) or a single-column layout (responsive mode).

## Import

```javascript
import {
  ResponsiveVerticalMenu,
  ResponsiveVerticalMenuDivider,
  ResponsiveVerticalMenuItem,
  type ResponsiveVerticalMenuHandle,
} from "carbon-react/lib/components/vertical-menu";
```

## Usage

Two modes are available for the `ResponsiveVerticalMenu`: default and responsive. The default mode is used when the screen size is large enough to accommodate two columns; the
responsive mode is used when the screen size is small enough to require a single column (see the [Responsive](#responsive) example below).

You can then add `ResponsiveVerticalMenuItem` components as children of the `ResponsiveVerticalMenu` component. Each item must have at the very least an individual `id` and `label` prop.
The `icon` and `customIcon` props are optional; if you wish to render a [Carbon icon](../icon/index.md), use the `icon` property. Custom icons, such as `SVG` graphics,
should be passed to the `customIcon` prop (note that if both are provided, as in the below example, then the `customIcon` will be used over the `icon`).

```javascript
  <ResponsiveVerticalMenu>
    <ResponsiveVerticalMenuItem
      customIcon={<MyIcon />}
      icon="home"
      id="item-1"
      label="Item 1"
    />
    <ResponsiveVerticalMenuItem
      customIcon={<MyIcon />}
      icon="business"
      id="item-2"
      label="Item 2"
    />
  </ResponsiveVerticalMenu>
```

You can also add a `href` prop to the `ResponsiveVerticalMenuItem` component, which will render the item as a link. The `href` prop should be a valid URL.

```javascript
  <ResponsiveVerticalMenu>
    <ResponsiveVerticalMenuItem
      customIcon={<MyIcon />}
      icon="home"
      id="item-1"
      label="Item 1"
      href="https://www.example.com"
    />
  </ResponsiveVerticalMenu>
```

Finally, if you nest a `ResponsiveVerticalMenuItem` inside another `ResponsiveVerticalMenuItem`, the parent will be rendered as a button which, on click, will toggle the visibility of the child item(s).
In default mode, the child item(s) will be rendered in a second column, to the right of the first. In responsive mode, the child item(s) will be rendered in a "dropdown" below the parent item.

```javascript
  <ResponsiveVerticalMenu>
    <ResponsiveVerticalMenuItem
      customIcon={<MyIcon />}
      icon="home"
      id="item-1"
      label="Item 1"
    >
      <ResponsiveVerticalMenuItem
        customIcon={<MyIcon />}
        icon="business"
        id="item-2"
        label="Item 2"
        href="https://www.example.com"
      />
    </ResponsiveVerticalMenuItem>
  </ResponsiveVerticalMenu>
```

A tertiary menu can be rendered if the nesting extends to three levels. In this case, the first two levels will act as described above. The third level of items will be rendered in a "dropdown" below the
second level item if viewed in the default mode. In responsive mode, the third level of items will be rendered in a "dropdown" below the second level item, and the second level item will be rendered as a button
which, on click, will toggle the visibility of the third level item(s).

```javascript
  <ResponsiveVerticalMenu>
    <ResponsiveVerticalMenuItem
      customIcon={<MyIcon />}
      icon="home"
      id="item-1"
      label="Item 1"
    >
      <ResponsiveVerticalMenuItem
        customIcon={<MyIcon />}
        icon="business"
        id="item-2"
        label="Item 2"
      >
        <ResponsiveVerticalMenuItem
          customIcon={<MyIcon />}
          icon="three_boxes"
          id="item-3"
          label="Item 3"
          href="https://www.example.com"
        />
      </ResponsiveVerticalMenuItem>
    </ResponsiveVerticalMenuItem>
  </ResponsiveVerticalMenu>
```

It is strongly recommended that you do not extend beyond two levels of nesting, as this will make the menu difficult to navigate both from a usability perspective, and from an accessibility perspective.

If you need to split options out to improve readability, use the `ResponsiveVerticalMenuDivider` component. This component will render a divider between the items in the menu, and can be used to separate groups of items.

```javascript
  <ResponsiveVerticalMenu>
    <ResponsiveVerticalMenuItem
      icon="home"
      id="item-1"
      label="Item 1"
    />
    <ResponsiveVerticalMenuDivider />
    <ResponsiveVerticalMenuItem
      icon="business"
      id="item-2"
      label="Item 2"
    />
  </ResponsiveVerticalMenu>
```

## Examples

### Default

See: `examples/Default.md`

### Focusing Launch Button Programmatically

The `ResponsiveVerticalMenuHandle` type provides an imperative handle for programmatic control over `ResponsiveVerticalMenu`. 
Using a `ref`, you can access its `focusLaunchButton()` method to set focus on the launch button as needed.

See: `examples/ProgrammaticFocus.md`

### With Divider

See: `examples/WithDivider.md`

### Custom Height

You can specify a custom height for the `ResponsiveVerticalMenu` component. This can be done by passing a `height` prop to the component. The value of the `height` prop should be a valid CSS height value, such as `100%`, `50px`, or `auto`, and will be applied to both menus when in default mode.

See: `examples/CustomHeight.md`

### Custom Width

You can specify a custom width for the `ResponsiveVerticalMenu` component. This can be done by passing a `width` prop to the component. The value of the `width` prop should be a valid CSS width value, such as `100%`, `50px`, or `auto`, and will be applied to both menus when in default mode.

See: `examples/CustomWidth.md`

### Responsive

Use the `responsiveBreakpoint` prop to specify the screen size at which the menu will switch from the default mode to the responsive mode. The value of the `responsiveBreakpoint` prop should be a valid number.

See: `examples/Responsive.md`

### Custom Icon

You can use the `customIcon` prop to specify a custom icon for the `ResponsiveVerticalMenuItem` component. The value of the `customIcon` prop should be a valid React element, such as an SVG graphic or a custom icon component.

See: `examples/CustomIcon.md`

### Item With OnClick Handler

You can use the `onClick` prop to specify a function that will be called when the `ResponsiveVerticalMenuItem` component is clicked. The value of the `onClick` prop should be a valid function.

See: `examples/ItemWithOnClickHandler.md`

### Item With Custom Label

You can pass any valid `ReactNode` to the `label` prop of the `ResponsiveVerticalMenuItem` component. This allows you to use a custom label for the item, such as a custom component.

See: `examples/ItemWithCustomLabel.md`

## Props

### ResponsiveVerticalMenu

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The content of the menu |  |
| height | string \| undefined | No |  | The height of the primary and secondary menus |  |
| launcherButtonDataProps | TagProps \| undefined | No |  | Set Menu launcher button data tag props |  |
| responsiveBreakpoint | number \| undefined | No |  | The value (in pixels) at which the ResponsiveVerticalMenu will become responsive/modal |  |
| width | string \| undefined | No |  | The width of the primary and secondary menus when in default mode |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### ResponsiveVerticalMenuDivider

No props metadata found.

### ResponsiveVerticalMenuItem

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| label | React.ReactNode | Yes |  | The label for the menu item. |  |
| ariaCurrent | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  | Marks the element as the current item within a navigation context. |  |
| children | React.ReactNode | No |  | The content of the menu item. This will render the menu item as a parent menu. |  |
| customIcon | React.ReactNode | No |  | Custom icon to be displayed. Takes precedence over `icon` if both are specified. |  |
| href | string \| undefined | No |  | External URL or anchor link for standard HTML navigation. Providing this will render the menu item as an anchor link. |  |
| icon | IconType \| undefined | No |  | The Carbon icon to be displayed. Defers to `customIcon` if both are defined. |  |
| id | string \| undefined | No |  | The unique identifier for the menu item. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| onClick | ((event: ResponsiveVerticalMenuItemClickEvent) => void) \| undefined | No |  | A custom click handler to run when an anchor link is clicked |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| rel | string \| undefined | No |  | The rel attribute to be used for the underlying <a> tag |  |
| target | string \| undefined | No |  | The target to use for the menu item. |  |

## Ref methods

`ResponsiveVerticalMenu`'s forwarded ref exposes the following imperative methods:

| Method Name              | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `focusLaunchButton()` | Programmatically focuses the launch button.    |
