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
            url = config.url + '/get_case/' + id,
            a;
        sa
            .set(config.headers)
        // implement auth
        .get(url)
            .end(function (res) {
                // deal with the server response
                // send the callback
            });
    }
};
