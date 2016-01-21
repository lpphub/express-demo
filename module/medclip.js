'use strict';
var _pool = require('../db/pool');

exports.queryPage = function (c, pager, callback) {
    let sql = "select uid,patientName,status,isShare,serverUpdateTime from MedicalRecord where userId=? and status=? limit ?,?",
        params = [c.userId, c.status, pager.page, pager.pageSize];
    _pool.queryParams(sql, params, function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};

exports.count = function (c, callback) {
    _pool.queryParams("select count(*) as count from MedicalRecord where userId=? and status=?", [c.userId, c.status], function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};

exports.buildQuery = function (userId, status) {
    let c = new Condition(userId);
    if (status) {
        c.status = status;
    }
    return c;
};

function Condition(userId) {
    this.userId = userId;
    this.status = 1;
};
