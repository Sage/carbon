Feature: Design Systems Menu component
	I want to test the Design Systems Menu component

	Background: Open Menu on scrollable menu story
		Given I open "Design System Menu" component page "scrollable-submenu" in no iframe

  @positive
  Scenario Outline: Test that the scroll block within a submenu is scrollable 
    When I open the "<position>" submenu
      And I scroll to the bottom of the block
    Then The last element is visible
    Examples:
    | position |
    | first    |
    | second   |