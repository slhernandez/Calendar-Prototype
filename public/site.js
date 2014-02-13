$(document).ready(function() {


  // // Add native scrolling for mobile devices
  // var scroll_week = new FTScroller(document.getElementById('scrollable_week'), {
  //   scrollingY: false,
  //   bouncing: true,
  //   snapping: true,
  //   scrollbars: true
  // });

  // ---------------------------
  // Calendar
  // ---------------------------
  this.months = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
  };

  var cal = new Calendar();
  cal.generateHTML();
  $('.calendar-container').prepend(cal.getHTML());
  $('.midsize-calendar').append(cal.getHTML());

  var _this = this;

  function cycleMonth(direction, calendar, context) {
    var displayedMonth = context.parentElement.textContent.split(' ')[0];
    var targetYear = parseInt(context.parentElement.textContent.split(' ')[1]);
    var currentMonth = _this.months[displayedMonth];
    if (direction === 'prev') {
      if (currentMonth > 0 ) {
        var targetMonth = currentMonth - 1;
      } else {
        var targetMonth = 11;
      }
      if (currentMonth === 0) {
        // Update target year if we are going back the previous year
        targetYear = targetYear - 1;
        console.log('targetYear is ... ', targetYear);
      }
    } else {
      // If the current month is equal or greater than 11,
      // then we need to jump to the next year and reset
      // the target month to 0 for January.
      if (currentMonth >= 11) {
        targetYear = targetYear + 1;
        var targetMonth = 0;
      } else {
        var targetMonth = currentMonth + 1;
      }
    }
    var nextCal = new Calendar(targetMonth, targetYear);
    nextCal.generateHTML();
    if (calendar === 'mini') {
      $('.calendar-container .calendar').remove();
      $('.calendar-container').prepend(nextCal.getHTML());
    } else {
      $('.midsize-calendar .calendar').remove();
      $('.midsize-calendar').append(nextCal.getHTML());
    }
  }

  // Previous and next links for mini calendar
  $('.calendar-container').on('click', '.calendar caption span.prev', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cycleMonth('prev', 'mini', this);
  });

  $('.calendar-container').on("click", ".calendar caption span.next", function(e) {
    e.preventDefault();
    e.stopPropagation();
    cycleMonth('next', 'mini', this);
  });

  // Next and previous  links for tablet mid-size calendar
  $('.midsize-calendar').on('click', '.calendar caption span.prev', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cycleMonth('prev', 'mid', this);
  });

  $('.midsize-calendar').on('click', '.calendar caption span.next', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cycleMonth('next', 'mid', this);
  });

  // ------- End of Calendar Code ---------

  // Dropdown menu link for themes
  $('body').addClass('js');
  var $menu = $('#menu'),
      $menulink = $('.menu-link');

  $menulink.click(function() {
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
    return false;
  });

  // NOTE: this will only work if it starts in the mobile media query
  var $window = $(window),
      $mobileWeek = $('.mobile-week'),
      mobileWeekHeight = $mobileWeek.height();
      mobileWeekTop = $mobileWeek.offset().top;
      console.log('mobileWeekTop ... ', mobileWeekTop);
  $window.scroll($.throttle(150, function(e) {
    var scrollTop = $window.scrollTop();
      $('.mobile-week-fill').remove();
    if (mobileWeekTop > 0) {
      if (scrollTop >= mobileWeekTop) {
        $mobileWeek.addClass('fixed');
        $('#scrollable').prepend('<div class="mobile-week-fill"></div>');
        $('.mobile-week-fill').css('height', mobileWeekHeight);
      } else {
        $mobileWeek.removeClass('fixed');
        $('.mobile-week-fill').remove();
      }
    }
  }));

  $('body').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.theme-container').css('display', 'none');
  });

  $('.theme-toggle').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.theme-container').css('display', 'block');
  });


  $('li.agenda-item').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $agendaIcon = $(this.firstElementChild);
    if ($agendaIcon.attr('class').split(' ')[0] === 'minus-icon') {
      $agendaIcon.addClass('plus-icon').removeClass('minus-icon');
      $agendaIcon.next().next().css('display', 'none');
    } else {
      $agendaIcon.addClass('minus-icon').removeClass('plus-icon');
      $agendaIcon.next().next().css('display', 'block');
    }
  });

  $('.mollys').hover(
    function () {
      $('.highlight').css('display', 'block');
      $('.bio-popover-container').css('display', 'block');
    },
    function () {
      $('.highlight').css('display', 'none');
      $('.bio-popover-container').css('display', 'none');
    }
  );

  $('.themes').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var itemSelected = e.target.className;
    $('.theme-label').text(itemSelected.toUpperCase());
    $('.theme-container').css('display', 'none');

    switch (itemSelected) {
      case "metro":
        $('.cal-grid').addClass('metro-theme');
        $('.cal-grid').removeClass('portfolio-theme');
        $('.cal-grid').removeClass('business-theme');
        $('.cal-grid').removeClass('studio-theme');
        break;
      case "portfolio":
        $('.cal-grid').addClass('portfolio-theme');
        $('.cal-grid').removeClass('metro-theme');
        $('.cal-grid').removeClass('business-theme');
        $('.cal-grid').removeClass('studio-theme');
        break;
      case "business":
        $('.cal-grid').addClass('business-theme');
        $('.cal-grid').removeClass('metro-theme');
        $('.cal-grid').removeClass('portfolio-theme');
        $('.cal-grid').removeClass('studio-theme');
        break;
      case "studio":
        $('.cal-grid').addClass('studio-theme');
        $('.cal-grid').removeClass('portfolio-theme');
        $('.cal-grid').removeClass('metro-theme');
        $('.cal-grid').removeClass('business-theme');
        break;
      default:
        business();
        break;
    }
  });

});



