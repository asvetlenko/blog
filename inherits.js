/**
 * Created by we on 21-Dec-15.
 */

var util = require('util');

//parent
function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = function () {
    console.log('Walk may: ', this.name);
};

//Child
function Rabbit(name) {
    this.name = name;
}

util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function () {
    console.log('Jump my: ', this.name);
};

//using our objects

var rabbit = new Rabbit('Our rabbit');
rabbit.walk();
rabbit.jump();