/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  // 'styles/**/*.css',
  //Other CSS
  '/bower_components/bootstrap/dist/css/bootstrap.min.css',
  '/bower_components/fontawesome/css/font-awesome.css',
  '/bower_components/dcjqaccordion/css/dcaccordion.css',
  '/css/bootstrap-reset.css',
  '/css/style.css',
  '/css/common.css',
  '/css/style-responsive.css',
  '/css/importer.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  
  // Load sails.io before everything else
  '/bower_components/jquery/dist/jquery.js',
  '/bower_components/sails.io.js/dist/sails.io.js',
  '/bower_components/requirejs/require.js',

  //Core JS
  "/bower_components/bootstrap/dist/js/bootstrap.min.js",
  "/bower_components/dcjqaccordion/js/jquery.dcjqaccordion.2.7.js",
  "/bower_components/jquery.scrollTo/jquery.scrollTo.min.js",
  "/bower_components/jquery-validate/dist/jquery.validate.min.js"
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});