/*jslint node: true */
var sa = require('superagent'),
    help = require('./helpers.js'),
    config = require('../config.json'),
    validationRules = require('./rules.json'),
    getRun,
    getRuns,
    addRun,
    updateRun,
    closeRun,
    deleteRun;

getRun = function (runId, next) {
    'use strict';
    var url, err, res;
    if (typeof runId !== 'number' && typeof runId !== 'string') {
        err = new Error("The first argument, runId, must be passed as a number or string");
        return next(err, res);
    }
    url = config.url + '/get_run/' + runId;
    sa
        .get(url)
        .set(config.headers)
        .auth(config.auth.user, config.auth.pass)
        .end(function (e, r) {
            if (e) {
                err = e;
            }
            if (r) {
                res = r;
            }
            return next(err, res);
        });
};

getRuns = function (projId, next) {
    'use strict';
    var url, err, res;
    if (typeof projId !== 'number' && typeof projId !== 'string') {
        err = new Error("The first argument, projId, must be passed as a number or string");
        return next(err, res);
    }
    url = config.url + '/get_runs/' + projId;
    sa
        .get(url)
        .set(config.headers)
        .auth(config.auth.user, config.auth.pass)
        .end(function (e, r) {
            if (e) {
                err = e;
            }
            if (r) {
                res = r;
            }
            return next(err, res);
        });
};