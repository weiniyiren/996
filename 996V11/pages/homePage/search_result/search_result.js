// pages/homePage/search_result/search_result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    industry:'',
    userCoverLink:'',
    userName: '',
    userPosition: '',
    addUserId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1111);
    console.log(options)
    this.setData({
      industry: options.industry,
      userCoverLink: options.userCoverLink,
      userName: options.userName, 
      userPosition: options.userPosition,
      addUserId: options.userId,
    })
  },
  addUser:function(e){
    // console.log(e.currentTarget.dataset.userid);
    var userId = e.currentTarget.dataset.userid;
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = app.globalData.api;
    wx.request({
      url: url + 'addUserGoodFriendV1',
      header: header,
      data: { 'addUserId': userId, 'addType': 1 },
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data)
        }
      }
    })
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