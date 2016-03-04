$(document).foundation();

$(document).ready(function () {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    navigation: true,
    singleItem:true,
    loop: true,
    autoplay:true,
    autoplayTimeout:10000,
    autoplayHoverPause:true
  });
  owl.trigger('owl.play',10000);

  $('.date-slash').each(function (i, ele) {
    var formatted = moment(ele.innerHTML).utc().calendar();
    ele.innerHTML = formatted;
  });
}); 
$('.date').each(function (i, ele) {
  var formatted = moment(ele.innerHTML).utc().format('dddd MMMM Do');
  ele.innerHTML = formatted;
});
$('.readmore-opener').click(function () {
  $('.readmore-mobile').addClass('open');
  $(this).hide();
});
