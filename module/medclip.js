'use strict';
var _pool = require('../db/pool');

exports.queryPage = function (condition, pager, callback) {
    var sql = "select uid,patientName,status,isShare,serverUpdateTime from MedicalRecord where userId=? limit ?,?",
        params = [condition.userId, pager.page, pager.pageSize];
    _pool.queryParams(sql, params, function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};

exports.count = function (condition, callback) {
    _pool.queryParams("select count(*) as count from MedicalRecord where userId=?", condition.userId, function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};

exports.Condition = function (userId) {
    this.userId = userId;
};
