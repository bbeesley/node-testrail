/*jslint node: true */
var defaults = require('superagent-defaults'),
    superagent = defaults(),
    url = "https://example.testrail.com/index.php?/api/v2",
    init;

init = function () {
    superagent.set("Content-Type", "application/json")
        .auth('myUsername', 'myPassword');
    return superagent;
};

exports.init = init;