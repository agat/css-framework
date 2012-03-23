(function($) {
	var sNameSpace = 'accordion';

	function oAccordion(obj, options) {
		var base = this;

		// default settings for plugin
		base.settings = {

		};

		// Set various CSS class names
		base.css = {
			item: 		sNameSpace + '-item',
			head: 		sNameSpace + '-head',
			body: 		sNameSpace + '-body',
			content: 	sNameSpace + '-content',
			opened: 	sNameSpace + '-opened',
			closed: 	sNameSpace + '-closed'
		};

		base.$item = {};

		// extending with settings parameter
		$.extend(base.settings, options);

		var $obj = $(obj); // jQuery version of DOM element

		// init method
		base.init = function () {
			var css = base.css;

			$obj.addClass(sNameSpace);

			// DOM
			base.$item = $obj.children();

			base.$item.each(function(i) {
				var $item = $(this),
					sHead = sNameSpace + '.head',
					sBody = sNameSpace + '.body';

				$item.data(sHead, $item.children().eq(0));
				$item.data(sBody, $item.children().eq(1));

				$item.data(sHead).
					addClass(css.head);

				$item.data(sBody).
					addClass(css.body).
					wrapInner('<div class="' + css.content + '" />');

				$item.
					data(sNameSpace + '.bodyHeight', $item.data(sBody).height()).
					addClass(css.item);

				if(i) {
					$item.addClass(css.closed);
				} else {
					$item.addClass(css.opened);
				}
			});

			_initEvents();

			$obj.trigger(sNameSpace + '.init');
		};

		var _initEvents = function() {
			base.$item.each(function(i) {
				var $item = $(this);

				$item.data(sNameSpace + '.head').
					click(function(e) {
						if($item.hasClass(base.css.closed)) {
							$item.trigger(sNameSpace + '.open');
							$item.siblings().trigger(sNameSpace + '.close');
						}

						if(typeof e == 'object') e.stopPropagation();
					});
			});

			base.$item.on(sNameSpace + '.open', function() {
				_toggle($(this), 'open', 'opened', base.css.opened, base.css.closed, $(this).data(sNameSpace + '.bodyHeight'));
			});

			base.$item.on(sNameSpace + '.close', function() {
				_toggle($(this), 'close', 'closed', base.css.closed, base.css.opened, 0);
			});
		};

		var _toggle = function($item, sStartEventName, sEndEventName, sAddingClassName, sRemovingClassName, nHeight) {
			$obj.trigger(sNameSpace + '.' + sStartEventName);
			$item.data(sNameSpace + '.body').
				animate({
					height: nHeight
				},
				function() {
					$item.
						addClass(sAddingClassName).
						removeClass(sRemovingClassName);
					$obj.trigger(sNameSpace + '.' + sEndEventName);
				}
			);
		};

		// calling init
		base.init();
	}

	$.fn[sNameSpace] = function(options) {
		return this.each(function() {
			if(typeof $(this).data(sNameSpace) == 'undefined') {
				$(this).data(sNameSpace, new oAccordion(this, options));
			}
		});
	};

	$(function() {
		$('[role=' + sNameSpace + ']')[sNameSpace]();
	});
})(jQuery);

/*

 <div role="accordion">
 <section>
 <h3>Heading 1</h3>
 <div>
 <p>Lorem ipsum dolor sit amet...</p>
 </div>
 </section>
 <details>
 <header>Heading 2</header>
 <section>
 <p>Lorem ipsum dolor sit amet...</p>
 <p>Lorem ipsum dolor sit amet...</p>
 </section>
 </details>
 <div>
 <div>Heading 2</div>
 <div>
 <p>Lorem ipsum dolor sit amet...</p>
 <p>Lorem ipsum dolor sit amet...</p>
 <p>Lorem ipsum dolor sit amet...</p>
 </div>
 </div>
 </div><!-- accordion -->

*/