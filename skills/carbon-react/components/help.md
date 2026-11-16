---
name: carbon-component-help
description: Carbon Help component props and usage examples.
---

# Help

## Import
`import Help from "carbon-react/lib/components/help";`

## Source
- Export: `./components/help`
- Props interface: `HelpProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaLabel | string \| undefined | No |  | Aria label | "help" |
| as | keyof JSX.IntrinsicElements \| undefined | No | symbol \| object \| map \| filter \| p \| small \| button \| code \| image \| link \| marker \| progress \| search \| stop \| video \| view \| footer \| title \| sub \| a \| abbr \| address \| area \| article \| aside \| audio \| b \| base \| bdi \| bdo \| big \| blockquote \| body \| br \| canvas \| caption \| center \| cite \| col \| colgroup \| data \| datalist \| dd \| del \| details \| dfn \| dialog \| div \| dl \| dt \| em \| embed \| fieldset \| figcaption \| figure \| form \| h1 \| h2 \| h3 \| h4 \| h5 \| h6 \| head \| header \| hgroup \| hr \| html \| i \| iframe \| img \| input \| ins \| kbd \| keygen \| label \| legend \| li \| main \| mark \| menu \| menuitem \| meta \| meter \| nav \| noindex \| noscript \| ol \| optgroup \| option \| output \| param \| picture \| pre \| q \| rp \| rt \| ruby \| s \| samp \| slot \| script \| section \| select \| source \| span \| strong \| style \| summary \| sup \| table \| template \| tbody \| td \| textarea \| tfoot \| th \| thead \| time \| tr \| track \| u \| ul \| var \| wbr \| webview \| svg \| animate \| animateMotion \| animateTransform \| circle \| clipPath \| defs \| desc \| ellipse \| feBlend \| feColorMatrix \| feComponentTransfer \| feComposite \| feConvolveMatrix \| feDiffuseLighting \| feDisplacementMap \| feDistantLight \| feDropShadow \| feFlood \| feFuncA \| feFuncB \| feFuncG \| feFuncR \| feGaussianBlur \| feImage \| feMerge \| feMergeNode \| feMorphology \| feOffset \| fePointLight \| feSpecularLighting \| feSpotLight \| feTile \| feTurbulence \| foreignObject \| g \| line \| linearGradient \| mask \| metadata \| mpath \| path \| pattern \| polygon \| polyline \| radialGradient \| rect \| set \| switch \| text \| textPath \| tspan \| use | Overrides the default 'as' attribute of the Help component |  |
| children | React.ReactNode | No |  | The message to be displayed within the tooltip |  |
| helpId | string \| undefined | No |  | The unique id of the component (used with aria-describedby for accessibility) |  |
| href | string \| undefined | No |  | A path for the anchor |  |
| isFocused | boolean \| undefined | No |  | A boolean received from IconWrapper |  |
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
| tabIndex | number \| undefined | No |  | Overrides the default tabindex of the component | 0 |
| tooltipBgColor | string \| undefined | No |  | Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipFlipOverrides | TooltipPositions[] \| undefined | No |  | Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"] (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) |  |
| tooltipFontColor | string \| undefined | No |  | Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipId | string \| undefined | No |  | Id passed to the tooltip container, used for accessibility purposes |  |
| tooltipPosition | TooltipPositions \| undefined | No | left \| right \| bottom \| top | Position of tooltip relative to target | "top" |
| type | IconType \| undefined | No | target \| filter \| reset \| accessibility_web \| add \| admin \| airplay \| alert \| alert_on \| analysis \| app_facebook \| app_instagram \| app_tiktok \| app_twitter \| app_youtube \| apps \| arrow \| arrow_bottom_right_circle \| arrow_down \| arrow_left \| arrow_left_boxed \| arrow_left_right_small \| arrow_left_small \| arrow_right \| arrow_right_small \| arrow_top_left_circle \| arrow_top_right_circle \| arrow_up \| arrows_left_right \| at_sign \| attach \| bank \| bank_with_card \| basket \| basket_with_squares \| batch \| bed \| bill_paid \| bill_unpaid \| bin \| biometric \| blocked \| blocked_square \| block_arrow_right \| bold \| box_arrow_left \| box_arrow_right \| boxed_shapes \| bulk_destroy \| bullet_list \| bullet_list_dotted \| bullet_list_numbers \| business \| calendar \| calendar_pay_date \| calendar_today \| call \| camera \| car_lock \| car_money \| car_repair \| card_wallet \| card_view \| caret_down \| caret_left \| caret_right \| caret_up \| caret_up_down \| caret_large_down \| caret_large_left \| caret_large_right \| caret_large_up \| cart \| cash \| chat \| chart_bar \| chart_bar_arrow_up \| chart_line \| chart_pie \| chat_notes \| check_all \| check_none \| chevron_down \| chevron_first \| chevron_first_pagination \| chevron_last \| chevron_last_pagination \| chevron_left \| chevron_right \| chevron_up \| chevron_down_thick \| chevron_left_thick \| chevron_right_thick \| chevron_up_thick \| chromecast \| circle_with_dots \| circles_connection \| clear \| clock \| clock_add \| close \| code \| cloud_co2 \| coins \| collaborate \| color_picker \| computer_clock \| connect \| connect_circle \| connect_off \| construction \| contacts \| contact_card \| copy \| create \| credit_card \| credit_card_slash \| cross \| cross_circle \| csv \| dashboard \| delete \| delivery \| diagonal_arrows_up \| disputed \| disconnect \| document_right_align \| document_tick \| document_vertical_lines \| download \| double_tick \| drag \| drag_hover \| drag_vertical \| draft \| drill \| dropdown \| duplicate \| edit \| edited \| email \| email_switch \| entry \| envelope_dollar \| envelope_euro \| ellipsis_horizontal \| ellipsis_vertical \| error \| error_square \| euro \| expand \| export \| factory \| favourite \| favourite_lined \| fax \| feedback \| file_excel \| file_generic \| file_image \| file_pdf \| file_word \| files_leaning \| filter_new \| fit_height \| fit_width \| flag \| flash \| folder \| form_refresh \| framerate \| fullscreen \| get_quote \| gift \| go \| graduation_hat \| graph \| graphql \| grid \| heart \| hand_cash_coins \| hand_cash_note \| heart_pulse \| help \| hide \| hierarchy \| home \| image \| import \| in_progress \| in_transit \| individual \| info \| intranet \| ipad \| italic \| job_seeked \| key \| laptop \| leaf \| ledger \| ledger_arrow_left \| ledger_arrow_right \| like \| like_no \| link \| lightbulb_off \| lightbulb_on \| link_card \| link_cloud \| link_on \| list_view \| locked \| login \| location \| logout \| lookup \| marker \| marker_off \| message \| microphone \| minimise \| minus \| minus_large \| mobile \| money_bag \| mute \| none \| normalscreen \| old_warning \| page \| palm_tree \| palette \| pause \| pause_circle \| pdf \| pin \| people \| people_switch \| percentage_boxed \| person \| person_add \| person_info \| person_tick \| petrol_pump \| phone \| picture_in_picture \| piggy_bank \| placeholder \| plane \| play \| play_circle \| plus \| plus_circle \| plus_large \| pound \| print \| progress \| progressed \| protect \| question \| question_hollow \| question_mark \| recruiting \| refresh \| refresh_clock \| remove \| replay \| sage_coin \| save \| scan \| send \| search \| services \| settings \| settings_old \| share \| shield_with_tick \| shield_with_tick_outline \| shop \| sort_down \| sort_up \| source_code \| spanner \| speaker \| split \| split_container \| squares_nine \| stacked_boxes \| stacked_squares \| stop \| stop_circle \| submitted \| subtitles \| support_online \| system_Android \| system_iOS \| sync \| tag \| talk \| target_man \| theatre_masks \| three_boxes \| tick \| tick_circle \| tick_thick \| time_zone \| true_tick \| u_turn_left \| u_turn_right \| underline \| undo \| unlocked \| upload \| uploaded \| user_groups \| video \| view \| volume_high \| volume_low \| volume_medium \| volunteering \| warning \| website \| welfare \| worldwide_location | Help Icon type | "help" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <Box m={64}>
      <Help>Some helpful text goes here</Help>
    </Box>
  );
}
```


### With Tooltip Custom Message

**Render**

```tsx
() => {
  return (
    <Box m={64}>
      <Help>
        <Icon type="add" color="red" />
        <Icon type="add" color="green" />
        <Icon type="add" color="blue" /> Some <em>helpful</em> text goes here
      </Help>
    </Box>
  );
}
```


### With Tooltip Position

**Render**

```tsx
() => {
  return (
    <>
      {(["right", "left", "top", "bottom"] as const).map((position) => (
        <Box my={64} mx={300} key={position}>
          <Help tooltipPosition={position} isFocused>
            {`This tooltip is positioned ${position}`}
          </Help>
        </Box>
      ))}
    </>
  );
}
```


### With Tooltip Color Overrides

**Render**

```tsx
() => (
  <Box my={64} mx={300}>
    <Help tooltipBgColor="lightblue" tooltipFontColor="black" isFocused>
      The background and font color are overridden
    </Help>
  </Box>
)
```


### With Icons and Focused

**Render**

```tsx
() => {
  return (
    <>
      {(["error", "add", "minus", "settings"] as const).map((icon) => (
        <Box m={65} key={icon}>
          <Help type={`${icon}`} data-role="target">
            {`This is the Help component with the ${icon} icon`}
          </Help>
        </Box>
      ))}
    </>
  );
}
```


### With Href

**Render**

```tsx
() => {
  return (
    <Box m={64}>
      <Help href="https://carbon.sage.com">
        This is the Help component with a href.
      </Help>
    </Box>
  );
}
```

