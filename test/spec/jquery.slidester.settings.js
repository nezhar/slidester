(function($, QUnit) {

	"use strict";

	var $testCanvas = $("#testCanvas"),
	    $fixture = null,
        defaultSetting = {
            width: null,
            height: null,
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

	QUnit.module("jQuery Slidester", {
		beforeEach: function() {
			// fixture is the element where the jQuery plugin will act
			$fixture = $("<div/>").append(
                $("<div/>").addClass("images").append(
                    $("<img>").attr("src", "#1")
                ).append(
                    $("<img>").attr("src", "#2")
                )
            );

			$testCanvas.append($fixture);
		},
		afterEach: function() {
			// we remove the element to reset the plugin job :)
			$fixture.remove();
		}
	});

    QUnit.test("check default settings", function( assert ) {
        $fixture.slidester();
        var pluginData = $fixture.data( "plugin_slidester" );

        assert.deepEqual(
            pluginData.settings,
            defaultSetting,
            "default plugin settings"
        );
    });

    QUnit.test("enable custom settings width", function( assert ) {
		$fixture.slidester({
			width: 100
		});

		var pluginData = $fixture.data( "plugin_slidester" ),
            caseSettings = jQuery.extend({}, defaultSetting);

        caseSettings.width = 100;

		assert.deepEqual(
			pluginData.settings,
			caseSettings,
			"extend plugin settings width"
		);
	});

    QUnit.test("enable custom settings height", function( assert ) {
        $fixture.slidester({
            height: 100
        });

        var pluginData = $fixture.data( "plugin_slidester" ),
            caseSettings = jQuery.extend({}, defaultSetting);

        caseSettings.height = 100;

        assert.deepEqual(
            pluginData.settings,
            caseSettings,
            "extend plugin settings height"
        );
    });

}(jQuery, QUnit));
