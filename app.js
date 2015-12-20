/**
 * Created by we on 19-Dec-15.
 */

var util = require('util');

var someObj = {
    a: 5,
    b: 7,
    action: function () {
        return 'object funtion result';
    },
    inspect: function () {
        return '(test test test)'
    }
};

someObj.self = someObj;

//console.log('work with someObj: ' + util.inspect(someObj));
console.log(someObj);
