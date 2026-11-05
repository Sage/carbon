---
name: carbon-component-portrait
description: Carbon Portrait component props and usage examples.
---

# Portrait

## Import
`import Portrait from "carbon-react/lib/components/portrait";`

## Source
- Export: `./components/portrait`
- Props interface: `PortraitProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| alt | string \| undefined | No |  |  |  | The `alt` HTML string. |  |
| iconType | IconType \| undefined | No | target \| filter \| reset \| accessibility_web \| add \| admin \| airplay \| alert \| alert_on \| analysis \| app_facebook \| app_instagram \| app_tiktok \| app_twitter \| app_youtube \| apps \| arrow \| arrow_bottom_right_circle \| arrow_down \| arrow_left \| arrow_left_boxed \| arrow_left_right_small \| arrow_left_small \| arrow_right \| arrow_right_small \| arrow_top_left_circle \| arrow_top_right_circle \| arrow_up \| arrows_left_right \| at_sign \| attach \| bank \| bank_with_card \| basket \| basket_with_squares \| batch \| bed \| bill_paid \| bill_unpaid \| bin \| biometric \| blocked \| blocked_square \| block_arrow_right \| bold \| box_arrow_left \| box_arrow_right \| boxed_shapes \| bulk_destroy \| bullet_list \| bullet_list_dotted \| bullet_list_numbers \| business \| calendar \| calendar_pay_date \| calendar_today \| call \| camera \| car_lock \| car_money \| car_repair \| card_wallet \| card_view \| caret_down \| caret_left \| caret_right \| caret_up \| caret_up_down \| caret_large_down \| caret_large_left \| caret_large_right \| caret_large_up \| cart \| cash \| chat \| chart_bar \| chart_bar_arrow_up \| chart_line \| chart_pie \| chat_notes \| check_all \| check_none \| chevron_down \| chevron_first \| chevron_first_pagination \| chevron_last \| chevron_last_pagination \| chevron_left \| chevron_right \| chevron_up \| chevron_down_thick \| chevron_left_thick \| chevron_right_thick \| chevron_up_thick \| chromecast \| circle_with_dots \| circles_connection \| clear \| clock \| clock_add \| close \| code \| cloud_co2 \| coins \| collaborate \| color_picker \| computer_clock \| connect \| connect_circle \| connect_off \| construction \| contacts \| contact_card \| copy \| create \| credit_card \| credit_card_slash \| cross \| cross_circle \| csv \| dashboard \| delete \| delivery \| diagonal_arrows_up \| disputed \| disconnect \| document_right_align \| document_tick \| document_vertical_lines \| download \| double_tick \| drag \| drag_hover \| drag_vertical \| draft \| drill \| dropdown \| duplicate \| edit \| edited \| email \| email_switch \| entry \| envelope_dollar \| envelope_euro \| ellipsis_horizontal \| ellipsis_vertical \| error \| error_square \| euro \| expand \| export \| factory \| favourite \| favourite_lined \| fax \| feedback \| file_excel \| file_generic \| file_image \| file_pdf \| file_word \| files_leaning \| filter_new \| fit_height \| fit_width \| flag \| flash \| folder \| form_refresh \| framerate \| fullscreen \| get_quote \| gift \| go \| graduation_hat \| graph \| graphql \| grid \| heart \| hand_cash_coins \| hand_cash_note \| heart_pulse \| help \| hide \| hierarchy \| home \| image \| import \| in_progress \| in_transit \| individual \| info \| intranet \| ipad \| italic \| job_seeked \| key \| laptop \| leaf \| ledger \| ledger_arrow_left \| ledger_arrow_right \| like \| like_no \| link \| lightbulb_off \| lightbulb_on \| link_card \| link_cloud \| link_on \| list_view \| locked \| login \| location \| logout \| lookup \| marker \| marker_off \| message \| microphone \| minimise \| minus \| minus_large \| mobile \| money_bag \| mute \| none \| normalscreen \| old_warning \| page \| palm_tree \| palette \| pause \| pause_circle \| pdf \| pin \| people \| people_switch \| percentage_boxed \| person \| person_add \| person_info \| person_tick \| petrol_pump \| phone \| picture_in_picture \| piggy_bank \| placeholder \| plane \| play \| play_circle \| plus \| plus_circle \| plus_large \| pound \| print \| progress \| progressed \| protect \| question \| question_hollow \| question_mark \| recruiting \| refresh \| refresh_clock \| remove \| replay \| sage_coin \| save \| scan \| send \| search \| services \| settings \| settings_old \| share \| shield_with_tick \| shield_with_tick_outline \| shop \| sort_down \| sort_up \| source_code \| spanner \| speaker \| split \| split_container \| squares_nine \| stacked_boxes \| stacked_squares \| stop \| stop_circle \| submitted \| subtitles \| support_online \| system_Android \| system_iOS \| sync \| tag \| talk \| target_man \| theatre_masks \| three_boxes \| tick \| tick_circle \| tick_thick \| time_zone \| true_tick \| u_turn_left \| u_turn_right \| underline \| undo \| unlocked \| upload \| uploaded \| user_groups \| video \| view \| volume_high \| volume_low \| volume_medium \| volunteering \| warning \| website \| welfare \| worldwide_location |  |  | Icon to be rendered as a fallback. | "individual" |
| initials | string \| undefined | No |  |  |  | The initials to render in the Portrait. |  |
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
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Prop for `onClick` events. |  |
| shape | PortraitShapes \| undefined | No | circle \| square |  |  | The shape of the Portrait. | "circle" |
| size | PortraitSizes \| undefined | No | S \| M \| L \| XL \| XS \| ML \| XXL |  |  | The size of the Portrait. | "M" |
| src | string \| undefined | No |  |  |  | A custom image URL. |  |
| variant | PortraitVariant \| undefined | No | black \| green \| red \| orange \| blue \| purple \| teal \| lime \| pink \| slate \| gray |  |  | Color variant |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| backgroundColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | The hex code of the background colour |  |
| darkBackground | boolean \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | Use a dark background. | false |
| foregroundColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | The hex code of the foreground colour. This will only take effect if use in conjunction with `backgroundColor` | undefined |
| tooltipBgColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipFontColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipId | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] The id attribute to use for the tooltip |  |
| tooltipIsVisible | boolean \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Whether to to show the Tooltip |  |
| tooltipMessage | React.ReactNode | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] The message to be displayed within the tooltip |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No | left \| right \| bottom \| top | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Sets position of the tooltip |  |
| tooltipSize | "medium" \| "large" \| undefined | No | medium \| large | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Defines the size of the tooltip content |  |
| tooltipType | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Defines the message type |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Portrait />;
}
```


### Initials

**Render**

```tsx
() => {
  return <Portrait initials="MK" />;
}
```


### Src

**Render**

```tsx
() => {
  return (
    <Portrait src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
  );
}
```


### Icon Type

**Render**

```tsx
() => {
  return <Portrait iconType="image" />;
}
```


### Sizes

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} />
        ))}
      </Box>
      <Box display="flex" alignItems="center">
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait shape="square" key={size} size={size} />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} initials="MK" />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait shape="square" key={size} size={size} initials="MK" />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait
            key={size}
            size={size}
            src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait
            shape="square"
            key={size}
            size={size}
            src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          />
        ))}
      </Box>
    </Box>
  );
}
```


### Shapes

**Render**

```tsx
() => {
  return (
    <>
      {(["circle", "square"] as const).map((shape) => (
        <Portrait key={shape} shape={shape} />
      ))}
    </>
  );
}
```


### Dark Background

**Render**

```tsx
() => {
  return (
    <>
      <Portrait darkBackground />
      <Portrait initials="MK" darkBackground />
    </>
  );
}
```


### With Margin

**Render**

```tsx
() => {
  return (
    <Box display="flex" alignItems="baseline">
      <Portrait m={3} />
      <Portrait darkBackground m={2} />
      <Portrait shape="circle" m="25px" />
      <Portrait size="L" m="30px" />
    </Box>
  );
}
```


### Custom Color

**Render**

```tsx
() => {
  const [colour, setColour] = useState("#000000");
  const [bgColour, setBgColour] = useState("#A3CAF0");

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setColour(e.target.value)}
          value={colour}
        >
          <Option text="black" value="#000000" />
          <Option text="white" value="#FFFFFF" />
          <Option text="sagegreen" value="#007e45" />
        </Select>
        <Select
          name="background-color"
          id="background-color"
          label="Background Color"
          labelInline
          onChange={(e) => setBgColour(e.target.value)}
          value={bgColour}
        >
          <Option text="paleblue" value="#A3CAF0" />
          <Option text="palepink" value="#FD9BA3" />
          <Option text="palepurple" value="#B4AEEA" />
          <Option text="palegoldenrod" value="#ECE6AF" />
          <Option text="paleorchid" value="#EBAEDE" />
          <Option text="paledesert" value="#EBC7AE" />
          <Option text="paleturquoise" value="#AEECEB" />
          <Option text="palemint" value="#AEECD6" />
          <Option text="black" value="#000000" />
          <Option text="white" value="#FFFFFF" />
          <Option text="darkslategray" value="#2F4F4F" />
          <Option text="dimgray" value="#696969" />
          <Option text="gray" value="#808080" />
          <Option text="darkgray" value="#A9A9A9" />
          <Option text="silver" value="#C0C0C0" />
          <Option text="lightgray" value="#D3D3D3" />
          <Option text="gainsboro" value="#DCDCDC" />
          <Option text="whitesmoke" value="#F5F5F5" />
          <Option text="lightyellow" value="#FFFFE0" />
          <Option text="lemonchiffon" value="#FFFACD" />
          <Option text="lightgoldenrodyellow" value="#FAFAD2" />
          <Option text="moccasin" value="#FFE4B5" />
          <Option text="peachpuff" value="#FFDAB9" />
          <Option text="navajowhite" value="#FFDEAD" />
          <Option text="wheat" value="#F5DEB3" />
          <Option text="cornsilk" value="#FFF8DC" />
          <Option text="ivory" value="#FFFFF0" />
          <Option text="blue" value="#0000FF" />
          <Option text="mediumblue" value="#0000CD" />
          <Option text="darkblue" value="#00008B" />
          <Option text="navy" value="#000080" />
          <Option text="midnightblue" value="#191970" />
          <Option text="royalblue" value="#4169E1" />
          <Option text="steelblue" value="#4682B4" />
          <Option text="cadetblue" value="#5F9EA0" />
          <Option text="cornflowerblue" value="#6495ED" />
          <Option text="lightskyblue" value="#87CEFA" />
          <Option text="skyblue" value="#87CEEB" />
          <Option text="deepskyblue" value="#00BFFF" />
          <Option text="dodgerblue" value="#1E90FF" />
          <Option text="lightblue" value="#ADD8E6" />
          <Option text="lightsteelblue" value="#B0C4DE" />
          <Option text="slateblue" value="#708090" />
          <Option text="slateblue2" value="#6A5ACD" />
          <Option text="mediumslateblue" value="#7B68EE" />
          <Option text="blueviolet" value="#8A2BE2" />
          <Option text="mediumpurple" value="#9370DB" />
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait backgroundColor={bgColour} foregroundColor={colour} />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
      </Box>

      <Typography>
        The following examples demonstrate using the design token approach
      </Typography>
      <Box mt={2} display="flex" flexDirection="row" gap={2}>
        <Portrait
          backgroundColor="var(--colorsSemanticFocus500)"
          foregroundColor="#FFFFFF"
        />
        <Portrait
          backgroundColor="#FFFFFF"
          foregroundColor="var(--colorsSemanticNegative600)"
        />

        <Portrait
          backgroundColor="var(--colorsUtilityYin090)"
          foregroundColor="var(--colorsLogo)"
        />
      </Box>
    </>
  );
}
```


### Variants

**Render**

```tsx
() => {
  const availableVariants: { value: PortraitVariant; label: string }[] = [
    { value: "black", label: "Black (default)" },
    { value: "blue", label: "Blue" },
    { value: "teal", label: "Teal" },
    { value: "green", label: "Green" },
    { value: "lime", label: "Lime" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "slate", label: "Slate" },
    { value: "gray", label: "Gray" },
  ];
  const [variant, setVariant] = useState<PortraitVariant>(
    availableVariants[0].value,
  );

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setVariant(e.target.value as PortraitVariant)}
          value={variant}
        >
          {availableVariants.map(({ label, value }) => (
            <Option key={value} text={label} value={value} />
          ))}
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="XS" variant={variant} />
        <Portrait initials="MK" size="XS" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait variant={variant} />
        <Portrait initials="MK" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="L" variant={variant} />
        <Portrait initials="MK" size="L" variant={variant} />
      </Box>
    </>
  );
}
```

