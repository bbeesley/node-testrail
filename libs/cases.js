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
            .get(url)
            .end(function (res) {
                next(null, res);
            });
    } else {
        var a = new Error("The caseId variable is neither string or a number");
        next(a);
    }
};

getCases = function (options, next) {
    if (typeof (options) === 'object') {
        var projId = options.projId,
            suiteId = options.suiteId,
            secId,
            url;
        url = config.url + '/get_cases/' + projId + '/' + suiteId;
        if (options.secId) {
            secId = options.secId;
            url += '/' + secId;
        }
        sa
            .set(config.headers)
            .auth(config.auth.user, config.auth.pass)
            .get(url)
            .end(function (res) {
                next(null, res);
            });
    } else {
        var a = new Error("The options variable is not an object");
        next(a);
    }
};
