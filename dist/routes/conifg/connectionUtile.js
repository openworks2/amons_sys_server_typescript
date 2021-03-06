"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAction = exports.putUpdate = exports.postInsert = exports.getFindByField = exports.getFindAll = void 0;
var connectionPool_1 = __importDefault(require("./connectionPool"));
var configQuery_1 = __importDefault(require("./query/configQuery"));
var getFindAll = function (_a) {
    var table = _a.table, req = _a.req, res = _a.res;
    var _query = configQuery_1.default.findByAll(table);
    return function () {
        return connectionPool_1.default.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
                res
                    .status(404)
                    .json({ status: 404, message: "Pool getConnection Error" });
            }
            else {
                connection.query(_query, function (err, results, field) {
                    if (err) {
                        console.error(err);
                        res
                            .status(404)
                            .json({ status: 404, message: "Connection Query Error" });
                    }
                    else {
                        res.json(results);
                    }
                });
            }
            connection.release();
        });
    };
};
exports.getFindAll = getFindAll;
var getFindByField = function (_a) {
    var table = _a.table, param = _a.param, field = _a.field, req = _a.req, res = _a.res;
    var _query = configQuery_1.default.findByField(table, field);
    return function () {
        return connectionPool_1.default.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
                res
                    .status(404)
                    .json({ status: 404, message: "Pool getConnection Error" });
            }
            else {
                connection.query(_query, param, function (err, results, field) {
                    if (err) {
                        console.error(err);
                        res
                            .status(404)
                            .json({ status: 404, message: "Connection Query Error" });
                    }
                    else {
                        res.json(results);
                    }
                });
            }
            connection.release();
        });
    };
};
exports.getFindByField = getFindByField;
var postInsert = function (_a) {
    var table = _a.table, insertData = _a.insertData, key = _a.key, req = _a.req, res = _a.res;
    var _query = configQuery_1.default.insert(table);
    return function () {
        return connectionPool_1.default.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
                res
                    .status(404)
                    .json({ status: 404, message: "Pool getConnection Error" });
            }
            else {
                connection.query(_query, insertData, function (err, results, field) {
                    var _a;
                    if (err) {
                        console.error(err);
                        res
                            .status(404)
                            .json({ status: 404, message: "Connection Query Error" });
                    }
                    else {
                        var resObj = __assign(__assign({}, insertData), (_a = {}, _a[key] = results.insertId, _a));
                        res.json(resObj);
                    }
                });
            }
            connection.release();
        });
    };
};
exports.postInsert = postInsert;
var putUpdate = function (_a) {
    var table = _a.table, field = _a.field, updateData = _a.updateData, req = _a.req, res = _a.res;
    var _query = configQuery_1.default.update(table, field);
    return function () {
        return connectionPool_1.default.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
                res
                    .status(404)
                    .json({ status: 404, message: "Pool getConnection Error" });
            }
            else {
                connection.query(_query, updateData, function (err, results, field) {
                    if (err) {
                        console.error(err);
                        res
                            .status(404)
                            .json({ status: 404, message: "Connection Query Error" });
                    }
                    else {
                        var resObj = __assign({}, updateData[0]);
                        res.json(resObj);
                    }
                });
            }
            connection.release();
        });
    };
};
exports.putUpdate = putUpdate;
var deleteAction = function (_a) {
    var table = _a.table, field = _a.field, param = _a.param, req = _a.req, res = _a.res;
    var _query = configQuery_1.default.delete(table, field);
    return function () {
        return connectionPool_1.default.getConnection(function (err, connection) {
            if (err) {
                res
                    .status(404)
                    .json({ status: 404, message: "Pool getConnection Error" });
            }
            else {
                connection.query(_query, param, function (err, results, field) {
                    if (err) {
                        console.error(err);
                        res
                            .status(404)
                            .json({ status: 404, message: "Connection Query Error" });
                    }
                    else {
                        var result = __assign(__assign({}, results), { param: param });
                        res.json(result);
                    }
                });
            }
            connection.release();
        });
    };
};
exports.deleteAction = deleteAction;
