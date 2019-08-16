// pages/my/my.js
const app = getApp();
var request = require("../../../utils/api");
// var util = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    backgroundImagesLink:"../../../image/back_19.png",
    // 自媒体组件
    media: {
      library: "34",
      commodity: [],
      page: ""
    },
    photoPath: '',
    photoArray: '',
    indexData: [],
    mode_show: true,
    nav_index:"",
    arr: ["全部", "分类1", "分类2", "分类3", "分类4", "分类5","分类6"],
    autoplay:false,
    time:"2019 - 04 - 11 16: 31",
  },
  return_btn: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  // 分类
  nav: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      nav_index: e.currentTarget.dataset.index,
    })
  },
  // 右上角。。。弹框tab
  mode_show: function () {
    this.setData({
      mode_show: !this.data.mode_show
    })
  },
  business: function (e) {
    wx.navigateTo({
      url: '/pages/homePage/Editing/Editing',
    })
  },
  jurisdiction: function () {
    wx.navigateTo({
      url: '../set/set',
    })
  },
  play:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var _this = this
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = app.globalData.api;
 
    wx.request({
      url: url + 'getUserSelfMediaV1',
      header: header,
      data: { friendUserId: wx.getStorageSync("userId"),page:1},
      method: 'post',
      success: function (res) {
        if (res.data.code == "200") {
          console.log(res.data.data)
          // console.log(res.data.data.mediaInfo.length)
          var pathDataArray = [];
          console.log(res.data.data.mediaInfo); 
          if (res.data.data.mediaInfo != ''){
            var pathDataArray = [];
          for (var i = 0; i<= res.data.data.mediaInfo.length-1;i++){
            console.log(res.data.data.mediaInfo[i].mediaCoverAddress);
            pathDataArray[i] = res.data.data.mediaInfo[i].mediaCoverAddress;
            request.filePathArray(pathDataArray).then((ress) => {
              console.log(ress.data)
              for (var i = 0; i <= ress.data.length - 1; i++) {
                // for 循环调取接口 获取所有 oss有关图片或者视频的真实路径
                res.data.data.mediaInfo[i].mediaCoverAddress = ress.data[i]
              }
              console.log(res.data.data.mediaInfo)
              _this.setData({
                indexData: res.data.data,
              })
              // _this.setData({
              //   photoPath: res.data
              // })
            })
             }
            }
          }
         
          // 获取用户背景图
        if (res.data.data.backgroundImagesLink !== ''){
          request.filePath(res.data.data.backgroundImagesLink).then((backgroundImagesLink) => {
            res.data.data.backgroundImagesLink = backgroundImagesLink.data
            _this.setData({
              indexData: res.data.data,
            })
          })
        }else{
          res.data.data.backgroundImagesLink = '../../../image/back_19.png'
          _this.setData({
            indexData: res.data.data,
          })
        }
        if (res.data.data.userName == ''){
          res.data.data.userName = '您的姓名'
        }
        if (res.data.data.companyName == '') {
          res.data.data.companyName = '您的公司'
        }
        if (res.data.data.industry == '') {
          res.data.data.industry = '您的职位'
        }
        if (res.data.data.userCoverLink !== ''){
          request.filePath(res.data.data.userCoverLink).then((userCoverLink) => {
            res.data.data.userCoverLink = userCoverLink.data
            _this.setData({
              indexData: res.data.data,
            })
          })
        } else {
          res.data.data.userCoverLink = '../../../image/default.png'
          _this.setData({
            indexData: res.data.data,
          })
        }
        request.filePath(res.data.data.qrCodeImagesLink).then((qrCodeImagesLink) => {
          res.data.data.qrCodeImagesLink = qrCodeImagesLink.data
          _this.setData({
            indexData: res.data.data,
          })
        })
       console.log(res.data.data)
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