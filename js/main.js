$(document).ready(function() {
	$("#top").on("click", function (event) {
			//отменяем стандартную обработку нажатия по ссылке
			event.preventDefault();

			//забираем идентификатор бока с атрибута href
			var id  = $(this).attr('href'),

			//узнаем высоту от начала страницы до блока на который ссылается якорь
				top = $(id).offset().top;

			//анимируем переход на расстояние - top за 1500 мс
			$('body,html').animate({scrollTop: top}, 800);
		});
	/* ------  */

		var StickyElement = function(node){
	  var doc = $(document),
	      fixed = false,
	      anchor = node.find('.sticky-anchor'),
	      content = node.find('menu');

	  var onScroll = function(e){
	    var docTop = doc.scrollTop(),
	        anchorTop = anchor.offset().top;

	    if(docTop > anchorTop){
	      if(!fixed){
	      	$('menu .logo img').attr("src","img/logo-icon.png");
	      	$('.search-icon').css('display','none');
	      	$('.search-fix-wrap').css('display', "block");
	        anchor.height(content.outerHeight());
	        content.addClass('fixed');
	        fixed = true;
	      }
	    } else {
	      if(fixed){
	      	$('menu .logo img').attr("src","img/logo.png");
	      	$('.search-icon').css('display','block');
	      	$('.search-fix-wrap').css('display', "none");
	        anchor.height(0);
	        content.removeClass('fixed');
	        fixed = false;
	      }
	    }
	  };

		  $(window).on('scroll', onScroll);
		};

		var fixMenu = new StickyElement($('#wrapper'));

	$(".forum-main article .hide-block").on("click", function (event) {
		$(this).siblings(".textHide").toggle();
		$(this).toggleClass("hide-active");
	});
});