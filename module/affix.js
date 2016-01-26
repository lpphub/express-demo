'use strict';
var _pool = require('../db/pool');

exports.queryByMedclip = function (uid, callback) {
    let sql = "select a.uid,a.fileType,a.filePath,a.fileDescription,a.medicalRecordUid,a.userId,r.eventUid from MedicalRecord_Affix a , Event_Attach_R r " +
        "where a.medicalrecorduid=? and a.status=1 and a.uid=r.attachUid";
    _pool.queryParams(sql, uid, function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};

exports.queryByPage = function (uid, pager, callback) {
    let sql = "select t.uid as tuid,t.ItemDate,t.ItemType,t.ItemContent,a.uid as auid,a.FileType,a.FilePath,a.FileDescription " +
        "from MedicalRecord_Affix a, Chart_Timeline t, Event_Attach_R r where t.uid=r.EventUID and a.uid = r.AttachUID and a.MedicalRecordUID=? " +
        "and a.status=1 and t.status=1 limit ?, ?";
    let params = [uid, pager.page, pager.pageSize];
    _pool.queryParams(sql, params, function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};

exports.count = function (uid, callback) {
    let sql = "select count(*) as count from MedicalRecord_Affix a, Chart_Timeline t, Event_Attach_R r where t.uid=r.EventUID and a.uid = r.AttachUID and a.MedicalRecordUID=? and a.status=1 and t.status=1";
    _pool.queryParams(sql, uid, function (err, rows, fields) {
        if (err) callback(err, null, null);
        callback(null, rows, fields);
    });
};