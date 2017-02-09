$(document).ready(function() {
	$("#top").on("click", function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
				top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 800);
		});

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
	      	$('.search-fix-wrap').addClass("visible");
	        anchor.height(content.outerHeight());
	        content.addClass('fixed');
	        fixed = true;
	      }
	    } else {
	      if(fixed){
	      	$('menu .logo img').attr("src","img/logo.png");
	      	$('.search-icon').css('display','block');
	      	$('.search-fix-wrap').removeClass("visible");
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

    $("#search-but").on("click", function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(".info").offset().top
        }, 500, function() {
            $(".what-search").focus();
        });
    });
    $(".enter").on("click", function(e) {
    	e.preventDefault();
    	$(".modal-auth-wrap").toggle();
    });
    $(".close").on("click", function(e) {
    	e.preventDefault();
    	$(".modal-auth-wrap").toggle();
    });$(".modal-auth-wrap").on("click", function(e) {
    	e.preventDefault();
    	if (e.target === $(".modal-auth-wrap")[0]) {
    		$(".modal-auth-wrap").toggle();
    	}
    });

    $(".close-word-info").on("click", function(e) {
    	e.preventDefault();
    	var info = $(".word-info-window");
    	info.toggle();
    });
    $(".word-info").on("click", function(e) {
    	var info = $(".word-info-window");
    	info.show();
    	var height = info.height();
      var width = info.width();
      var windowWidth = $(window).width();
      var left = e.pageX - (e.pageX - $(this).offset().left) + $(this).width();
    	var position = {
    		top: e.pageY - (e.pageY - $(this).offset().top) - height / 2 - 23 + $(this).height() / 2,
    		left: left
    	};

      if(left + width > windowWidth) {
        var position = {
          top: e.pageY - (e.pageY - $(this).offset().top) - height / 2 - 23 + $(this).height() / 2,
          left: left - info.width() - + $(this).width()
        };
        $(".word-info-window").addClass("word-info-window-view");
      } else {
        $(".word-info-window").removeClass("word-info-window-view");
      }
      info.css(position);
    	$(document).on({
			"click.myevent": function(e) {
          if (!$(".more").is(e.target)) {
            e.preventDefault();
          }
		    	var word = $(".word-info");
		    	var info = $(".word-info-window");
		    	if (!word.is(e.target) && info.has(e.target).length === 0 && !info.is(e.target)) {
					info.hide();
					$(document).off('click.myevent');
				}
		    }
		});
    });

    var criteria = new DropDown($('#criteria'));
    var sorting = new DropDown($("#sorting"));

    $(".clickable-word").on("click", function(e) {
    	e.preventDefault();
    	var moreInfo = $(this).parent();
    	var addSlash = $(this).children(".what").text() + " - ";
    	$(this).children(".what").text(addSlash);
    	if (moreInfo.hasClass("more-info")) {
	    	var deleteSlash = addSlash.replace(/-/g, "");
	    	$(this).children(".what").text(deleteSlash);
    	}
    	moreInfo.toggleClass("more-info");
    });
    $(".rating .clickable").on("click", function() {
    	var toogleActive = $(this).siblings(".all-rating");
    	toogleActive.toggleClass("active");
    });
    $(".like").on("click", function() {
    	var allLikesDislikes = $(this).parent().parent().siblings("li").children(".like-wrap").children(".like-dislike");
    	allLikesDislikes.removeClass("active");
    	var toogleActive = $(this).siblings(".like-dislike");
    	toogleActive.toggleClass("active");
      $(document).on({
        "click.myevent": function(e) {
            e.preventDefault();
            var like = $(".like img");
            var likeDislike = $(".like-dislike");
            if (!like.is(e.target) && likeDislike.has(e.target).length === 0 && !likeDislike.is(e.target)) {
              toogleActive.removeClass("active");
              $(document).off('click.myevent');
            }
          }
      });
    });
    $(".main-news .like").on("click", function() {
      $(this).siblings(".like-dislike").show();
    });
});
function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
  initEvents : function() {
      var obj = this;

      obj.dd.on('click', function(event){
          $(this).children(".dropdown").toggleClass('active');
          return false;
      });

      obj.opts.on('click',function(){
          var opt = $(this);
          obj.val = opt.text();
          obj.index = opt.index();
          obj.placeholder.text(obj.val);
      });
  },
  getValue : function() {
      return this.val;
  },
  getIndex : function() {
      return this.index;
  }
}