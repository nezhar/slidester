# jQuery Slidester

[![Build Status](https://travis-ci.org/nezhar/slidester.svg?branch=master)](https://travis-ci.org/nezhar/slidester)

### A jQuery plugin to create fancy sliders

..WIP..

### Development

For the start you may need some node packages

    npm install

For testing the slider in the browser you can use the python SimpleHTTPServer, just run the following command in the root of the project

        python -m SimpleHTTPServer 8000

This will allow you to access the demo page at **http://localhost:8000/demo/**

To create the build and run the basic tests you may use the watch command in grunt. This one is configured to use the default settings, which will create the build, test code lint and run the tests using PhantomJS.

        grunt watch

There is also a test that covers Firefox and Chrome

        grunt integrate
