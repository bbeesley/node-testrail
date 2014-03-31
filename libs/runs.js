/*jslint node: true */
var help = require('./helpers.js'),
    validationRules = require('./rules.json'),
    getRun,
    getRuns,
    addRun,
    updateRun,
    closeRun,
    deleteRun;

getRun = function (runId, next) {
    'use strict';
    var url, err, res, request = this.request, baseUrl = this.url;
    if (typeof runId !== 'number' && typeof runId !== 'string') {
        err = new Error("The first argument, runId, must be passed as a number or string");
        return next(err, res);
    }
    url = baseUrl + '/get_run/' + runId;
    request.get(url)
        .end(function (e, r) {
            return next(e, r);
        });
};

getRuns = function (projId, next) {
    'use strict';
    var url, err, res, request = this.request, baseUrl = this.url;
    if (typeof projId !== 'number' && typeof projId !== 'string') {
        err = new Error("The first argument, projId, must be passed as a number or string");
        return next(err, res);
    }
    url = baseUrl + '/get_runs/' + projId;
    request.get(url)
        .end(function (e, r) {
            return next(e, r);
        });
};

addRun = function (projId, options, next) {
    'use strict';
    var url, err, res, rules = validationRules.addRun, request = this.request, baseUrl = this.url;
    if (typeof projId !== 'number' && typeof projId !== 'string') {
        err = new Error("The first argument, projId, must be passed as a number or string");
        return next(err, res);
    }
    url = baseUrl + '/add_run/' + projId;
    help.validate(options, rules, function (e, d) {
        if (e) {
            return next(e, res);
        }
        if (d) {
            request.post(url)
                .send(JSON.stringify(d))
                .end(function (e, r) {
                    return next(e, r);
                });

        }
    });
};