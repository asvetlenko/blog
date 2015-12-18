/**
 * Created by alexey.svetlenko on 18.12.2015.
 */

var phrases;
module.exports.connect = function(){
    phrases = require('./ru');
};


module.exports.getPhrase = function(name){
    if(phrases && phrases[name]){
        return phrases[name];
    }

    throw new Error('Current phrases not found: ' + name);
};
