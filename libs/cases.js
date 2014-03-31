/*jslint node: true */
var help = require('./helpers.js'),
    validationRules = require('./rules.json'),
    getCase,
    getCases,
    addCase,
    updateCase,
    deleteCase;

getCase = function (caseId, next) {
    'use strict';
    var id, url, err, res, request = this.request, baseUrl = this.url;
    if (typeof (caseId) === 'string' || typeof (caseId) === 'number') {
        id = caseId;
        url = baseUrl + '/get_case/' + id;
        request.get(url)
            .end(function (err, res) {
                return next(err, res);
            });
    } else {
        err = new Error("The caseId variable is neither string or a number");
        return next(err, res);
    }
};

getCases = function (options, next) {
    'use strict';
    var projId, suiteId, secId, url, err, res, request = this.request, baseUrl = this.url;
    if (typeof (options) === 'object') {
        projId = options.projId;
        suiteId = options.suiteId;
        url = baseUrl + '/get_cases/' + projId + '/' + suiteId;
        if (options.secId) {
            secId = options.secId;
            url += '/' + secId;
        }
        request.get(url)
            .end(function (err, res) {
                return next(err, res);
            });
    } else {
        err = new Error("The options variable is not an object");
        return next(err, res);
    }
};

addCase = function (options, next) {
    'use strict';
    var rules, fields, url, err, res, request = this.request, baseUrl = this.url;
    if (options.secId) {
        url = baseUrl + '/add_case/' + options.secId;
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
            request.post(url)
                .send(data)
                .end(function (err, res) {
                    return next(err, res);
                });
        }
    });
};

updateCase = function (options, next) {
    'use strict';
    var rules, fields, url, err, res, request = this.request, baseUrl = this.url;
    if (options.caseId) {
        url = baseUrl + '/update_case/' + options.caseId;
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
            request.post(url)
                .send(data)
                .end(function (err, res) {
                    return next(err, res);
                });
        }
    });
};

deleteCase = function (caseId, next) {
    'use strict';
    var url, err, res, request = this.request, baseUrl = this.url;
    if (typeof caseId !== 'number' && typeof caseId !== 'string') {
        err = new Error("The first argument, caseId, must be passed as a number or string");
        return next(err, res);
    }
    url = baseUrl + '/delete_case/' + caseId;
    request.post(url)
        .end(function (err, res) {
            return next(err, res);
        });
};

exports.getCase = getCase;
exports.getCases = getCases;
exports.addCase = addCase;
exports.updateCase = updateCase;
exports.deleteCase = deleteCase;