function alterStudent(){
    var _sno = $("#studentNumber").val();
    var _sname = $("#studentName").val();
    var _ssex = $("#ssex").val();
    var _sdegree = $("#sdegree").val();
    var _sdept = $("#sdept").val();
    var _allpassed = $("#allpassed").val();
    var substitude = {};

    if(_sno == ""){
        alert("未填写学生学号");
        return;
    }
    if(_sname!=""){
        substitude.Sname = _sname;
    }
    if(_ssex!=""){
        substitude.Ssex = Number(_ssex);
    }
    if(_sdegree!=""){
        substitude.Sdegree = _sdegree;
    }
    if(_sdept!=""){
        substitude.Sdept = _sdept;
    }
    if(_allpassed!=""){
        substitude.allPassed = (_allpassed == "0");
    }

    var passData = {
        "Sno" : _sno,
        "substitude" : JSON.stringify(substitude)
    }

    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/updateStudentRec",
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
                        errorMessage = "Sno不存在";
                    }
                    else if(data.code == -3){
                        errorMessage = "substitude无效";
                    }
                    alert("没有成功更新记录: "+errorMessage);
                    return;
                }
                showalterStudentData(passData);
            },
            error:function(){
                alert("无法访问服务器");
            },
            timeout:5000
        }
    );
}

function showalterStudentData(passData){
    var student = eval("("+passData.substitude+")");
    var sno = passData.Sno;
    var sname = (student.Sname == undefined)?"未改变":student.Sname;
    var ssex;
    if(student.Ssex == undefined){
        ssex = "未改变";
    }
    else if(student.Ssex == 0){
        ssex = "男";
    }
    else if(student.Ssex == 1){
        ssex = "女";
    }
    else {
        ssex = "错误性别";
    }
    var sdegree = (student.Sdegree == undefined)?"未改变":("20"+student.Sdegree);
    var sdept;
    if(student.Sdegree == undefined){
        sdept = "未改变";
    }
    else if(student.Sdegree == "0"){
        sdept = "历史学院";
    }
    else if(student.Sdegree == "1"){
        sdept = "物理学院";
    }
    else if(student.Sdegree == "2"){
        sdept = "数学学院";
    }
    else if(student.Sdegree == "3"){
        sdept = "艺术学院";
    }
    else {
        sdept = "错误学院";
    }
    var allpassed;
    if(student.allPassed == undefined){
        allpassed = "未修改";
    }
    else if(student.allPassed == "0"){
        allpassed = "无挂科记录";
    }
    else if(student.allPassed == "0"){
        allpassed = "有挂科记录";
    }
    $("#studentInformationTable").append(
        "<tr>\
            <td>"+sno+"</td>\
            <td>"+sname+"</td>\
            <td>"+ssex+"</td>\
            <td>"+sdegree+"</td>\
            <td>"+sdept+"</td>\
            <td>"+allpassed+"</td>\
        </tr>"
    )
}

function alterCourse(){
    var _cno = $("#courseNumber").val();
    var _cname = $("#courseName").val();
    var _cpno = $("#cpno").val();
    var _credit = $("#credit").val();
    var substitude = {};
    if(_cno == ""){
        alert("没有填写课程代码");
        return;
    }
    if(_cname != ""){
        substitude.Cname = _cname;
    }
    if(_cpno != ""){
        substitude.Cpno = _cpno;
    }
    if(_credit != ""){
        _credit = Number(_credit);
        if(isNaN(_credit)){
            alert("学分格式不正确");
            return;
        }
        substitude.Ccredit = _credit;
    }
    passData = {
        "Cno":_cno,
        "substitude":JSON.stringify(substitude)
    };
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/updateCourseRec",
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
                        errorMessage = "substitude无效";
                    }
                    else if(data.code == -4){
                        errorMessage = "Cpno无效";
                    }
                    alert("没有成功创建记录: "+errorMessage);
                    return;
                }
                showalterCourseData(passData);
            },
            error:function(){
                alert("无法访问服务器");
            },
            timeout:5000
        }
    );
}

function showalterCourseData(passData){
    var course = eval("("+passData.substitude+")");
    var cno = passData.Cno;
    var cname = (course.Cname == undefined)?"未修改":course.Cname;
    var cpno = (course.Cpno == undefined)?"未修改":course.Cpno;
    var credit = (course.Ccredit == undefined)?"未修改":course.Ccredit;
    $("#classInformationTable").append("\
    <tr>\
        <td>"+cno+"</td>\
        <td>"+cname+"</td>\
        <td>"+cpno+"</td>\
        <td>"+credit+"</td>\
    </tr>");
}

function alterCourseStudent(){
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
            url:"http://127.0.0.1/eduAdminSys/updateGrade",
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
                    alert("没有成功修改成绩,错误："+alertMessage);
                    return;
                }
                showAlterCourseStudent(passData);
            },
            error:function(){
                alert("无法连接到服务器");
            },
            timeout:5000
        }
    )
}

function showAlterCourseStudent(passData){
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
        </tr>"
    );
}
