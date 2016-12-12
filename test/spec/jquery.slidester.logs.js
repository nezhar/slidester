(function($, QUnit) {

	"use strict";

	var $testCanvas = $("#testCanvas"),
	    $fixture = null;

	QUnit.module("jQuery Slidester", {
		beforeEach: function() {
			// fixture is the element where the jQuery plugin will act
			$fixture = $("<div/>");
			$testCanvas.append($fixture);
		},
		afterEach: function() {
			// we remove the element to reset the plugin job :)
			$fixture.remove();
		}
	});

    QUnit.test("log message of non existing image container", function(assert) {
		$fixture.slidester();
        assert.equal($fixture.text(), "Error: Images container not defined. Please define a cotainer with the slider images and assign the '.images' class to it.");
    });

    QUnit.test("log message of non existing images in container", function(assert) {
        $fixture.append(
            $("<div/>").addClass("images")
        );
        $fixture.slidester();
        assert.equal($fixture.text(), "Error: No slides defined in the image container.");
    });

    QUnit.test("log message of non existing images in container", function(assert) {
        $fixture.append(
            $("<div/>").addClass("images").append(
                $("<img>").attr("src", "#1")
            ).append(
                $("<img>").attr("src", "#2")
            )
        );
        $fixture.slidester();
        assert.equal($fixture.text(), "");
    });

}(jQuery, QUnit));
