(function() {
  // get number of small images
  const numSmallImg = $("#numSmallImg").val() || 0;

  // set width based on number of small images
  if (numSmallImg) {
    $(".small-slider--full-width").css({
      'width': 13.5 * numSmallImg + 17.5 * (numSmallImg - 1) + 'rem ',
    });
  }

  // set zoom function for cover image
  $('.detail__image-cover').zoom();

  // enable left and right icon
  $("#small-slider__left-icon").on("click", function () {
    $(".small-slider--full-width").css({
      'transform': 'translate3d(0, 0, 0)',
    });
  });

  $("#small-slider__right-icon").on("click", function () {
    $(".small-slider--full-width").css({
      'transform': 'translate3d(-152px, 0px, 0px)',
    });
  });

  // replace cover image
  $.each($(".small-slider__item img"), function () {
    $(this).on('click', function () {
      $(".detail__image-cover img").attr('src', $(this).attr('src'));
    })
  });
})();