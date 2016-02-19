module.exports = function () {
    var gulpConfig = require('./gulp.config')();
    var wiredep = require('wiredep');

    return {
        // frameworks to use
        // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        testFramework: 'mocha',

        // list of files / patterns to load in the browser
        files: gulpConfig.karma.files,

        // list of files to exclude
        tests: ['src/client/app/**/*.spec.js'],
        setup: function (wallaby) {
            // Function.prototype.bind polyfill
            if (!Function.prototype.bind) {
                Function.prototype.bind = function (oThis) {
                    if (typeof this !== 'function') {
                        // closest thing possible to the ECMAScript 5
                        // internal IsCallable function
                        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                    }

                    var aArgs = Array.prototype.slice.call(arguments, 1),
                      fToBind = this,
                       fNOP = function () {
                       },
                       fBound = function () {
                           return fToBind.apply(this instanceof fNOP && oThis ?
                               this
                               : oThis,
                             aArgs.concat(Array.prototype.slice.call(arguments)));
                       };

                    // test this.prototype in case of native functions binding:
                    if (this.prototype)
                      fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();

                    return fBound;
                };
            }
        }

    };
};
