# calendar
An AngularJS datepicker.

## Demo

Click [here](https://robert-groensfeld.github.io/calendar/html/demo.html) 
for a simple demonstration of the app.

## Usage

### Embed

Paste this code anywhere in your existing website:

```html
<div data-ng-app="calendar-app">
  <link rel="stylesheet" type="text/css" href="https://robert-groensfeld.github.io/calendar/css/calendar.css">

  <script type="text/javascript" src="https://robert-groensfeld.github.io/calendar/js/lib/angular.min.js"></script>
  <script type="text/javascript" src="https://robert-groensfeld.github.io/calendar/js/lib/moment.min.js"></script>

  <script type="text/javascript" src="https://robert-groensfeld.github.io/calendar/js/ng-calendar.js"></script>

  <div data-ng-controller="calendar-ctrl">
    <table class="calendar">
      <tr>
        <th class="calendar month-switch interactive" data-ng-click="goto(previous(month))">&#9664;</th>
        <th class="calendar month-display" colspan="5">{{format(month)}}</th>
        <th class="calendar month-switch interactive" data-ng-click="goto(next(month))">&#9654;</th>
      </tr>
      <tr>
        <th class="calendar day" data-ng-repeat="day in weekdays">{{day}}</th>
      </tr>
      <tr data-ng-repeat="week in weeks">
        <td data-ng-class="{
              'date-off-month': off_month(day),
              'date-today': today(day),
              'date-selected': selected(day),
              'date-selectable': interactive(day) && !selected(day)
            }"
            class="calendar date"
            data-ng-repeat="day in week">
            <span data-ng-class="{
                    'interactive': interactive(day),
                  }"
                  data-ng-show="interactive(day)"
                  data-ng-click="select(day)">{{day.date}}</span>
            <span data-ng-hide="interactive(day)">{{day.date}}</span>
        </td>
      </tr>
    </table>
  </div>
</div>
```

### Pick date

Listen for the `day-selected` event at the app tag:

```js
const showDate = event => { console.log(event.detail); };
const appSelector = '[data-ng-app="calendar-app"]';
const appTag = document.querySelector(appSelector);
appTag.addEventListener('day-selected', showDate);
```

The event contains a
[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
set to the selected day.

The date will also be published among the data-attributes of the app tag:

```html
<div data-ng-app="calendar-app" 
     class="ng-scope" 
     data-date="Fri Oct 05 2018 21:20:53 GMT+0200 (Central European Summer Time)">
  <!-- App code -->
</div
```

See the [demo code](https://github.com/robert-groensfeld/calendar/blob/master/html/demo.html)
for more details.
