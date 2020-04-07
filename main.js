$(function () {
	$('.xuong, .kn').click(function () {
		$('body, html').animate({ scrollTop: $('#khoiedu').offset().top }, 700);
		return false;
	});

	$('.sp').click(function () {
		$('body, html').animate({ scrollTop: $('#khoisanpham').offset().top }, 700);
		return false;
	});
});


