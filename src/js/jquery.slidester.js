// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {
	"use strict";

		// Plugin default congifuration
		var pluginName = "slidester",
			defaults = {
				prop1: "value"
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
            this.orig_html = $( this.element ).html();
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				this.yourOtherFunction( "jQuery Boilerplate" );
			},
			yourOtherFunction: function( text ) {

				// some logic
				$( this.element ).text( text );

			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
