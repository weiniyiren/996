// pages/homePage/Editing/industry/industry.js
const app = getApp();
var request = require("../../../../utils/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: "选择行业",
    idx:false,
    nav: [{ industry: "计算机/互联网/通信/电子", nav_box: ["计算机软件","计算机软件","计算机软件"]},
      { industry: "计算机/互联网/通信/电子", nav_box: ["计算机软件", "计算机软件", "计算机软件"] }]
  },
// 
  navigateBack:function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  // 
  navbox:function(e){
    console.log(e.currentTarget.dataset.idx)
    this.setData({
      idx: e.currentTarget.dataset.idx,
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
  
    let _this = this;

    let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
    let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
    request.request("get", app.globalData.api + "industryV1", {}, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
      console.log(sres)
      if (sres.code !== 200) {
        app.code0(sres.msg)
      } else {

        this.setData({
          nav: sres.data,
        
        })
    
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