// pages/homePage/Editing/edit_inp/edit_inp.js
var request = require("../../../../utils/api");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keydata: '',
    index: '',
    inputData: '',
    type_name: '',
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index)
    console.log(options.keydata)
    console.log(options.type_name)
    this.setData({
      index: options.index,
      keydata: options.keydata,
      type_name: options.type_name,
    })
  },
  keyData: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputData: e.detail.value
    })
  },
  //  用户点击完成 然后编辑自己的信息
  success: function (options) {
    // console.log(options.currentTarget.dataset)
    let _this = this;
    var type = _this.data.index;
    var inputData = _this.data.inputData;
    var type_name = _this.data.type_name;

    let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
    let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;

    var data = {};
    data['field_name'] = type_name;
    data[type_name] = inputData;
    console.log(data)
    request.request("post", app.globalData.api + "editVisitingCardDataV1", data, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
      if (sres.code !== 200) {
        app.code0(sres.msg)
      } else {
        wx.setStorageSync(type_name, inputData)
        // navigateBack 2.73版才会触发回调故放弃使用回调 edit=1设置成功 
        wx.setStorageSync("edit", 1)
        //  需要更改的类
        wx.setStorageSync("field_name", type_name)
        //  需要更改的项
        wx.setStorageSync("field_index", type)
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        wx.navigateBack({
          delta: "1"
        })
      }
    })
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