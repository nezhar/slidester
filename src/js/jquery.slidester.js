// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($, window, document, undefined) {
	"use strict";

		// Plugin default congifuration
		var pluginName = "slidester",
			defaults = {
                direction: 1,
                animation: "fade",
                loadSpeed: 1000,
                slideSpeed: 5000,
                animationSpeed: 1500,
                pauseOnHover: true,
                controlButtons: true,
                controlButtonsDisplayClass: "hover",
			};

		// The actual plugin constructor
		function Plugin (element, options) {
			this.element = element;
            this.orig_element = $(element).clone();
            this.current_slide = 0;
            this.slide_count = $(element).find(".images img").size()-1;
			this.settings = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function() {
				this.initWrapper();
                this.hideContent();
                this.load();
			},
            startTimer: function() {
                this.timer = setInterval((function() {
                    this.slide();
                }).bind(this), this.settings.slideSpeed);
            },
            stopTimer: function() {
                clearInterval(this.timer);
            },
			initWrapper: function() {
                // Add default wrapper
                var wrapper = $("<div></div>").addClass("slidester").append(
                    $(this.orig_element).html()
                );

                // Add slider control buttons
                if (this.settings.controlButtons) {
                    var control = $("<div></div>").addClass("control");

                    control.append(
                        $("<span></span>").addClass("control-left")
                    ).append(
                        $("<span></span>").addClass("control-right")
                    );

                    if (this.settings.controlButtonsDisplayClass) {
                        control.addClass(this.settings.controlButtonsDisplayClass);
                    }

                    wrapper.append(control);
                }

                // Add wrapper to DOM
                $(this.element).html(wrapper);
			},
            hideContent: function() {
                $(this.element).find(".images img").hide();
                $(this.element).find(".text_boxes .text_box").hide();
            },
            load: function() {
                this.fadeIn();
                this.setHeight(this.settings.loadSpeed);
                this.startTimer();

                //Add Hover watcher
                if (this.settings.pauseOnHover) {
                    this.pauseOnHover();
                }
            },
            slide: function() {
                this.move();
                this.setHeight(1000);
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
            move: function() {
                switch (this.settings.direction) {
                    case 1:
                        this.moveSlide = this.nextSlide;
                        break;
                    case -1:
                        this.moveSlide = this.prevSlide;
                        break;
                }

                this.animate(this.settings.animation);
            },
            animate: function(type) {
                switch (type) {
                    case "fade":
                        this.fade();
                        break;
                    default:
                        this.fade();
                        break;
                }
            },
            fade: function() {
                this.fadeOut(this.settings.animationSpeed);
                this.moveSlide();
                this.fadeIn(this.settings.animationSpeed);
            },
            fadeIn: function(speed) {
                $(this.element).find(".images img").eq(this.current_slide).fadeIn(speed, "linear");
            },
            fadeOut: function(speed) {
                $(this.element).find(".images img").eq(this.current_slide).fadeOut(speed, "linear");
            },
            setHeight: function(speed) {
                $(this.element).animate({
                    height: $(this.element).find(".images img").eq(this.current_slide).height()
                }, speed);

                // Set position of control
                $(this.element).find(".control").animate({
                    top: $(this.element).find(".images img").eq(this.current_slide).height()/2 - $(this.element).find(".control").height()/2
                }, speed);
            },
            pauseOnHover: function() {
                var self = this;
                $(this.element).hover(function() {
            	    self.stopTimer();
            	},function() {
            	    self.startTimer();
            	});
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
