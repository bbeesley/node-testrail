var defaults = require('superagent-defaults'),
    superagent = defaults(),
    init;

init = function (userName, password) {
    superagent.set("Content-Type", "application/json")
        .auth(userName, password);
    return superagent;
};

exports.init = init;