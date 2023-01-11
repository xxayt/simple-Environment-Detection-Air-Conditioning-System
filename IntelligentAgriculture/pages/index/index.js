
Page({ 
  data: { 
    username: '', 
    password:'' 
  }, 
 
// 获取输入账号 
  phoneInput :function (e) { 
    this.setData({ 
      username:e.detail.value 
    }) 
  }, 
 
// 获取输入密码 
  passwordInput :function (e) { 
    this.setData({ 
      password:e.detail.value 
    })   
  }, 
// 登录 
  login: function () { 
    var that = this;
    if(this.data.username.length == 0 || this.data.password.length == 0){ 
      wx.showToast({   
        title: 'Account or password cannot be empty',   
        icon: 'none',   
        duration: 2000    
      })   
}else { 
  // 这里修改成跳转的页面 
      wx.request({
        url: 'https://www.3jw.xyz/wx_app_server/userLogin',
        dataType:'json',
        method:'GET',
        header: {'content-type': 'application/json'},
        data:{
          username: this.data.username,
          password: this.data.password
        },
        success:(res) => {
          console.log(res.data)
          if(res.data.status == true){
            wx.showToast({   
              title: 'Login successful!',   
              icon: 'success',   
              duration: 2000   
            })  
            wx.setStorage({
              data: res.data.id,
              key: 'id'
            })
            // 跳转至index页面
           wx.switchTab({
             url: '/pages/humidityAndTemperature/humidityAndTemperature'
           })
          }else{
            wx.showToast({   
              title: 'Login failed, please try again!',   
              icon: 'none',   
              duration: 2000   
            })  
          }
        },
        fail: (err)=>{
          wx.showToast({   
            title: 'Failed to connect to the server, please check the network!',   
            icon: 'none', 
            duration: 2000   
          }) 
        }
      })
    }   
  }, 

  register: function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
}) 
