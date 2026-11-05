---
name: carbon-component-button-toggle
description: Carbon ButtonToggle component props and usage examples.
---

# ButtonToggle

## Import
`import { ButtonToggle } from "carbon-react/lib/components/button-toggle";`

## Source
- Export: `./components/button-toggle`
- Props interface: `ButtonToggleProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| allowDeselect | boolean \| undefined | No |  |  |  | Allow a selected button to be deselected. |  |
| buttonIcon | IconType \| undefined | No | target \| filter \| reset \| accessibility_web \| add \| admin \| airplay \| alert \| alert_on \| analysis \| app_facebook \| app_instagram \| app_tiktok \| app_twitter \| app_youtube \| apps \| arrow \| arrow_bottom_right_circle \| arrow_down \| arrow_left \| arrow_left_boxed \| arrow_left_right_small \| arrow_left_small \| arrow_right \| arrow_right_small \| arrow_top_left_circle \| arrow_top_right_circle \| arrow_up \| arrows_left_right \| at_sign \| attach \| bank \| bank_with_card \| basket \| basket_with_squares \| batch \| bed \| bill_paid \| bill_unpaid \| bin \| biometric \| blocked \| blocked_square \| block_arrow_right \| bold \| box_arrow_left \| box_arrow_right \| boxed_shapes \| bulk_destroy \| bullet_list \| bullet_list_dotted \| bullet_list_numbers \| business \| calendar \| calendar_pay_date \| calendar_today \| call \| camera \| car_lock \| car_money \| car_repair \| card_wallet \| card_view \| caret_down \| caret_left \| caret_right \| caret_up \| caret_up_down \| caret_large_down \| caret_large_left \| caret_large_right \| caret_large_up \| cart \| cash \| chat \| chart_bar \| chart_bar_arrow_up \| chart_line \| chart_pie \| chat_notes \| check_all \| check_none \| chevron_down \| chevron_first \| chevron_first_pagination \| chevron_last \| chevron_last_pagination \| chevron_left \| chevron_right \| chevron_up \| chevron_down_thick \| chevron_left_thick \| chevron_right_thick \| chevron_up_thick \| chromecast \| circle_with_dots \| circles_connection \| clear \| clock \| clock_add \| close \| code \| cloud_co2 \| coins \| collaborate \| color_picker \| computer_clock \| connect \| connect_circle \| connect_off \| construction \| contacts \| contact_card \| copy \| create \| credit_card \| credit_card_slash \| cross \| cross_circle \| csv \| dashboard \| delete \| delivery \| diagonal_arrows_up \| disputed \| disconnect \| document_right_align \| document_tick \| document_vertical_lines \| download \| double_tick \| drag \| drag_hover \| drag_vertical \| draft \| drill \| dropdown \| duplicate \| edit \| edited \| email \| email_switch \| entry \| envelope_dollar \| envelope_euro \| ellipsis_horizontal \| ellipsis_vertical \| error \| error_square \| euro \| expand \| export \| factory \| favourite \| favourite_lined \| fax \| feedback \| file_excel \| file_generic \| file_image \| file_pdf \| file_word \| files_leaning \| filter_new \| fit_height \| fit_width \| flag \| flash \| folder \| form_refresh \| framerate \| fullscreen \| get_quote \| gift \| go \| graduation_hat \| graph \| graphql \| grid \| heart \| hand_cash_coins \| hand_cash_note \| heart_pulse \| help \| hide \| hierarchy \| home \| image \| import \| in_progress \| in_transit \| individual \| info \| intranet \| ipad \| italic \| job_seeked \| key \| laptop \| leaf \| ledger \| ledger_arrow_left \| ledger_arrow_right \| like \| like_no \| link \| lightbulb_off \| lightbulb_on \| link_card \| link_cloud \| link_on \| list_view \| locked \| login \| location \| logout \| lookup \| marker \| marker_off \| message \| microphone \| minimise \| minus \| minus_large \| mobile \| money_bag \| mute \| none \| normalscreen \| old_warning \| page \| palm_tree \| palette \| pause \| pause_circle \| pdf \| pin \| people \| people_switch \| percentage_boxed \| person \| person_add \| person_info \| person_tick \| petrol_pump \| phone \| picture_in_picture \| piggy_bank \| placeholder \| plane \| play \| play_circle \| plus \| plus_circle \| plus_large \| pound \| print \| progress \| progressed \| protect \| question \| question_hollow \| question_mark \| recruiting \| refresh \| refresh_clock \| remove \| replay \| sage_coin \| save \| scan \| send \| search \| services \| settings \| settings_old \| share \| shield_with_tick \| shield_with_tick_outline \| shop \| sort_down \| sort_up \| source_code \| spanner \| speaker \| split \| split_container \| squares_nine \| stacked_boxes \| stacked_squares \| stop \| stop_circle \| submitted \| subtitles \| support_online \| system_Android \| system_iOS \| sync \| tag \| talk \| target_man \| theatre_masks \| three_boxes \| tick \| tick_circle \| tick_thick \| time_zone \| true_tick \| u_turn_left \| u_turn_right \| underline \| undo \| unlocked \| upload \| uploaded \| user_groups \| video \| view \| volume_high \| volume_low \| volume_medium \| volunteering \| warning \| website \| welfare \| worldwide_location |  |  | Icon rendered within the button. Will not be rendered if size is small. |  |
| children | React.ReactNode | No |  |  |  | Content to display within the button. |  |
| disabled | boolean \| undefined | No |  |  |  | Disable the ButtonToggle. |  |
| id | string \| undefined | No |  |  |  | Override the auto-generated id on the button element. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by blur event on the button. |  |
| onClick | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by click event on the button. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by focus event on the button. |  |
| pressed | boolean \| undefined | No |  |  |  | Set the pressed state of the toggle button when used outside of a group. |  |
| size | "small" \| "medium" \| "large" \| undefined | No | small \| medium \| large |  |  | ButtonToggle size | "medium" |
| value | string \| undefined | No |  |  |  | An optional string by which to identify the button in an onChange handler on the parent ButtonToggleGroup. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| buttonIconSize | "small" \| "large" \| undefined | No | small \| large | Yes | `buttonIconSize` is no longer supported. | Sets the size of the buttonIcon |  |

## Examples
### Default

**Args**

```tsx
{
    "aria-label": "Button Toggle Group",
    value: "default-2",
  }
```

**Render**

```tsx
ControlledButtonToggleGroup
```


### WithLabelAndHint

**Args**

```tsx
{
    id: "with-label",
    label: "Label",
    inputHint: "Hint Text",
    value: "with-label-2",
  }
```


### Single

**Render**

```tsx
() => {
  const [isPressed, setIsPressed] = useState(true);

  const handleClick = () => {
    setIsPressed(!isPressed);
  };

  return (
    <ButtonToggle pressed={isPressed} onClick={handleClick}>
      ButtonToggle
    </ButtonToggle>
  );
}
```


### With Icon

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [leftValue, setLeftValue] = useState("icon-left-1");
  const [rightValue, setRightValue] = useState("icon-right-1");

  const handleOnChangeLeft = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setLeftValue(selectedValue as string);
  };

  const handleOnChangeRight = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setRightValue(selectedValue as string);
  };

  return (
    <>
      <ButtonToggleGroup
        {...args}
        id="icon-left"
        value={leftValue}
        onChange={handleOnChangeLeft}
        mb={2}
      >
        <ButtonToggle value="icon-left-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="icon-left-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
      </ButtonToggleGroup>
      <ButtonToggleGroup
        {...args}
        id="icon-right"
        value={rightValue}
        onChange={handleOnChangeRight}
        mb={2}
      >
        <ButtonToggle value="icon-right-1">
          Button 1
          <Icon aria-hidden type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="icon-right-2">
          Button 2
          <Icon aria-hidden type="placeholder" />
        </ButtonToggle>
      </ButtonToggleGroup>
    </>
  );
}
```


### Loading

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [value, setValue] = useState("");

  const handleOnChange = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    if (selectedValue === "loading-2") return;
    setValue(selectedValue as string);
  };

  return (
    <ButtonToggleGroup
      {...args}
      id="loading"
      value={value}
      onChange={handleOnChange}
      mb={2}
    >
      <ButtonToggle value="loading-1">Button 1</ButtonToggle>
      <ButtonToggle value="loading-2" aria-busy="true">
        <Loader
          variant="inline"
          loaderType="ring"
          size="extra-small"
          showLabel={false}
        />
      </ButtonToggle>
      <ButtonToggle value="loading-3">Button 3</ButtonToggle>
    </ButtonToggleGroup>
  );
}
```


### Sizes - Grouped

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [valueSmall, setValueSmall] = useState("small-2");
  const [valueMedium, setValueMedium] = useState("medium-2");
  const [valueLarge, setValueLarge] = useState("large-2");

  const handleOnChangeSmall = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueSmall(selectedValue as string);
  };

  const handleOnChangeMedium = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueMedium(selectedValue as string);
  };

  const handleOnChangeLarge = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueLarge(selectedValue as string);
  };

  return (
    <>
      <ButtonToggleGroup
        {...args}
        id="small"
        label="Small ButtonToggleGroup"
        value={valueSmall}
        onChange={handleOnChangeSmall}
        size="small"
        mb={2}
      >
        <ButtonToggle value="small-1">Button 1</ButtonToggle>
        <ButtonToggle value="small-2">Button 2</ButtonToggle>
        <ButtonToggle value="small-3">Button 3</ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="medium"
        label="Medium ButtonToggleGroup"
        value={valueMedium}
        onChange={handleOnChangeMedium}
        size="medium"
        mb={2}
      >
        <ButtonToggle value="medium-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="medium-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="medium-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="large"
        label="Large ButtonToggleGroup"
        value={valueLarge}
        onChange={handleOnChangeLarge}
        size="large"
      >
        <ButtonToggle value="large-1">
          <Icon aria-hidden type="placeholder" />
          Button 1
        </ButtonToggle>
        <ButtonToggle value="large-2">
          <Icon aria-hidden type="placeholder" />
          Button 2
        </ButtonToggle>
        <ButtonToggle value="large-3">
          <Icon aria-hidden type="placeholder" />
          Button 3
        </ButtonToggle>
      </ButtonToggleGroup>
    </>
  );
}
```


### Sizes - Single

**Render**

```tsx
() => {
  const [isPressedSmall, setIsPressedSmall] = useState(true);
  const [isPressedMedium, setIsPressedMedium] = useState(true);
  const [isPressedLarge, setIsPressedLarge] = useState(true);

  const handleClickSmall = () => {
    setIsPressedSmall(!isPressedSmall);
  };

  const handleClickMedium = () => {
    setIsPressedMedium(!isPressedMedium);
  };

  const handleClickLarge = () => {
    setIsPressedLarge(!isPressedLarge);
  };

  return (
    <Box display="flex" justifyContent="space-around">
      <ButtonToggle
        pressed={isPressedSmall}
        onClick={handleClickSmall}
        size="small"
      >
        <Icon aria-hidden type="placeholder" /> Small ButtonToggle
      </ButtonToggle>
      <ButtonToggle
        pressed={isPressedMedium}
        onClick={handleClickMedium}
        size="medium"
      >
        <Icon aria-hidden type="placeholder" /> Medium ButtonToggle
      </ButtonToggle>
      <ButtonToggle
        pressed={isPressedLarge}
        onClick={handleClickLarge}
        size="large"
      >
        <Icon aria-hidden type="placeholder" /> Large ButtonToggle
      </ButtonToggle>
    </Box>
  );
}
```


### Icon Only - Grouped

**Render**

```tsx
({ ...args }: ButtonToggleGroupProps) => {
  const [valueMedium, setValueMedium] = useState("medium-2");
  const [valueLarge, setValueLarge] = useState("large-2");

  const handleOnChangeMedium = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueMedium(selectedValue as string);
  };

  const handleOnChangeLarge = (
    ev: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) => {
    setValueLarge(selectedValue as string);
  };

  return (
    <>
      <ButtonToggleGroup
        {...args}
        id="medium"
        label="Medium"
        value={valueMedium}
        onChange={handleOnChangeMedium}
        size="medium"
        mb={2}
      >
        <ButtonToggle value="medium-1">
          <Icon ariaLabel="Placeholder 1" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="medium-2">
          <Icon ariaLabel="Placeholder 2" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="medium-3">
          <Icon ariaLabel="Placeholder 3" type="placeholder" />
        </ButtonToggle>
      </ButtonToggleGroup>

      <ButtonToggleGroup
        {...args}
        id="large"
        label="Large"
        value={valueLarge}
        onChange={handleOnChangeLarge}
        size="large"
      >
        <ButtonToggle value="large-1">
          <Icon ariaLabel="Placeholder 1" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="large-2">
          <Icon ariaLabel="Placeholder 2" type="placeholder" />
        </ButtonToggle>
        <ButtonToggle value="large-3">
          <Icon ariaLabel="Placeholder 3" type="placeholder" />
        </ButtonToggle>
      </ButtonToggleGroup>
    </>
  );
}
```


### Icon Only - Single

**Render**

```tsx
() => {
  const [isPressedSmall, setIsPressedSmall] = useState(true);
  const [isPressedMedium, setIsPressedMedium] = useState(true);
  const [isPressedLarge, setIsPressedLarge] = useState(true);

  const handleClickSmall = () => {
    setIsPressedSmall(!isPressedSmall);
  };

  const handleClickMedium = () => {
    setIsPressedMedium(!isPressedMedium);
  };

  const handleClickLarge = () => {
    setIsPressedLarge(!isPressedLarge);
  };

  return (
    <Box display="flex" justifyContent="space-around">
      <ButtonToggle
        pressed={isPressedSmall}
        onClick={handleClickSmall}
        size="small"
      >
        <Icon ariaLabel="Placeholder 1" type="placeholder" />
      </ButtonToggle>
      <ButtonToggle
        pressed={isPressedMedium}
        onClick={handleClickMedium}
        size="medium"
      >
        <Icon ariaLabel="Placeholder 2" type="placeholder" />
      </ButtonToggle>
      <ButtonToggle
        pressed={isPressedLarge}
        onClick={handleClickLarge}
        size="large"
      >
        <Icon ariaLabel="Placeholder 3" type="placeholder" />
      </ButtonToggle>
    </Box>
  );
}
```


### AllowDeselect

**Args**

```tsx
{
    id: "allow-deselect",
    value: "allow-deselect-2",
    allowDeselect: true,
  }
```


### FullWidth

**Args**

```tsx
{
    id: "full-width",
    value: "full-width-2",
    fullWidth: true,
  }
```


### Disabled

**Args**

```tsx
{
    id: "disabled",
    label: "Disabled",
    inputHint: "Hint Text",
    value: "disabled-2",
    disabled: true,
  }
```

