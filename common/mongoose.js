/**
 * Created by we on 30-Dec-15.
 */

var mongoose = require('mongoose'),
    config = require('./../config');
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
module.exports = mongoose;
