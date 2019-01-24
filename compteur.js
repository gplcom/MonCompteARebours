$(document).ready(function() {
  // les variables
  var sessionLength = 20;
  var breakLength = 5;
  var sessionOn = false;
  var min = sessionLength, sec = 0, timer;

  /* depart du décompte au nombre initial */
  function startTimer() {
    timer = setTimeout(startTimer, 1000);
    if(min === 0 & sec === 0) {
      // timer is complete
      formatTime(min, sec);
      clearTimeout(timer);
      areSettingsDisabled(false);
      sessionOn = false;
    } else {
      //  décompte en action
      if(min > 0 && sec === 0) {
        min--;
        sec = 59;
        formatTime(min, sec);
      } else {
        sec--;
        formatTime(min, sec);
      }
    }
  }

  /* Format reglage minutes*/
  function formatTime(min, sec) {
    $('#timer').html(((min < 10) ? "0" + min : min) + ":" + ((sec < 10) ? "0" + sec : sec));
  }

  /* marche et arrêt */
  function areSettingsDisabled(boolean) {
    $('#session-plus').prop("disabled", boolean);
    $('#session-minus').prop("disabled", boolean);
  }

  $('#start-btn').click(function() {
    if(!sessionOn) {
      sessionOn = true;
      startTimer();
    }
    areSettingsDisabled(true);
  });

  $('#stop-btn').click(function() {
    if(sessionOn) {
      sessionOn = false;
      clearTimeout(timer);
    }
  });

  $('#reset-btn').click(function() {
    clearTimeout(timer);
    min = sessionLength; // revenir au décompte initial
    sec = 0;
    formatTime(min, sec);
    areSettingsDisabled(false);
  });

  $('#session-plus').click(function() {
    if(sessionLength+1 <= 60) {
      sessionLength++;
      min = sessionLength;
      formatTime(sessionLength, 0);
    }
  });

  $('#session-minus').click(function() {
    if(sessionLength-1 >= 1) {
      sessionLength--;
      min = sessionLength;
      formatTime(sessionLength, 0);
    }
  });
});