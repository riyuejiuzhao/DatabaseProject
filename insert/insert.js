function insertStudent(){
    var _sno = $("#studentNumber").val();
    var _sname = $("#studentName").val();
    var _ssex = $("#studentSex").val();
    var _sdept = $("#sdept").val();
    var _sdegree = $("#sdegree").val();
    if(_sno == "" || _sname == "" || _ssex == "" || _sdept == "" || _sdegree == ""){
        alert("信息填写不完整");
        return;
    }
    _ssex = Number(_ssex);
    passData={
        "Sno":_sno,
        "Sname":_sname,
        "Ssex":_ssex,
        "Sdept":_sdept,
        "Sdegree":_sdegree
    };
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/createStudentRec",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    var errorMessage;
                    if(data.code == -1){
                        errorMessage = "其他错误";
                    }
                    else if(data.code==-2){
                        errorMessage = "Sno冲突";
                    }
                    else if(data.code == -3){
                        errorMessage = "信息不完善";
                    }
                    alert("没有成功创建记录: "+errorMessage);
                    return;
                }
                showinsertStudentData(passData);
            },
            error:function(){
                alert("无法访问服务器");
            },
            timeout:5000
        }
    );
}

function showinsertStudentData(passData){
    var ssex;
    if(passData.Ssex == 0){
        ssex = "男";
    }
    else if(passData.Ssex == 1){
        ssex = "女";
    }
    else{
        ssex = "错误性别";
    }
    var sdept;
    if(passData.Sdept == "0"){
        sdept = "历史学院";
    }
    else if(passData.Sdept == "1"){
        sdept = "物理学院";
    }
    else if(passData.Sdept == "2"){
        sdept = "数学学院";
    }
    else if(passData.Sdept == "3"){
        sdept = "艺术学院";
    }
    else{
        sdept = "错误学院";
    }
    $("#studentInformationTable").append(
        "<tr>\
            <th>"+passData.Sno+"</th>\
            <th>"+passData.Sname+"</th>\
            <th>"+ssex+"</th>\
            <th>20"+passData.Sdegree+"</th>\
            <th>"+sdept+"</th>\
            <td>已加入</td>\
        </tr>"
    );
}

function insertCourse(){
    var _cno = $("#courseNumber").val();
    var _cname = $("#courseName").val();
    var _cpno = $("#cpno").val();
    var _credit = $("#credit").val();
    if(_cno == "" || _cname == "" || _credit == ""){
        alert("信息不完整");
        return;
    }
    if(_cpno == ""){
        _cpno = null;
    }
    _credit = Number(_credit);
    if(isNaN(_credit)){
        alert("学分不正确");
        return;
    }
    passData={
        "Cno":_cno,
        "Cname":_cname,
        "Cpno":_cpno,
        "Ccredit":_credit
    };
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/createCourseRec",
            type:"post",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    var errorMessage;
                    if(data.code == -1){
                        errorMessage = "其他错误";
                    }
                    else if(data.code==-2){
                        errorMessage = "Cno冲突";
                    }
                    else if(data.code == -3){
                        errorMessage = "信息不完善";
                    }
                    else if(data.code == -4){
                        errorMessage = "Cpno不存在";
                    }
                    alert("没有成功创建记录: "+errorMessage);
                    return;
                }
                showinsertCourseData(passData);
            },
            error:function(){
                alert("无法访问服务器");
            },
            timeout:5000
        }
    );
}

function showinsertCourseData(passData){
    $("#classInformationTable").append(
        "<tr>\
            <th>"+passData.Cno+"</th>\
            <th>"+passData.Cname+"</th>\
            <th>"+passData.Cpno+"</th>\
            <th>"+passData.Ccredit+"</th>\
            <td>已加入</td>\
        </tr>"
    );
}

function insertCourseStudent(){
    var _cno = $("#courseNumber").val();
    var _sno = $("#studentNumber").val();
    var _grade = $("#grade").val();
    if(_cno == "" || _sno == ""){
        alert("学号或课程代号缺失");
        return;
    }
    var passData = {
        "Cno":_cno,
        "Sno":_sno,
    };
    if(_grade != ""){
        _grade = Number(_grade);
        if(isNaN(_grade)){
            alert("成绩错误");
            return;
        }
        passData.Grade = _grade;
    }
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/createCourseSelRec",
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
                        alertMessage="（Sno，Cno）冲突";
                    }
                    else if(data.code == -3){
                        alertMessage="信息不完善";
                    }
                    else{
                        alertMessage="未知错误";
                    }
                    alert("没有成功创建记录,错误："+alertMessage);
                    return;
                }
                showinsertCourseStudent(passData);
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    );
}

function showinsertCourseStudent(passData){
    var grade;
    if(passData.Grade == undefined){
        grade="";
    }
    else{
        grade = passData.Grade;
    }
    $("#classStudentInformationTable").append(
        "<tr>\
        <td>"+passData.Cno+"</td>\
        <td>"+passData.Sno+"</td>\
        <td>"+grade+"</td>\
        <td>已插入</td>\
        </tr>"
    );
}

