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
                controlRadio: true,
                controlRadioDisplayClass: "hover",
			};

		// The actual plugin constructor
		function Plugin (element, options) {
			this.element = element;
            this.orig_element = $(element).clone();
            this.current_slide = this.next_slide = 0;
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
                    this.slide(this.settings.direction);
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
                    wrapper.append(this.createButtonControlWrapper());
                    this.controlButtonHandler();
                }

                // Add slider control radio bullets
                if (this.settings.controlRadio) {
                    wrapper.append(this.createRadioControlWrapper());
                    this.controlRadioHandler();
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
                    this.next_slide = this.current_slide + 1;
                } else {
                    this.next_slide = 0;
                }
            },
            prevSlide: function() {
                if (this.current_slide > 0) {
                    this.next_slide = this.current_slide - 1;
                } else {
                    this.next_slide = this.slide_count;
                }
            },
            slide: function(direction) {
                switch (direction) {
                    case 1:
                        this.nextSlide();
                        break;
                    case -1:
                        this.prevSlide();
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
                this.setActiveRadio();
                this.current_slide = this.next_slide;
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
                    controlButton = $(this.element).find(".control-buttons"),
                    controlButtonHeight = controlButton.height(),
                    controlRadio = $(this.element).find(".control-radio"),
                    controlRadioHeight = controlRadio.height();

                // Set slide height
                $(this.element).animate({
                    height: slideHeight
                }, speed);

                // Set position of control buttons based on slide height
                controlButton.animate({
                    top: slideHeight/2 - controlButtonHeight/2
                }, speed);

                // Set position of control radio based on slide height
                controlRadio.animate({
                    top: slideHeight - controlRadioHeight
                }, speed);
            },
            createWrapper: function() {
                return $("<div></div>").addClass("slidester").append(
                    $(this.orig_element).html()
                );
            },
            createButtonControlWrapper: function() {
                var buttonControlWrapper = $("<div></div>").addClass("control-buttons").append(
                    $("<span></span>").addClass("control-left")
                ).append(
                    $("<span></span>").addClass("control-right")
                );

                if (this.settings.controlButtonsDisplayClass) {
                    buttonControlWrapper.addClass(this.settings.controlButtonsDisplayClass);
                }

                return buttonControlWrapper;
            },
            createRadioControlWrapper: function() {
                var radioControlWrapper = $("<div></div>").addClass("control-radio");

                for (var i=0; i<=this.slide_count; i++) {
                    var radioButton = $("<span></span>").addClass("radio");
                    if (i === this.current_slide) {
                        radioButton.addClass("active");
                    }
                    radioControlWrapper.append(radioButton);
                }

                if (this.settings.controlRadioDisplayClass) {
                    radioControlWrapper.addClass(this.settings.controlRadioDisplayClass);
                }

                return radioControlWrapper;
            },
            pauseOnHoverHandler: function() {
                var self = this;

                $(this.element).hover(function() {
            	    self.stopTimer();
            	},function() {
            	    self.startTimer();
            	});
            },
            controlButtonHandler: function() {
                var self = this;

                // Move backwards
                $(this.element).delegate(".control-buttons .control-left", "click", function() {
                    self.slide(-1);
                });

                // Move forward
                $(this.element).delegate(".control-buttons .control-right", "click", function() {
                    self.slide(1);
                });
            },
            controlRadioHandler: function() {
                var self = this;

                // Move to slide
                $(this.element).delegate(".control-radio .radio", "click", function() {
                    self.next_slide = $(this).index();
                    self.animate();
                });
            },
            setActiveRadio: function() {
                $(this.element).find(".control-radio .radio:eq("+this.current_slide+")").removeClass("active");
                $(this.element).find(".control-radio .radio:eq("+this.next_slide+")").addClass("active");
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
