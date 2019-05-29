"use strict";
exports.__esModule = true;
var User = (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'fulano@gmail.com': new User('fulano@gmail.com', 'Fulano da Silva', 'fulano'),
    'ciclano@gmail.com': new User('ciclano@gmail.com', 'ciclano Fizz', 'ciclano')
};
