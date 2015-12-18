/**
 * Created by alexey.svetlenko on 18.12.2015.
 */

var user = require('./user');

var vasya = new user.User('Vasya');
var peter = new user.User('Peter');

vasya.hello(peter);
