// pages/homePage/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:"添加好友",
    search_box:false,
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  search:function(e){
    console.log(e.detail.value)
    if (e.detail.value!=""){
        this.setData({
          search_box:true
        })
    }else {
      this.setData({
        search_box: false
      })
    }
  },
  // 点击确定or回车
  searching:function(e){
    // console.log(e.detail.value)
    var number = e.detail.value;

    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    console.log('2222')
    console.log(e)
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = app.globalData.api;
    wx.request({
      url: url + 'addGoodFriendSearchV1',
      header: header,
      data: { 'searchNumber': number, 'searchType': 1 },
      method: 'get',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data.data);
          wx.navigateTo({
            url: '../search_result/search_result?search=' + e.detail.value + '&industry=' + res.data.data.industry +
              '&userCoverLink=' + res.data.data.userCoverLink + '&userId=' + res.data.data.userId + '&userName=' + res.data.data.userName +
              '&userPosition=' + res.data.data.userPosition 
              ,
          })
        }
      }
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