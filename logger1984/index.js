/**
 * Created by we on 19-Dec-15.
 */

//npm publish
//npm adduser
//npm unpublsh
module.exports = function (module) {

    return {
        log: function () {
            var args = [module.filename].concat([].slice.call(arguments));

            console.log.apply(console, args);
        }
    };
};
