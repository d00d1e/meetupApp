Feature: Specify Number of Events

Scenario: When user hasnt specified a number, 32 is the default number
  Given app is loaded
  And the list of events is loaded
  When user has not specified the number of events to show
  Then the default number of events shown is 32
Scenario: User can change the number of events they want to see
  Given app is loaded 
  And the list of events is loaded
  When user changes the number of events shown
  Then the page should updated to reflect the number of events specified