$(document).foundation();
$(function() {
  $("#datepicker").datepicker();
});
$(document).ready(function () {
  $('.date-slash').each(function (i, ele) {
    var formatted = moment(ele.innerHTML).utc().calendar();
    ele.innerHTML = formatted;
  });
  //set venue
  var vid = $('#venueID').val();
  $('.venue-selector').val(vid);
  $('.jquery-te').jqte();
  //set sponsor
  var sid = $('#sponsorID').val();
  $('.sponsor-selector').val(sid);
}); 

