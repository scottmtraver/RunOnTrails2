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
    var formatted = moment(ele.innerHTML).utc().format('M/D/YYYY');
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

// This code loads the IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This code is called by the YouTube API to create the player object
function onYouTubeIframeAPIReady(event) {
  player = new YT.Player('youTubePlayer', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
   // do nothing, no tracking needed
}
function onPlayerStateChange(event) {
    // track when user clicks to Play
    if (event.data == YT.PlayerState.PLAYING) {
        _gaq.push(['_trackEvent', 'Videos', 'Play', 'Homepage Video']);
    }
}
