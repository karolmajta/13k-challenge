var reactive = require('reactive');

var template = require('board.tpl.html');

var View = function (model, delegate) {
    return reactive(template, model, delegate);
};

var ViewModel = function (n) {
    return {
        color: [{color: "yellow", shape: "square"}, {color: "red", shape: "circle"}],
        shape: [{color: "red", shape: "leaf"}, {color: "yellow", shape: "rounded-square"}]
    }
};


module.exports = {
    View: View,
    Model: ViewModel
};