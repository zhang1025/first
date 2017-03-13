/**
 * Created by zj on 2017/3/11 0011.
 */
$(function () {
    initClick();
});
function initClick() {
    $("#submit").on("click",function () {
        var user = $("#user").val();
        var pw = $("#pw").val();
        $.post("/general/submit_login",{account:user,pw:pw},function (data) {
            if(data.status==1){
                window.location.href = '/general/index';
            }else if(data.status==-1){
                alert("用户名不存在！");
            }else if(data.status==-2){
                alert("密码不正确！");
            }else if(data.status==-3){
                window.location.href = '/general/loginErr';
            }
        });
    });

}
