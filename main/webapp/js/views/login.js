/**
 * Created by zj on 2017/3/11 0011.
 */
$(function () {
    initClick();
});
function initClick() {
    $("#loginSubmit").on("click",function () {
        var user = $("#username").val();
        var pw = $("#pw").val();
        if(user=="" || user==null){
            $("#errorMsg").html("用户名不能为空！");
            return false;
        }
        if(pw=="" || pw==null){
            $("#errorMsg").html("密码不能为空！");
            return false;
        }
        $.post("/general/submit_login",{account:user,pw:pw},function (data) {
            if(data.status==1){
                window.location.href = '/general/index';
            }else if(data.status==-1){
                $("#errorMsg").html("用户名不存在！");
            }else if(data.status==-2){
                $("#errorMsg").html("密码不正确！");
            }else if(data.status==-3){
                window.location.href = '/general/loginErr';
            }
        });
    });

}
