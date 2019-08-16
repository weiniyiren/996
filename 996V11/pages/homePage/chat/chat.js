// pages/homePage/chat/chat.js
const app = getApp();
var request = require("../../../utils/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: "最近",
    search_btn: false,
    search_content: "",
    commodity: [{ userName: "赵得住", tel: "13213678912", qq: "11111111111", weixin: "1111111111", youxinag: "xxxxxx@xx.com", management: "电商产品运营，提供收益方案, 电商产品运营，提供收益方案", icon: false, state: "1", userId: '11', userPosition: "运营经理·阿里巴巴", userCoverLink: "" }, { userName: "赵得住", tel: "13213678912", qq: "11111111111", weixin: "1111111111", youxinag: "xxxxxx@xx.com", management: "电商产品运营，提供收益方案, 电商产品运营，提供收益方案", icon: false, state: "1", userId: '11', userPosition: "运营经理·阿里巴巴", userCoverLink: "" }],
    // 

    // 同意显示隐藏
    agree: true,
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  touxian:function(e){
wx.navigateTo({
  url: '../chat_con/chat_con',
})
  },
  search: function (e) {
    console.log(e)
    if (e.detail.value) {
      this.setData({
        search_btn: true,
      })
    } else {
      this.setData({
        search_btn: false,
      })
    }
  },
  chat_con: function () {
    wx.navigateTo({
      url: '../chat_con/chat_con?name=' + this.data.name,
    })
  },
  // QQ等开关
  icon: function (e) {
    console.log(e, e.currentTarget.dataset.i)
    let _this = this;
    let commodity = this.data.commodity;
    let i = e.currentTarget.dataset.i
    commodity[i].icon = !commodity[i].icon
    this.setData({
      commodity: commodity
    })
  },
  // 拨号
  tel: function (e) {
    wx.makePhoneCall({
      phoneNumber: 'e.currentTarget.dataset.txt'
    })
  },
  // 
  qq: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.txt,
    })
  },
  // 点击同意按钮
  agree: function (e) {
    console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.state);
    if (e.currentTarget.dataset.state==2){
      return false
    }else{

    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    console.log('2222')
    console.log(e)
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'uniqueDeviceId': uniqueDeviceId,
      'token': token
    }
    var url = this.globalData.api;
    wx.request({
      url: url + 'addGoodFriendSearchV1',
      header: header,
      data: { 'searchNumber': 13437661991, 'searchType': e },
      method: 'get',
      success: function (res) {
        if (res.data.code == "200") {

          console.log(res.data.code)

        }
      }
    })
    }
  },
  card:function(){
    let _this=this;
   wx.navigateTo({
     url: '../card/card',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      header: e.page
    })
    if (e.page == "留言") {
      this.setData({
        agree: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function (e) {
    var type = this.data.header;
    var token = wx.getStorageSync('token');
    var uniqueDeviceId = wx.getStorageSync("appid");
    console.log(type)
    let _this=this
    if (type === '留言'){
      // var userId = e.currentTarget.dataset.userid;
     
      var header = {
        'content-type': 'application/x-www-form-urlencoded',
        'uniqueDeviceId': uniqueDeviceId,
        'token': token
      }
      var url = app.globalData.api;
      wx.request({
        url: url + 'getFrientNoticeDataV1',
        header: header,
        data: { 'infoKey':'' },
        method: 'post',
        success: function (res) {
          // { userName: "赵得住", tel: "13213678912", qq: "11111111111", weixin: "1111111111", youxinag: "xxxxxx@xx.com", management: "电商产品运营，提供收益方案, 电商产品运营，提供收益方案", icon: true, state: "同意", userId: '11' }
          if (res.data.code == "200") {
            console.log(res.data.data.length)
            console.log(1)
            var pathDataArray = [];
            for (var i = 0; i <= res.data.data.length - 1; i++) {
              // console.log(res.data.data.mediaInfo[i].mediaCoverAddress);
              console.log(i)
              // pathDataArray[i] = res.data.data.mediaInfo[i].mediaCoverAddress;
            }
            _this.setData({
              commodity: res.data.data
            })
          }
        }
      })
    } else if (type == '最近'){
      request.request("get", app.globalData.api + "getGoodFriendDataV1", { infoKey: '' }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": uniqueDeviceId, "token": token }).then((sres) => {
        console.log(sres)
        if (sres.code !== 200) {
          app.code0(sres.msg)
        } else {
          var obj = sres.data;
          var arr = []
          for (var i in obj) {
            arr.push(obj[i])
          }
          console.log(arr)
          for(var i=0;i<arr.length;i++){
            console.log(arr[i])
          if (arr[i].userCoverLink !== '') {
            var aa = new Promise(function (success, fail) {
              request.filePath(arr[i].userCoverLink).then((userCoverLink) => {
                console.log(userCoverLink.data)
                var userCoverLink  = userCoverLink.data
                success(userCoverLink)
              })
            }).then((res) => {
              console.log(arr[i])
              arr[i].userCoverLink = res
              console.log(res)
            })
          }
          }
            console.log(sres.data)
          console.log(arr)
        }
      })
    }

  },
// 图片错误
  errorimgs:function(e){
let _this=this;
console.log(e)
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