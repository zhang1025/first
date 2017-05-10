
$(function () {
    initClick();
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#loginSubmit").trigger("click");
        }
    });
    $("#pw").focus(function () {
        $("#errorMsg").html("");
    });
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
        // $("#login_form").ajaxSubmit({
        //     success:function (data) {
        //         alert(data);
        //         if(data==1){
        //             window.location.href = '/general/index';
        //         }else if(data==-1){
        //             $("#errorMsg").html("用户名不存在！");
        //         }else if(data==-2){
        //             $("#errorMsg").html("密码不正确！");
        //         }else if(data==-3){
        //             window.location.href = '/general/loginErr';
        //         }
        //     }
        // });
        $.ajax({
            type: "post",
            url: "/general/submit_login",
            async:false,
            data:{account:user,pw:pw},
            success:function (data) {
                if(data==1){
                    window.location.href = '/general/index';
                }else if(data==-1){
                    $("#errorMsg").html("用户名不存在！");
                }else if(data==-2){
                    $("#errorMsg").html("密码不正确！");
                }else if(data==-3){
                    window.location.href = '/general/loginErr';
                }
            }

        });
    });

}
