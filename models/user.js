/**
 * Created by we on 30-Dec-15.
 */

var crypto = require('crypto'),
    mongooose = require('./../common/mongoose'),
    Schema = mongooose.Schema,
    async = require('async'),
    AuthError = require('./../error').AuthError;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');

};
//
//schema.methods.getById = function (id, callback) {
//    try {
//        var id = new ObjectID(id);
//    } catch (ex) {
//        return next(404);
//    }
//
//    User.findById(id, callback);
//};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function (username, password, callback) {
    var User = this;
    async.waterfall([
            function (callback) {
                User.findOne({username: username}, callback);
            },
            function (user, callback) {
                if (user) {
                    if (user.checkPassword(password)) {
                        callback(null, user);
                    } else {
                        callback(new AuthError('Password is wrong'));
                    }
                } else {
                    var user = new User({username: username, password: password});
                    user.save(function (err) {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, user);
                    });
                }
            }
        ],
        callback);
};

module.exports.User = mongooose.model('User', schema);


