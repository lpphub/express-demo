'use strict';
var _pool = require('../db/pool');

exports.queryByMedclip = function (uid, callback) {
    let sql = "select uid,itemDate,itemType,itemContent from Chart_Timeline where medicalrecorduid=? and status=1 order by itemDate desc";
    _pool.queryParams(sql, uid, function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};



