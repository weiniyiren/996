// pages/my/set/set.js
const app = getApp();
var request = require("../../../utils/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:"名片权限",
    nav:  [
      {
        title: "允许陌生人查看我的名片",
        second: [
          { title: "姓名ww： " + wx.getStorageSync('userName'), typename: '', choose: false }, { title: "地址： " + wx.getStorageSync('Company_address'), typename: '', choose: false },
          { title: "手机号码： " + wx.getStorageSync('userPhone'), typename: '', choose: true },
           { title: "电话： " + wx.getStorageSync('userPhoneNumber'), typename: '', choose: true },
          { title: "传真： " + wx.getStorageSync('userFax'), typename: '', choose: true },
          { title: "微信号： " + wx.getStorageSync('wechat'), typename: '', choose: true }, { title: "QQ号： " + wx.getStorageSync('qq'), typename: 'qq' },
          { title: "邮箱： " + wx.getStorageSync('userEmail'), typename: '', choose: true }, { title: "公司： " + wx.getStorageSync('companyName'), typename: '', choose: true },
          { title: "职业： " + wx.getStorageSync('userPosition'), typename: '', choose: true }, { title: "个性签名： " + wx.getStorageSync('personalSign'), typename: '', choose: true },
          { title: "经营范围 " + wx.getStorageSync('management'), typename: '', choose: true }], choose: true
      },
      {
        title: "允许陌生人查看我的自媒体", choose: true
      },
      {
        title: "允许陌生人给我留言", choose: false
      },
      {
        title: "允许他人在人脉库搜索到我", choose: true
      },
      {
        title: "允许通过以下方式搜索到我", choose: true,
        second: [
          { title: "手机号 ", typename: '', choose: true }, { title: "名片号 ", typename: '', choose: true },
          { title: "二维码 ", typename: '', choose: true }
        ]
      },
      {
        title: "允许通过以下方式添加我为好友",
        second: [
          { title: "名片 ", typename: '' },
          { title: "面对面 ", typename: '' }
        ]
      },
            ],
      ser_index:"", 
      one_start:false,
      er_index:"",
  },

  other:function(e){
    console.log(e.currentTarget.dataset.index,e.detail.value)
    wx.showLoading({
      title: '~主人，稍等~',
    })
  
    this.ait_request(e.detail.value, e.currentTarget.dataset.index);

  
  },
  mode:function(e){
    console.log(e.currentTarget.dataset.findex, 
    e.detail.value,
     e.currentTarget.dataset.sindex)
wx.showLoading({
  title: '~主人，稍等~',
})
   
   this.ait_request(e.detail.value, e.currentTarget.dataset.findex, e.currentTarget.dataset.sindex)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load_request();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  ait_request:function(bolen,findex,sindex){
    let _this = this;
    let nav = this.data.nav;
    typeof(0)
    let typename = sindex || sindex==0 ? nav[findex].second[sindex].typename : nav[findex].typename;
    sindex || sindex == 0 ? console.log(1) : console.log(2);
    let token = wx.getStorageSync('token');
    let uniqueDeviceId = wx.getStorageSync("appid");
    let len = bolen?1:2;
    let header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    let data = { "field_name": typename }
    data[typename] = len;
    wx.hideLoading()
    wx.request({
      url: app.globalData.api + 'editUserPowerV1',
      data: data,
      header: header,
      method: 'post',
      success: function (res) { 
        if (res.data){
          if (res.data.code == 200 && res.data.msg) {
            sindex || sindex == 0? nav[findex].second[sindex].choose = bolen : nav[findex].choose = bolen;
            _this.setData({
              nav:nav
            })
            return false;
          } else {
            app.code0(res.data.data.msg)
          }
        }
        
       
      },
      fail: function (res) {
        app.code0()
       }
    })
  },
load_request:function(){
  var _this = this
  var token = wx.getStorageSync('token');
  var uniqueDeviceId = wx.getStorageSync("appid");
  var header = {
    'content-type': 'application/x-www-form-urlencoded',
    'uniqueDeviceId': uniqueDeviceId,
    'token': token
  }
  var url = app.globalData.api;
  wx.request({
    url: url + 'getUserPowerDataV1',
    header: header,
    method: 'get',
    success: function (res) {
      if (res.data) {
        if (res.data.code == "200") {
          console.log(res.data.data)
          // 初始化就获取腾讯IM签名 此时把签名放入缓存里面 注意 后台会比对签名 
          // 过期也没事 后台会生成一个新的签名 缓存的字段 imSign 签名  userId 进入聊天的id可以看做唯一标识
          let data = res.data.data;
          let nav = _this.data.nav;
          nav[0].choose = data.noFriendLookStatus == 1 ? true : false;
          nav[0].typename = "noFriendLookStatus";

          nav[0].second[0].choose = data.lookUserNameStatus == 1 ? true : false;
          nav[0].second[0].typename = "lookUserNameStatus";

          nav[0].second[2].choose = data.lookPhoneStatus == 1 ? true : false;
          nav[0].second[2].typename = "lookPhoneStatus";

          nav[0].second[3].choose = data.lookPhoneNumberStatus == 1 ? true : false;
          nav[0].second[3].typename = "lookPhoneNumberStatus";

          nav[0].second[1].choose = data.lookAddressStatus == 1 ? true : false;
          nav[0].second[1].typename = "lookAddressStatus";

          nav[0].second[4].choose = data.lookFaxStatus == 1 ? true : false;
          nav[0].second[4].typename = "lookFaxStatus";

          nav[0].second[5].choose = data.lookWechatStatus == 1 ? true : false;
          nav[0].second[5].typename = "lookWechatStatus";

          nav[0].second[6].choose = data.lookQQStatus == 1 ? true : false;
          nav[0].second[6].typename = "lookQQStatus";


          nav[0].second[7].choose = data.lookEmailStatus == 1 ? true : false;
          nav[0].second[7].typename = "lookEmailStatus";

          nav[0].second[8].choose = data.lookCompanyNameStatus == 1 ? true : false;
          nav[0].second[8].typename = "lookCompanyNameStatus";

          nav[0].second[9].choose = data.lookOccupationStatus == 1 ? true : false;
          nav[0].second[9].typename = "lookOccupationStatus";

          nav[0].second[10].choose = data.lookUserSignStatus == 1 ? true : false;
          nav[0].second[10].typename = "lookUserSignStatus";

          nav[0].second[11].choose = data.lookJyRangeStatus == 1 ? true : false;
          nav[0].second[11].typename = "lookJyRangeStatus";

          nav[1].choose = data.lookMediaStatus == 1 ? true : false;
          nav[1].typename = "lookMediaStatus";

          nav[2].choose = data.addMessageStatus == 1 ? true : false;
          nav[2].typename = "addMessageStatus";

          nav[3].choose = data.peopleDatabaseSearch == 1 ? true : false;
          nav[3].typename = "peopleDatabaseSearch";

          nav[4].choose = data.searchBoxPhQr == 1 ? true : false;
          nav[4].typename = "searchBoxPhQr";

          nav[4].second[0].choose = data.phoneSearch == 1 ? true : false;
          nav[4].second[0].typename = "phoneSearch";

          nav[4].second[1].choose = data.cardNumberSearch == 1 ? true : false;
          nav[4].second[1].typename = "cardNumberSearch";

          nav[4].second[2].choose = data.qrcodeSearch == 1 ? true : false;
          nav[4].second[2].typename = "qrcodeSearch";

          nav[5].choose = data.addFriendCarNea == 1 ? true : false;
          nav[5].typename = "addFriendCarNea";

          nav[5].second[0].choose = data.cardIndexAddMe == 1 ? true : false;
          nav[5].second[0].typename = "cardIndexAddMe";

          nav[5].second[1].choose = data.addFriendCarNea == 1 ? true : false;
          nav[5].second[1].typename = "addFriendCarNea";
          _this.setData({
            nav: nav
          })
        } else {
          app.code0(res.data.msg)
        }
      }

    }
  })
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