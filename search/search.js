function searchCourse(){
    var _cno = $("#courseNumber").val();
    var _cname = $("#courseName").val();
    var _fields = {
        "Cno":true,
        "Cname":true,
        "Cpno":true,
        "Cppno":true,
        "Ccredit":true,
        "students":true
    };
    var passData = {
        "fields":_fields
    };
    if(_cno != ""){
        _cno = _cno.split(";");
        passData.Cno = _cno;
    }
    if(_cname != ""){
        _cname = _cname.split(";");
        passData.Cname = _cname;
    }
    console.log(passData);
    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/getCourseInfo",
            type:"get",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(!data.success){
                    alert("没有查询到信息");
                    return;
                }
                showSearchCourseData(data.res);
            },
            error:function(){
                alert("无法访问服务器");
            },
            timeout:5000
        }
    )
}

function showSearchCourseData(res){
    $("classInformationTable").empty();
    $("classInformationTable").append("<tr>\
                    <th>课程代码</th><th>课程名称</th><th>直接先修课程代码</th><th>间接先修课程代码</th>\<th>课程学分</th>\
                </tr>");
    for(var i=0;i<res.length;i++){
        var tempCourse = res[i];
        allStudentNumber="";
        for(var j=0;j<tempCourse.students.length;j++){
            allStudentNumber = allStudentNumber+tempCourse.students[j].Sno+"\n";
        }
        $("classInformationTable").append("<tr>\
            <td>"+tempCourse.Cno+"</td>\
            <td>"+tempCourse.Cname+"</td>\
            <td>"+res.Cpno+"</td>\
            <td>"+temp.Cppno+"</td>\
            <td>"+temp.Ccredit+"</td>\
            <td>"+allStudentNumber+"</td>\
        </tr>");
    }
}

function searchStudent(){
    var _sno = $("#studentNumber").val();
    var _sname = $("#studentName").val();
    var _ssex = $("#ssex").val();
    var _sdegree = $("#sdegree").val();
    var _sdept = [$("#sdept").val()];
    var _allPassed = $("#allpassed").val();
    var _fields = {
        "Sno":true,
        "Sname":true,
        "Ssex":true,
        "Sdegree":true,
        "Sdept":true,
        "allPassed":true,
        "courses":true,
        "failedCourses":true
    }

    var passData = {
        "fields":_fields
    }

    if(_sno != ""){
        _sno = _sno.split(";");
        passData.Sno = _sno;
    }
    if(_sname != ""){
        _sname.split(";");
        passData.Sname = _sname;
    }
    if(_ssex != ""){
        _ssex = Number(_ssex);
        passData.Ssex = _ssex;
    }
    if(_sdegree != ""){
        _sdegree = [_sdegree];
        passData.Sdegree = _sdegree;
    }
    if(_sdept != ""){
        _sdept = [_sdept];
        passData.Sdept = _sdept;
    }
    if(_allPassed != ""){
        _allPassed = (_allPassed == "0");
        passData.allPassed = _allPassed;
    }

    console.log(passData);

    $.ajax(
        {
            url:"http://127.0.0.1/eduAdminSys/getStudentInfo",
            type:"get",
            data:passData,
            dataType:"json",
            success:function(data){
                console.log(data)
                if(!data.success){
                    alert("没有查询到信息")
                    return;
                }
                showSearchStudentData(data.res)
            },
            error:function(){
                alert("无法访问服务器")
            },
            timeout:5000
        }
    )
    //alert("search down")
}

function showSearchStudentData(res){
    $("#studentInformationTable").empty();
    $("#studentInformationTable").append("<tr><th>学号</th><th>姓名</th><th>性别</th><th>年级</th>\
    <th>学院</th><th>挂科记录</th><th>选修课程</th><th>挂科课程</th></tr>");
    for(var i=0;i<res.length;i++){
        var tempStudent = res[i]
        
        $("#studentInformationTable").append("<tr>\
        <td>"+tempStudent.Sno+"</td>\
        <td>"+tempStudent.Sname+"</td>\
        <td>"+num2sex(tempStudent.Ssex)+"</td>\
        <td>"+num2degree(tempStudent.Sdegree)+"</td>\
        <td>"+num2dept(tempStudent.Sdept)+"</td>\
        <td>"+bool2pass(tempStudent.allPassed)+"</td>\
        <td>"+tempStudent.courses+"</td>\
        <td>"+tempStudent.failedCourses+"</td>\
        </tr>")
    }
}

function num2sex(num){
    return (num==0)?"男":"女";
}

function num2degree(num){
    return "20"+num;
}

function bool2pass(bool){
    return (bool)?"有":"无";
}

function num2dept(num){
    if(num=="0"){
        return "历史学院";
    }
    else if(num=="1"){
        return "物理学院";
    }
    else if(num=="2"){
        return "数学学院";
    }
    else if(numb=="3"){
        return "艺术学院";
    }
    else {
        return "错误学院";
    }
}