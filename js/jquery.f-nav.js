'use strict';

!function ($) {
	var name_space = 'f-nav',
		attr_selector = '[data-f="' + name_space + '"]',
		Nav = function (element, options) {
			var me = this,
				$target;

			me.$element  = $(element);
			me.options   = $.extend($.fn[name_space].defaults, options);
			me.$targets  = [];

			me.$links = $(me.$element.find('a')).filter(function () {
				$target = $($(this).attr('href'));

				if ($target.length) {
					me.$targets.push($target.eq(0));

					return true;
				}
			});

			$(window).on('scroll', function() {
				me.update()
			});

			me.update();
		};

	Nav.prototype.update = function () {
		var me = this,
			scroll = $(window).scrollTop() + me.options.offset,
			$link_parent,
			offset,
			target_height;

		me.$links.each(function(index, link) {
			$link_parent    = $(link).parent();
			offset          = parseInt(me.$targets[index].offset().top);
			target_height   = me.$targets[index].outerHeight(true);

			if((scroll >= offset) && (scroll < (offset + target_height))) {
				$link_parent.addClass(me.options.active_class);
			} else {
				$link_parent.removeClass(me.options.active_class);
			}
		});
	};

	$.fn[name_space] = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data(name_space),
				options = (typeof option == 'object') ? option: {};

			if (!data) $this.data(name_space, (data = new Nav(this, options)));
			if (typeof option == 'string') data[option]();
		})
	};

	$.fn[name_space].defaults = {
		offset          : 0,
		active_class    : 'active'
	};

	$(function () {
		$(attr_selector).each(function () {
			$(this)[name_space]($(this).data());
		})
	});
} (jQuery);