// pages/my/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:"关于996名片",
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
   fun:function(){
     wx.navigateTo({
       url: '../fun/fun',
     })
  },
  agreement:function(){
    wx.navigateTo({
      url: '../agreement/agreement',
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