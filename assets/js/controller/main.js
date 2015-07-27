requirejs.config({
    paths: {
        'react'         : '/bower_components/react/react-with-addons',
        'react-router'  : '/bower_components/react-router/build/global/ReactRouter',
        'jquery'        : '/bower_components/jquery/dist/jquery',
        'jquery.timeago': '/bower_components/jquery-timeago/jquery.timeago',       
        'showdown'      : '/bower_components/showdown/src/showdown',
        'bootstrap'     : '/bower_components/dist/js/bootstrap',
        'jsx'           : '/bower_components/requirejsx/jsx',
        'JSXTransformer': '/bower_components/react/JSXTransformer',
        'templateFiles' : '/js/templates',
        'utils'         : '/js/utils',
        'moment'        : '/bower_components/moment/moment',
    },
    shim: {
        'JSXTransformer': {
            exports: "JSXTransformer"
        },
        'jquery.timeago': ["jquery"]
    }
});

require(['jquery', 'react', 'react-router', 'templateFiles/route'],
function($, React, Router, route) {

});
