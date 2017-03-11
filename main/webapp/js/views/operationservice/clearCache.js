/**
 * 清理缓存的js
 *
 * Created by machaozhe on 2016-12-13.
 */
$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    queryDetailedData();
});

/**
 * 缓存表格(Table)
 */
function queryDetailedData(){
    //table显示的列名
    var aoColumns = [
        { "sTitle": "缓存id", "mData": "name","bVisible":false},
        { "sTitle": "缓存名称", "mData": "showName"},
        { "sTitle":  "操作", "mData": "name", "mRender": function(data, type, row) {return clearButton(data, type, row);}}
    ];
    //随便写一个参数没有用
    var params = [
        {name: 'name', value:""}
    ];
    var url = 'print_clearCache_table';
    commonCustomDataTables("clearCacheTable", url, aoColumns, params,"clearCacheTable");
}

/**
 * 清理缓存按钮
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {string}
 */
function clearButton(cellvalue, options, rowObject) {
    var name = rowObject['name'];
    var showName = rowObject['showName'];
    var clearBtn = "<button type='button' class='btn btn-success btn-small' onclick=\"clearCache('"
        + name +"'"+","+"'"+showName+"'"+")\">"+"清理缓存"+"</button>";
    return clearBtn;
}

/**
 * 清理缓存
 * @param id
 * @param showName
 */
function clearCache(name,showName) {
    swal({
            title:"是否清理"+showName+"?",
            type:"warning",
            showCancelButton:true,
            confirmButtonClass:"btn-danger",
            confirmButtonText:"确定",
            cancelButtonText:"取消",
            closeOnConfirm:false
        },
        function (isConfirm) {
            if(isConfirm){
                $.post("clear_cache",{"name":name},
                    //请求成功后的处理方法
                    function (data) {
                        if(data.resCode == '1'){
                            swal("success",data.resMsg,"success");
                        }else{
                            swal("failed",data.resMsg,"error");
                        }
                    });
            }else{
                swal("success","取消成功","success")
            }
        }
    )
}