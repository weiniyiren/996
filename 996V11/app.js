//app.js
App({
  // 请求失败
  code0: function (e) {
    if (e) {
      wx.showModal({
        title: '请求失败',
        content: e,
      })
    } else {
      wx.showModal({
        title: '请求失败',
        content: "请重试",
      })
    }

  },

  denglu:function(e){
    wx.showModal({
      title: '点击确定登陆',
      content: e,
      success(res) {
        if (res.confirm) {
          console.log(1)
         wx.navigateTo({
           url: '/pages/logs/logs',
         })
        }
    }
    })
  },
  // appid
  // setAppid:function(){
  //   let _this = this
  //   // 获取或设置全局设备值
  //   let appid = this.globalData.appid;
  //   let token = this.globalData.token;
  //   wx.getStorage({
  //     key: 'appid',
  //     success(res) {
  //       _this.globalData.appid = res.data
  //     },
  //     fail(res) {
  //       // 登录
  //       wx.login({
  //         success: res => {
  //           // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //           console.log(res.code)
  //           _this.globalData.appid = res.code
  //           wx.setStorage({
  //             key: 'appid',
  //             data: res.code,
  //           })
  //         }
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'token',
  //     success(res) {
  //       _this.globalData.appid = res.data
  //     },
  //     fail(res) {
  //       // console.log(res,11111)
  //       // _this.denglu("登录失效或未登录")
  //     }
  //   })
  // },
  // 获取腾讯Im 程序初始加载获取即时通讯IM的签名userSig
  initIM: function () {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    console.log('---Im---')
    console.log(token);
    console.log(uniqueDeviceId);
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'getChatLoginV1',
      header: header,
      method: 'get',
      success: function (res) {
        if (res.data.code == "200") {
          // 初始化就获取腾讯IM签名 此时把签名放入缓存里面 注意 后台会比对签名 
          // 过期也没事 后台会生成一个新的签名 缓存的字段 imSign 签名  userId 进入聊天的id可以看做唯一标识
          wx.setStorageSync('imSign', res.data.data.imSign);
          wx.setStorageSync('userId', res.data.data.userId);
        }
      }
    })
  },
  // 通过手机号或名片号搜索好友 搜索类型 1为搜索框 2为扫一扫二维码进来的
  selectUser: function (e) {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    console.log('2222')
    console.log(e)
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'addGoodFriendSearchV1',
      header: header,
      data: { 'searchNumber': 13437661991, 'searchType': e },
      method: 'get',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data.code)
        }
      }
    })
  },
  // 添加好友 根据搜索出来的好友 获取用户id  来进行添加好友 1为普通的方式添加 2为名片首页添加
  addtUser: function (e) {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'addUserGoodFriendV1',
      header: header,
      data: { 'addUserId': 193, 'addType': e },
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
  },
  // 删除好友
  delUser:function(){
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    var userId = ''; // 需要删除用户的id
    wx.request({
      url: url + 'getUserPowerDataV1',
      header: header,
      data: {userFriendId:userId },
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
  },
  // 获取好友列表
  getUserFriendList: function (){
   
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'getGoodFriendDataV1',
      header: header,
      data: {infoKey:''},
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
  },
  //十八、显示用户的名片首页数据(进入他人的名片首页，或者自己的首页，这个跟登录成功的名片首页不一样！)
  showUserCardinfo: function (userId){
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    
    var url = this.globalData.api;
    wx.request({
      url: url + 'getUserDisplayCardNumberDataV1',
      header: header,
      data: { 'userId':userId},
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
  },
  //  获取用户名片权限
  getUserPower: function () {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'getUserPowerDataV1',
      header: header,

      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
  },
  // 编辑用户权限  field_name字段名 value 字段值
  getUserPower: function (field_name, value) {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var data = {};
    data['field_name'] = field_name;
    data[field_name] = value;
    console.log(data)
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'editUserPowerV1',
      header: header,
      data: data,
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
  },
  // 用户同意新好友消息列表 applyKey 申请人的key（例如:
  // 9223372035290413160: 178）
  agreeGoodFrient: function (applyKey) {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var data = {};
    data['field_name'] = field_name;
    data[field_name] = value;
    console.log(data)
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'editUserPowerV1',
      header: header,
      data: { 'applyKey': applyKey },
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
  },
  // 获取oss 信息
  ossInfo: function () {
    var app = getApp();
    var token = wx.getStorageSync('token');
    var appid = wx.getStorageSync('appid');
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': appid,
      'token': token
    }
    var url = app.globalData.api;
    wx.request({
      url: url + 'getOssStsTokenV1',
      header: header,
      method: 'get',
      success: function (res) {
        if (res.data.code == "200") {
          // 这里已经拿到oss对应的 AK
          // console.log(res.data.data)
          // console.log(res.data.data.AccessKeyId);
          // 把对应的信息放入缓存里面 注意有效时间只有一个小时
          wx.setStorageSync('AccessKeyId', res.data.data.AccessKeyId);
          wx.setStorageSync('AccessKeySecret', res.data.data.AccessKeySecret);
          wx.setStorageSync('BucketName', res.data.data.BucketName);
          wx.setStorageSync('Endpoint', res.data.data.Endpoint);
          wx.setStorageSync('Expiration', res.data.data.Expiration);
          wx.setStorageSync('SecurityToken', res.data.data.SecurityToken);
          wx.setStorageSync('createTime', res.data.data.createTime);
          // 此处打印数据是因为方便调试
          // var AccessKeyId = wx.getStorageSync('AccessKeyId');
          // console.log(AccessKeyId);
          // var AccessKeySecret = wx.getStorageSync('AccessKeySecret');
          // console.log(AccessKeySecret);
          // var BucketName = wx.getStorageSync('BucketName');
          // console.log(BucketName);
          // var Endpoint = wx.getStorageSync('Endpoint');
          // console.log(Endpoint);
          // var Expiration = wx.getStorageSync('Expiration');
          // console.log(Expiration);
          // var SecurityToken = wx.getStorageSync('SecurityToken');
          // console.log(SecurityToken);
          // var AccessKeyId = wx.getStorageSync('AccessKeyId');
          // console.log(AccessKeyId);
          // var createTime = wx.getStorageSync('createTime');
          // console.log(createTime);
        }
      }
    })
  },
  onLaunch: function () {
    // this.setAppid()
   let _this=this
    // 三、	程序初始加载获取即时通讯IM的签名userSig
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 
    wx.getSystemInfo({
      success: res => {
        // console.log(res);
        this.globalData.windowH = res.screenHeight;
        this.globalData.windowW = res.screenWidth;
      }
    });
    // 
  },

  globalData: {
    api:"https://dmcs2.yzjphp.top/",
    // api: "http://dmcs2.yzjphp.top/",
    appid:"",
    windowH:'',
    windowW:'',
    token:"",
    name:1,
    state:"",
  },
  // //渐入，渐出实现 
  // show: function (that, param, opacity) {
  //   var animation = wx.createAnimation({
  //     //持续时间800ms
  //     duration: 800,
  //     timingFunction: 'ease',
  //   });
  //   //var animation = this.animation
  //   animation.opacity(opacity).step()
  //   //将param转换为key
  //   var json = '{"' + param + '":""}'
  //   json = JSON.parse(json);
  //   json[param] = animation.export()
  //   //设置动画
  //   that.setData(json)
  // },

  // //滑动渐入渐出
  // slideupshow: function (that, param, px, opacity) {
  //   var animation = wx.createAnimation({
  //     duration: 800,
  //     timingFunction: 'ease',
  //   });
  //   animation.translateY(px).opacity(opacity).step()
  //   //将param转换为key
  //   var json = '{"' + param + '":""}'
  //   json = JSON.parse(json);
  //   json[param] = animation.export()
  //   //设置动画
  //   that.setData(json)
  // },

  //向右滑动渐入渐出
  // sliderightshow: function (that, param, px, opacity) {
  //   var animation = wx.createAnimation({
  //     duration: 800,
  //     timingFunction: 'ease',
  //   });
  //   animation.translateX(px).opacity(opacity).step()
  //   //将param转换为key
  //   var json = '{"' + param + '":""}'
  //   json = JSON.parse(json);
  //   json[param] = animation.export()
  //   //设置动画
  //   that.setData(json)
  // }
})