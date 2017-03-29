/**
 * Created by admin on 2016/11/28 0028
 * 发车调运
 */
var path = "/transport/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    $('.select').select2();
    queryData();
    initButtonClick();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var well = $("#s_wells").val();
    var coal = $("#s_coals").val();
    var site = $("#s_sites").val();
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate},
        {name: 'wellsName', value: well},
        {name: 'coalName', value: coal},
        {name: 'siteName', value: site},
        {name: 'searchType', value: "day"}//查询日计划
    ];
    var url = path + 'get_plans_table';
    commonDataTables("dayPlanDataTables", url, aoColumns, params, "dayPlanData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {
            "sTitle": "选择", "mData": "id", "mRender": function (data, type, rowObject) {
            var id = rowObject['id'];
            var monthId = rowObject['monthId'];
            return "<input type='checkbox' name='check' monthId='"+monthId+"' value='" + id + "'/>";
        }, "sWidth": "5%"
        },
        {"sTitle": "月", "mData": "monthId", "bVisible":false},
        {"sTitle": "计划号", "mData": "rid", "sWidth": "7%"},
        {"sTitle": "收货单位", "mData": "name", "sWidth": "9"},
        {"sTitle": "到站", "mData": "siteName", "sWidth": "6%"},
        {"sTitle": "专用线", "mData": "privateLine", "sWidth": "8%"},
        {"sTitle": "井别", "mData": "wellsName", "sWidth": "8%"},
        {"sTitle": "煤种", "mData": "coalName", "sWidth": "8%"},
        {"sTitle": "计划车数", "mData": "planCarNum", "sWidth": "8%"},
        {"sTitle": "实发车", "mData": "actualCarNum", "sWidth": "9%"},
        {"sTitle": "未发车", "mData": "unsendedCarNum", "sWidth": "9%"},
        {"sTitle": "计划吨数", "mData": "planTonnage", "sWidth": "8%"},
        {"sTitle": "实发吨", "mData": "actualSendedTonnage", "sWidth": "9%"},
        {"sTitle": "单价", "mData": "actualUnitPrice", "sWidth": "8%"},
        {"sTitle": "日期", "mData": "createtime", "sWidth": "9%"},
        {
            "sTitle": "计划状态", "mData": "status", "sWidth": "8%", "mRender": function (data, type, row) {
            var status = row['status'];
            if (status == -1) {
                return "计划中止";
            }
            return "正常";
        }
        },
        {
            "sTitle": "操作", "mData": "id", "sWidth": "10%", "mRender": function (data, type, row) {
            return operateButton(data, type, row);
        }
        }
    );
    return aoColumns;
}

function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var monthId = rowObject['monthId'];
    var status = rowObject['status'];
    var ast = rowObject['actualSendedTonnage'];
    var wellsName = rowObject['wellsName'];
    var coalName = rowObject['coalName'];
    var siteName = rowObject['siteName'];
    return "<button type='button' class='btn btn-warning btn-small' data-toggle='modal' data-target='#myModal'  onclick=\"dealDayPlan('"
        + id + "','"
       + status + "','"  + monthId + "','"
        + ast + "','"
         + wellsName + "','"
        + coalName + "','" + siteName
        + "')\">安排发车</button>";
}
//新建调运计划
function dealDayPlan(id,status,monthId,ast,wellsName,coalName,siteName) {
    $("#hideId").val(id); //日计划的id
    $("#hideMonId").val(monthId); //对应月计划的id
    $("#ast").val(ast);
    $("#wellsName").val(wellsName).select2();
    $("#coalName").val(coalName).select2();
    $("#siteName").val(siteName).select2();
    $("#status").val(status);
}
function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryData();
    });
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = path + (subType == 1?"addDealDayPlan":"editDealDayPlan");
        alert(url);
        $.post(url, {
                tonnage: $("#ast").val(),
                wellsName: $("#wellsName").val(),
                coalName: $("#coalName").val(), siteName: $("#siteName").val(),
                dayId: $("#hideId").val(),wagonNo:$("#wagonNo").val(),
                id:$("#hideDealId").val(),monthId:$("#hideMonId").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    if(subType==1){
                       queryData(); 
                   }else{
                    queryDealDayPlanData($("#hideDealId").val());
                   }
                    
                } else {
                    swal("失败","删除失败","error");
                }
            });
    });
    //导出excle事件
    $('.fa-download').parent().on("click", function () {
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var well = $("#s_wells").val();
        var coal = $("#s_coals").val();
        var param = 'beginDate=' + beginDate + '&endDate=' + endDate
            + '&searchType=day' + '&wellsName=' + well + '&coalName=' + coal;
        location.href = path + 'export_plan_excel_data?' + param;
    });
    //查看dy信息
    $("#searchDealDays").on("click",function () {
        queryDealDayPlanData(checkBtn());
    });
    // $("#dayPlanDataTables tbody").on("click","tr",function () {
    //     $(this).siblings().css("background-color","").removeClass("selected");
    //     $(this).css("background-color","#00B0E8").addClass("selected");
    //     //alert($(this).context._DT_RowIndex);
    //     var id = $(this).find("td").eq(0).html();
    //     queryDealDayPlanData("8");
    // })
}

//根据日计划id查询调运详细信息
function queryDealDayPlanData(id) {
    // $("#dealDayModel").trigger("click");
    if (id == "") {
        swal("","请选中一行查看！","warning");
        return;
    }
    if (id.indexOf(",") > -1) {
        swal("","只能选中一行查看！","warning");
        return;
    }
    $("#searchDayId").val(id); //记录查看对应日计划的id
    $("#dealDayPlanData").show();
    var aoColumns = dealDayTableTitle();
    var params = [
        {name: 'dayId', value: id}
    ];
    var url = path + 'get_diaoyunInfo_table';
    commonDataTablesNoPage("dealDayPlanTables", url, aoColumns, params, "dealDayPlanData");
}

//发车调运信息
function dealDayTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "调运id", "mData": "id", "bVisible":false},
        {"sTitle": "车皮号", "mData": "wagonNo", "sWidth": "167px"},
        {"sTitle": "实发吨", "mData": "tonnage", "sWidth": "129px"},
        {"sTitle": "井别", "mData": "wellsName", "sWidth": "130px"},
        {"sTitle": "煤种", "mData": "coalName", "sWidth": "130px"},
        {"sTitle": "到站", "mData": "siteName", "sWidth": "130px"},
        {"sTitle": "日计划", "mData": "dayId", "bVisible":false},
        {"sTitle": "月计划", "mData": "monthId", "bVisible":false},
        {
            "sTitle": "状况", "mData": "status", "sWidth": "120px", "mRender": function (data, type, row) {
            var status = row['status'];
            if (status == 1) {
                return "已传";
            }
            return "未传";
        }
        },
        {
            "sTitle": "操作", "mData": "id", "sWidth": "175px", "mRender": function (data, type, row) {
            return operateDealDayButton(data, type, row);
        }
        }
    );
    return aoColumns;
}
function operateDealDayButton(cellvalue, options, rowObject) {
    var id = rowObject['id']; //调运的id
    var dayId = rowObject['dayId']; //对应的日计划id
    var monthId = rowObject['monthId']; //对应的月计划id
    var status = rowObject['status'];
    var ast = rowObject['tonnage'];
    var wellsName = rowObject['wellsName'];
    var coalName = rowObject['coalName'];
    var siteName = rowObject['siteName'];
    var wagonNo = rowObject['wagonNo'];
    var tonnage = rowObject['tonnage'];
    var edit =  "<button type='button' class='btn btn-warning btn-small' data-toggle='modal' data-target='#myModal'  onclick=\"dealEditDayPlan('"
        + id + "','" 
        + ast + "','" + status + "','"+ dayId + "','"+ monthId + "','"
         + wellsName + "','"
        + coalName + "','" + siteName+ "','"+wagonNo
        + "')\">编辑</button>";
    var dealStatus = "";
    //已经发送 不让再编辑了
    if(status == 1){
        return "<button type='button' disabled='disabled' class='btn btn-primary btn-small'>已发送</button>";
    }else{
        dealStatus = "<button type='button' class='btn btn-primary btn-small' onclick=\"dealStatusDayPlan('" + id + "','" + dayId + "','" + monthId + "','" + tonnage + "')\">发送</button>";
        return edit + "&nbsp;"+dealStatus;
    }

}
//编辑调运计划
function dealEditDayPlan(id,ast,status,dayId,monthId,wellsName,coalName,siteName,wagonNo) {
    $("#hideDealId").val(id);
    subType =2;
    $("#ast").val(ast);
    $("#wellsName").val(wellsName).select2();
    $("#coalName").val(coalName).select2();
    $("#siteName").val(siteName).select2();
    $("#status").val(status);
    $("#wagonNo").val(wagonNo);
}
//发送调运计划 更改状态 已传
function dealStatusDayPlan(id,dayId,monthId,tonnage) {
    swal({title:"提示",
        text:"是否发送？",
        type:"warning",
        showCancelButton:true,
        cancelButtonText:"取消",
        confirmButtonClass:"btn-info",
        confirmButtonText:"确定",
        closeOnConfirm:false//不设置这个，直接关闭提示框，没法显示后面成功的提示
    },function(){
        $.post(path + "dealStatusDayPlan",
            {id: id,dayId:dayId,monthId:monthId,tonnage:tonnage}, function (data) {
            if (data == 1) {
                swal("成功","操作成功！","success");
                queryDayPlanData($("#searchDayId").val());
            } else {
                swal("失败","操作失败","error");
            }
        });
    });
}
function checkBtn() {
    var checkTemp = "";
    $('input:checkbox[name="check"]:checked').each(function (i) {
        if (0 == i) {
            checkTemp = $(this).val();
        } else {
            checkTemp += ("," + $(this).val());
        }
    });
    return checkTemp;
}
function commonDataTablesNoPage(tableId, url, aoColumns, params, lodingId) {
    //初始化每页显示数量为10，可以指定，参数里面指定initLength即可
    var initLength = 10;
    for (var i = 0; i < params.length; i++) {
        if (params[i].name == "initLength") {
            initLength = params[i].value;
        }
    }
    var dt = $('#' + tableId).dataTable(
        {
            "bSort": false,
            "bProcessing": true,
            "bFilter": false,
            "bPaginate": false,//是否启用分页
            "bServerSide": true,//排序开启 此处必须设置为false
            "bLengthChange": false,
            "bAutoWidth": true,
            "sAjaxSource": url,
            "bDestroy": true,
            "bScrollCollapse": true,
            "scrollX": false,
            "sServerMethod": "POST",
            "aoColumns": aoColumns,
            "fnServerParams": function (aoData) {
                for (var i = 0; i < params.length; i++) {
                    aoData.push(params[i]);
                }
            },
            "fnServerData": function (sSource, aoData, fnCallback) {
                playLoadingWithoutTime(lodingId);
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": {
                        dt_json: $.toJSON(aoData)
                    },
                    "success": function (records) {
                        fnCallback(records);
                        hideLoading(lodingId);
                        //操作dayPlan最后一行合计显示
                        var $tableTr = $("#"+tableId+">tbody>tr:last");
                        $tableTr.find("td").eq(0).html("<b>合计</b>");
                        $tableTr.find("td").eq(5).html("");
                        $tableTr.find("td").eq(6).html("");
                    },
                    "complete": function (XMLHttpRequest, status) {
                        if (status == "parsererror") {
                            //超时重新登录
                            login_url = location.protocol + "//" +
                                location.host + "/" +
                                "general/login";
                            window.location.assign(login_url);
                        }
                    }
                });
            },
            "createdRow": function (row, data, index) { //行数据居中显示
                $("td", row).css("text-align", "center");
            },
            "oLanguage": {
                "sLengthMenu": '每页显示<select class="form-control input-sm">'
                + '<option value="10">10</option>'
                + '<option value="20">20</option>'
                + '<option value="50">50</option>'
                + '<option value="100">100</option>'
                + '</select>条记录',
                "sZeroRecords": "对不起，查询不到任何相关数据",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoEmpty": "当前显示 0 到 0 条，共 0 条记录",
                "sInfoFiltered": "(数据表中共为 _MAX_ 条记录)",
                "sProcessing": "正在加载中...",
                "sSearch": "搜索：",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": " 首页 ",
                    "sPrevious": " 上一页 ",
                    "sNext": " 下一页 ",
                    "sLast": " 尾页 "
                }
            }
        });
    //列标题居中显示
    $('.sorting_disabled').css("text-align", "center");
    return dt;
}


