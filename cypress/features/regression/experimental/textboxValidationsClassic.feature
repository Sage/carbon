Feature: Textbox validations component
    I want to change Textbox validations component properties

    Background: Open Textbox validations classic component page
        Given I open "Experimental Textbox" component page validations classic

    @positive
    Scenario Outline: Verify the <state> validation of Textbox component
        Given Type "<keyWord>" text into input
            And I click outside of the component
        When I hover mouse onto icon
        Then tooltipPreview on preview is set to '<text>'
            And icon on preview is "<state>"
        Examples:
            | state   | keyWord | text                                            |
            | info    | info    | This value should be longer than 12 characters  |
            | warning | warning | This value must not include the word "warning"! |
            | error   | error   | This value must not include the word "error"!   |

