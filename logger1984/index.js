/**
 * Created by we on 19-Dec-15.
 */

//npm publish
//npm adduser
//npm unpublsh

// http://registry.npmjs.org
//http://registry.npmjs.org/logger1984

module.exports = function (module) {

    return {
        log: function () {
            var args = ['alexey', module.filename].concat([].slice.call(arguments));

            console.log.apply(console, args);
        }
    };
};
