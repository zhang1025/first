<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="include/taglib.jsp" %>

<!-- .page-content -->
<div class="page-content sidebar-page clearfix" style="top:0;">
    <!-- .page-content-wrapper -->
    <div id="myModalPw" style="padding-top: 100px">
        <div class="modal-dialog" style="width: 550px">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel3">修改密码</h4>
                </div>
                <div class="modal-body">
                    <form id="validate1" class="form-horizontal group-border stripped" role="form">
                        <div class="form-group">
                            <label for="oldPw" class="col-lg-4 control-label"
                                   style="padding: 1px;width: 17%">原始密码:</label>
                            <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                <input type="password" id="oldPw" class="form-control required" aria-required="true">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="newPw1" class="col-lg-4 control-label"
                                   style="padding: 1px;width: 17%">输入新密码:</label>
                            <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                <input type="password" id="newPw1" class="form-control required" aria-required="true">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="newPw2" class="col-lg-4 control-label"
                                   style="padding: 1px;width: 17%">请再次输入:</label>
                            <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                <input type="password" id="newPw2" class="form-control required" aria-required="true">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="submitBut1" class="btn btn-primary">提交</button>
                </div>
            </div>
        </div>
    </div>
    <!-- / page-content-wrapper -->
</div>

<script type="text/javascript">

    $("#updatePw").on("click",function () {
        $("#myModalPw").show();
    });

    $("#submitBut1").on("click", function () {
        var $form = $('#validate1');
        if (!$form.valid()) {
            return false;
        }
        if($("#newPw1").val() != $("#newPw2").val()){
            swal("警告","两次输入的新密码不一致！","warning");
            return false;
        }
        $.post("/general/updatePw", {
                    oldPw: $("#oldPw").val(),newPw1:$("#newPw1").val()
                },
                function (result) {
                    if (result > 0) {
                        swal("成功","操作成功！","success");
                    }  else if(result == -2){
                        swal("警告","原始密码不正确！","warning");
                    }else{
                        swal("失败","操作失败！","error");
                    }
                });
    });
</script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>

<!-- / page-content -->