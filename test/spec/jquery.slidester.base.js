(function($, QUnit) {

	"use strict";

	var $testCanvas = $("#testCanvas"),
	    $fixture = null;

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

    QUnit.test("is inside jQuery library", function(assert) {
		assert.equal(typeof $.fn.slidester, "function", "has function inside jquery.fn");
		assert.equal(typeof $fixture.slidester, "function", "another way to test it");
	});

    QUnit.test("returns jQuery functions after called (chaining)", function(assert) {
		assert.equal(
			typeof $fixture.slidester().on,
			"function",
			"'on' function must exist after plugin call"
        );
	});

    QUnit.test("caches plugin instance", function(assert) {
		$fixture.slidester();
		assert.ok(
			$fixture.data("plugin_slidester"),
			"has cached it into a jQuery data"
	    );
	});

}(jQuery, QUnit));
