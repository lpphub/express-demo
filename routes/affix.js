'use strict';
var express = require('express');
var affix = require('../module/affix');
var Pager = require('../utils/pager');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('medclip/affix');
});

router.get('/json', function (req, res, next) {
    if (!req.query.uid) {
        throw new Error("params error");
    }
    affix.count(req.query.uid, function (err, rows) {
        if (err) throw err;
        let count = rows[0].count;
        if (count > 0) {
            let p = new Pager(parseInt(req.query.page));
            affix.queryByPage(req.query.uid, p, function (err, rows) {
                if (err) throw err;
                res.json({rows: rows, total: count});
            });
        } else {
            res.json({rows: [], total: 0});
        }
    });
});

module.exports = router;
