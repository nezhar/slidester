// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($, window, document, undefined) {
	"use strict";

		// Plugin default congifuration
		var pluginName = "slidester",
			defaults = {
                direction: 1,
                startSlide: 0,
                animation: "fade",
                initHeightSpeed: 500,
                initSlideSpeed: 500,
                heightSpeed: 1000,
                slideSpeed: 5000,
                animationSpeed: 1500,
                pauseOnHover: true,
                controlButtons: true,
                controlButtonsDisplayClass: "hover",
                controlRadio: true,
                controlRadioDisplayClass: "hover",
                controlThumbnails: true,
                controlThumbnailsDisplayClass: "hover",
                captions: true,
                captionsDisplayClass: null
			};

		// The actual plugin constructor
		function Plugin (element, options) {
			this._name = pluginName;
            this._defaults = defaults;
            this._element = $(element).clone();

			this.element = element;
			this.settings = $.extend({}, defaults, options);

			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
            /**
             * Initialization block
            */
			init: function() {
                this.initSlides();
				this.initWrapper();
                this.hideContent();
                this.load();
			},
            initSlides: function() {
                this.slideCount = $(this.element).find(".images img").size()-1;

                if (this.settings.startSlide <= this.slideCount) {
                    this.currentSlide = this.nextSlide = this.settings.startSlide;
                } else {
                    this.currentSlide = this.nextSlide = 0;
                }
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

                // Add slider control thumnails
                if (this.settings.controlThumbnails) {
                    wrapper.append(this.createThumbnailControlWrapper());
                    this.controlThumbnailsHandler();
                }

                // Add captions
                if (this.settings.captions) {
                    wrapper.append(this.createCaptionWrapper());
                }

                // Add wrapper to DOM
                $(this.element).html(wrapper);
			},
            hideContent: function() {
                $(this.element).find(".images img").hide();
                $(this.element).find(".text_boxes .text_box").hide();
            },
            load: function() {
                this.fadeIn(this.settings.initSlideSpeed);
                this.setHeight(this.settings.initHeightSpeed);
                this.startTimer();

                //Add Hover Handler
                if (this.settings.pauseOnHover) {
                    this.pauseOnHoverHandler();
                }
            },

            /**
             * Slide Timer
            */
            startTimer: function() {
                this.timer = setInterval((function() {
                    this.slide(this.settings.direction);
                }).bind(this), this.settings.slideSpeed);
            },
            stopTimer: function() {
                clearInterval(this.timer);
            },

            /**
             * Sliding logic
             */
            slide: function(direction) {
                switch (direction) {
                    case 1:
                        this.slideNext();
                        break;
                    case -1:
                        this.slidePrev();
                        break;
                }

                this.animate();
            },
            slideNext: function() {
                if (this.currentSlide < this.slideCount) {
                    this.nextSlide = this.currentSlide + 1;
                } else {
                    this.nextSlide = 0;
                }
            },
            slidePrev: function() {
                if (this.currentSlide > 0) {
                    this.nextSlide = this.currentSlide - 1;
                } else {
                    this.nextSlide = this.slideCount;
                }
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

                this.setHeight(this.settings.heightSpeed);
            },

            /**
             * Fade animation
             */
            fade: function() {
                this.fadeOut(this.settings.animationSpeed);
                this.setActiveRadio();
                this.setActiveThumbnail();
                this.setActiveCaption();
                this.currentSlide = this.nextSlide;
                this.fadeIn(this.settings.animationSpeed);
            },
            fadeIn: function(speed) {
                $(this.element).find(".images img").eq(this.currentSlide).fadeIn(speed, "linear");
            },
            fadeOut: function(speed) {
                $(this.element).find(".images img").eq(this.currentSlide).fadeOut(speed, "linear");
            },

            /**
             * Content wrappers, load images
             */
            createWrapper: function() {
                return $("<div></div>").addClass("slidester").append(
                    $("<div></div>").addClass("images").html(
                        $(this._element).find(".images").html()
                    )
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
            createThumbnailControlWrapper: function() {
                var thumbnailControlWrapper = $("<div></div>").addClass("control-thumbnails");

                for (var i=0; i<=this.slideCount; i++) {
                    var thumbnail = $("<span></span>").addClass("thumbnail").css("background-image", "url(" + $(this.element).find(".images img").eq(i).attr("src") + ")");

                    if (i === this.currentSlide) {
                        thumbnail.addClass("active");
                    }
                    thumbnailControlWrapper.append(thumbnail);
                }

                if (this.settings.controlThumbnailsDisplayClass) {
                    thumbnailControlWrapper.addClass(this.settings.controlThumbnailsDisplayClass);
                }

                return thumbnailControlWrapper;
            },
            createRadioControlWrapper: function() {
                var radioControlWrapper = $("<div></div>").addClass("control-radio");

                for (var i=0; i<=this.slideCount; i++) {
                    var radioButton = $("<span></span>").addClass("radio");
                    if (i === this.currentSlide) {
                        radioButton.addClass("active");
                    }
                    radioControlWrapper.append(radioButton);
                }

                if (this.settings.controlRadioDisplayClass) {
                    radioControlWrapper.addClass(this.settings.controlRadioDisplayClass);
                }

                return radioControlWrapper;
            },
            createCaptionWrapper: function() {
                var captionWrapper = $("<div></div>").addClass("captions");

                for (var i=0; i<=this.slideCount; i++) {
                    var caption = $("<div></div>").addClass("caption").html($(this.element).find(".captions .caption").eq(i).html());

                    console.log($(this.element).find(".images img").eq(i).next("div.cation").html());

                    if (i === this.currentSlide) {
                        caption.addClass("active");
                    }
                    captionWrapper.append(caption);
                }

                if (this.settings.captionsDisplayClass) {
                    captionWrapper.addClass(this.settings.captionsDisplayClass);
                }

                return captionWrapper;
            },

            /**
             * Event Handlers
             */
            pauseOnHoverHandler: function() {
                var self = this;

                $(this.element).on("mouseenter." + pluginName, function() {
            	    self.stopTimer();
            	}).on("mouseleave." + pluginName,function() {
            	    self.startTimer();
            	});
            },
            controlButtonHandler: function() {
                var self = this;

                // Move backwards
                $(this.element).delegate(".control-buttons .control-left", "click." + pluginName, function() {
                    self.slide(-1);
                });

                // Move forward
                $(this.element).delegate(".control-buttons .control-right", "click." + pluginName, function() {
                    self.slide(1);
                });
            },
            controlThumbnailsHandler: function() {
                var self = this;

                // Move to slide
                $(this.element).delegate(".control-thumbnails .thumbnail", "click." + pluginName, function() {
                    self.nextSlide = $(this).index();
                    self.animate();
                });
            },
            controlRadioHandler: function() {
                var self = this;

                // Move to slide
                $(this.element).delegate(".control-radio .radio", "click." + pluginName, function() {
                    self.nextSlide = $(this).index();
                    self.animate();
                });
            },


            /**
             * Slider setters
             */
            setActiveRadio: function() {
                $(this.element).find(".control-radio .radio").eq(this.currentSlide).removeClass("active");
                $(this.element).find(".control-radio .radio").eq(this.nextSlide).addClass("active");
            },
            setActiveThumbnail: function() {
                $(this.element).find(".control-thumbnails .thumbnail").eq(this.currentSlide).removeClass("active");
                $(this.element).find(".control-thumbnails .thumbnail").eq(this.nextSlide).addClass("active");
            },
            setActiveCaption: function() {
                $(this.element).find(".captions .caption").eq(this.currentSlide).removeClass("active");
                $(this.element).find(".captions .caption").eq(this.nextSlide).addClass("active");
            },
            setHeight: function(speed) {
                var slideHeight = $(this.element).find(".images img").eq(this.currentSlide).height(),
                    controlButton = $(this.element).find(".control-buttons"),
                    controlButtonHeight = controlButton.height(),
                    controlRadio = $(this.element).find(".control-radio"),
                    controlRadioHeight = controlRadio.height(),
                    controlThumbnail = $(this.element).find(".control-thumbnails"),
                    controlThumbnailHeight = controlThumbnail.height();

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

                // Set position of control thumbnails based on slide height and control radio height
                controlThumbnail.animate({
                    top: slideHeight - (controlRadioHeight + controlThumbnailHeight)
                }, speed);
            },

            /**
             * Slider public methods
             */
            _unbind: function() {
                this.stopTimer();
                $(this.element).unbind("." + pluginName);
            },
            _original: function() {
                this._unbind();
                $(this.element).replaceWith($(this._element));
            },
            _remove: function() {
                this._unbind();
                $(this.element).remove();
            },
            _reload: function() {
                this._unbind();
                this.init();
            }
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[pluginName] = function(options) {
			return this.each(function() {
                var instance = $.data(this, "plugin_" + pluginName);

				if (!instance) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options));
				} else {
                    switch (options) {
                        case "unbind":
                            instance._unbind();
                            $.data(this, "plugin_" + pluginName, null);
                            break;
                        case "remove":
                            instance._remove();
                            $.data(this, "plugin_" + pluginName, null);
                            break;
                        case "original":
                            instance._original();
                            $.data(this, "plugin_" + pluginName, null);
                            break;
                        case "reload":
                            instance._reload();
                            break;
                        default:
                            console.log("Invalid option: '" + options + "'");
                    }
                }

			});
		};

})(jQuery, window, document);
