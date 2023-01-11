function checkboxOnclick_f(checkbox){
    if ( checkbox.checked == true){
        var xmlhttpf=new XMLHttpRequest();
        var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=fom"
        var type="GET";//方法
        xmlhttpf.open(type,url,true);//方法，接口，异步
        xmlhttpf.send();//发送请求
        xmlhttpf.onreadystatechange=function() {
            if (xmlhttpf.status == 200 && xmlhttpf.readyState == 4) {
                var resultf = JSON.parse(xmlhttpf.response); //获取到的json数据
                console.log(resultf);
                console.log(resultf.data);
            }
        }
    }
    else{
        var xmlhttpf=new XMLHttpRequest();
        var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=ffm"
        var type="GET";//方法
        xmlhttpf.open(type,url,true);//方法，接口，异步
        xmlhttpf.send();//发送请求
        xmlhttpf.onreadystatechange=function() {
            if (xmlhttpf.status == 200 && xmlhttpf.readyState == 4) {
                var result = JSON.parse(xmlhttpf.response); //获取到的json数据
                console.log(result);
                console.log(result.status);
            }
        }
    }
}


$(document).ready(function(){
    $('input:radio').click(function () {
        var myvalue = $(this).val();
        var check_tag = document.getElementsByName("toggle1");
        console.log(check_tag)
        for(var i=0;i<check_tag.length;i++){
            if(check_tag[i].checked){
                if (myvalue == "zhileng") {
                    var xmlhttpam=new XMLHttpRequest();
                    var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=com"
                    var type="GET";//方法
                    xmlhttpam.open(type,url,true);//方法，接口，异步
                    xmlhttpam.send();//发送请求
                    xmlhttpam.onreadystatechange=function() {
                        if (xmlhttpam.status == 200 && xmlhttpam.readyState == 4) {
                            var result = JSON.parse(xmlhttpam.response); //获取到的json数据
                            console.log(result);
                            console.log(result.status)
                        }
                    }
                }
                else{
                    var xmlhttpam=new XMLHttpRequest();
                    var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hom"
                    var type="GET";//方法
                    xmlhttpam.open(type,url,true);//方法，接口，异步
                    xmlhttpam.send();//发送请求
                    xmlhttpam.onreadystatechange=function() {
                        if (xmlhttpam.status == 200 && xmlhttpam.readyState == 4) {
                            var result = JSON.parse(xmlhttpam.response); //获取到的json数据
                            console.log(result);
                            console.log(result.status)
                        }
                    }
                }
            }
            else{
                if (myvalue == "zhileng") {
                    var xmlhttpam=new XMLHttpRequest();
                    var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=cfm"
                    var type="GET";//方法
                    xmlhttpam.open(type,url,true);//方法，接口，异步
                    xmlhttpam.send();//发送请求
                    xmlhttpam.onreadystatechange=function() {
                        if (xmlhttpam.status == 200 && xmlhttpam.readyState == 4) {
                            var result = JSON.parse(xmlhttpam.response); //获取到的json数据
                            console.log(result);
                            console.log(result.status)
                        }
                    }
                }
                else {
                    var xmlhttpam = new XMLHttpRequest();
                    var url = "https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hfm"
                    var type = "GET";//方法
                    xmlhttpam.open(type, url, true);//方法，接口，异步
                    xmlhttpam.send();//发送请求
                    xmlhttpam.onreadystatechange = function () {
                        if (xmlhttpam.status == 200 && xmlhttpam.readyState == 4) {
                            var result = JSON.parse(xmlhttpam.response); //获取到的json数据
                            console.log(result);
                            console.log(result.status)
                        }
                    }
                }
            }
        }
    });
});

function checkboxOnclick_a(checkbox){
    var radio_tag = document.getElementsByName("toggle");
    for(var i=0;i<radio_tag.length;i++){
        if(radio_tag[i].checked){
            var checkvalue = radio_tag[i].value;
        }
    }
    if ( checkbox.checked == true){
        if(checkvalue=="zhileng"){
            var xmlhttpa=new XMLHttpRequest();
            var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=com"
            var type="GET";//方法
            xmlhttpa.open(type,url,true);//方法，接口，异步
            xmlhttpa.send();//发送请求
            xmlhttpa.onreadystatechange=function() {
                if (xmlhttpa.status == 200 && xmlhttpa.readyState == 4) {
                    var result = JSON.parse(xmlhttpa.response); //获取到的json数据
                    console.log(result);
                    console.log(result.status)
                }
            }
        }
        if(checkvalue=="chushi"){
            var xmlhttpa=new XMLHttpRequest();
            var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hom"
            var type="GET";//方法
            xmlhttpa.open(type,url,true);//方法，接口，异步
            xmlhttpa.send();//发送请求
            xmlhttpa.onreadystatechange=function() {
                if (xmlhttpa.status == 200 && xmlhttpa.readyState == 4) {
                    var result = JSON.parse(xmlhttpa.response); //获取到的json数据
                    console.log(result);
                    console.log(result.status)
                }
            }
        }
    }
    else{
        if(checkvalue=="zhileng"){
            var xmlhttpa=new XMLHttpRequest();
            var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=cfm"
            var type="GET";//方法
            xmlhttpa.open(type,url,true);//方法，接口，异步
            xmlhttpa.send();//发送请求
            xmlhttpa.onreadystatechange=function() {
                if (xmlhttpa.status == 200 && xmlhttpa.readyState == 4) {
                    var result = JSON.parse(xmlhttpa.response); //获取到的json数据
                    console.log(result);
                    console.log(result.status)
                }
            }
        }
        if(checkvalue=="chushi"){
            var xmlhttpa=new XMLHttpRequest();
            var url="https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hfm"
            var type="GET";//方法
            xmlhttpa.open(type,url,true);//方法，接口，异步
            xmlhttpa.send();//发送请求
            xmlhttpa.onreadystatechange=function() {
                if (xmlhttpa.status == 200 && xmlhttpa.readyState == 4) {
                    var result = JSON.parse(xmlhttpa.response); //获取到的json数据
                    console.log(result);
                    console.log(result.status)
                }
            }
        }
    }
}

function quit() {
    var xmlhttpq = new XMLHttpRequest();
    var url = "https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=quit"
    var type = "GET";//方法
    xmlhttpq.open(type, url, true);//方法，接口，异步
    xmlhttpq.send();//发送请求
    xmlhttpq.onreadystatechange = function () {
        if (xmlhttpq.status == 200 && xmlhttpq.readyState == 4) {
            var result = JSON.parse(xmlhttpq.response); //获取到的json数据
            console.log(result);
            console.log(result.status)
        }
    }
}

function showLogin()
{
    var xmlhttpi=new XMLHttpRequest();
    var url="https://api.bemfa.com/api/device/v1/data/3/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=on\n";
    var type="GET";//方法
    xmlhttpi.open(type,url,true);//方法，接口，异步
    xmlhttpi.send();//发送请求
    xmlhttpi.onreadystatechange=function() {
        if (xmlhttpi.status == 200 && xmlhttpi.readyState == 4) {
            var result = JSON.parse(xmlhttpi.response); //获取到的json数据
            console.log(result);
            console.log(result.data[0].msg)
            var all_data_arr = result.data[0].msg;
            console.log(all_data_arr);
            if(all_data_arr=='foa'){
                document.getElementById('afi').innerText="on";
                console.log(1);
            }
            if(all_data_arr=='ffa'){
                document.getElementById('afi').innerText="off";
                console.log(1);
            }
            if(all_data_arr=='coa'){
                document.getElementById('aai').innerText="on refrigeration";
            }
            if(all_data_arr=='hoa'){
                document.getElementById('aai').innerText="on dehumidification";
            }
            if(all_data_arr=='cfa'){
                document.getElementById('aai').innerText="off";
            }
            if(all_data_arr=='hfa'){
                document.getElementById('aai').innerText="off";
            }
        }
    }
}
//setInterval方法或字符串 ，毫秒，参数数组（方法的）)
setInterval("showLogin()","1000");//showLogin()函数名一定要带括号
