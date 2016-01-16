'use strict';
var express = require('express');
var mm = require('../module/medclip');
var Pager = require('../utils/pager');
var router = express.Router();

router.get('/', function (req, res, next) {
    let p = new Pager(parseInt(req.query.page));
    let userId = req.query.userId;
    if (!userId) {
        throw new Error("params error");
    }
    let c = new mm.Condition(userId);
    mm.count(c, function (err, rows) {
        if (err) throw err;
        let count = rows[0].count;
        if (count > 0) {
            mm.queryPage(c, p, function (err, rows) {
                if (err) throw err;
                res.render('medclip/list', {rows: rows, total: count, userId: userId});
            });
        } else {
            res.render('medclip/list', {rows: null, total: 0, userId: userId});
        }
    });
});

module.exports = router;
