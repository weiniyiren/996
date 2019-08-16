// pages/my/sign/sign.js
var app = getApp();
var request = require("../../utils/api")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    zhahao: "",
    yan: "",
    code: "获取验证码",
    codetipnum: "",
    loginrequestStatus: false, //登录接口是否在请求状态
    smscode: false,
    login: "",
  },

  // 手机号
  zhahao: function (e) {
    this.setData({
      zhahao: e.detail.value
    })
  },
  // 
  yan: function (e) {
    this.setData({
      yan: e.detail.value
    })
  },
  // 倒计时函数
  daojishi: function (e) {
    let _this = this;
    let num = this.data.codetipnum
    if (this.data.codetipnum == 0) {
      this.setData({
        code: "重获验证码",
        smscode: false
      })
      clearTimeout(_this.data.kaishi)
    } else {
      this.setData({
        code: --num + "s",
        codetipnum: --num,
      })
    }
  },

  // 点击验证码
  codebtn: function (e) {
    let _this = this;
   
    if (!this.data.smscode) {
     
    // console.error(this.data.smscode)
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(_this.data.zhahao)) {
      app.code0("请输入正确手机号")
    } else {
     wx.showModal({
       title: _this.data.zhahao,
       content: '',
     })
     wx.request({
       url: app.globalData.api + "getPhoneCodeV1",
       method: "post",
       data: {
         "phoneNumber": _this.data.zhahao,
       },
       success:function(res){
       
         // 倒计时
         _this.setData({
           codetipnum: sres.data.seconds,
           smscode: true
         }, function () {
           _this.data.kaishi = setInterval(_this.daojishi, 1000)
         })

       },fail:function(res){
       console.log(res)
       
       }
      })
      // request.request("post", app.globalData.api + "getPhoneCodeV1", {
      //   "phoneNumber": _this.data.zhahao,
      // }).then((sres) => {
      
      // })
    }
    }
  },

  // 登录
  login: function () {
    let _this = this;
    if (_this.data.loginrequestStatus) {
      return;
    }
    wx.getStorageSync("appid") ? _this.seocy() :
      _this.notSeocy()

  },
  // 无缓存
  notSeocy: function () {
    let _this = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // res.code
        let appid = res.code
        wx.setStorageSync("appid", res.code)
        if (_this.data.codetipnum > 0) {
          let _this = this;
          _this.setData({
            loginrequestStatus: true
          })
          request.request("post", app.globalData.api + "loginOrRegisterV1", {
            "phoneNumber": _this.data.zhahao, phoneCode: _this.data.yan,
          }, { 'content-type': 'application/x-www-form-urlencoded', uniqueDeviceId: appid }).then((sres) => {
            console.log(sres)
            if (sres.code == "200") {
              // wx.setStorageSync("token", sres.data.token)
              wx.setStorage({
                key: 'page',
                data: 'logs',
              })
              wx.setStorageSync("home", true)
              wx.setStorageSync("userId", sres.data.appid);
              app.globalData.appid = sres.data.appid;
              wx.setStorageSync("userId", sres.data.userId);
              wx.setStorageSync("visitingCard", sres.data.visitingCard);
              wx.setStorage({
                key: "token",
                data: sres.data.token,
                success: function () {
                  _this.setData({
                    loginrequestStatus: false
                  })
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                      wx.navigateBack({
                        delta: 1,
                      })
                    }
                  })
                }
              })

            } else {
              _this.setData({
                loginrequestStatus: false
              })
              app.code0(sres.msg)
            }
          })
        } else {
          app.code0("验证码失效")
        }
      }
    })
  },
  // 有缓存登录
  seocy: function () {
    let _this = this
    let appid = wx.getStorageSync("appid")
    if (_this.data.codetipnum > 0) {
      let _this = this;
      _this.setData({
        loginrequestStatus: true
      })
      request.request("post", app.globalData.api + "loginOrRegisterV1", {
        "phoneNumber": _this.data.zhahao, phoneCode: _this.data.yan,
      }, { 'content-type': 'application/x-www-form-urlencoded', uniqueDeviceId: appid }).then((sres) => {
        console.log(sres)
        if (sres.code == "200") {
          // wx.setStorageSync("token", sres.data.token)
          wx.setStorageSync("home", true)
          wx.setStorageSync("userId", sres.data.userId)
          wx.setStorageSync("userId", sres.data.appid);
          app.globalData.appid = sres.data.appid
          wx.setStorageSync("visitingCard", sres.data.visitingCard)
          wx.setStorage({
            key: "token",
            data: sres.data.token,
            success: function () {
              _this.setData({
                loginrequestStatus: false
              })
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              })
            }
          })

        } else {
          _this.setData({
            loginrequestStatus: false
          })
          app.code0(sres.msg)
        }
      })
    } else {
      app.code0("验证码失效")
    }
  },
  // 返回
  navigator: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  agreement: function () {
    wx.navigateTo({
      url: '../my/agreement/agreement',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})