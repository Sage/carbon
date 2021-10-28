Feature: File Input component
  I want to check File Input component properties

  @positive
  Scenario Outline: Attach <file> in File Input
    Given I open "File Input" component page "default"
    When I attach the file "<file>" to the "first" input
    Then "<file>" file should be attached to the File Input
      And "Remove" button is visible
    Examples:
      | file     |
      | file.png |
      | file.mov |

  @positive
  Scenario: Attach file with very long title in File Input - the file name should be formatted
    Given I open "File Input" component page "default"
    When I attach the file "file_with_very_long_title.png" to the "first" input
    Then "file_with_...itle.png" file should be attached to the File Input
      And "Remove" button is visible

  @positive
  Scenario: Delete attached file
    Given I open "File Input" component page "default"
      And I attach the file "file.png" to the "first" input
      And "file.png" file should be attached to the File Input
    When I click "Remove" button
    Then File Input should be empty
      And "Choose" button is visible
      
  @positive
  Scenario: Attach few files in File Input
    Given I open "File Input" component page "allow multiple"
    When I attach few files to the "first" input
    Then 2 files should be attached to the File Input
      And "Remove" button is visible

  @positive
  Scenario Outline: Attach <file> in File Input when isUploading
    Given I open "File Input" component page "is uploading"
    When I attach the file "<file>" to the "first" input
    Then "<file>" file should be attached to the File Input
      And Loader bar is visible when isUploading
      And "Cancel" button is visible
    Examples:
      | file     |
      | file.png |
      | file.mov |

  @positive
  Scenario: Attach file with very long title in File Input when isUploading - the file name should be formatted
    Given I open "File Input" component page "is uploading"
    When I attach the file "file_with_very_long_title.png" to the "first" input
    Then "file_with_...itle.png" file should be attached to the File Input
      And Loader bar is visible when isUploading
      And "Cancel" button is visible

  @positive
  Scenario: Delete attached file when isUploading
    Given I open "File Input" component page "is uploading"
      And I attach the file "file.png" to the "first" input
      And "file.png" file should be attached to the File Input
    When I click "Cancel" button
    Then File Input should be empty
      And "Choose" button is visible
      And Loader bar is visible when isUploading

  @positive
  Scenario Outline: Attach <file> in File Input using Drag&Drop
    Given I open "File Input" component page "draggable"
    When I drag&drop the file "<file>" to the "first" input
    Then "<file>" file should be attached to the File Input
      And "Remove" button is visible
    Examples:
      | file     |
      | file.png |
      | file.mov |

  @positive
  Scenario: Attach file with very long title in File Input using Drag&Drop - the file name should be formatted
    Given I open "File Input" component page "draggable"
    When I drag&drop the file "file_with_very_long_title.png" to the "first" input
    Then "file_with_...itle.png" file should be attached to the File Input
      And "Remove" button is visible

   @positive
  Scenario: Delete attached file when File Input is draggable
    Given I open "File Input" component page "draggable"
      And I drag&drop the file "file.png" to the "first" input
      And "file.png" file should be attached to the File Input
    When I click "Remove" button
    Then File Input should be empty
      And "Choose" button is visible

  @positive
  Scenario: Attach few files in File Input
    Given I open "File Input" component page "draggable multiple"
    When I attach few files to the "first" input
    Then 2 files should be attached to the File Input
      And "Remove" button is visible

  @positive
  Scenario: Attach file more than max-size in File Input and verify the validation error
    Given I open "File Input" component page "with validation"
    When I attach the file "file.mov" to the "first" input
    Then validation "This file is too big" info is presented

  @negative
  Scenario: Attach file more than max-size in File Input few times and verify the validation error
    Given I open "File Input" component page "with validation"
      And I attach the file "file.mov" to the "first" input
      And validation "This file is too big" info is presented
      And I click "Remove" button
    When I attach the file "file.mov" to the "first" input
    Then validation "This file is too big" info is presented

  @negative
  Scenario: Attach file in File Input - with wrong extension
    Given I open "File Input" component page "accept property"
    When I attach the file "file.mov" to the "first" input
    Then validation "Invalid file type!" info is presented
      And "Remove" button is visible