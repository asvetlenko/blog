var crypto = require('crypto');
var mongooose = require('common/mongoose');
var Schema = mongooose.Schema;
var async = require('async');
var AuthError = require('common/error').AuthError;

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