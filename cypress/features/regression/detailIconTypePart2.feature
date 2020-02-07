Feature: Detail component
  I want to change Detail component properties

  Background: Open Detail component page
    Given I open "Detail" component page

  @positive
  Scenario Outline: Change Detail icon to <iconName>
    When I set detail icon to "<iconName>"
    Then icon on preview is "<iconName>"
    Examples:
      | iconName     |
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

  @positive
  Scenario Outline: Change Detail icon to <iconName>
    When I set detail icon to "<iconName>"
    Then icon on preview is "<iconDataElement>"
    Examples:
      | iconName | iconDataElement |
      | messages | message         |
      | help     | question        |