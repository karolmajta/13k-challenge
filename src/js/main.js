var board = require('./board.js');

var m = {counter: 10};

var boardView = board.View(board.Model(), {
    delegate: {onClick: function (e, r) { m.counter++; r.set('counter', m.counter); }}
});
document.body.appendChild(boardView.el);

