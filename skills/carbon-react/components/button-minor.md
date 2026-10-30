---
name: carbon-component-button-minor
description: Carbon ButtonMinor component props and usage examples.
---

# ButtonMinor

## Import
`import ButtonMinor from "carbon-react/lib/components/button-minor/button-minor.component";`

## Source
- Export: `./components/button-minor/button-minor.component`
- Props interface: `ButtonMinorProps`
- Deprecated: Yes
- Deprecation reason: `ButtonMinor` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The text the button displays |  |
| disabled | boolean \| undefined | No |  |  |  | Apply disabled state to the button | false |
| fullWidth | boolean \| undefined | No |  |  |  | Apply fullWidth style to the button | false |
| iconPosition | ButtonIconPosition \| undefined | No | before \| after |  |  | Defines an Icon position related to the children: "before" \| "after" | "before" |
| iconType | IconType \| undefined | No | target \| filter \| reset \| accessibility_web \| add \| admin \| airplay \| alert \| alert_on \| analysis \| app_facebook \| app_instagram \| app_tiktok \| app_twitter \| app_youtube \| apps \| arrow \| arrow_bottom_right_circle \| arrow_down \| arrow_left \| arrow_left_boxed \| arrow_left_right_small \| arrow_left_small \| arrow_right \| arrow_right_small \| arrow_top_left_circle \| arrow_top_right_circle \| arrow_up \| arrows_left_right \| at_sign \| attach \| bank \| bank_with_card \| basket \| basket_with_squares \| batch \| bed \| bill_paid \| bill_unpaid \| bin \| biometric \| blocked \| blocked_square \| block_arrow_right \| bold \| box_arrow_left \| box_arrow_right \| boxed_shapes \| bulk_destroy \| bullet_list \| bullet_list_dotted \| bullet_list_numbers \| business \| calendar \| calendar_pay_date \| calendar_today \| call \| camera \| car_lock \| car_money \| car_repair \| card_wallet \| card_view \| caret_down \| caret_left \| caret_right \| caret_up \| caret_up_down \| caret_large_down \| caret_large_left \| caret_large_right \| caret_large_up \| cart \| cash \| chat \| chart_bar \| chart_bar_arrow_up \| chart_line \| chart_pie \| chat_notes \| check_all \| check_none \| chevron_down \| chevron_first \| chevron_first_pagination \| chevron_last \| chevron_last_pagination \| chevron_left \| chevron_right \| chevron_up \| chevron_down_thick \| chevron_left_thick \| chevron_right_thick \| chevron_up_thick \| chromecast \| circle_with_dots \| circles_connection \| clear \| clock \| clock_add \| close \| code \| cloud_co2 \| coins \| collaborate \| color_picker \| computer_clock \| connect \| connect_circle \| connect_off \| construction \| contacts \| contact_card \| copy \| create \| credit_card \| credit_card_slash \| cross \| cross_circle \| csv \| dashboard \| delete \| delivery \| diagonal_arrows_up \| disputed \| disconnect \| document_right_align \| document_tick \| document_vertical_lines \| download \| double_tick \| drag \| drag_hover \| drag_vertical \| draft \| drill \| dropdown \| duplicate \| edit \| edited \| email \| email_switch \| entry \| envelope_dollar \| envelope_euro \| ellipsis_horizontal \| ellipsis_vertical \| error \| error_square \| euro \| expand \| export \| factory \| favourite \| favourite_lined \| fax \| feedback \| file_excel \| file_generic \| file_image \| file_pdf \| file_word \| files_leaning \| filter_new \| fit_height \| fit_width \| flag \| flash \| folder \| form_refresh \| framerate \| fullscreen \| get_quote \| gift \| go \| graduation_hat \| graph \| graphql \| grid \| heart \| hand_cash_coins \| hand_cash_note \| heart_pulse \| help \| hide \| hierarchy \| home \| image \| import \| in_progress \| in_transit \| individual \| info \| intranet \| ipad \| italic \| job_seeked \| key \| laptop \| leaf \| ledger \| ledger_arrow_left \| ledger_arrow_right \| like \| like_no \| link \| lightbulb_off \| lightbulb_on \| link_card \| link_cloud \| link_on \| list_view \| locked \| login \| location \| logout \| lookup \| marker \| marker_off \| message \| microphone \| minimise \| minus \| minus_large \| mobile \| money_bag \| mute \| none \| normalscreen \| old_warning \| page \| palm_tree \| palette \| pause \| pause_circle \| pdf \| pin \| people \| people_switch \| percentage_boxed \| person \| person_add \| person_info \| person_tick \| petrol_pump \| phone \| picture_in_picture \| piggy_bank \| placeholder \| plane \| play \| play_circle \| plus \| plus_circle \| plus_large \| pound \| print \| progress \| progressed \| protect \| question \| question_hollow \| question_mark \| recruiting \| refresh \| refresh_clock \| remove \| replay \| sage_coin \| save \| scan \| send \| search \| services \| settings \| settings_old \| share \| shield_with_tick \| shield_with_tick_outline \| shop \| sort_down \| sort_up \| source_code \| spanner \| speaker \| split \| split_container \| squares_nine \| stacked_boxes \| stacked_squares \| stop \| stop_circle \| submitted \| subtitles \| support_online \| system_Android \| system_iOS \| sync \| tag \| talk \| target_man \| theatre_masks \| three_boxes \| tick \| tick_circle \| tick_thick \| time_zone \| true_tick \| u_turn_left \| u_turn_right \| underline \| undo \| unlocked \| upload \| uploaded \| user_groups \| video \| view \| volume_high \| volume_low \| volume_medium \| volunteering \| warning \| website \| welfare \| worldwide_location |  |  | Defines an Icon type within the button |  |
| id | string \| undefined | No |  |  |  | id attribute |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | Name attribute |  |
| noWrap | boolean \| undefined | No |  |  |  | If provided, the text inside a button will not wrap |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onChange | ((ev: React.FormEvent<HTMLButtonElement \| HTMLAnchorElement> \| React.ChangeEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on change |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | onClick handler |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on focus |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| size | SizeOptions \| undefined | No | small \| medium \| large |  |  | Assigns a size to the button: "small" \| "medium" \| "large" | "medium" |
| type | string \| undefined | No |  |  |  | HTML button type property |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Identifies the element(s) offering additional information about the button the user might require. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the component Defaults to the iconType, when the component has only an icon |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element(s) labelling the button. |  |
| buttonType | ButtonTypes \| undefined | No | primary \| secondary \| tertiary \| darkBackground \| gradient-grey \| gradient-white | Yes | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" |  | "secondary" |
| destructive | boolean \| undefined | No |  | Yes | Apply destructive style to the button |  | false |
| href | string \| undefined | No |  | Yes | Used to transform button into anchor |  |  |
| iconTooltipMessage | string \| undefined | No |  | Yes | [Legacy] Provides a tooltip message when the icon is hovered. |  |  |
| iconTooltipPosition | TooltipPositions \| undefined | No | left \| right \| bottom \| top | Yes | [Legacy] Provides positioning when the tooltip is displayed. |  |  |
| isWhite | boolean \| undefined | No |  | Yes | Whether to use the white-on-dark colour variant |  |  |
| rel | string \| undefined | No |  | Yes | HTML rel attribute |  |  |
| subtext | string \| undefined | No |  | Yes | Second text child, renders under main text, only when size is "large" |  |  |
| target | string \| undefined | No |  | Yes | HTML target attribute |  |  |

## Examples
### Primary

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="medium">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="large">
        Large
      </ButtonMinor>
    </>
  );
}
```


### Primary/Destructive

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="medium"
        destructive
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
}
```


### Primary/Disabled

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="medium"
        disabled
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
}
```


### Primary/Icon

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
}
```


### Primary/Full Width

**Render**

```tsx
() => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="primary" fullWidth>
      Full Width
    </ButtonMinor>
  );
}
```


### Primary/No Wrap

**Render**

```tsx
() => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" noWrap>
      Long button text
    </ButtonMinor>
  );
}
```


### Secondary

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2}>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large">
        Large
      </ButtonMinor>
    </>
  );
}
```


### Secondary/Destructive

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="large">
        Large
      </ButtonMinor>
    </>
  );
}
```


### Secondary/Disabled

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small" disabled>
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large" disabled>
        Large
      </ButtonMinor>
    </>
  );
}
```


### Secondary/Icon

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
}
```


### Secondary/Full Width

**Render**

```tsx
() => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="secondary" fullWidth>
      Full Width
    </ButtonMinor>
  );
}
```


### Secondary/No Wrap

**Render**

```tsx
() => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="secondary" noWrap>
      Long button text
    </ButtonMinor>
  );
}
```


### Tertiary

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="large">
        Large
      </ButtonMinor>
    </>
  );
}
```


### Tertiary/Destructive

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
}
```


### Tertiary/Disabled

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
}
```


### Tertiary/Icon

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
}
```


### Tertiary/Full Width

**Render**

```tsx
() => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="tertiary" fullWidth>
      Full Width
    </ButtonMinor>
  );
}
```


### Tertiary/No Wrap

**Render**

```tsx
() => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" noWrap>
      Long button text
    </ButtonMinor>
  );
}
```


### Icon Only

**Render**

```tsx
() => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="bin"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        size="large"
        iconType="bin"
        aria-label="Delete"
      />
    </>
  );
}
```

