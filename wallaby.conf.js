module.exports = function (wallaby) {
    var wiredep = require('wiredep');
    var path = require('path');

    return {
        testFramework: 'mocha',

        // list of files / patterns to load in the browser
        files: [{pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false}]
            .concat(wiredep({devDependencies: true})['js']
                .map(function (filePath) {
                    return {pattern: path.relative(wallaby.localProjectDir, filePath), instrument: false};
                }))
            .concat([
                {pattern: 'node_modules/chai/chai.js', instrument: false},
                {pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', instrument: false},
                'src/client/test-helpers/*.js',
                'src/client/app/**/*.module.js',
                'src/client/app/**/*.js',
                '!src/client/app/**/*.spec.js',
                '.tmp/templates.js'
            ]),

        // list of files to exclude
        tests: ['src/client/app/**/*.spec.js'],

        setup: function () {
            window.expect = window.chai.expect;
        }
    };
};
