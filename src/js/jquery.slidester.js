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
                var wrapper = this.createWrapper();

                // Add slider control buttons
                if (this.settings.controlButtons) {
                    wrapper.append(this.createControlWrapper());
                    this.controlButtonsHandler();
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

                //Add Hover Handler
                if (this.settings.pauseOnHover) {
                    this.pauseOnHoverHandler();
                }
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
            slide: function() {
                switch (this.settings.direction) {
                    case 1:
                        this.moveSlide = this.nextSlide;
                        break;
                    case -1:
                        this.moveSlide = this.prevSlide;
                        break;
                }

                this.animate();
            },
            animate: function() {
                switch (this.settings.animation) {
                    case "fade":
                        this.fade();
                        break;
                    default:
                        this.fade();
                        break;
                }

                this.setHeight(1000);
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
                var slideHeight = $(this.element).find(".images img").eq(this.current_slide).height(),
                    controlHeight = $(this.element).find(".control").height();

                // Set slide height
                $(this.element).animate({
                    height: slideHeight
                }, speed);

                // Set position of control based on slide height
                $(this.element).find(".control").animate({
                    top: slideHeight/2 - controlHeight/2
                }, speed);
            },
            createWrapper: function() {
                return $("<div></div>").addClass("slidester").append(
                    $(this.orig_element).html()
                );
            },
            createControlWrapper: function() {
                var controlWrapper = $("<div></div>").addClass("control").append(
                    $("<span></span>").addClass("control-left")
                ).append(
                    $("<span></span>").addClass("control-right")
                );

                if (this.settings.controlButtonsDisplayClass) {
                    controlWrapper.addClass(this.settings.controlButtonsDisplayClass);
                }

                return controlWrapper;
            },
            pauseOnHoverHandler: function() {
                var self = this;

                $(this.element).hover(function() {
            	    self.stopTimer();
            	},function() {
            	    self.startTimer();
            	});
            },
            controlButtonsHandler: function() {
                var self = this;

                // Move backwards
                $(this.element).delegate(".control .control-left", "click", function() {
                    self.moveSlide = self.nextSlide;
                    self.animate();
                });

                // Move forward
                $(this.element).delegate(".control .control-right", "click", function() {
                    self.moveSlide = self.prevSlide;
                    self.animate();
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
