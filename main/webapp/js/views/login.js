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
        $.post("login",{user:user,pw:pw},function (data) {
            if(data.status==1){
                window.location.href = '/test/main';
            }else{
                window.location.href = '/test/loginErr';
            }
        });
    });

}
