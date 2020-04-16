$(function() {
  $(window).scroll(function() {
    if ($('body, html').scrollTop() > 300) {
      $('.logo').addClass('chucam');
      $('.nutlen').addClass('hienthi');
    } else if ($('body, html').scrollTop() <= 300) {
      $('.logo').removeClass('chucam');
      $('.logo').removeClass('chucam');
    }
  });

  $('.nutlen').click(function() {
    $('body, html').animate({
      'scrollTop': 0
    });
    return false;
  });
});
