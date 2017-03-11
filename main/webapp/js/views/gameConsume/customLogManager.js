//var desc;
$(function () {

    $("body").ledo();

    //初始化访问人数和访问量
    initVisitorsAndViews();

    /**
     * 英文的检验
     */
    $.validator.addMethod("check_english",function(value,element){
        return this.optional(element) || /^[a-z]+[a-z_]*[a-z]+$/.test(value);
    },"只能包含小写英文字母和下划线，并以字母开头和结尾");

    /**
     * 关键字的检验
     */
    $.validator.addMethod("check_key",function(value,element){
        return !/^(select|from|date|int|string|double|count|sum|min|max|join|show|desc)$/.test(value);
    },"保留关键字不能用!");

    /**
     * 中文的检验
     */
    $.validator.addMethod("check_chinese",function(value,element){
        return this.optional(element) || /^[\u4E00-\u9FA5a-zA-Z_]{3,10}$/.test(value);
    },"只能包含中文、英文字母和下划线");

    /**
     * 下拉框校验
     */
    $.validator.addMethod("check_Select",function(value,element){
        var disabled_op = $(element).find("option[disabled='disabled']");
        var selected_op = $(element).find("option[disabled='disabled']");
        if(typeof(disabled_op)!='undefined')
        {
            return true;

        }else
            return false;
    },"请选择");


    /**
     *
     * 中英文名字的校验
     *
     */
    $("#hive_validate").validate({
        rules: {
            hive_chinese:{
                required: true,
                rangelength: [3, 10],
                check_chinese:""
            },
            hive_english:{
                required: true,
                rangelength: [3, 20],
                check_english:"",
                check_key:""
            },
        }
    });

    $("#createHive").click(function(){
        $("#dialog_createHiveform").modal({
            show : true
        });
        if($("#hiveTableDesc").find("div").length<=0)
            createORchange("hiveTableDesc", "","");
    })
    searchData();
    $("#searchBtn").click(searchData);
});


function closeCreateDialog(){
    $("#hive_chinese").val("");
    $("#hive_english").val("");
    $("#hiveTableDesc").children().remove();
    $("#addModal").modal("hide");

}

//zzzzz
function addField(){
    var tbody = $("#hiveTableDesc").find("div").find("tbody")
    $(tbody).append(
        "<tr>"+
        "<td><input type='text' class='input-small' /></td>"+
        "<td><select id='hivefield_type' name='hivefield_type'><option disabled='disabled' selected='selected'>--字段类型--</option>" +
        "<option value='String'>String</option>" +
        "<option value='int'>int</option>" +
        "<option value='double'>double</option>" +
        "</select></td>"+
        "<td><button name='up' style='display:none' class='btn btn-link btn-mini' onclick='moveUp(this)'>上移</button> " +
        "<button name='down' style='display:none' class='btn btn-link btn-mini' onclick='moveDown(this)'>下移</button>" +
        "<button class='btn btn-danger btn-small' data-toggle='modal' onclick='deleteOneLine(this)'>删除</button>" +
        "</td>"+
        "</tr>"
    );
    if($(tbody).find("tr").length >= 2){
        $(tbody).find("tr:last").prev().find("td").eq(2).find("button[name='down']").css("display","");
        $(tbody).find("tr:last").find("td").eq(2).find("button[name='up']").css("display","");
    }
}

function searchData(){
    //防止重复提交
    $('#searchBtn').button('loading');
    //var loading = new ol.loading({id:"tableBox"});
    //打开遮罩层
    //loading.show();
    var aoColumns = [
        { "sTitle": "日志中文名", "mData": "chineseName"},
        { "sTitle": "日志英文名", "mData": "englishName"},
        {"sTitle": "操作", "mData": "englishName","mRender": function(data, type, row) {return operateButton(data, type, row);}}
    ];
    var chineseName = $.trim($("#chinese_name").val());
    var englishName = $.trim($("#english_name").val());

    var params = [
        {name: 'chineseName', value: chineseName},
        {name: 'englishName', value: englishName}];

    var url = 'showCustomLogTable';
    //commonDataTables("logTable", url, aoColumns, params,loading);
    commonDataTables("logTable", url, aoColumns, params,"");
    $('#searchBtn').button('reset');
}
/**
 *
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function operateButton(cellvalue, options, rowObject) {
    var englishName= rowObject['englishName'];
    var chineseName = rowObject['chineseName'];
    //var deleteBtn = "<button class='btn btn-link btn-mini'  data-toggle='modal' data-target='#deleteModal' onclick=\"deleteRechargeStallType('"
    //    + englishName
    //    + "')\">删除日志</button>";
    //var lookBtn = "<button class='btn btn-link btn-mini' onclick=\"showLogFieldTable('"
    //    + englishName + "','" + chineseName
    //    + "')\">查看字段</button>";
    var deleteBtn = "<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#deleteModal' onclick=\"deleteRechargeStallType('"
        + englishName
        + "')\">删除日志</button>";
    var lookBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' id='editorServer' onclick=\"showLogFieldTable('"
        + englishName + "','" + chineseName
        + "')\">查看字段</button>";


    //添加字段功能暂不开启searchBtn
//     var addBtn = "<button class='btn btn-link btn-mini' onclick=\"changeField('"
//    	 + englishName+ "','" + chineseName+ "','addDesc')\">添加字段</button>";

//    return addBtn  + "&ensp;" + deleteBtn;
    return lookBtn +"&ensp;"+ deleteBtn;
}
function showLogField(englishName,chineseName){
    //var loading = new ol.loading({id:"fieldDesc"});
    $("#showTables").css("display","");
    //loading.show();
    $("#show_desc").text("日志字段信息");
    var desc = $("#show_desc").text();
    $("#searchHive").text(chineseName+"( "+englishName+")"+desc);
    $.post('searchHive', {hive: "DESCRIBE "+$.trim(englishName),maxsize: 0,begin:"0",end:"0"}, function (result) {
        $("#fieldDesc").html(result);
    });
}


function showLogFieldTable(englishName,chineseName){
    var aoColumns = [
        { "sTitle": "字段名称", "mData": "field"},
        { "sTitle": "字段类型", "mData": "type"}
    ];
    var params = [
        {name: 'hiveSql', value: "DESCRIBE "+$.trim(englishName),maxsize: 0,begin:"0",end:"0"},
        {name: 'maxsize', value: 0},
        {name: 'begin', value: "0"},
        {name: 'end', value: "0"}];
    var url = 'searchHive';
    queryDataTables(params, aoColumns, url);
}

function queryDataTables(list, aoColumns,url) {
    //最后一个参数是loading遮盖id
    commonDataTablesWithLength("dataTables", url, aoColumns, list,"dataTables");
}


/**
 * @description 添加字段
 * @param englishName
 * @param chineseName
 * @param hivefields
 */
function changeField(englishName,chineseName,hivefields){
    desc = "hivefields";
    $("#hiveTables").css("display","none");
    $("#hivefields").css("display","");
    $("#hiveDesc").children().remove();
    createORchange(hivefields,englishName,chineseName);
}

/**
 * @description 创建hive表
 * @param desc
 * @param english_name
 * @param chinese_name
 */
function createORchange(desc,english_name,chinese_name){
    $("#"+desc).append("<div name='" +chinese_name+"' id='"+english_name+"'>"+
        "<table name='" +chinese_name+"' id='"+english_name+"' class='table table-bordered'>"+
        "<thead>"+
        "<tr><th>"+"数据表中文名："+chinese_name+
        "<th>"+"数据表英文名："+english_name+"</th>"+
        "<th><button type='button' id='submitBut' class='btn btn-primary' onclick='addField(this)'>添加字段</button>&nbsp;&nbsp;&nbsp;"+
        "</th>"+
        "</tr>"+
        "<tr>"+
        "<th name='fieldName' width='30%'>字段名称</th>"+
        "<th name='fieldType' width='30%'>字段类型</th>"+
        "<th width='30%'>操作</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"+
        "</table>"+
        "</div>");
}

function deleteLog(_englishName) {
    englishName = _englishName;
    $("#informInfoId").html("你确定要进行<strong style='color:red'>删除</strong>这个日志吗？");

    $("#dialog_inform").modal({
        backdrop : false
    });
}
function closeDialogInform() {
    $("#dialog_inform").modal("hide");
    $("#success_tip_inform").val( "" ).hide();
    searchData();
}


function deleteLogProcess(_englishName) {
    $.ajax({
        url : "delete_custom_log",
        data : {
            'englishName' : englishName
        },
        dataType : 'json',
        type : 'POST',
        async : true,
        success : function(response) {
            if (response == 1) {
                showSuccessTip_inform("删除自定义日志成功！");
                setTimeout(function() {closeDialogInform();}, stayTime);
                deleteOptionLog(englishName);
                searchData();

            } else if (response == 0) {
                showValidateTip_inform("删除自定义日志失败！");
                setTimeout(function() {closeDialogInform();}, stayTime);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            validateTipInfoInform(XMLHttpRequest, "删除自定义日志失败！");
            return false;
        }
    });
}

/**
 * description 删除HIVE表字段的一行并重新构建 上下移
 * @param ele
 */
function deleteOneLine(ele){
    var ptr = $(ele).parents("tr");
    var t_body = $(ptr).parent();
    $(ptr).remove();

    if($(t_body).find("tr").length<=0){
        return;
    }
    var len = 0;
    $(t_body).find("tr").each(function(){
        if(len == 0)
        {
            if($(t_body).find("tr").length==1){
                $(this).find("td").eq(2).find("button[name='down']").css("display","none");
                $(this).find("td").eq(2).find("button[name='up']").css("display","none");
                return false;
            }else{
                $(this).find("td").eq(2).find("button[name='down']").css("display","");
                $(this).find("td").eq(2).find("button[name='up']").css("display","none");
            }
        }else if(len==$(t_body).find("tr").length-1){
            $(this).find("td").eq(2).find("button[name='down']").css("display","none");
            $(this).find("td").eq(2).find("button[name='up']").css("display","");
        }else{
            $(this).find("td").eq(2).find("button[name='down']").css("display","");
            $(this).find("td").eq(2).find("button[name='up']").css("display","");
        }
        len++;
    });
}

/**
 * @description 检查hive表字段是否重复
 * @param tbody
 * @param fieldName
 * @returns {Boolean}
 */
function checkFiled(tbody,fieldName){
    var isok = true;
    $(tbody).find("tr").each(function(){
        if($(this).find("td").eq(0).text()==fieldName){
            $("#hivefield_name_main").find("span").text("(error:字段名 "+fieldName+" 已存在!)");
            isok = false;
            return false;
        }
    })
    return isok;
}

/**
 * @ description hive表检查
 * @returns
 */
function checkHiveTable(desc){
    var hive_tables = $("#"+desc).find("div");
    var flag = true;
    if($(hive_tables).length>0)
    {
        $(hive_tables).each(function(){
            if($(this).find("table tbody tr").length<=0)
            {
                var hive_name = $(this).attr("name");
                alert("数据表"+hive_name+":没有添加任何字段!");
                flag = false;
                return false;
            }else{
                $(this).prev("span").remove();
            }
        })

    }
    return flag==false?false:true;
}

/**
 *
 * 上移
 *
 */
function moveUp(ele){

    var parent_tr = $(ele).parents("tr");
    var prev_tr = $(parent_tr).prev();
    var next_tr = $(parent_tr).next();
    if($(next_tr).length<=0) { //说明是最下边
        $($(parent_tr).clone(true)).insertBefore(prev_tr);
        $(prev_tr).prev().find("td").eq(2).find("button[name='down']").css("display","");
    }else{
        $($(parent_tr).clone(true)).insertBefore(prev_tr);
    }
    if($(prev_tr).prev().prev().length<=0){
        $(prev_tr).prev().find("td").eq(2).find("button[name='up']").css("display","none");
    }

    $(parent_tr).remove();

    if($(prev_tr).next().length<=0){
        $(prev_tr).find("td").eq(2).find("button[name='down']").css("display","none");
        $(prev_tr).find("td").eq(2).find("button[name='up']").css("display","");
    }else{
        $(prev_tr).find("td").eq(2).find("button[name='down']").css("display","");
        $(prev_tr).find("td").eq(2).find("button[name='up']").css("display","");
    }

}

/**
 *
 * 下移
 *
 */
function moveDown(ele){
    var parent_tr = $(ele).parents("tr");
    var prev_tr = $(parent_tr).prev();
    var next_tr = $(parent_tr).next();
    if($(prev_tr).length<=0) { //说明是最上边的
        $($(parent_tr).clone(true)).insertAfter(next_tr);
        $(next_tr).next().find("td").eq(2).find("button[name='up']").css("display","");
    }else{
        $($(parent_tr).clone(true)).insertAfter(next_tr);
    }
    if($(next_tr).next().next().length<=0){
        $(next_tr).next().find("td").eq(2).find("button[name='down']").css("display","none");
    }

    $(parent_tr).remove();
    if($(next_tr).prev().length<=0){
        $(next_tr).find("td").eq(2).find("button[name='down']").css("display","");
        $(next_tr).find("td").eq(2).find("button[name='up']").css("display","none");
    }else{
        $(next_tr).find("td").eq(2).find("button[name='down']").css("display","");
        $(next_tr).find("td").eq(2).find("button[name='up']").css("display","");
    }
}

/**
 * @description 处理Hive表为Json格式
 * @param Desc_div
 * @returns
 */
function dealTables(Desc_div,english_name,chinese_name)
{
    var TableNum = $("#"+Desc_div).find("div").length;
    if(TableNum<=0)
        return "";
    var table_info="{";
    table_info = table_info+"\""+english_name+" "+chinese_name+"\":[";
    $("#"+Desc_div).find("div").find("tbody tr").each(function(){
        table_info =table_info+"{";
        var tdNum = 0;
        var td_length = $(this).find("td").length;

        $(this).find("td").each(function(){
            tdNum++;
            if(tdNum == td_length)
                return false;
            table_info = table_info+"\""+$("#"+Desc_div).find("div").find("thead tr:eq(1)").children("th").eq(tdNum-1).attr("name")+"\":"+"\""+$(this).children().val()+"\",";

        });
        table_info = table_info.substr(0,table_info.length-1)+"}"+",";
    });
    table_info = table_info.substr(0,table_info.length-1)+"]"+",";
    table_info = table_info.substr(0,table_info.length-1)+"}";
    return table_info=="}"?"":table_info;
}
/**
 *
 * 最终的提交操作
 *
 */
function finalCommit(){
    var english_name = $.trim($("#hive_english").val());
    var chinese_name = $.trim($("#hive_chinese").val());
    var $form = $('#hive_validate');
    if(!$form.valid())
        return false;
    if(!checkLogRepeat(english_name)){
        alert("日志"+english_name+"已经存在，请重新命名!");
        return false;
    }
    var hive_info="";
    var tips = "没有日志创建,请先创建日志再提交!";
    var url = "createCustomLog";
    if(!checkHiveTable("hiveTableDesc"))
        return false;
    if(!checkAllFields("hiveTableDesc"))
        return false;
    hive_info = dealTables("hiveTableDesc", english_name, chinese_name);
    if(hive_info == "" || hive_info=="{}"){
        alert(tips);
        return false;
    }
    $("#finalCommit").css("display","none");

    $.goAjax("POST",url,{hiveInfo:hive_info},
        function(result){
            $('#myModal').trigger('click');
            if (result > 0) {
                showResultInfo("<strong style='color:green'>操作成功</strong>",true);
                closeModal();
            } else {
                showResultInfo("<strong style='color:red'>操作失败!</strong>",false);
            }
        });


    $("#finalCommit").css("display","");
    window.wxc.xcConfirm(txt,"custom",option);
}

function deleteOptionLog(english_name){
    $("#log_select").find("option[value="+english_name+"]").remove();
}

function insertLog(english_name){
    $("#log_select").append("<option value='"+english_name+"'>"+english_name+"</option>");
}

/**
 * @description 检查日志是否重复
 * @param english_name
 * @returns {Boolean}
 */
function checkLogRepeat(english_name){
    var isCreate = true;
    $("#log_select").find("option").each(function(){
        var val = $(this).val();
        if($.trim(english_name) == $.trim($(this).val()) || "op_log_"+english_name==$(this).val()){
            isCreate = false;
            return false;
        }
    })
    return isCreate;
}

function checkAllFields(desc){
    var pass = false;
    var i= $("#"+desc).find("div").find("tbody tr").length;
    var tmp= new Array();
    $("#"+desc).find("div").find("tbody tr").each(function(){
        var value = $(this).find("td").eq(0).children().val();
        var type = $(this).find("td").eq(1).children().val();
        if(type==null){
            alert("字段"+value+"没有选择类型!");
            return false;
        }
        if(value.length<3 ||value.length>20 || !/^[a-z]+[a-z_]*[a-z]+$/.test(value)){
            alert("(error:字段名:只能包含(3-20)小写英文字母和下划线，并以字母开头和结尾!)");
            return false;
        }
        if(/^(select|from|date|int|string|double|count|sum|min|max|join|show|desc)$/.test(value)){
            alert("(error:字段名:"+value+"为保留关键字，请使用非关键字作为字段!)");
            return false;

        }

        for(var k=0;k<tmp.length;k++){
            if($.trim(tmp[k])== $.trim(value)){
                alert("(error:字段名:"+value+"重复!)");
                return false;
            }
        }
        tmp.push(value);
        /*if($.trim(tmp) == $.trim(value)){
         alert("(error:字段名:"+value+"重复!)");
         return false;
         }*/
        i--;
    })
    if(i==0)
        pass = true;
    return pass;

}


/**
 * 关闭add和insert菜单时触发
 */
function closeModal() {
    //clearForm();
    $("#addModal").modal("hide");
}

/**
 * 清理表单
 */
function clearForm() {
    $("#recharge_name").val("");
    $("#recharge_money").val("");
    $("#recharge_type").val("");
    $('#recharge_validate').validate().resetForm();
    $('#recharge_validate label').closest('.form-group').removeClass('has-error');
}




/**
* 操作结果
* @param message
* @param isFlush
*/
function showResultInfo(message,isFlush) {
    $("#resultMessage").html(isFlush?'<i class="fa fa-check">&nbsp;<strong>'+message+'</strong></i>':
    '<i class="glyphicon glyphicon-warning-sign">&nbsp;<strong>'+message+'</strong></i>');
    $('#modelResult').modal('show');
    $("#myResult").on('click',function () {
        if(isFlush){
            searchData();
        }
    });
}




/**
 * 删除档位操作
 * @param serverId
 * @param relationId
 */
function deleteRechargeStallType(englishName) {
    $("#deleteBtn").on("click",function () {
        $.goAjax("POST","delete_custom_log",{
            'englishName' : englishName
        },function(response){
            $('#deleteModal').trigger('click');
            if (response == 1) {
                showResultInfo("<strong style='color:green'>删除成功</strong>",true);
                deleteOptionLog(englishName);
                searchData();}
            else{
                showResultInfo("<strong style='color:red'>删除自定义日志失败!</strong>",false);
            }
        });
    });
}




