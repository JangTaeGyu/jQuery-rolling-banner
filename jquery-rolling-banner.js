(function($){
    $.fn.rollingBanner = function(options) {

        // 기본 옵션
        var defaults = { isPrev: false, selectorPrev: "", isNext: false, selectorNext: "", isAuto: true };

        // 옵션 재정의
        var options = $.extend(defaults, options);

        var $panel, itemSize, itemLength;

        if (options.isPrev == true && options.selectorPrev != "") {
            $(options.selectorPrev).click(function(event) {
                prev();
            });
        }

        if (options.isNext == true && options.selectorNext != "") {
            $(options.selectorNext).click(function(event) {
                next();
            });
        }

        // 초기화
        var init = function() {
            itemSize = $panel.children().outerWidth();
            itemLength = $panel.children().length;
            $panel.css("width", itemSize * itemLength);

            if (options.isAuto == true) {
                $panel.mouseover(function() {
                    clearInterval(rollingId);
                });

                $panel.mouseout(function() {
                    auto();
                });

				if (options.isPrev == true && options.selectorPrev != "") {
	                $(options.selectorPrev).mouseover(function() {
	                    clearInterval(rollingId);
	                });

	                $(options.prevID).mouseout(function() {
	                    auto();
	                });
				}

				if (options.isNext == true && options.selectorNext != "") {
	                $(options.selectorNext).mouseover(function() {
	                    clearInterval(rollingId);
	                });

	                $(options.selectorNext).mouseout(function() {
	                    auto();
	                });
				}
            }
        }

        // 자동
        var auto = function() {
            rollingId = setInterval(function() {
                next();
            }, 2000);
        }

        // 뒤로가기 실행
        var prev = function() {
            $panel.css("left", - itemSize);
            $panel.prepend("<li>"+$panel.find("li:last").html()+"</li>");
            $panel.animate({"left": "0px"}, function() {
                $(this).find("li:last").remove();
            });
        }

        // 앞으로 가기 실행
        var next = function() {
            $panel.animate({"left": - itemSize + "px"}, function() {
                $(this).append("<li>"+$(this).find("li:first").html()+"</li>");
                $(this).find("li:first").remove();
                $(this).css("left", 0);
            });
        }

        return this.each(function() {

            $panel = $(this).find('ul');

            init();

            if (options.isAuto == true) auto();
        });
    };
})(jQuery);