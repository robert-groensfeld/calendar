var app = angular.module("calendar-app", []);

app.controller("calendar-ctrl", function($scope, $rootScope, $http) {

    var first_day = function(month) {
      return month.startOf("month").format("ddd");
    }
  
    var offset_to_monday = function(first_day_of_month) {
      return $scope.weekdays.indexOf(first_day_of_month);
    }
  
    var day_count = function(month) {
      return month.daysInMonth();
    }
  
    var make_day = function(date, month) {
      return {
        date: date,
        month: month.clone().set("date", date)
      };
    }
  
    var make_days = function(month) {
      var days = [];
      for (var i = 1; i <= day_count(month); ++i) {
        days.push(make_day(i, month));
      }
      return days;
    }
  
    var get_chunks = function(array, chunk_size) {
      var chunks = [];
      for(var i = 0; i < array.length; i += chunk_size) {
        chunks.push(array.slice(i, i + chunk_size));
      }
      return chunks;
    }
  
    var make_weeks = function(days) {
      return get_chunks(days, 7);
    }
  
    var get_displayed_weeks = function(month) {
      var days = make_days($scope.previous(month))
                 .concat(make_days(month))
                 .concat(make_days($scope.next(month)));
      var start = day_count($scope.previous(month)) - offset_to_monday(first_day(month));
      var days_so_far = day_count(month) + offset_to_monday(first_day(month));
      var displayed_weeks = Math.ceil(days_so_far / 7);
      var end = start + displayed_weeks * 7;
      return make_weeks(days.slice(start, end));
    }
  
    $scope.off_month = function(day) {
      return !day.month.isSame($scope.month, "month");
    }
  
    $scope.today = function(day) {
      return day.month.isSame(moment(), "day");
    }

    $scope.interactive = function(day) {
        return true;
    }
  
    $scope.selected = function(day) {
      return $rootScope.selected_day === day;
    }
  
    $scope.select = function(day) {
      $rootScope.selected_day = day;
      
      var date = day.month.toDate();
      var appTag = document.querySelector('[data-ng-app="calendar-app"]');

      appTag.dataset.date = date;

      var daySelection = new CustomEvent('day-selected', { detail: date });
      appTag.dispatchEvent(daySelection);
    }
  
    $scope.format = function(month) {
      return month.format("MMMM YYYY")
    }
  
    $scope.previous = function(month) {
      return month.clone().subtract(1, "months");
    }
  
    $scope.next = function(month) {
      return month.clone().add(1, "month");
    }
  
    $scope.goto = function(month) {
      $scope.month = month;
      $scope.weeks = get_displayed_weeks(month);
    }
  
    $scope.weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    $scope.goto(moment());
  
  });
  