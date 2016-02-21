$(document).foundation();
$(".owl-carousel").owlCarousel({
  navigation: true,
  singleItem:true
});

$(document).ready(function () {
  $('.date-slash').each(function (i, ele) {
    var formatted = moment(ele.innerHTML).calendar();
    ele.innerHTML = formatted;
  });
}); 
$('.date').each(function (i, ele) {
  var formatted = moment(ele.innerHTML).format('dddd MMM Do');
  ele.innerHTML = formatted;
});

