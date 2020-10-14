function deleteAll(){
    passData = {
        "serviceType":1
    };
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/specialRequest",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    alert("删库失败");
                }
                else{
                    alert("成功");
                }
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )
}

function deleteCourseStudent(){
    var _dept = $("#courseSdept").val();
    if(_dept == ""){
        alert("没有输入学院简称")
    }
    var passData = {
        "serviceType" : 2,
        "Sdept" : _dept
    }
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/specialRequest",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    alert("删除选课记录失败");
                }
                else{
                    alert("成功");
                }
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )

}

function deleteGrade(){
    var _dept = $("#courseSdept").val();
    if(_dept == ""){
        alert("没有输入学院简称")
    }
    var passData = {
        "serviceType" : 3,
        "Sdept" : _dept
    }
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/specialRequest",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    alert("将成绩置零失败");
                }
                else{
                    alert("成功");
                }
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )
}

function doubleGrade(){
    var _dept = $("#courseSdept").val();
    if(_dept == ""){
        alert("没有输入学院简称")
    }
    var passData = {
        "serviceType" : 4,
        "Sdept" : _dept
    }
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/specialRequest",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    alert("将学分翻倍失败");
                }
                else{
                    alert("成功");
                }
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )
}