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

    // QUnit.test("changes the element text", function(assert) {
	// 	$fixture.slidester();
    // 
    //     assert.equal($fixture.text(), "");
    //     assert.equal($fixture.html(), "<div class=\"slidester\" style=\"height: 100%; \"><div class=\"images\"><img class=\"image\" src=\"http://localhost:9876/context.html#1\" style=\"opacity: 0; \"><img class=\"image\" src=\"http://localhost:9876/context.html#2\" style=\"display: none; \"></div><div class=\"control-buttons hover\" style=\"top: 0px; \"><span class=\"control-left\"></span><span class=\"control-right\"></span></div><div class=\"control-radio hover\" style=\"top: 0px; \"></div><div class=\"control-thumbnails hover\" style=\"top: 0px; \"></div><div class=\"captions\"></div></div>");
	// });

    // QUnit.test("has #yourOtherFunction working as expected", function(assert) {
    //     $fixture.slidester();
    //     var instance = $fixture.data("plugin_slidester");
    //     instance.init();
    //
    //     assert.equal($fixture.text(), "");
    //     assert.equal($fixture.html(), "This is some strange behaviour");
    // });



}(jQuery, QUnit));
