'use strict';
var express = require('express');
var async = require('async');
var medclip = require('../module/medclip');
var timeline = require('../module/timeline');
var affix = require('../module/affix');
var Pager = require('../utils/pager');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('medclip/list');
});

router.get('/json', function (req, res, next) {
    if (!req.query.userId) {
        throw new Error("params error");
    }
    let p = new Pager(parseInt(req.query.page));
    let c = medclip.buildQuery(req.query.userId, req.query.status);
    medclip.count(c, function (err, rows) {
        if (err) throw err;
        let count = rows[0].count;
        if (count > 0) {
            medclip.queryPage(c, p, function (err, rows) {
                if (err) throw err;
                res.json({rows: rows, total: count});
            });
        } else {
            res.json({rows: [], total: 0});
        }
    });
});

router.get('/detail', function (req, res, next) {
    let uid = req.query.uid;
    if (!uid) {
        throw new Error("params error");
    }
    async.parallel([
        function (callback) {
            timeline.queryByMedclip(uid, function (err, rows) {
                callback(err, rows);
            });
        },
        function (callback) {
            affix.queryByMedclip(uid, function (err, rows) {
                callback(err, rows);
            });
        }
    ], function (err, results) {
        if (err) throw err;
        //console.log("result:" + JSON.stringify(results));
        res.render('medclip/detail', {timeline: results[0], affix: results[1]});
    });
});

module.exports = router;
