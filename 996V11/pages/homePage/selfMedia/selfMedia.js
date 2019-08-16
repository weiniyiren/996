// pages/homePage/mySelfMedia/mySelfMedia.js
const app = getApp();
var request = require("../../../utils/api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    header: [],
    circular: false,
    nav_index: 0,
    give: true,
    filePath: '',
    filePath_arr: [],
  // 人气
    share_mask:true,
      // 分享下载==
    download:true,
  },
  // 返回
  navigateBack: function () {
    console.log(1)
    wx.navigateBack({
      delta: "1"
    })
  },
  // 头部导航
  nav: function (e) {
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      nav_index: e.currentTarget.dataset.index,
    })
  },
  give_fun: function () {
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var mediaId = '192:1565331718';
    var mediaUserId = '192';
    let _this=this
    request.request("post", app.globalData.api + "doubleClickMediaV1", { 'mediaId': mediaId, 'mediaUserId': mediaUserId }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": uniqueDeviceId, "token": token }).then((sres) => {
      console.log(sres)
      if (sres.code !== 200) {
      
      } else {
        _this.setData({
          give: !_this.data.give
        })
      }
    })
  },
  // 人气弹框
  share_mask:function(){
    this.setData({
      share_mask: !this.data.share_mask
    })
  },
  // 分享下载弹框
  download:function(){
    this.setData({
      download: !this.data.download
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

    // 此处会返回几条数据  播放到倒数第二条的时候就 开始请求下一组数据  为了用户体验
    // 因为oss没有提供小程序的私密上传 所以要循环调取下一个接口
    request.request("post", app.globalData.api + "getMediaWorksV1", { 'requestType': 1, }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
      console.log(sres)
      if (sres.code !== 200) {
        app.code0(sres.msg)
      } else {
        console.log(sres.data)
        for (let i = 0; i < sres.data.length; i++) {
          // 这里是获取视频地址的接口  用上面的 linkAddress字段 进去换真正的路径 已经返回完整路径 无需拼接前缀
          // uplaod/images/168/20190731/8c18dd06bb974167f574fa3e1d43ef2d.mp4
          // request.request("post", app.globalData.api + "getMediaLinkUrlV1", { 'filePath': sres.data[i].linkAddress }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
          //   if (sres.code !== 200) {
          //     app.code0(sres.msg)
          //   } else {
          //     console.log(sres.data)
          //     let filePath_arr = _this.data.filePath_arr
          //     filePath_arr[i] = sres.data
          //     _this.setData({
          //       filePath_arr: filePath_arr
          //     })
          //   }
          // })
          request.filePath(sres.data[i].linkAddress).then((res) => {
            console.log(res.data)
            if (res.code != 200) {
              app.code0(res.msg)
            } else {
              let filePath_arr = _this.data.filePath_arr
              filePath_arr[i] = res.data

              _this.setData({
                filePath_arr: filePath_arr
              })
            }
          })


        }
      }
    })


  },
  // 监听楼层
  swiper: function (e) {
    let _this = this;
    console.log(e.detail.current, e.detail.source)
    if (e.detail.source === "touch") {
      let filePath_arr = _this.data.filePath_arr.length
      if (e.detail.source == filePath_arr - 2) {//倒数第二条调分页
        // 把新的数据push进filePath_arr
      }
    }
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