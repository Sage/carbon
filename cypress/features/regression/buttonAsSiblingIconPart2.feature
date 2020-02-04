Feature: Button as a sibling component
  I want to check Button as a sibling component properties

  Background: Open Button as a sibling component page default
    Given I open "Button" component page as sibling in no iframe
      And I check has icon checkbox

  @positive
  Scenario Outline: Set Button icon to <iconType>
    When I select iconType to "<iconType>"
    Then Button as a sibling icon is set to "<iconType>"
    Examples:
      | iconType     |
      | feedback     |
      | filter       |
      | filter_new   |
      | fit_height   |
      | fit_width    |
      | folder       |
      | gift         |
      | graph        |
      | grid         |
      | home         |
      | image        |
      | in_progress  |
      | in_transit   |
      | info         |
      | individual   |
      | key          |
      | link         |
      | list_view    |
      | locked       |
      | location     |
      | logout       |
      | lookup       |
      | marker       |
      | message      |
      | minus        |
      | minus_large  |
      | mobile       |
      | pause_circle |
      | pdf          |
      | people       |
      | person       |
      | phone        |
      | play         |
      | play_circle  |
      | plus         |
      | plus_large   |
      | print        |
      | progress     |
      | progressed   |
      | question     |
      | refresh      |
      | remove       |
      | save         |
      | scan         |
      | search       |
      | services     |
      | settings     |
      | share        |
      | shop         |
      | sort_down    |
      | sort_up      |
      | submitted    |
      | sync         |
      | tick         |
      | unlocked     |
      | upload       |
      | uploaded     |
      | video        |
      | view         |
      | warning      |