Feature: Portrait default component
	I want to check Portrait default component

	@positive
	Scenario Outline: Change Portrait alt to <alt>
		When I open default "Portrait" component in noIFrame with "portrait" json from "commonComponents" using "<nameOfObject>" object name
		Then Portrait alt on preview is set to <alt>
		Examples:
			| alt                          | nameOfObject        |
			| mp150ú¿¡üßä                  | altOtherLanguage    |
			| !@#$%^*()_+-=~[];:.,?{}&"'<> | altSpecialCharacter |

	# value which is rendering as src doesn't work properly for CI
	# ignored regression
	@ignore
	Scenario: Enable darkBackground checkbox for a Portrait component
		When I check darkBackground checkbox
		Then Portrait initials value is set to "DARK"

	# value which is rendering as src doesn't work properly for CI
	# ignored regression
	@ignore
	Scenario: Enable and disable darkBackground checkbox for a Portrait component
		Given I check darkBackground checkbox
		When I uncheck darkBackground checkbox
		Then Portrait initials value is set to "AZ"

	@positive
	Scenario: Set Portrait source to src
		When I open default "Portrait" component in noIFrame with "portrait" json from "commonComponents" using "sourceSrc" object name
		Then Portrait source is set to "src"

	# src is rendering as img
	@ignore
	Scenario: Set Portrait source to gravatar
		Given I select source to "gravatar"
		When I set gravatar to "ABC"
		Then Portrait source is set to "https://www.gravatar.com/avatar/900150983cd24fb0d6963f7d28e17f72?s=60&d=blank"

	@positive
	Scenario Outline: Set Portrait src to <source>
		When I open default "Portrait" component in noIFrame with "portrait" json from "commonComponents" using "src" object name
		Then Portrait src value is set to "<source>"

	# value which is rendering as src doesn't work properly for CI
	# ignored regression
	@ignore
	Scenario Outline: Change Portrait initials to <initials>
		When I set initials to "<initials>"
		Then Portrait initials value is set to "<initials>"
		Examples:
			| initials |
			| KK       |
			| BC       |
			| DEF      |

	# src is rendering as img
	@ignore
	Scenario Outline: Set Portrait gravatar to <gravatar>
		Given I select source to "gravatar"
		When I set gravatar to "<gravatar>"
		Then Portrait gravatar value is set to "<result>"
		Examples:
			| gravatar | result                                                                        |
			| A        | https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661?s=60&d=blank |
			| BC       | https://www.gravatar.com/avatar/5360af35bde9ebd8f01f492dc059593c?s=60&d=blank |
			| DEF      | https://www.gravatar.com/avatar/4ed9407630eb1000c0f6b63842defa7d?s=60&d=blank |

	@positive
	Scenario Outline: Set Portrait shape to <shape>
		When I open default "Portrait" component in noIFrame with "portrait" json from "commonComponents" using "<nameOfObject>" object name
		Then Portrait shape value is set to "<shape>"
		Examples:
			| shape  | nameOfObject |
			| circle | shapeCircle  |
			| square | shapeSquare  |

	@positive
	Scenario Outline: Set Portrait size to <size>
		When I open default "Portrait" component in noIFrame with "portrait" json from "commonComponents" using "<nameOfObject>" object name
		Then Portrait size has "<sizeInPx>"
		Examples:
			| size | sizeInPx | nameOfObject |
			| XS   | 24       | sizeXS       |
			| S    | 32       | sizeS        |
			| M    | 40       | sizeM        |
			| ML   | 56       | sizeML       |
			| L    | 72       | sizeL        |
			| XL   | 104      | sizeXL       |
			| XXL  | 128      | sizeXXL      |