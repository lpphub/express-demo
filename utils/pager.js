"use strict";
class Pager {
    constructor(page) {
        this.pageSize = 20;
        this.page = page * this.pageSize;
    }
}

module.exports = Pager;