$(document).foundation();

$(document).ready(function () {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    navigation: true,
    singleItem:true,
    loop: true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true
  });
  owl.trigger('owl.play',5000);

  $('.date-slash').each(function (i, ele) {
    var formatted = moment(ele.innerHTML).calendar();
    ele.innerHTML = formatted;
  });
}); 
$('.date').each(function (i, ele) {
  var formatted = moment(ele.innerHTML).format('dddd MMM Do');
  ele.innerHTML = formatted;
});

