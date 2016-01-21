'use strict';
var express = require('express');
var mm = require('../module/medclip');
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
    let c = mm.buildQuery(req.query.userId, req.query.status);
    mm.count(c, function (err, rows) {
        if (err) throw err;
        let count = rows[0].count;
        if (count > 0) {
            mm.queryPage(c, p, function (err, rows) {
                if (err) throw err;
                res.json({rows: rows, total: count});
            });
        } else {
            res.json({rows: [], total: 0});
        }
    });
});

router.get('/tables', function (req, res, next) {
    let p = new Pager(parseInt(req.query.page));
    let userId = req.query.userId;
    if (!userId) {
        throw new Error("params error");
    }
    let c = mm.buildQuery(userId);
    mm.count(c, function (err, rows) {
        if (err) throw err;
        let count = rows[0].count;
        if (count > 0) {
            mm.queryPage(c, p, function (err, rows) {
                if (err) throw err;
                res.render('medclip/list_tmp', {rows: rows, total: count, userId: userId});
            });
        } else {
            res.render('medclip/list_tmp', {rows: [], total: 0, userId: userId});
        }
    });
});

module.exports = router;
