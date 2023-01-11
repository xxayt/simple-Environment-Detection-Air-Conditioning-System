// pages/comtrol.js
// index.js
// 获取应用实例

var mqtt = require('../../utils/mqtt.js')
var client = null
Page({
  data: {
    uid:"94bb04d4a5c89e128d224f8d408a0f88",//用户密钥，巴法云控制台获取
    topic:"Temperature",//控制led的主题，mqtt控制台创建
    temperature:"",//温度值，默认为空
    humidity:"",//湿度值，默认为空
    client: null,//mqtt客户端，默认为空
    color:"window",
    editTrue: false,
    showModalStatus: false,
    isSubscribed : false,
    colorGreen: "window-green",
    switch1Checked: false,
    checked:true,
    model: "zhileng",
    a:false,
    f:false,
    switch4Checked: false
  },

  onLoad(){
    
  },

  button:function(){
    if(this.data.isSubscribed == false){
      this.connectMqtt()
      wx.showToast({
        title: 'loading',
        icon: 'loading',
        duration: 10000
      })

      wx.showToast({
        title: 'Server connection succeeded',
        icon: 'success',
        duration: 2000
      })
    }
    var that = this;
    if (that.data.editTrue == false) {
      that.setData({
        editTrue: true,
      })
    }
  },

  button1:function(){
    var that = this;
    if (that.data.editTrue == true) {
      that.setData({
        editTrue: false,
      })
    }
  },

  /**
   * switch样式点击事件
   */
  switch1Change: function (e){
    let a= e.detail.value;
    this.setData({
        // gender:gender
       a : a
      })
    let model=this.data.model;
    let x=this.data.a;
    console.log(model);
    console.log(a);
    console.log(x);
    if(a==true){
        if(model=="chushi"){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hom',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
        if(model=="zhileng"){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=com',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
    }
    if(a==false){
        if(model=="chushi"){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hfm',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
        if(model=="zhileng"){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=cfm',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
    }   
  },
 
  switch4Change:function(e){
    let f= e.detail.value;
    this.setData({
        // gender:gender
        f:f
      })
    console.log(f);
    if(f==true){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=fom',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
    }
    if(f==false){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=ffm',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
    }   
  },

  bandleChange:function(e){
    // 1 获取单选框中的值
    let model = e.detail.value;
    // 2 把值赋值给 data 中的数据
    this.setData({
      // gender:gender
      model:model
    })
    let a=this.data.a;
    console.log(model);
    console.log(a);
    if(model=="chushi"){
        if(a==true){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hom',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
        if(a==false){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=hfm',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
    }
    if(model=="zhileng"){
        if(a==true){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=com',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
        if(a==false){
            wx.request({
                url: 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=94bb04d4a5c89e128d224f8d408a0f88&topic=Control&msg=cfm',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
            success:(res) => {
                console.log(res.data)
                },
            fail:(err)=>{
                }
            })
        }
    }   

  },

  connectMqtt:function(){
    var that = this
    //MQTT连接的配置
    var options= {
      keepalive: 60, //60s ，表示心跳间隔
      clean: true, //cleanSession不保持持久会话
      protocolVersion: 4, //MQTT v3.1.1
      clientId:this.data.uid
    }
    //初始化mqtt连接
      client = mqtt.connect('wxs://bemfa.com:9504/wss',options)
      client.on('connect',(e)=>{
      console.log('Server connection succeeded')
      client.subscribe('Temperature',function(err){
        if(!err){
          console.log('订阅成功')
          that.data.isSubscribed = true
        }
      })
    })
    client.on('message',function(topic,message){
      
      var  msg = message.toString();
        if(msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          // console.log(all_data_arr);//打印数组
          
          that.setData({ //数据赋值给变量
            temperature:all_data_arr[1],//赋值温度
            humidity:all_data_arr[2], //赋值湿度
          })
        }
      //打印消息
      // console.log('收到消息：'+msg)
    })
    client.on('reconnect',(error)=>{
      console.log('正在重连:',error)
      this.data.isSubscribed = false
    })
    client.on('error',(error)=>{
      console.log('连接失败:',error)
      this.data.isSubscribed = false
    })
  }
})
