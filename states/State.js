const FastState = require('../index');

class State extends FastState {
    constructor(...args) {
        super();
        for (var a of args) {
            this[a] = args;
        }
    }
}

module.exports = { State };