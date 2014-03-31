/*jslint node: true */
var validate;

validate = function (options, rules, cb) {
    'use strict';
    var key, value, name, expect, err, res = {};
    for (key in options) {
        if (rules.hasOwnProperty(key)) {
            value = options[key];
            name = rules[key].name;
            expect = rules[key].expect;
            if (typeof (value) === expect) {
                res[name] = value;
            } else {
                err = new Error("The " + key + " option is incorrectly set, testrail expects a " + expect);
                break;
            }
        } else {
            err = new Error("Unknown variable used in options: " + key);
            break;
        }
    }
    cb(err, res);
};

exports.validate = validate;