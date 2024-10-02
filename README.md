# Datepicker &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE)

This Datepicker is a custom web component, which was written with HTML, JavaScript, and CSS. You can use it in any html page.

## Reference

- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

## Online Demo

[Demo in CodePen](https://codepen.io/Chuanbao-Lu/pen/JjgGeGo).

## How to run locally

1. Run `npx tailwindcss -i './src/input.css' -o './src/output.css' --watch`
2. Start Live Server
3. Open [http://127.0.0.1:5500/src/index.html](http://127.0.0.1:5500/src/index.html) in your browser

## Keyboard Support

### Choose Date Button

| Key          | Function                                                                                                                                                                                                   |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Space, Enter | <ul><li>Open the date picker dialog.</li><li>Move focus to selected date, i.e., the date displayed in the date input text field. If no date has been selected, places focus on the current date.</li></ul> |

### Date Picker Dialog

| Key         | Function                                                                                                                                                                                                                                                                                                                                  |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ESC         | Closes the dialog and returns focus to the "Choose Date" button.                                                                                                                                                                                                                                                                          |
| Tab         | <ul><li>Moves focus to next element in the dialog Tab sequence.</li><li>Note that, as specified in the <a href="../../../grid/">Grid Pattern</a>, only one button in the calendar grid is in the Tab sequence.</li><li>If focus is on the last button (i.e., "OK"), moves focus to the first button (i.e. "Previous Year").</li></ul>     |
| Shift + Tab | <ul><li>Moves focus to previous element in the dialog Tab sequence.</li><li>Note that, as specified in the <a href="../../../grid/">Grid Pattern</a>, only one button in the calendar grid is in the Tab sequence.</li><li>If focus is on the first button (i.e., "Previous Year"), moves focus to the last button (i.e. "OK").</li></ul> |

### Date Picker Dialog: Month/Year Buttons

| Key         | Function                                                     |
| :---------- | :----------------------------------------------------------- |
| Space,Enter | Change the month and/or year displayed in the calendar grid. |

### Date Picker Dialog: Date Grid

| Key               | Function                                                                                                                                                                                                                                                           |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Space,Enter       | <ul><li>Select the date, close the dialog, and move focus to the "Choose Date" button.</li><li>Update the value of the "Date" input with the selected date.</li><li>Update the accessible name of the "Choose Date" button to include the selected date.</li></ul> |
| Up Arrow          | Moves focus to the same day of the previous week.                                                                                                                                                                                                                  |
| Down Arrow        | Moves focus to the same day of the next week.                                                                                                                                                                                                                      |
| Right Arrow       | Moves focus to the next day.                                                                                                                                                                                                                                       |
| Left Arrow        | Moves focus to the previous day.                                                                                                                                                                                                                                   |
| Home              | Moves focus to the first day (e.g Sunday) of the current week.                                                                                                                                                                                                     |
| End               | Moves focus to the last day (e.g. Saturday) of the current week.                                                                                                                                                                                                   |
| Page Up           | <ul><li>Changes the grid of dates to the previous month.</li><li>Moves focus to the day of the month that has the same number. If that day does not exist, moves focus to the last day of the month.</li></ul>                                                     |
| Shift + Page Up   | <ul><li>Changes the grid of dates to the same month in the previous year.</li><li>Moves focus to the day of the month that has the same number. If that day does not exist, moves focus to the last day of the month.</li></ul>                                    |
| Page Down         | <ul><li>Changes the grid of dates to the next month.</li><li>Moves focus to the day of the month that has the same number. If that day does not exist, moves focus to the last day of the month.</li></ul>                                                         |
| Shift + Page Down | <ul><li>Changes the grid of dates to the same month in the next year.</li><li>Moves focus to the day of the month that has the same number.If that day does not exist, moves focus to the last day of the month.</li></ul>                                         |

### Date Picker Dialog: OK and Cancel Buttons

| Key         | Function                                                                                                                                                                                                                                                                                                                          |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Space,Enter | Activates the button: <ul><li>"Cancel": Closes the dialog, moves focus to "Choose Date" button, does not update date in date input.</li><li>"OK": Closes the dialog, moves focus to "Choose Date" button, updates date in date input, updates accessible name of the "Choose Date" button to include the selected date.</li></ul> |
