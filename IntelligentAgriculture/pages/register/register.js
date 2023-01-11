// pages/register.js
var regex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@&%#_]{6,16}$/
Page({

    /**
     * 页面的初始数据
     */
    data: { 
        username: '', 
        password:'',
        confirmPassword:'' 
      }, 
     
    // 获取输入账号 
      usernameInput :function (e) { 
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

    // 获取再次输入密码 
    confirmPasswordInput :function (e) { 
        this.setData({ 
          confirmPassword:e.detail.value 
        })   
      }, 

    register: function(){
        var that=this;
        if(that.data.password == that.data.confirmPassword && regex.test(that.data.password)){
            wx.request({
                url: 'https://www.3jw.xyz/wx_app_server/userRegister',
                dataType:'json',
                method:'GET',
                header: {'content-type': 'application/json'},
                data:{
                    username: this.data.username,
                    password: this.data.password
                },
            success:(res) => {
                console.log(res.data)
                if(res.data.status == true && res.data.badname == false){
                    wx.showToast({   
                        title: 'registration success',   
                        icon: 'success',   
                        duration: 2000   
                        });
                    wx.reLaunch({
                        url: '/pages/index/index',
                        })
                    }else if(res.data.status == false && res.data.badname == true){
                        wx.showToast({   
                            title: 'The same username already exists, please re-enter',   
                            icon: 'none',   
                            duration: 2000   
                        });
                    }else{
                        wx.showToast({   
                            title: 'registration failed',   
                            icon: 'none',  
                            duration: 2000   
                        });
                    }
                },
                fail:(err)=>{
                    wx.showToast({   
                        title: 'Failed to connect to the server, please check the network',   
                        icon: 'none',  
                        duration: 2000   
                      }) 
                }
            })
        }else if((that.data.password == that.data.confirmPassword && !regex.test(that.data.password))){
          wx.showToast({   
              title: 'Password format does not meet requirements',   
              icon: 'none', 
              duration: 2000   
            }) 
        }else{
          wx.showToast({   
            title: 'Password does not match, please re-enter',   
            icon: 'none', 
            duration: 2000   
          }) 
        }
    },

    back: function(){
        wx.reLaunch({
            url: '/pages/index/index',
            })
    }
})