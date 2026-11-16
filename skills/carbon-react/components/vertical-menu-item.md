---
name: carbon-component-vertical-menu-item
description: Carbon VerticalMenuItem component props and usage examples.
---

# VerticalMenuItem

## Import
`import { VerticalMenuItem } from "carbon-react/lib/components/vertical-menu";`

## Source
- Export: `./components/vertical-menu`
- Props interface: `VerticalMenuItemProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| title | string | Yes |  | Title of the menu item |  |
| active | boolean \| ((isOpen: boolean) => boolean) \| undefined | No |  | Whether the menu item is active or not |  |
| adornment | React.ReactNode \| ((isOpen: boolean) => React.ReactNode) | No |  | Adornment of the menu item meant to be rendered on the right side |  |
| ariaCurrent | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  | Marks the element as the current item within a navigation context. |  |
| children | React.ReactNode | No |  | Children of the menu item - another level of VerticalMenuItems |  |
| component | T \| undefined | No |  | Optional component to render instead of the default div, useful for rendering router link components |  |
| customIcon | React.ReactNode | No |  | Custom icon to be displayed. Takes precedence over `iconType` if both are specified. |  |
| defaultOpen | boolean \| undefined | No |  | Default open state of the component | false |
| height | string \| undefined | No |  | Height of the menu item | "56px" |
| href | string \| undefined | No |  | Href, when passed the menu item will be rendered as an anchor tag |  |
| iconType | IconType \| undefined | No | target \| filter \| reset \| accessibility_web \| add \| admin \| airplay \| alert \| alert_on \| analysis \| app_facebook \| app_instagram \| app_tiktok \| app_twitter \| app_youtube \| apps \| arrow \| arrow_bottom_right_circle \| arrow_down \| arrow_left \| arrow_left_boxed \| arrow_left_right_small \| arrow_left_small \| arrow_right \| arrow_right_small \| arrow_top_left_circle \| arrow_top_right_circle \| arrow_up \| arrows_left_right \| at_sign \| attach \| bank \| bank_with_card \| basket \| basket_with_squares \| batch \| bed \| bill_paid \| bill_unpaid \| bin \| biometric \| blocked \| blocked_square \| block_arrow_right \| bold \| box_arrow_left \| box_arrow_right \| boxed_shapes \| bulk_destroy \| bullet_list \| bullet_list_dotted \| bullet_list_numbers \| business \| calendar \| calendar_pay_date \| calendar_today \| call \| camera \| car_lock \| car_money \| car_repair \| card_wallet \| card_view \| caret_down \| caret_left \| caret_right \| caret_up \| caret_up_down \| caret_large_down \| caret_large_left \| caret_large_right \| caret_large_up \| cart \| cash \| chat \| chart_bar \| chart_bar_arrow_up \| chart_line \| chart_pie \| chat_notes \| check_all \| check_none \| chevron_down \| chevron_first \| chevron_first_pagination \| chevron_last \| chevron_last_pagination \| chevron_left \| chevron_right \| chevron_up \| chevron_down_thick \| chevron_left_thick \| chevron_right_thick \| chevron_up_thick \| chromecast \| circle_with_dots \| circles_connection \| clear \| clock \| clock_add \| close \| code \| cloud_co2 \| coins \| collaborate \| color_picker \| computer_clock \| connect \| connect_circle \| connect_off \| construction \| contacts \| contact_card \| copy \| create \| credit_card \| credit_card_slash \| cross \| cross_circle \| csv \| dashboard \| delete \| delivery \| diagonal_arrows_up \| disputed \| disconnect \| document_right_align \| document_tick \| document_vertical_lines \| download \| double_tick \| drag \| drag_hover \| drag_vertical \| draft \| drill \| dropdown \| duplicate \| edit \| edited \| email \| email_switch \| entry \| envelope_dollar \| envelope_euro \| ellipsis_horizontal \| ellipsis_vertical \| error \| error_square \| euro \| expand \| export \| factory \| favourite \| favourite_lined \| fax \| feedback \| file_excel \| file_generic \| file_image \| file_pdf \| file_word \| files_leaning \| filter_new \| fit_height \| fit_width \| flag \| flash \| folder \| form_refresh \| framerate \| fullscreen \| get_quote \| gift \| go \| graduation_hat \| graph \| graphql \| grid \| heart \| hand_cash_coins \| hand_cash_note \| heart_pulse \| help \| hide \| hierarchy \| home \| image \| import \| in_progress \| in_transit \| individual \| info \| intranet \| ipad \| italic \| job_seeked \| key \| laptop \| leaf \| ledger \| ledger_arrow_left \| ledger_arrow_right \| like \| like_no \| link \| lightbulb_off \| lightbulb_on \| link_card \| link_cloud \| link_on \| list_view \| locked \| login \| location \| logout \| lookup \| marker \| marker_off \| message \| microphone \| minimise \| minus \| minus_large \| mobile \| money_bag \| mute \| none \| normalscreen \| old_warning \| page \| palm_tree \| palette \| pause \| pause_circle \| pdf \| pin \| people \| people_switch \| percentage_boxed \| person \| person_add \| person_info \| person_tick \| petrol_pump \| phone \| picture_in_picture \| piggy_bank \| placeholder \| plane \| play \| play_circle \| plus \| plus_circle \| plus_large \| pound \| print \| progress \| progressed \| protect \| question \| question_hollow \| question_mark \| recruiting \| refresh \| refresh_clock \| remove \| replay \| sage_coin \| save \| scan \| send \| search \| services \| settings \| settings_old \| share \| shield_with_tick \| shield_with_tick_outline \| shop \| sort_down \| sort_up \| source_code \| spanner \| speaker \| split \| split_container \| squares_nine \| stacked_boxes \| stacked_squares \| stop \| stop_circle \| submitted \| subtitles \| support_online \| system_Android \| system_iOS \| sync \| tag \| talk \| target_man \| theatre_masks \| three_boxes \| tick \| tick_circle \| tick_thick \| time_zone \| true_tick \| u_turn_left \| u_turn_right \| underline \| undo \| unlocked \| upload \| uploaded \| user_groups \| video \| view \| volume_high \| volume_low \| volume_medium \| volunteering \| warning \| website \| welfare \| worldwide_location | The Carbon icon to be displayed. Defers to `customIcon` if both are defined. |  |
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
| onClick | ((event: VerticalMenuItemClickEvent) => void) \| undefined | No |  | A custom click handler to run when the menu item is clicked |  |
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
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

