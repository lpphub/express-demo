/**
 * Created by linshaokang on 16/1/11.
 */
var _pool = require('../db/pool');

_pool.query('SELECT * from User', function (err, rows, fields) {
    if (err) throw err;
    console.log(fields[1].name);

    rows.forEach((record) => console.log(record));
});
console.log('test mysql');
