//===================================================================================
$(document).ready(function() {

	// БОКОВОЙ СКРОЛЛ 
	$("body, .left_side").niceScroll({
		horizrailenabled : false,
		"verge" : "500"
	});

	$(".gallery").css("min-height", $(document).height()*1.1);

	// КНОПКА МЕНЮ
	$(".btn_mnu").click(function() {
		$(this).toggleClass("active");
		$(".left_side").toggleClass("active");
	});

	// ПЛАВНАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ
	$(".gallery img").lazyload({
			effect: "fadeIn",
			threshold : 1000
	}).parent().hover(function() {
		$(".gallery a").css("opacity", ".8");
		$(this).css("opacity", "1");
	}, function() {
		$(".gallery a").css("opacity", "1");
	});

	// ГАЛЕРЕЯ ФОТОГРАФИЙ ПЛИТКАМИ
	var wall = new freewall(".gallery");
	wall.reset({
		selector: "a",
		animate: true,
		cellW: 150,
		cellH: "auto",
		gutterX : 5,
		gutterY : 5,
		onResize: function() {
			wall.fitWidth();
		}
	});

	var images = wall.container.find("a");
	images.find("img").load(function() {
		wall.fitWidth();
	});

	// ФИЛЬТР ИЗОБРАЖЕНИЙ
	$(".filter_label").click(function() {
		$(".filter_label").removeClass("active");
		var filter = $(this).addClass("active").data("filter");
		wall.filter(filter);
		setTimeout(function() {
			$(window).resize();
			wall.fitWidth();
		}, 400);
	});

	// Magnific-Popup
	$(".gallery a").magnificPopup({
		type : 'image',
		gallery : {
			enabled : true
		},
		removalDelay: 300,
		mainClass: 'mfp-fade'
	});


	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

/*//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#callback").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				
			}, 1000);
		});
		return false;
	});*/

	// ОТПРАВКА ФОРМЫ ЗАЯВКИ (E-mail Ajax Send)
	$("form.callback").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",	// "/mail.php"
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});


});
//===================================================================================
$(window).on("load", function() {
	$(".preloader").delay(1000).fadeOut("slow");
});
//===================================================================================