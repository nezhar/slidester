( function( $, QUnit ) {

	"use strict";

	var $testCanvas = $( "#testCanvas" );
	var $fixture = null;

	QUnit.module( "jQuery Slidester", {
		beforeEach: function() {

			// fixture is the element where your jQuery plugin will act
			$fixture = $( "<div/>" );

			$testCanvas.append( $fixture );
		},
		afterEach: function() {

			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	} );

	QUnit.test( "is inside jQuery library", function( assert ) {
		assert.equal( typeof $.fn.slidester, "function", "has function inside jquery.fn" );
		assert.equal( typeof $fixture.slidester, "function", "another way to test it" );
	} );

	QUnit.test( "returns jQuery functions after called (chaining)", function( assert ) {
		assert.equal(
			typeof $fixture.slidester().on,
			"function",
			"'on' function must exist after plugin call" );
	} );

	QUnit.test( "caches plugin instance", function( assert ) {
		$fixture.slidester();
		assert.ok(
			$fixture.data( "plugin_slidester" ),
			"has cached it into a jQuery data"
		);
	} );

	QUnit.test( "enable custom config", function( assert ) {
		$fixture.slidester( {
			foo: "bar"
		} );

		var pluginData = $fixture.data( "plugin_slidester" );

		assert.deepEqual(
			pluginData.settings,
			{
				prop1: "value",
				foo: "bar"
			},
			"extend plugin settings"
		);

	} );

	QUnit.test( "changes the element text", function( assert ) {
		$fixture.slidester();

		assert.equal( $fixture.text(), "jQuery Boilerplate" );
	} );

	QUnit.test( "has #yourOtherFunction working as expected", function( assert ) {
			$fixture.slidester();

			var instance = $fixture.data( "plugin_slidester" ),
				expectedText = "foobar";

			instance.yourOtherFunction( expectedText );
			assert.equal( $fixture.text(), expectedText );
		}
	);

}( jQuery, QUnit ) );