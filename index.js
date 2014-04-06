/*jslint node: true */
<<<<<<< HEAD
var imports = [
    require("./libs/cases.js"),
    require("./libs/runs")
];
module.exports = {};
(function () {
    'use strict';
    imports.forEach(function (e, i, o) {
        for (var key in e) {
            exports[key] = e[key];
        }
    });
    return exports;
}());
=======
var cases = require('./libs/cases.js'),
    runs = require('./libs/runs.js'),
    agent = require('./agent.js'),
    helpers = require('./libs/helpers.js'),
    Rail;

Rail = function (url, userName, password) {
    this.request = agent.init(userName, password);
    this.url = url;
    this.getCase = cases.getCase;
    this.getCases = cases.getCases;
    this.addCase = cases.addCase;
    this.updateCase = cases.updateCase;
    this.deleteCase = cases.deleteCase;
    this.getRun = runs.getRun;
    this.getRuns = runs.getRuns;
    this.addRun = runs.addRun;
    this.updateRun = runs.updateRun;
    this.closeRun = runs.closeRun;
    this.deleteRun = runs.deleteRun;
};

exports.Rail = Rail;
>>>>>>> 24c5c5925448cebd66e76619af379336525808c0
