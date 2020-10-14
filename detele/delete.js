function deleteStudent(){
    var _sno = $("#studentNumber").val();
    if(_sno == ""){
        alert("未填写学号");
        return;
    }
    var passData = {
        "Sno":_sno
    };
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/deleteStudentRec",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    var alertMessage;
                    if(data.code == -1){
                        alertMessage="其他错误";
                    }
                    else if(data.code == -2){
                        alertMessage="没有该学生信息";
                    }
                    else if(data.code == -3){
                        alertMessage="有关联的选课记录";
                    }
                    else{
                        alertMessage="未知错误";
                    }
                    alert("没有成功删除,错误："+alertMessage);
                    return;
                }
                showDeleteStudent(_sno);
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )
}

function showDeleteStudent(sno){
    $("#studentInformationTable").append(
        "<tr>\
        <td>"+sno+"</td>\
        <td>已删除</td>\
        </tr>"
    );
}

function deleteCourse(){
    var _cno = $("#courseNumber").val();
    if(_cno == ""){
        alert("未填写课程代码");
        return ;
    }
    var passData = {
        "Cno":_cno
    };
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/deleteCourseRec",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    var alertMessage;
                    if(data.code == -1){
                        alertMessage="其他错误";
                    }
                    else if(data.code == -2){
                        alertMessage="课程记录不存在";
                    }
                    else if(data.code == -3){
                        alertMessage="有关联的选课记录";
                    }
                    else{
                        alertMessage="未知错误";
                    }
                    alert("没有成功删除,错误："+alertMessage);
                    return;
                }
                showDeleteCourse(_cno);
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )
}

function showDeleteCourse(cno){
    $("#classInformationTable").append(
        "<tr>\
        <td>"+cno+"</td>\
        <td>已删除</td>\
        </tr>"
    );
}

function deleteCourseStudent(){
    var _cno = $("#courseNumber").val();
    var _sno = $("#studentNumber").val();
    if(_cno == "" || _sno == ""){
        alert("未填写课程代码或者学号");
        return;
    }
    var passData = {
        "Cno":_cno,
        "Sno":_sno
    };
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/deleteCourseSelRec",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    var alertMessage;
                    if(data.code == -1){
                        alertMessage="其他错误";
                    }
                    else if(data.code == -2){
                        alertMessage="选课记录不存在";
                    }
                    else{
                        alertMessage="未知错误";
                    }
                    alert("没有成功删除,错误："+alertMessage);
                    return;
                }
                showDeleteCourseStudent(_cno,_sno);
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )
}

function showDeleteCourseStudent(cno,sno){
    $("#classInformationTable").append(
        "<tr>\
        <td>"+cno+"</td>\
        <td>"+sno+"</td>\
        <td>已删除</td>\
        </tr>"
    );
}


