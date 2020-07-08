Feature: Accessibility tests - Design System folder
  I want to check that all components have no violations

  @accessibility
  Scenario: Design System Accordion component primary page closed state
    When I open design systems primary "Accordion" component in no iframe
    Then "Accordion primary page" component has no accessibility violations

  @accessibility
  Scenario: Design System Accordion component primary page opened state
    Given I open design systems primary "Accordion" component in no iframe
    When I expand Design System accordionRow via click in NoIFrame
    Then "Accordion primary page" component has no accessibility violations

  @accessibility
  Scenario: Design System Accordion component secondary page
    When I open design systems secondary "Accordion" component in no iframe
    Then "Accordion secondary page" component has no accessibility violations

  @accessibility
  Scenario: Design System Accordion component styles_overriden page
    When I open design systems styles_overriden "Accordion" component in no iframe
    Then "Accordion styles_overriden page" component has no accessibility violations

  @accessibility
  Scenario: Design System Accordion component with_dynamic_content page
    When I open design systems with_dynamic_content "Accordion" component in no iframe
    Then "Accordion with_dynamic_content page" component has no accessibility violations

  @accessibility
  Scenario: Design System Action Popover component keyboard_access page
    Given I open design systems keyboard_access "ActionPopover" component in no iframe
    When I click the menu button element in noiFrame
    Then "Action Popover keyboard_access page" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario: Design System Advanced Color Picker component default story page
    Given I open design systems default_story "Advanced Color Picker" component in no iframe
    When I open Advanced Color Picker in noIFrame
    Then "Advanced Color Picker" component has no accessibility violations

  @accessibility
  Scenario Outline: Component <component> basic default page
    When I open basic Test "<component>" component page in noIframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | Anchornavigation    |
      | Button Toggle Group |
      | duellingpicklist    |
      | Numeral Date        |

  @accessibility
  Scenario: Design System Button component primary page
    When I open design systems primary "Button" component in no iframe
    Then "Button primary page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component primary_destructive page
    When I open design systems primary_destructive "Button" component in no iframe
    Then "Button primary_destructive page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component primary_disabled page
    When I open design systems primary_disabled "Button" component in no iframe
    Then "Button primary_disabled page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component primary_full_width page
    When I open design systems primary_full_width "Button" component in no iframe
    Then "Button primary_full_width page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component primary_icon page
    When I open design systems primary_icon "Button" component in no iframe
    Then "Button primary_icon page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component secondary page
    When I open design systems secondary "Button" component in no iframe
    Then "Button secondary page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component secondary_destructive page
    When I open design systems secondary_destructive "Button" component in no iframe
    Then "Button secondary_destructive page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component secondary_disabled page
    When I open design systems secondary_disabled "Button" component in no iframe
    Then "Button secondary_disabled page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component secondary_full_width page
    When I open design systems secondary_full_width "Button" component in no iframe
    Then "Button secondary_full_width page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component secondary_icon page
    When I open design systems secondary_icon "Button" component in no iframe
    Then "Button secondary_icon page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component tertiary page
    When I open design systems tertiary "Button" component in no iframe
    Then "Button tertiary page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component tertiary_destructive page
    When I open design systems tertiary_destructive "Button" component in no iframe
    Then "Button tertiary_destructive page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component tertiary_disabled page
    When I open design systems tertiary_disabled "Button" component in no iframe
    Then "Button tertiary_disabled page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component tertiary_full_width page
    When I open design systems tertiary_full_width "Button" component in no iframe
    Then "Button tertiary_full_width page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component tertiary_icon page
    When I open design systems tertiary_icon "Button" component in no iframe
    Then "Button tertiary_icon page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component dashed page
    When I open design systems dashed "Button" component in no iframe
    Then "Button dashed page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component dashed_disabled page
    When I open design systems dashed_disabled "Button" component in no iframe
    Then "Button dashed_disabled page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component dashed_full_width page
    When I open design systems dashed_full_width "Button" component in no iframe
    Then "Button dashed_full_width page" component has no accessibility violations

  @accessibility
  Scenario: Design System Button component dashed_icon page
    When I open design systems dashed_icon "Button" component in no iframe
    Then "Button dashed_icon page" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component visual page
    When I open visual Test "<component>" component page in noIframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component   |
      | Drawer      |
      | Grid        |

  @accessibility
  Scenario: Design System Form component
    When I open design systems with_both_errors_and_warnings_summary "Form" component in no iframe
    Then "Form" component has no accessibility violations

  @accessibility
  Scenario: Design System Form component
    When I open validations Test "Numeral Date" component page in noIframe
    Then "Numeral Date" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario: Design System Popover Container component basic page
    Given I open design systems basic "Popover Container" component in no iframe
    When I open popover container in NoIFrame
    Then "Popover Container" component has no accessibility violations

  @accessibility
  Scenario Outline: Design System <component> component basic page
    When I open design systems basic "<component>" component in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component       |
      | Badge           |
      | Batch Selection |
      | Draggable       |
      | Flat Table      |
      | Tile Select     |

  @accessibility
  Scenario Outline: Design System <component> component default story page
    When I open design systems default_story "<component>" component in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | Pager     |
      | Search    |