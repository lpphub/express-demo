/**
 * Created by linshaokang on 16/1/12.
 */
var mysql = require("mysql");
var _pool = mysql.createPool({
    host: '192.168.10.22',
    user: 'root',
    password: 'DoeP1cWsuYg',
    database: 'NewCaseFolder',
    port: 33306
});

exports.query = function (sql, callback) {
    _pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (err, rows, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err, rows, fields);
            });
        }
    });
};

exports.queryParams = function (sql, params, callback) {
    _pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, params, function (err, rows, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err, rows, fields);
            });
        }
    });
};

exports.exec = function (sql, callback) {
    this.getConnection(function (err, connection) {
        connection.query(sql, function () {
            callback.apply(connection, arguments);
            connection.release();
        });
    })
}.bind(_pool);

//module.exports = query;