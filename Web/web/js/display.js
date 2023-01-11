var count=299;
function showLogin()
{
    var xmlhttp=new XMLHttpRequest();
    var url="https://api.bemfa.com/api/device/v1/data/3/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=test&msg=on\n";
    var type="GET";//方法
    xmlhttp.open(type,url,true);//方法，接口，异步
    xmlhttp.send();//发送请求
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
            var result = JSON.parse(xmlhttp.response); //获取到的json数据
            console.log(result);
            console.log(result.data[0].msg)
            var all_data_arr = result.data[0].msg.split("#");
            document.getElementById('wendu').innerText=all_data_arr[1] +"℃";
            document.getElementById('shidu').innerText=all_data_arr[2] +"%";
            count++;
            if(all_data_arr[1]<18&&count%300==0){
                    window.alert = function(msg, callback) {
                        var div = document.createElement("div");
                        div.innerHTML = "<style type=\"text/css\">"
                            + ".nbaMask { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); }                                                                                                                                                                       "
                            + ".nbaMaskTransparent { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; }                                                                                                                                                                                            "
                            + ".nbaDialog { position: fixed; z-index: 5000; width: 80%; max-width: 300px; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); background-color: #fff; text-align: center; border-radius: 8px; overflow: hidden; opacity: 1; color: white; }"
                            + ".nbaDialog .nbaDialogHd { padding: .2rem .27rem .08rem .27rem; }                                                                                                                                                                                                                         "
                            + ".nbaDialog .nbaDialogHd .nbaDialogTitle { font-size: 17px; font-weight: 400; }                                                                                                                                                                                                           "
                            + ".nbaDialog .nbaDialogBd { padding: 0 .27rem; font-size: 15px; line-height:2; word-wrap: break-word; word-break: break-all; color: #000000; }                                                                                                                                          "
                            + ".nbaDialog .nbaDialogFt { position: relative; line-height: 30px; font-size: 17px; display: -webkit-box; display: -webkit-flex; display: flex; }                                                                                                                                          "
                            + ".nbaDialog .nbaDialogFt:after { content: \" \"; position: absolute; left: 0; top: 0; right: 0; height: 1px; border-top: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.7); transform: scaleY(0.7); }               "
                            + ".nbaDialog .nbaDialogBtn { display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; color: #09BB07; text-decoration: none; -webkit-tap-highlight-color: transparent; position: relative; margin-bottom: 0; }                                                                       "
                            + ".nbaDialog .nbaDialogBtn:after { content: \" \"; position: absolute; left: 0; top: 0; width: 1px; bottom: 0; border-left: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleX(0.3); transform: scaleX(0.3); }             "
                            + ".nbaDialog a { text-decoration: none; -webkit-tap-highlight-color: transparent; }"
                            + "</style>"
                            + "<div id=\"dialogs2\" style=\"display: none\">"
                            + "<div class=\"nbaMask\"></div>"
                            + "<div class=\"nbaDialog\">"
                            + "	<div class=\"nbaDialogHd\">"
                            + "		<strong class=\"nbaDialogTitle\"></strong>"
                            + "	</div>"
                            + "	<div class=\"nbaDialogBd\" id=\"dialog_msg2\">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>"
                            + "	<div class=\"nbaDialogHd\">"
                            + "		<strong class=\"nbaDialogTitle\"></strong>"
                            + "	</div>"
                            + "	<div class=\"nbaDialogFt\">"
                            + "		<a href=\"javascript:;\" class=\"nbaDialogBtn nbaDialogBtnPrimary\" id=\"dialog_ok2\">I know</a>"
                            + "	</div></div></div>";
                        document.body.appendChild(div);

                        var dialogs2 = document.getElementById("dialogs2");
                        dialogs2.style.display = 'block';

                        var dialog_msg2 = document.getElementById("dialog_msg2");
                        dialog_msg2.innerHTML = msg;

                        // var dialog_cancel = document.getElementById("dialog_cancel");
                        // dialog_cancel.onclick = function() {
                        // dialogs2.style.display = 'none';
                        // };
                        var dialog_ok2 = document.getElementById("dialog_ok2");
                        dialog_ok2.onclick = function() {
                            dialogs2.style.display = 'none';
                            callback();
                        };
                    };
                    alert("The temperature is low now, please add clothes in time!")
                }
        }
    }
}
//setInterval方法或字符串 ，毫秒，参数数组（方法的）)
setInterval("showLogin()","1000");//showLogin()函数名一定要带括号

