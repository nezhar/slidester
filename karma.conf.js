module.exports = function( config ) {

	config.set( {
		files: [
			"node_modules/jquery/dist/jquery.js",
			"dist/js/jquery.slidester.min.js",
			"test/setup.js",
			"test/spec/*.js"
		],
		frameworks: [ "qunit" ],
		autoWatch: true
	} );
};
