// ---------------------------
// Calendar
// ---------------------------
// Labels for the days of week
var calDaysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Human readable month name labels (in order)
var calMonthsLabels = ['January', 'February', 'March', 'April', 
                        'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'];

// These are the days of the week for each month, in order
var calDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var calCurrentDate = new Date();
var todaysDate = calCurrentDate.getDate();
var currentMonth = calMonthsLabels[calCurrentDate.getMonth()];

function Calendar(month,  year) {
  this.month = (isNaN(month) || month === null) ? calCurrentDate.getMonth() : month;
  this.year = (isNaN(year) || year === null) ? calCurrentDate.getFullYear() : year;
  this.calHTML = '';
}

Calendar.prototype.getHTML = function() {
  return this.html;
}

Calendar.prototype.generateHTML = function() {
  // Get the first day of the month
  var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay();

  // find number of days in the month
  var monthLength = calDaysInMonth[this.month];

  // Figure out leap year
  if (this.month === 1) { // February only!
    if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) {
      monthLength = 29;
    }
  }

  // Create the calendar
  // Do the header
  var monthName = calMonthsLabels[this.month];
  var html = '<table class="calendar">';
  html += '<caption>' +
          '<span class="prev"></span>' +
          '<span class="next"></span>' +
          monthName + ' ' + this.year +
          '</caption>';
  html += '<thead><tr>';
  for (var i = 0; i <= 6; i++) {
    html += '<th>';
    html += calDaysLabel[i];
    html += '</th>';
  }
  html +='</tr></thead>';

  // fill in the days
  html += '<tbody>';
  var day = 1;
  // this loop is for weeks (rows)
  for (var i = 0; i <= 9; i++) {
    // this loop is for weekdays (cells)
    html += '<tr>';
    for (var j = 0; j <= 6; j++) {
      // Check for today's date so we can select it on the calendar by default.
      if (currentMonth === monthName) {
        if (todaysDate === day) {
          html += '<td class="select">';
        } else {
          html += '<td>';
        }
      } else {
        html += '<td>';
      }
      if (day <= monthLength && (i > 0 || j >= startingDay)) {
        html += day;
        day++;
      }
      //html += '<div class="agenda-mark"></div>';
      html += '</td>';
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } else {
      html += '</tr><tr>';
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  this.html = html;

}

