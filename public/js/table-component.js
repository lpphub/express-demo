function page_callback(page_id) {
    queryData(page_id);
}

function refreshTable(data, total, page) {
    var tableTemplate = Handlebars.compile($("#table-template").html());
    $('#data-content').html(tableTemplate(data));
    refreshPagination(total, page);
    //init height
    $(window.parent.document).find("#iframe").height($(document).height());
}

function refreshPagination(count, page) {
    $('#pagination').pagination(
        count,
        {
            current_page: page,
            items_per_page: 20,
            callback: page_callback
        });
}


/**
 * 获取url参数
 * @param {Object} name
 * @return {TypeName}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
/**
 * 获取url参数
 *
 *    var Request = new Object();
 *    Request = GetRequest();
 * @return {TypeName}
 */
function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
