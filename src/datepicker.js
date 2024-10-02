const locale = window.navigator.language.startsWith("fr") ? "fr" : "en";
const messages = {
  en: {
    chooseDate: "Choose Date",
    changeDate: "Change Date",
    prevYear: "previous year",
    prevMonth: "previous month",
    nextYear: "next year",
    nextMonth: "next month",
    ok: "OK",
    cancel: "Cancel",
    dayLabels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayAbbreviations: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthLabels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    instructionCursorKeys: "Cursor keys can navigate dates",
  },
  fr: {
    chooseDate: "Choisissez la date",
    changeDate: "Changez la date",
    prevYear: "Année précédente",
    prevMonth: "Le mois précédent",
    nextMonth: "Le mois prochain",
    nextYear: "L'année prochaine",
    ok: "OK	D'accord",
    cancel: "Annuler",
    dayLabels: [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ],
    dayAbbreviations: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
    monthLabels: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
    instructionCursorKeys:
      "Les touches du curseur permettent la navigation des dates",
  },
};

const templateHtml = `
<style>
    .datepicker {
    position: relative;
  }

  .datepicker .group {
    display: inline-block;
    position: relative;
    width: 13em;
  }

  .datepicker label {
    display: block;
  }

  .datepicker input {
    padding: 0;
    margin: 0;
    height: 1.5em;
    background-color: white;
    color: black;
    border: 1px solid gray;
  }

  .datepicker button.icon {
    position: relative;
    top: 0.25em;
    margin: 0;
    padding: 4px;
    border: 0 solid #005a9c;
    background-color: white;
    border-radius: 5px;
  }

  .datepicker .desc {
    position: absolute;
    left: 0;
    top: 2em;
  }

  .datepicker .fa-calendar-alt {
    color: hsl(216deg 89% 51%);
  }

  .datepicker-dialog {
    position: absolute;
    width: 320px;
    clear: both;
    border: 3px solid hsl(216deg 80% 51%);
    margin-top: 0.15em;
    border-radius: 5px;
    padding: 0;
    background-color: #fff;
  }

  .datepicker-dialog .header {
    cursor: default;
    background-color: hsl(216deg 80% 51%);
    padding: 7px;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    display: flex;
    justify-content: space-around;
  }

  .datepicker-dialog h2 {
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 1em;
    color: white;
    text-transform: none;
    font-weight: bold;
    border: none;
  }

  .datepicker-dialog button {
    border-style: none;
    background: transparent;
  }

  .datepicker-dialog button::-moz-focus-inner {
    border: 0;
  }

  .datepicker-dialog .dates {
    width: 320px;
  }

  .datepicker-dialog .header .prev-year,
  .datepicker-dialog .header .prev-month,
  .datepicker-dialog .header .next-month,
  .datepicker-dialog .header .next-year {
    padding: 4px;
    width: 24px;
    height: 24px;
    color: white;
  }

  .datepicker-dialog .prev-year:focus,
  .datepicker-dialog .prev-month:focus,
  .datepicker-dialog .next-month:focus,
  .datepicker-dialog .next-year:focus {
    padding: 2px;
    border: 2px solid white;
    border-radius: 4px;
    outline: 0;
  }

  .datepicker-dialog .prev-year:hover,
  .datepicker-dialog .prev-month:hover,
  .datepicker-dialog .next-month:hover,
  .datepicker-dialog .next-year:hover {
    padding: 3px;
    border: 1px solid white;
    border-radius: 4px;
  }

  .datepicker-dialog .dialog-ok-cancel-group {
    text-align: right;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-right: 1em;
    display: flex;
    justify-content: end;    
  }

  .datepicker-dialog .dialog-ok-cancel-group button {
    padding: 6px;
    margin-left: 1em;
    width: 5em;
    background-color: #075985;
    font-size: 0.85em;
    color: white;
    outline: none;
    border-radius: 5px;
  }

  .datepicker-dialog .dialog-button:focus {
    background-color: #0c4a6e;
    padding: 4px;
    border: 2px solid black;
  }

  .datepicker-dialog .dialog-button:hover {
    background-color: #0c4a6e;
    padding: 5px;
    border: 1px solid black;
  }

  .datepicker-dialog .fa-calendar-alt {
    color: hsl(216deg 89% 51%);
  }

  .datepicker-dialog .month-year {
    display: inline-block;
    width: 12em;
    text-align: center;
  }

  .datepicker-dialog table.dates {
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    border: none;
    border-collapse: separate;
  }

  .datepicker-dialog table.dates th,
  .datepicker-dialog table.dates td {
    text-align: center;
    background: white;
    color: black;
    border: none;
  }

  .datepicker-dialog table.dates tr {
    border: 1px solid black;
  }

  .datepicker-dialog table.dates td {
    padding: 3px;
    margin: 0;
    line-height: inherit;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    font-size: 15px;
    background: #eee;
  }

  .datepicker-dialog table.dates td.disabled {
    padding: 2px;
    border: none;
    height: 41px;
    width: 41px;
  }

  .datepicker-dialog table.dates td:focus,
  .datepicker-dialog table.dates td:hover {
    padding: 0;
    background-color: hsl(216deg 80% 92%);
    color: black;
    opacity: 0.9;
  }

  .datepicker-dialog table.dates td:focus {
    padding: 1px;
    border: 2px solid rgb(100 100 100);
    outline: 0;
  }

  .datepicker-dialog table.dates td:not(.disabled):hover {
    padding: 2px;
    border: 1px solid rgb(100 100 100);
  }

  .datepicker-dialog table.dates td[aria-selected] {
    padding: 1px;
    border: 2px dotted rgb(100 100 100);
  }

  .datepicker-dialog table.dates td[aria-selected]:focus {
    padding: 1px;
    border: 2px solid rgb(100 100 100);
  }

  .datepicker-dialog table.dates td[tabindex="0"] {
    background-color: hsl(216deg 80% 51%);
    color: white;
  }

  .datepicker-dialog .dialog-message {
    padding-top: 0.25em;
    padding-left: 1em;
    height: 1.75em;
    background: hsl(216deg 80% 51%);
    color: white;
  }
</style>

<div class="datepicker">
    <slot class="date" name="input-slot"></slot>

    <div class="datepicker-dialog" role="dialog" aria-modal="true" aria-label="${
      messages[locale].chooseDate
    }">
        <div class="header">
            <button type="button" class="prev-year" aria-label="${
              messages[locale].prevYear
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 40 40"><path fill="currentColor" d="M12.5 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z M20.5 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"></path></svg>
            </button>
            <button type="button" class="prev-month" aria-label="${
              messages[locale].prevMonth
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 40 40"><path fill="currentColor" d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
            </button>
            <h2 id="id-grid-label" class="month-year" aria-live="polite">February 2020</h2>
            <button type="button" class="next-month" aria-label="${
              messages[locale].nextMonth
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 40 40"><path fill="currentColor" d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
            </button>
            <button type="button" class="next-year" aria-label="${
              messages[locale].nextYear
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 40 40"><path fill="currentColor" d="M3.5 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z M11.5 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
            </button>
        </div>

        <div class="table-wrap">
            <table class="dates" role="grid" aria-labelledby="id-grid-label">
                <thead>
                    <tr>
                        <th scope="col" aria-label="${
                          messages[locale].dayLabels[0]
                        }" abbr="${messages[locale].dayLabels[0]}">${
  messages[locale].dayAbbreviations[0]
}
                        </th>
                        <th scope="col" aria-label="${
                          messages[locale].dayLabels[1]
                        }" abbr="${messages[locale].dayLabels[1]}">${
  messages[locale].dayAbbreviations[1]
}
                        </th>
                        <th scope="col" aria-label="${
                          messages[locale].dayLabels[2]
                        }" abbr="${messages[locale].dayLabels[2]}">${
  messages[locale].dayAbbreviations[2]
}
                        </th>
                        <th scope="col" aria-label="${
                          messages[locale].dayLabels[3]
                        }" abbr="${messages[locale].dayLabels[3]}">${
  messages[locale].dayAbbreviations[3]
}
                        </th>
                        <th scope="col" aria-label="${
                          messages[locale].dayLabels[4]
                        }" abbr="${messages[locale].dayLabels[4]}">${
  messages[locale].dayAbbreviations[4]
}
                        </th>
                        <th scope="col" aria-label="${
                          messages[locale].dayLabels[5]
                        }" abbr="${messages[locale].dayLabels[5]}">${
  messages[locale].dayAbbreviations[5]
}
                        </th>
                        <th scope="col" aria-label="${
                          messages[locale].dayLabels[6]
                        }" abbr="${messages[locale].dayLabels[6]}">${
  messages[locale].dayAbbreviations[6]
}
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="dialog-ok-cancel-group">
          <button type="button" class="dialog-button" value="ok">
              ${messages[locale ?? "en"].ok}
          </button>  
          <button type="button" class="dialog-button" value="cancel">
              ${messages[locale ?? "en"].cancel}
          </button>
        </div>
        <div class="dialog-message" aria-live="polite"></div>
    </div>
</div>
`;

const template = document.createElement("template");
template.innerHTML = templateHtml;

customElements.define(
  "date-picker",
  class DatePicker extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.lastRowNode = null;

      this.days = [];

      this.focusDay = new Date();
      this.selectedDay = new Date(0, 0, 1);

      this.lastDate = -1;

      this.isMouseDownOnBackground = false;
    }

    connectedCallback() {
      const inputSlot = this.shadowRoot.querySelector(
        "slot[name='input-slot']"
      );
      inputSlot.addEventListener("slotchange", () => {
        const assignedNodes = inputSlot.assignedNodes()[0];
        this.textboxNode = assignedNodes.querySelector("input");
        this.buttonNode = assignedNodes.querySelector("button");
        this.init();
      });
    }

    init() {
      this.dialogNode = this.shadowRoot.querySelector('[role="dialog"]');
      this.messageNode = this.dialogNode.querySelector(".dialog-message");
      this.monthYearNode = this.dialogNode.querySelector(".month-year");

      this.prevYearNode = this.dialogNode.querySelector(".prev-year");
      this.prevMonthNode = this.dialogNode.querySelector(".prev-month");
      this.nextMonthNode = this.dialogNode.querySelector(".next-month");
      this.nextYearNode = this.dialogNode.querySelector(".next-year");

      this.okButtonNode = this.dialogNode.querySelector('button[value="ok"]');
      this.cancelButtonNode = this.dialogNode.querySelector(
        'button[value="cancel"]'
      );

      this.tbodyNode = this.dialogNode.querySelector("table.dates tbody");

      this.buttonNode.addEventListener(
        "keydown",
        this.handleButtonKeydown.bind(this)
      );
      this.buttonNode.addEventListener(
        "click",
        this.handleButtonClick.bind(this)
      );

      this.okButtonNode.addEventListener(
        "click",
        this.handleOkButton.bind(this)
      );
      this.okButtonNode.addEventListener(
        "keydown",
        this.handleOkButton.bind(this)
      );

      this.cancelButtonNode.addEventListener(
        "click",
        this.handleCancelButton.bind(this)
      );
      this.cancelButtonNode.addEventListener(
        "keydown",
        this.handleCancelButton.bind(this)
      );

      this.prevMonthNode.addEventListener(
        "click",
        this.handlePreviousMonthButton.bind(this)
      );
      this.nextMonthNode.addEventListener(
        "click",
        this.handleNextMonthButton.bind(this)
      );
      this.prevYearNode.addEventListener(
        "click",
        this.handlePreviousYearButton.bind(this)
      );
      this.nextYearNode.addEventListener(
        "click",
        this.handleNextYearButton.bind(this)
      );

      this.prevMonthNode.addEventListener(
        "keydown",
        this.handlePreviousMonthButton.bind(this)
      );
      this.nextMonthNode.addEventListener(
        "keydown",
        this.handleNextMonthButton.bind(this)
      );
      this.prevYearNode.addEventListener(
        "keydown",
        this.handlePreviousYearButton.bind(this)
      );
      this.nextYearNode.addEventListener(
        "keydown",
        this.handleNextYearButton.bind(this)
      );

      document.body.addEventListener(
        "pointerup",
        this.handleBackgroundMouseUp.bind(this),
        true
      );

      this.updateGrid();
      this.close(false);
      this.setDateForButtonLabel();
    }

    isSameDay(day1, day2) {
      return (
        day1.getFullYear() == day2.getFullYear() &&
        day1.getMonth() == day2.getMonth() &&
        day1.getDate() == day2.getDate()
      );
    }

    isNotSameMonth(day1, day2) {
      return (
        day1.getFullYear() != day2.getFullYear() ||
        day1.getMonth() != day2.getMonth()
      );
    }

    getTotalNumOfDaysToDisplay() {
      const fd = this.focusDay;

      let firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
      let dayOfWeek = firstDayOfMonth.getDay();
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

      const lastDayOfMonth = new Date(fd.getFullYear(), fd.getMonth() + 1, 0);

      const daysInMonth = lastDayOfMonth.getDate();
      const numOfDaysBefore = dayOfWeek;
      const numOfDaysAfter = 6 - lastDayOfMonth.getDay();

      const totalNumOfDaysToDisplay =
        daysInMonth + numOfDaysBefore + numOfDaysAfter;
      return totalNumOfDaysToDisplay;
    }

    updateGrid() {
      const fd = this.focusDay;

      this.monthYearNode.textContent =
        messages[locale ?? "en"].monthLabels[fd.getMonth()] +
        " " +
        fd.getFullYear();

      let firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
      let dayOfWeek = firstDayOfMonth.getDay();

      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

      const d = new Date(firstDayOfMonth);

      // Create Grid of Dates
      this.tbodyNode.innerHTML = "";
      this.days = [];
      const totalNumOfWeeksToDisplay = this.getTotalNumOfDaysToDisplay() / 7;

      for (let i = 0; i < totalNumOfWeeksToDisplay; i++) {
        const row = this.tbodyNode.insertRow(i);
        this.lastRowNode = row;
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement("td");

          cell.tabIndex = -1;
          cell.addEventListener("click", this.handleDayClick.bind(this));
          cell.addEventListener("keydown", this.handleDayKeyDown.bind(this));
          cell.addEventListener("focus", this.handleDayFocus.bind(this));

          cell.textContent = "-1";

          row.appendChild(cell);
          this.days.push(cell);
        }
      }

      for (let i = 0; i < this.days.length; i++) {
        const flag = d.getMonth() != fd.getMonth();
        this.updateDate(
          this.days[i],
          flag,
          d,
          this.isSameDay(d, this.selectedDay)
        );
        d.setDate(d.getDate() + 1);

        // Hide last row if all dates are disabled (e.g. in next month)
        if (i === 35) {
          if (flag) {
            this.lastRowNode.style.visibility = "hidden";
          } else {
            this.lastRowNode.style.visibility = "visible";
          }
        }
      }
    }

    updateDate(domNode, disable, day, selected) {
      let d = day.getDate().toString();
      if (day.getDate() <= 9) {
        d = "0" + d;
      }

      let m = day.getMonth() + 1;
      if (day.getMonth() < 9) {
        m = "0" + m;
      }

      domNode.tabIndex = -1;
      domNode.removeAttribute("aria-selected");
      domNode.setAttribute("data-date", day.getFullYear() + "-" + m + "-" + d);

      if (disable) {
        domNode.classList.add("disabled");
        domNode.textContent = "";
      } else {
        domNode.classList.remove("disabled");
        domNode.textContent = day.getDate();
        if (selected) {
          domNode.setAttribute("aria-selected", "true");
          domNode.tabIndex = 0;
        }
      }
    }

    moveFocusToDay(day) {
      const d = this.focusDay;

      this.focusDay = day;

      if (
        d.getMonth() != this.focusDay.getMonth() ||
        d.getFullYear() != this.focusDay.getFullYear()
      ) {
        this.updateGrid();
      }
      this.setFocusDay();
    }

    setFocusDay(flag) {
      if (typeof flag !== "boolean") {
        flag = true;
      }

      for (let i = 0; i < this.days.length; i++) {
        const dayNode = this.days[i];
        const day = this.getDayFromDataDateAttribute(dayNode);

        dayNode.tabIndex = -1;
        dayNode.removeAttribute("aria-selected");
        if (this.isSameDay(day, this.focusDay)) {
          dayNode.tabIndex = 0;
          dayNode.setAttribute("aria-selected", true);
          if (flag) {
            dayNode.focus();
          }
        }
      }
    }

    open() {
      this.dialogNode.style.display = "block";
      this.dialogNode.style.zIndex = 2;

      this.getDateFromTextbox();
      this.updateGrid();
      this.lastDate = this.focusDay.getDate();
    }

    isOpen() {
      return window.getComputedStyle(this.dialogNode).display !== "none";
    }

    close(flag) {
      if (typeof flag !== "boolean") {
        // Default is to move focus to combobox
        flag = true;
      }

      this.setMessage("");
      this.dialogNode.style.display = "none";

      if (flag) {
        this.buttonNode.focus();
      }
    }

    changeMonth(currentDate, numMonths) {
      const getDays = (year, month) => new Date(year, month, 0).getDate();

      const isPrev = numMonths < 0;
      const numYears = Math.trunc(Math.abs(numMonths) / 12);
      numMonths = Math.abs(numMonths) % 12;

      const newYear = isPrev
        ? currentDate.getFullYear() - numYears
        : currentDate.getFullYear() + numYears;

      const newMonth = isPrev
        ? currentDate.getMonth() - numMonths
        : currentDate.getMonth() + numMonths;

      const newDate = new Date(newYear, newMonth, 1);

      const daysInMonth = getDays(
        newDate.getFullYear(),
        newDate.getMonth() + 1
      );

      // If lastDat is not initialized set to current date
      this.lastDate = this.lastDate ? this.lastDate : currentDate.getDate();

      if (this.lastDate > daysInMonth) {
        newDate.setDate(daysInMonth);
      } else {
        newDate.setDate(this.lastDate);
      }

      return newDate;
    }

    moveToNextYear() {
      this.focusDay = this.changeMonth(this.focusDay, 12);
      this.updateGrid();
    }

    moveToPreviousYear() {
      this.focusDay = this.changeMonth(this.focusDay, -12);
      this.updateGrid();
    }

    moveToNextMonth() {
      this.focusDay = this.changeMonth(this.focusDay, 1);
      this.updateGrid();
    }

    moveToPreviousMonth() {
      this.focusDay = this.changeMonth(this.focusDay, -1);
      this.updateGrid();
    }

    moveFocusToNextDay() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() + 1);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToNextWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() + 7);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToPreviousDay() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() - 1);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToPreviousWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() - 7);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToFirstDayOfWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() - d.getDay());
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToLastDayOfWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() + (6 - d.getDay()));
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    // Day methods

    isDayDisabled(domNode) {
      return domNode.classList.contains("disabled");
    }

    getDayFromDataDateAttribute(domNode) {
      const parts = domNode.getAttribute("data-date").split("-");
      return new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
    }

    // Textbox methods

    setTextboxDate(domNode) {
      let d = this.focusDay;

      if (domNode) {
        d = this.getDayFromDataDateAttribute(domNode);
        // updated aria-selected
        this.days.forEach((day) =>
          day === domNode
            ? day.setAttribute("aria-selected", "true")
            : day.removeAttribute("aria-selected")
        );
      }

      this.textboxNode.value =
        this.paddingZero(d.getMonth() + 1, 2) +
        "/" +
        this.paddingZero(d.getDate(), 2) +
        "/" +
        d.getFullYear();
      this.setDateForButtonLabel();
    }

    getDateFromTextbox() {
      const parts = this.textboxNode.value.split("/");
      const month = parseInt(parts[0]);
      const day = parseInt(parts[1]);
      let year = parseInt(parts[2]);

      if (
        parts.length === 3 &&
        Number.isInteger(month) &&
        Number.isInteger(day) &&
        Number.isInteger(year)
      ) {
        if (year < 100) {
          year = 2000 + year;
        }
        this.focusDay = new Date(year, month - 1, day);
        this.selectedDay = new Date(this.focusDay);
      } else {
        // If not a valid date (MM/DD/YY) initialize with todays date
        this.focusDay = new Date();
        this.selectedDay = new Date(0, 0, 1);
      }
    }

    setDateForButtonLabel() {
      const parts = this.textboxNode.value.split("/");

      if (
        parts.length === 3 &&
        Number.isInteger(parseInt(parts[0])) &&
        Number.isInteger(parseInt(parts[1])) &&
        Number.isInteger(parseInt(parts[2]))
      ) {
        const day = new Date(
          parseInt(parts[2]),
          parseInt(parts[0]) - 1,
          parseInt(parts[1])
        );

        let label = messages[locale].changeDate;
        label += ", " + messages[locale].dayLabels[0][day.getDay()];
        label += " " + messages[locale].monthLabels[day.getMonth()];
        label += " " + day.getDate();
        label += ", " + day.getFullYear();
        this.buttonNode.setAttribute("aria-label", label);
      } else {
        // If not a valid date, initialize with "Choose Date"
        this.buttonNode.setAttribute("aria-label", messages[locale].chooseDate);
      }
    }

    setMessage(str) {
      function setMessageDelayed() {
        this.messageNode.textContent = str;
      }

      if (str !== this.lastMessage) {
        setTimeout(setMessageDelayed.bind(this), 200);
        this.lastMessage = str;
      }
    }

    paddingZero(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    }

    // Event handlers

    handleOkButton(event) {
      let flag = false;

      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "Esc":
            case "Escape":
              this.close();
              flag = true;
              break;

            default:
              break;
          }
          break;

        case "click":
          this.setTextboxDate();
          this.close();
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleCancelButton(event) {
      let flag = false;

      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "Tab":
              if (!event.shiftKey) {
                this.prevYearNode.focus();
                flag = true;
              }
              break;
            case "Esc":
            case "Escape":
              this.close();
              flag = true;
              break;

            default:
              break;
          }
          break;

        case "click":
          this.close();
          flag = true;
          break;
          align;
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleNextYearButton(event) {
      let flag = false;

      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "Esc":
            case "Escape":
              this.close();
              flag = true;
              break;

            case "Enter":
              this.moveToNextYear();
              this.setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case "click":
          this.moveToNextYear();
          this.setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handlePreviousYearButton(event) {
      let flag = false;

      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "Enter":
              this.moveToPreviousYear();
              this.setFocusDay(false);
              flag = true;
              break;

            case "Tab":
              if (event.shiftKey) {
                this.cancelButtonNode.focus();
                flag = true;
              }
              break;

            case "Esc":
            case "Escape":
              this.close();
              flag = true;
              break;

            default:
              break;
          }

          break;

        case "click":
          this.moveToPreviousYear();
          this.setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleNextMonthButton(event) {
      let flag = false;

      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "Esc":
            case "Escape":
              this.close();
              flag = true;
              break;

            case "Enter":
              this.moveToNextMonth();
              this.setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case "click":
          this.moveToNextMonth();
          this.setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handlePreviousMonthButton(event) {
      let flag = false;

      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "Esc":
            case "Escape":
              this.close();
              flag = true;
              break;

            case "Enter":
              this.moveToPreviousMonth();
              this.setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case "click":
          this.moveToPreviousMonth();
          this.setFocusDay(false);
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleDayKeyDown(event) {
      let flag = false;

      switch (event.key) {
        case "Esc":
        case "Escape":
          this.close();
          break;

        case " ":
          this.setTextboxDate(event.currentTarget);
          flag = true;
          break;

        case "Enter":
          this.setTextboxDate(event.currentTarget);
          this.close();
          flag = true;
          break;

        case "Tab":
          this.okButtonNode.focus();
          if (event.shiftKey) {
            this.nextYearNode.focus();
          }
          this.setMessage("");
          flag = true;
          break;

        case "Right":
        case "ArrowRight":
          this.moveFocusToNextDay();
          flag = true;
          break;

        case "Left":
        case "ArrowLeft":
          this.moveFocusToPreviousDay();
          flag = true;
          break;

        case "Down":
        case "ArrowDown":
          this.moveFocusToNextWeek();
          flag = true;
          break;

        case "Up":
        case "ArrowUp":
          this.moveFocusToPreviousWeek();
          flag = true;
          break;

        case "PageUp":
          if (event.shiftKey) {
            this.moveToPreviousYear();
          } else {
            this.moveToPreviousMonth();
          }
          this.setFocusDay();
          flag = true;
          break;

        case "PageDown":
          if (event.shiftKey) {
            this.moveToNextYear();
          } else {
            this.moveToNextMonth();
          }
          this.setFocusDay();
          flag = true;
          break;

        case "Home":
          this.moveFocusToFirstDayOfWeek();
          flag = true;
          break;

        case "End":
          this.moveFocusToLastDayOfWeek();
          flag = true;
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleDayClick(event) {
      if (!this.isDayDisabled(event.currentTarget) && event.which !== 3) {
        this.setTextboxDate(event.currentTarget);
        this.close();
      }

      event.stopPropagation();
      event.preventDefault();
    }

    handleDayFocus() {
      this.setMessage(messages[locale ?? "en"].instructionCursorKeys);
    }

    handleButtonKeydown(event) {
      if (event.key === "Enter" || event.key === " ") {
        this.open();
        this.setFocusDay();

        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleButtonClick(event) {
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
        this.setFocusDay();
      }

      event.stopPropagation();
      event.preventDefault();
    }

    handleBackgroundMouseUp(event) {
      if (event.target.tagName !== "DATE-PICKER" && this.isOpen()) {
        this.close(false);
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }
);
