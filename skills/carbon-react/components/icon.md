---
name: carbon-component-icon
description: Carbon Icon component props and usage examples.
---

# Icon

## Import
`import Icon from "carbon-react/lib/components/icon";`

## Source
- Export: `./components/icon`
- Props interface: `IconProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| type | "target" \| "filter" \| "reset" \| "accessibility_web" \| "add" \| "admin" \| "airplay" \| "alert" \| "alert_on" \| "analysis" \| "app_facebook" \| "app_instagram" \| "app_tiktok" \| "app_twitter" \| "app_youtube" \| "apps" \| "arrow" \| "arrow_bottom_right_circle" \| "arrow_down" \| "arrow_left" \| "arrow_left_boxed" \| "arrow_left_right_small" \| "arrow_left_small" \| "arrow_right" \| "arrow_right_small" \| "arrow_top_left_circle" \| "arrow_top_right_circle" \| "arrow_up" \| "arrows_left_right" \| "at_sign" \| "attach" \| "bank" \| "bank_with_card" \| "basket" \| "basket_with_squares" \| "batch" \| "bed" \| "bill_paid" \| "bill_unpaid" \| "bin" \| "biometric" \| "blocked" \| "blocked_square" \| "block_arrow_right" \| "bold" \| "box_arrow_left" \| "box_arrow_right" \| "boxed_shapes" \| "bulk_destroy" \| "bullet_list" \| "bullet_list_dotted" \| "bullet_list_numbers" \| "business" \| "calendar" \| "calendar_pay_date" \| "calendar_today" \| "call" \| "camera" \| "car_lock" \| "car_money" \| "car_repair" \| "card_wallet" \| "card_view" \| "caret_down" \| "caret_left" \| "caret_right" \| "caret_up" \| "caret_large_down" \| "caret_large_left" \| "caret_large_right" \| "caret_large_up" \| "cart" \| "cash" \| "chat" \| "chart_bar" \| "chart_bar_arrow_up" \| "chart_line" \| "chart_pie" \| "chat_notes" \| "check_all" \| "check_none" \| "chevron_down" \| "chevron_first" \| "chevron_first_pagination" \| "chevron_last" \| "chevron_last_pagination" \| "chevron_left" \| "chevron_right" \| "chevron_up" \| "chevron_down_thick" \| "chevron_left_thick" \| "chevron_right_thick" \| "chevron_up_thick" \| "chromecast" \| "circle_with_dots" \| "circles_connection" \| "clear" \| "clock" \| "close" \| "cloud_co2" \| "coins" \| "collaborate" \| "computer_clock" \| "connect" \| "connect_off" \| "construction" \| "contacts" \| "contact_card" \| "copy" \| "create" \| "credit_card" \| "credit_card_slash" \| "cross" \| "cross_circle" \| "csv" \| "dashboard" \| "delete" \| "delivery" \| "diagonal_arrows_up" \| "disputed" \| "disconnect" \| "document_right_align" \| "document_tick" \| "document_vertical_lines" \| "download" \| "double_tick" \| "drag" \| "drag_hover" \| "drag_vertical" \| "draft" \| "drill" \| "dropdown" \| "duplicate" \| "edit" \| "edited" \| "email" \| "email_switch" \| "entry" \| "envelope_dollar" \| "envelope_euro" \| "ellipsis_horizontal" \| "ellipsis_vertical" \| "error" \| "error_square" \| "euro" \| "expand" \| "export" \| "factory" \| "favourite" \| "favourite_lined" \| "fax" \| "feedback" \| "file_excel" \| "file_generic" \| "file_image" \| "file_pdf" \| "file_word" \| "files_leaning" \| "filter_new" \| "fit_height" \| "fit_width" \| "flag" \| "flash" \| "folder" \| "form_refresh" \| "framerate" \| "fullscreen" \| "get_quote" \| "gift" \| "go" \| "graduation_hat" \| "graph" \| "grid" \| "heart" \| "hand_cash_coins" \| "hand_cash_note" \| "heart_pulse" \| "help" \| "hide" \| "hierarchy" \| "home" \| "image" \| "import" \| "in_progress" \| "in_transit" \| "individual" \| "info" \| "intranet" \| "ipad" \| "italic" \| "job_seeked" \| "key" \| "laptop" \| "leaf" \| "ledger" \| "ledger_arrow_left" \| "ledger_arrow_right" \| "like" \| "like_no" \| "link" \| "lightbulb_off" \| "lightbulb_on" \| "link_card" \| "link_cloud" \| "link_on" \| "list_view" \| "locked" \| "login" \| "location" \| "logout" \| "lookup" \| "marker" \| "message" \| "microphone" \| "minimise" \| "minus" \| "minus_large" \| "mobile" \| "money_bag" \| "mute" \| "none" \| "normalscreen" \| "old_warning" \| "page" \| "palm_tree" \| "pause" \| "pause_circle" \| "pdf" \| "pin" \| "people" \| "people_switch" \| "percentage_boxed" \| "person" \| "person_info" \| "person_tick" \| "petrol_pump" \| "phone" \| "picture_in_picture" \| "piggy_bank" \| "placeholder" \| "plane" \| "play" \| "play_circle" \| "plus" \| "plus_large" \| "pound" \| "print" \| "progress" \| "progressed" \| "protect" \| "question" \| "question_hollow" \| "question_mark" \| "recruiting" \| "refresh" \| "refresh_clock" \| "remove" \| "replay" \| "sage_coin" \| "save" \| "scan" \| "send" \| "search" \| "services" \| "settings" \| "settings_old" \| "share" \| "shield_with_tick" \| "shield_with_tick_outline" \| "shop" \| "sort_down" \| "sort_up" \| "spanner" \| "speaker" \| "split" \| "split_container" \| "squares_nine" \| "stacked_boxes" \| "stacked_squares" \| "stop" \| "stop_circle" \| "subtitles" \| "support_online" \| "submitted" \| "sync" \| "tag" \| "talk" \| "target_man" \| "theatre_masks" \| "three_boxes" \| "tick" \| "tick_circle" \| "tick_thick" \| "time_zone" \| "true_tick" \| "u_turn_left" \| "u_turn_right" \| "underline" \| "undo" \| "unlocked" \| "upload" \| "uploaded" \| "user_groups" \| "video" \| "view" \| "volume_high" \| "volume_low" \| "volume_medium" \| "volunteering" \| "warning" \| "website" \| "welfare" \| "worldwide_location" \| "maintenance" \| "new" \| "success" \| "messages" | Yes | target \| filter \| reset \| accessibility_web \| add \| admin \| airplay \| alert \| alert_on \| analysis \| app_facebook \| app_instagram \| app_tiktok \| app_twitter \| app_youtube \| apps \| arrow \| arrow_bottom_right_circle \| arrow_down \| arrow_left \| arrow_left_boxed \| arrow_left_right_small \| arrow_left_small \| arrow_right \| arrow_right_small \| arrow_top_left_circle \| arrow_top_right_circle \| arrow_up \| arrows_left_right \| at_sign \| attach \| bank \| bank_with_card \| basket \| basket_with_squares \| batch \| bed \| bill_paid \| bill_unpaid \| bin \| biometric \| blocked \| blocked_square \| block_arrow_right \| bold \| box_arrow_left \| box_arrow_right \| boxed_shapes \| bulk_destroy \| bullet_list \| bullet_list_dotted \| bullet_list_numbers \| business \| calendar \| calendar_pay_date \| calendar_today \| call \| camera \| car_lock \| car_money \| car_repair \| card_wallet \| card_view \| caret_down \| caret_left \| caret_right \| caret_up \| caret_large_down \| caret_large_left \| caret_large_right \| caret_large_up \| cart \| cash \| chat \| chart_bar \| chart_bar_arrow_up \| chart_line \| chart_pie \| chat_notes \| check_all \| check_none \| chevron_down \| chevron_first \| chevron_first_pagination \| chevron_last \| chevron_last_pagination \| chevron_left \| chevron_right \| chevron_up \| chevron_down_thick \| chevron_left_thick \| chevron_right_thick \| chevron_up_thick \| chromecast \| circle_with_dots \| circles_connection \| clear \| clock \| close \| cloud_co2 \| coins \| collaborate \| computer_clock \| connect \| connect_off \| construction \| contacts \| contact_card \| copy \| create \| credit_card \| credit_card_slash \| cross \| cross_circle \| csv \| dashboard \| delete \| delivery \| diagonal_arrows_up \| disputed \| disconnect \| document_right_align \| document_tick \| document_vertical_lines \| download \| double_tick \| drag \| drag_hover \| drag_vertical \| draft \| drill \| dropdown \| duplicate \| edit \| edited \| email \| email_switch \| entry \| envelope_dollar \| envelope_euro \| ellipsis_horizontal \| ellipsis_vertical \| error \| error_square \| euro \| expand \| export \| factory \| favourite \| favourite_lined \| fax \| feedback \| file_excel \| file_generic \| file_image \| file_pdf \| file_word \| files_leaning \| filter_new \| fit_height \| fit_width \| flag \| flash \| folder \| form_refresh \| framerate \| fullscreen \| get_quote \| gift \| go \| graduation_hat \| graph \| grid \| heart \| hand_cash_coins \| hand_cash_note \| heart_pulse \| help \| hide \| hierarchy \| home \| image \| import \| in_progress \| in_transit \| individual \| info \| intranet \| ipad \| italic \| job_seeked \| key \| laptop \| leaf \| ledger \| ledger_arrow_left \| ledger_arrow_right \| like \| like_no \| link \| lightbulb_off \| lightbulb_on \| link_card \| link_cloud \| link_on \| list_view \| locked \| login \| location \| logout \| lookup \| marker \| message \| microphone \| minimise \| minus \| minus_large \| mobile \| money_bag \| mute \| none \| normalscreen \| old_warning \| page \| palm_tree \| pause \| pause_circle \| pdf \| pin \| people \| people_switch \| percentage_boxed \| person \| person_info \| person_tick \| petrol_pump \| phone \| picture_in_picture \| piggy_bank \| placeholder \| plane \| play \| play_circle \| plus \| plus_large \| pound \| print \| progress \| progressed \| protect \| question \| question_hollow \| question_mark \| recruiting \| refresh \| refresh_clock \| remove \| replay \| sage_coin \| save \| scan \| send \| search \| services \| settings \| settings_old \| share \| shield_with_tick \| shield_with_tick_outline \| shop \| sort_down \| sort_up \| spanner \| speaker \| split \| split_container \| squares_nine \| stacked_boxes \| stacked_squares \| stop \| stop_circle \| subtitles \| support_online \| submitted \| sync \| tag \| talk \| target_man \| theatre_masks \| three_boxes \| tick \| tick_circle \| tick_thick \| time_zone \| true_tick \| u_turn_left \| u_turn_right \| underline \| undo \| unlocked \| upload \| uploaded \| user_groups \| video \| view \| volume_high \| volume_low \| volume_medium \| volunteering \| warning \| website \| welfare \| worldwide_location \| maintenance \| new \| success \| messages |  |  | Icon type. Icons use a `snake_case` naming convention and are organised into the following categories: - **Navigation** — `arrow_*`, `chevron_*`, `caret_*`, `caret_large_*` - **Actions** — `add`, `bin`, `close`, `copy`, `create`, `delete`, `drag`, `download`, `edit`, `export`, `filter`, `link`, `search`, `settings`, `upload`, and more. - **Status** — `alert`, `blocked`, `double_tick`, `error`, `error_square`, `info`, `tick`, `warning`, and more. - **Communication** — `call`, `chat`, `email`, `fax`, `message`, and more. - **Finance** — `bank`, `cash`, `coins`, `credit_card`, `euro`, `receipt`, and more. - **Social / App** — `app_facebook`, `app_instagram`, `app_tiktok`, `app_twitter`, `app_youtube`. - **Documents & Files** — `attach`, `document_*`, `file_*`, and more. - **Charts** — `chart_bar`, `chart_bar_arrow_up`, `chart_line`, `chart_pie`. The full list of types can be seen [here](https://carbon.sage.com/?path=/docs/icon--list-of-icons#list-of-icons). |  |
| ariaLabel | string \| undefined | No |  |  |  | Aria label for accessibility purposes |  |
| className | string \| undefined | No |  |  |  |  |  |
| focusable | boolean \| undefined | No |  |  |  |  |  |
| id | string \| undefined | No |  |  |  | Id passed to the icon. |  |
| inputSize | "small" \| "medium" \| "large" \| undefined | No |  |  |  |  |  |
| inverse | boolean \| undefined | No |  |  |  | Renders the Icon in a light colour, suitable for use on dark backgrounds. |  |
| isPartOfInput | boolean \| undefined | No |  |  |  |  |  |
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
| role | string \| undefined | No |  |  |  | The ARIA role to be applied to the Icon |  |
| size | IconSize \| undefined | No |  |  |  | Size of the Icon. - `small` — 16px (default) - `medium` — 24px - `large` — 32px |  |
| tabIndex | number \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | boolean \| undefined | No |  |  |  | Set whether icon should be recognised by assistive technologies |  |
| bg | string \| undefined | No |  | Yes | Use CSS or a wrapper element to apply a background colour. |  |  |
| bgShape | BackgroundShape \| undefined | No |  | Yes | Use CSS or a wrapper element to apply a background shape. |  |  |
| bgSize | BgSize \| undefined | No |  | Yes | Use CSS or a wrapper element to control background size. |  |  |
| color | string \| undefined | No |  | Yes | Use CSS or a wrapper element to control icon colour. |  |  |
| disabled | boolean \| undefined | No |  | Yes |  |  |  |
| fontSize | FontSize \| undefined | No |  | Yes | Use the `size` prop instead. The `extra-large` value is no longer supported and will be mapped to `large`. |  |  |
| tooltipBgColor | string \| undefined | No |  | Yes |  |  |  |
| tooltipFlipOverrides | TooltipPositions[] \| undefined | No |  | Yes |  |  |  |
| tooltipFontColor | string \| undefined | No |  | Yes |  |  |  |
| tooltipId | string \| undefined | No |  | Yes |  |  |  |
| tooltipMessage | React.ReactNode | No |  | Yes | Tooltip support has been removed from `Icon`. Use a dedicated `Tooltip` component wrapping the `Icon` instead. This prop no longer has any effect. |  |  |
| tooltipPosition | TooltipPositions \| undefined | No |  | Yes |  |  |  |
| tooltipVisible | boolean \| undefined | No |  | Yes |  |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Icon type="add" />;
}
```


### Sizes

**Render**

```tsx
() => {
  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <Icon type="add" size={size} key={size} />
      ))}
    </>
  );
}
```


### Inverse

**Render**

```tsx
() => {
  return (
    <Box p={2} backgroundColor="#000000">
      <Icon type="add" inverse />
    </Box>
  );
}
```


### Various Background Shapes

**Render**

```tsx
() => {
  return (
    <>
      {(["circle", "rounded-rect", "square"] as const).map((bgShape) => (
        <Icon type="add" bgShape={bgShape} bg="#00b000" mr={1} key={bgShape} />
      ))}
    </>
  );
}
```


### Various Background Sizes

**Render**

```tsx
() => {
  return (
    <>
      {(["small", "medium", "large", "extra-large"] as const).map((bgSize) => (
        <Icon type="add" bg="#00b000" bgSize={bgSize} mr={1} key={bgSize} />
      ))}
    </>
  );
}
```


### Background Sizes and Font Sizes

**Render**

```tsx
() => {
  return (
    <>
      {(["small", "medium", "large", "extra-large"] as const).map(
        (fontSize) => {
          return (["small", "medium", "large", "extra-large"] as const).map(
            (bgSize) => (
              <Icon
                type="add"
                bg="#00b000"
                fontSize={fontSize}
                bgSize={bgSize}
                mr={1}
                key={`${fontSize}_${bgSize}`}
              />
            ),
          );
        },
      )}
    </>
  );
}
```


### Custom Colors

**Render**

```tsx
() => (
  <>
    <Box mb={1}>
      <Icon type="add" color="--colorsUtilityYin090" />
      <Icon type="add" color="primary" />
      <Icon type="add" color="blackOpacity65" />
      <Icon type="add" color="brilliantGreenShade20" />
      <Icon type="add" color="red" />
      <Icon type="add" color="#123456" />
      <Icon type="add" color="rgb(0, 123, 10)" />
    </Box>
    <Box mb={1}>
      <Icon
        type="add"
        color="--colorsUtilityYin090"
        bg="--colorsSemanticCaution500"
      />
      <Icon type="add" color="red" bg="primary" />
      <Icon type="add" color="white" bg="blackOpacity65" />
      <Icon type="add" bg="brilliantGreenShade20" />
      <Icon type="add" bg="red" />
      <Icon type="add" color="white" bg="#123456" />
      <Icon type="add" color="white" bg="rgb(0, 123, 10)" />
    </Box>
  </>
)
```


### List of Icons

**Render**

```tsx
() => {
  return (
    <Box m={2} display="grid" gridTemplateColumns="repeat(3, 1fr)">
      {ICONS.sort().map((type) => {
        return (
          <Box m={2} key={`icon-${type}`}>
            <Icon m={2} type={type} size="large" />
            {type}
          </Box>
        );
      })}
    </Box>
  );
}
```

