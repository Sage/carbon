Feature: Portrait default component
	I want to test Portrait default component

	@positive
	Scenario Outline: Change Portrait alt to <alt>
		When I open default "Portrait Test" component with "portrait" json from "commonComponents" using "<nameOfObject>" object name
		Then Portrait alt on preview is set to <alt>
		Examples:
			| alt                          | nameOfObject        |
			| mp150ú¿¡üßä                  | altOtherLanguage    |
			| !@#$%^*()_+-=~[];:.,?{}&"'<> | altSpecialCharacter |

	@positive
	Scenario Outline: Render specified icon type <iconType>
		When I open default "Portrait Test" component with "portrait" json from "commonComponents" using "<nameOfObject>" object name
		Then <iconType> icon component should be rendered
		Examples:
			| iconType   | nameOfObject  |
			| individual | iconTypeNone  |
			| image      | iconTypeImage |
			| copy       | iconTypeCopy  |