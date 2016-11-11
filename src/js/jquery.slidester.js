// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($, window, document, undefined) {
	"use strict";

		// Plugin default congifuration
		var pluginName = "slidester",
			defaults = {
				prop1: "value"
			};

		// The actual plugin constructor
		function Plugin (element, options) {
			this.element = element;
            this.orig_element = $(element).clone();
            this.slide_count = this.current_slide = $(element).find(".images img").size()-1;
			this.settings = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function() {
                this.loaded = 0;
				this.initWrapper();
                this.hideContent();

                this.slide();
                setInterval((function() {
                    this.slide();
                }).bind(this), 5000);
			},
			initWrapper: function() {
                $(this.element).html($("<div></div>").addClass("slidester").append($(this.orig_element).html()));
			},
            hideContent: function() {
                $(this.element).find(".images img").hide();
                $(this.element).find(".text_boxes .text_box").hide();
            },
            slide: function(direction) {
                this.animate(direction);
                this.setHeight();
            },
            nextSlide: function() {
                if (this.current_slide < this.slide_count) {
                    this.current_slide++;
                } else {
                    this.current_slide = 0;
                }
            },
            prevSlide: function() {
                if (this.current_slide > 0) {
                    this.current_slide--;
                } else {
                    this.current_slide = this.slide_count;
                }
            },
            animate: function(direction) {
                $(this.element).find(".images img").eq(this.current_slide).fadeOut(1600, "linear");

        		if (direction < 0) {
                    this.prevSlide();
        		}
        		else {
                    this.nextSlide();
        	    }

        	    $(this.element).find(".images img").eq(this.current_slide).fadeIn(1600, "linear");
            },
            setHeight: function() {

                $(this.element).animate({
                    height: $(this.element).find(".images img").eq(this.current_slide).height()
                }, 1000);
            }
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function(options) {
			return this.each(function() {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options));
				}
			});
		};

})(jQuery, window, document);
