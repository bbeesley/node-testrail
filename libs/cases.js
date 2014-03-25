/*jslint node: true */
var sa = require('superagent'),
    help = require('./helpers.js'),
    config = require('../config.json'),
    validationRules = require('./rules.json'),
    getCase,
    getCases,
    addCase,
    updateCase,
    deleteCase;

getCase = function (caseId, next) {
    'use strict';
    var id, url, err, res;
    if (typeof (caseId) === 'string' || typeof (caseId) === 'number') {
        id = caseId;
        url = config.url + '/get_case/' + id;
        sa
            .set(config.headers)
            .auth(config.auth.user, config.auth.pass)
            .get(url)
            .end(function (r) {
                res = r;
                return next(err, res);
            });
    } else {
        err = new Error("The caseId variable is neither string or a number");
        return next(err, res);
    }
};

getCases = function (options, next) {
    'use strict';
    var projId, suiteId, secId, url, err, res;
    if (typeof (options) === 'object') {
        projId = options.projId;
        suiteId = options.suiteId;
        url = config.url + '/get_cases/' + projId + '/' + suiteId;
        if (options.secId) {
            secId = options.secId;
            url += '/' + secId;
        }
        sa
            .get(url)
            .set(config.headers)
            .auth(config.auth.user, config.auth.pass)
            .end(function (r) {
                res = r;
                return next(err, res);
            });
    } else {
        err = new Error("The options variable is not an object");
        return next(err, res);
    }
};

addCase = function (options, next) {
    'use strict';
    var rules, fields, url, err, res;
    if (options.secId) {
        url = config.url + '/add_case/' + options.secId;
    } else {
        err = new Error("Options object did not contain the secId (section id) element, which is required for this method");
        return next(err, res);
    }
    fields = options;
    delete fields.secId;
    rules = validationRules.addCase;
    help.validate(fields, rules, function (e, data) {
        if (e) {
            err = e;
            return next(err, res);
        } else {
            sa
                .post(url)
                .set(config.headers)
                .auth(config.auth.user, config.auth.pass)
                .send(data)
                .end(function (e, r) {
                    if (e) {
                        err = e;
                    }
                    if (r) {
                        res = r;
                    }
                    return next(err, res);
                });
        }
    });
};

updateCase  = function (options, next) {
    'use strict';
    var rules, fields, url, err, res;
    if (options.caseId) {
        url = config.url + '/update_case/' + options.caseId;
    } else {
        err = new Error("Options object did not contain the caseId (case id) element, which is required for this method");
        return next(err, res);
    }
    fields = options;
    delete fields.caseId;
    rules = validationRules.updateCase;
    help.validate(fields, rules, function (e, data) {
        if (e) {
            err = e;
            return next(err, res);
        } else {
            sa
                .post(url)
                .set(config.headers)
                .auth(config.auth.user, config.auth.pass)
                .send(data)
                .end(function (e, r) {
                    if (e) {
                        err = e;
                    }
                    if (r) {
                        res = r;
                    }
                    return next(err, res);
                });
        }
    });
};

deleteCase = function (caseId, next) {
    'use strict';
    var url, err, res;
    if (typeof caseId !== 'number' && typeof caseId !== 'string') {
        err = new Error("The first argument, caseId, must be passed as a number or string");
        return next(err, res);
    }
    url = config.url + '/delete_case/' + caseId;
    sa
        .post(url)
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

exports.getCase = getCase;
exports.getCases = getcases;
exports.addCase = addCase;
exports.updateCase = updateCase;
exports.deleteCase = deleteCase;