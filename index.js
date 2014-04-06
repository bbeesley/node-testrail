/*jslint node: true */
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