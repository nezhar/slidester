module.exports = function( grunt ) {

	grunt.initConfig( {

		// Import package manifest
		pkg: grunt.file.readJSON( "package.json" ),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			js: {
				src: [ "src/js/jquery.slidester.js" ],
				dest: "dist/js/jquery.slidester.js"
			}
		},

		// Lint definitions
		jshint: {
			files: [ "src/js/jquery.slidester.js", "test/**/*" ],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: [ "dist/js/jquery.slidester.js" ],
				dest: "dist/js/jquery.slidester.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

        // Compile CSS
        sass: {
			dist: {
				files: {
					"dist/css/slidester.css" : "src/scss/slidester.scss"
				}
			}
		},

        // CSS Minify
        cssmin: {
            dist: {
                files: {
                    "dist/css/slidester.min.css": "dist/css/slidester.css"
                }
            }
        },

		// karma test runner
		karma: {
            //run during development
            dev: {
				configFile: "karma.conf.js",
				singleRun: true,
				browsers: [ "PhantomJS" ]
			},

            // run tests through browsers
			integrate: {
				configFile: "karma.conf.js",
				singleRun: true,
				browsers: [ "PhantomJS", "Firefox", "Chrome" ]
			},

			//continuous integration mode: run tests once in PhantomJS browser.
			travis: {
				configFile: "karma.conf.js",
				singleRun: true,
				browsers: [ "PhantomJS" ]
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: [ "src/**/*", "test/**/*" ],
			tasks: [ "default" ]
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-sass" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-karma" );

	grunt.registerTask( "travis", [ "jshint", "karma:travis" ] );
    grunt.registerTask( "integrate", [ "jshint", "karma:integrate" ] );
	grunt.registerTask( "lint", [ "jshint", "jscs" ] );
	grunt.registerTask( "build", [ "concat", "uglify", "sass", "cssmin" ] );
	grunt.registerTask( "default", [ "jshint", "build", "karma:dev" ] );
};
