"use strict";
class Pager {
    constructor(page) {
        this.pageSize = 10;
        this.page = page * this.pageSize;
    }
}

module.exports = Pager;