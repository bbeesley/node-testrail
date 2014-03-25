/*jslint node: true */
var sa = require('superagent'),
    events = require('events'),
    config = require('../config.json'),
    getCase,
    getCases,
    addCase,
    updateCase,
    deleteCase;

getCase = function (caseId, next) {
    if (typeof (caseId) === 'string' || typeof (caseId) === 'number') {
        var id = caseId,
            url = config.url + '/get_case/' + id;
        sa
            .set(config.headers)
            .auth(config.auth.user, config.auth.pass)
        // implement auth
        .get(url)
            .end(function (res) {
                next(null, res);
            });
    } else {
        var a = new Error("The caseId variable in neither string or a number");
        next(a);
    }
};
