$(document).foundation();
$(function() {
  $("#datepicker").datepicker();
});
$(document).ready(function () {
  $('.date-slash').each(function (i, ele) {
    var formatted = moment(ele.innerHTML).calendar();
    ele.innerHTML = formatted;
  });
  //set venue
  var vid = $('#venueID').val();
  $('.venue-selector').val(vid);
}); 

