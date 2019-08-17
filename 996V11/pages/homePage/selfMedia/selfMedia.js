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
    share_mask: true,
    // 分享下载==
    download: true,
    fullscreen: false,
    // 标题
    title: "",
    page: "",
    portrait: "../../../image/default.png",
    userId: "",
    requestType: "",
    paly:true,
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
  give_fun: function (e) {
    console.log(e.currentTarget.dataset)
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    var mediaId = e.currentTarget.dataset.mediaId;
    var mediaUserId = e.currentTarget.dataset.uid;
    let index=e.currentTarget.dataset.index;
    let _this = this
    let fals=true;
    if (fals){
      fals=false
   
    request.request("post", app.globalData.api + "doubleClickMediaV1", { 'mediaId': mediaId, 'mediaUserId': mediaUserId }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": uniqueDeviceId, "token": token }).then((sres) => {
      console.log(sres)
      if (sres.code !== 200) {
        if (sres.code==403 ){
          app.code0("小程序内部错误")
        }else if(sres.code==503){
          app.code0("服务器繁忙")
        }
      } else {
        let filePath_arr = _this.data.filePath_arr
        if (filePath_arr[index].clickStatus==1){
          filePath_arr[index].clickStatus=2;
          filePath_arr[index].clickNumber+=1
          _this.setData({
            filePath_arr: filePath_arr
        })
        }else{
          filePath_arr[index].clickStatus = 1;
          filePath_arr[index].clickNumber -= 1
          _this.setData({
            filePath_arr: filePath_arr
          })
        }
        fals = true;
       
      }
    })
    }
  },
  // 人气弹框
  share_mask: function () {
    this.setData({
      share_mask: !this.data.share_mask
    })
  },
  // 分享下载弹框
  download: function () {
    this.setData({
      download: !this.data.download
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    // this.int(182)
    console.log(options)
    let _this=this
    this.setData({
      userId: options.id,
      requestType: options.requestType,
    },function(){
      _this.int(options.id, options.requestType);
      wx.hideLoading()
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
  // 监听楼层切换
  swiper: function (e) {
    let _this = this;
    // let video=this.data.video
    console.log(e.detail.current, e.detail.source)
    let current = e.detail.current
    if (e.detail.source === "touch") {
      let filePath_arr = _this.data.filePath_arr.length
      if (e.detail.current >= filePath_arr - 2) {//倒数第二条调分页
        // 把新的数据push进filePath_arr
        _this.int(false, false, current)
      }else{
        _this.paly(current)
      }
     
    }
  },
  paly: function (e) {
    let _this = this;
    let video = this.data.video
    let filePath_arr = this.data.filePath_arr;
    // var pic_url = new Promise(function (success, fail) {
    new Promise(function (success, fail) {
       console.log(e)
      for (var i = 0; i < filePath_arr.length; i++) {
        wx.createVideoContext("video"+i).pause()
      }
      success(e)
      }).then((res)=>{
      if(res){
        wx.createVideoContext("video" + res).play()
      }
    })
  },
  int: function (e, type, current) {
    let _this = this;
    let requestType = type ? type : this.data.requestType;
    console.log(requestType, this.data.requestType, type)
    let userId = e ? e : this.data.userId;
    let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
    let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
    let filePath_arr = this.data.filePath_arr;
    let index = filePath_arr.length;
    // 此处会返回几条数据  播放到倒数第二条的时候就 开始请求下一组数据  为了用户体验
    // 因为oss没有提供小程序的私密上传 所以要循环调取下一个接口
  
    request.request("post", app.globalData.api + "getMediaWorksV1", { 'requestType': requestType, requestPage: _this.data.page, requestUserId: userId }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
      console.log(sres)
      if (sres.code !== 200) {
        app.code0(sres.msg)
      } else {
        console.log(sres.data)
        for (let i = 0; i < sres.data.length; i++) {
          // 这里是获取视频地址的接口  用上面的 linkAddress字段 进去换真正的路径 已经返回完整路径 无需拼接前缀
          let userCoverLink = sres.data[i].userCoverLink ? sres.data[i].userCoverLink : "";
          let arr = []
          arr = [sres.data[i].linkAddress, userCoverLink].filter(item => item)
          // console.log(arr)
          request.filePathArray(arr).then((res) => {
            console.log(res.data)
            if (res.code != 200) {
              app.code0(res.msg)
            } else {
              console.log(res.data[0])
              filePath_arr[i + Number(index)] = {
                "video": res.data[0],
                "autoplay": false,
                "poster": "",
                "clickNumber": sres.data[i].clickNumber,
                current: i,
                "title": sres.data[i].title,
                "mediaId": sres.data[i].mediaId,
                "type": sres.data[i].type,
                "uid": sres.data[i].uid,
                "clickStatus": sres.data[i].clickStatus
              }
              _this.setData({
                filePath_arr: filePath_arr,
                portrait: res.data[1] ? res.data[1] :"../../../image/default.png",
                page: sres.data[i].page
              })
            }
          }).then(() => {
            _this.paly(current)
          })


        }
      }
    })

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})