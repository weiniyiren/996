// pages/homePage/homePgae.js
const app = getApp();
var request = require("../../../utils/api");
var ossConfig = require("../../../utils/oss.js");
var uploadImage = require('../../../utils/upload.js');//地址换成你自己存放文件的位置
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgSrc: '../../../image/home18.png',
    userImg: '../../../image/bg-d.png',
    height: '',
    footArr: [
      { imgsrc: '../../../image/home8.png', mes: '2', text: '最近' },
      { imgsrc: '../../../image/home9.png', mes: '', text: '文件夹' },
      { imgsrc: '../../../image/home11.png', mes: '', text: '圈子' },
    ],
    // ==============================开关====================================
    // 点击加号弹出
    home_code: true,
    // false显示选择图片
    choose_back: true,
    // 详情
    detailed_box: true,
    // ======================数据================================
    name: "章章章",
    position: "CEO董事长",
    Corporate_name: "xxxxxx科技有限公司q",
    Company_address: "重庆市xxxxxxA座",
    // 详细联系
    detailed: [{ img: "../../../image/sinx.png", title: "性别：", txt: wx.getStorageSync('sex'), fun: "复制"},
      { img: "../../../image/tep.png", title: "手机：", txt: wx.getStorageSync('userPhone'), fun:"拨号" },
      { img: "../../../image/tel2.png", title: "电话：", txt: wx.getStorageSync('userPhoneNumber'), fun: "拨号" },
      { img: "../../../image/dayin.png", title: "传真：", txt: wx.getStorageSync('userFax'), fun: "复制" },
      { img: "../../../image/qq.png", title: "QQ ：", txt: wx.getStorageSync('qq'), fun: "复制" },
      { img: "../../../image/weixin.png", title: "微信：", txt: wx.getStorageSync('wechat'), fun: "复制" },
      { img: "../../../image/mailbox.png", title: "邮箱：", txt: wx.getStorageSync('userEmail'), fun: "复制" },
      { img: "../../../image/web.png", title: "网址：", txt: wx.getStorageSync('shareWebsite'), fun: "复制" },
      { img: "../../../image/JINGYING.png", title: "经营范围：", txt: wx.getStorageSync('management'), fun: "复制" }],
      // 开始距离
    startX:"",
    startY:"",
  },

  // 复制or拨号
  copyBtn:function(e){
    console.log(e.currentTarget.dataset.data)
    if (e.currentTarget.dataset.data ==="复制"){
      wx.setClipboardData({
        data: e.currentTarget.dataset.txt ,
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: 'e.currentTarget.dataset.txt'
      })
    }
  },
  // 
  detailed:function(){
    console.log(1)
this.setData({
  detailed_box: !this.data.detailed_box
})
  },

  // 名片编辑
  editing:function(){
    wx.navigateTo({
      url: './Editing/Editing',
    })
  },
  // 
  release:function(){
    wx.navigateTo({
      url: "/pages/my/release/release",
    })
  },
  // 点击加号弹出切换
  scan_back: function () {
    console.error("tab")
    this.setData({
      home_code: !this.data.home_code
    })
  },
  // 留言
  message:function(){
    wx.navigateTo({
      url: './chat/chat?page=留言',
    })
  },
  add: function () {
    wx.navigateTo({
      url: '../../my/set/set',
    })
  },
  // 
  choose_fun: function () {
    this.setData({
      choose_back: !this.data.choose_back
    })
  },
  // 点击扫码
  scanCode: function () {
    wx.addPhoneContact({
      success:function(e) {
        console.log(e)
      }
    })
  },
  // 
  headPhone: function () {
    wx.navigateTo({
      url: '../../my/my?page="homeoage',
    })
  },
  him:function(){
wx.navigateTo({
  url: '../chat_con/chat_con',
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // let appid = app.globalData.appid;
    // let token = app.globalData.token;
    // request.request("get", app.globalData.api + "getUserIndexDataV1", {}, { 'content-type': 'application/x-www-form-urlencoded', uniqueDeviceId: appid, token: token}).then((sres) => {
    //   console.log(sres)
    // })

    this.setData({
      height: app.globalData.windowH
    });
    // wx.setNavigationBarTitle({
    //   title: '我的名片',
    // })

    // app.slideupshow(this, 'slide_up1', -200, 1)
  },
// 页面滑动
  // 页面滑动
  touchStart(e) {
    // console.log(e)
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    console.log(1)
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    let startX=this.data.startX;
    let startY = this.data.startY;
    
    if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
      console.log(startX, endX, startY, endY)
        wx.navigateTo({
          url: '../selfMedia/selfMedia',
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
  onShow: function () {
  
    app.showUserCardinfo(168)
    app.setAppid();

    // app.ossInfo();
    // let appid = app.globalData.appid;
    let _this = this;

    let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
    let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
    // console.log(appid)
    // console.log(token)
    request.request("get", app.globalData.api + "getUserIndexDataV1", {}, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
      console.log(sres)
      if (sres.code !== 200) {
        app.code0(sres.msg)
      } else {

        this.setData({
          name: sres.data.userName,
          position: sres.data.industry,
          Corporate_name: sres.data.companyName,
          Company_address: sres.data.companyAddress,
        })
        // 把对应的用户数据放进缓存
        wx.setStorageSync('name', sres.data.userName)
        wx.setStorageSync('position', sres.data.position)
        wx.setStorageSync('companyName', sres.data.companyName)
        wx.setStorageSync('Company_address', sres.data.companyAddress)
        wx.setStorageSync('userPhone', sres.data.userPhone)
        wx.setStorageSync('industry', sres.data.industry)
        wx.setStorageSync('userVisitingCard', sres.data.userVisitingCard)
        // 因为首页已经添加缓存 此处添加是为了编辑名片
        wx.setStorageSync('backgroundImagesLink', sres.data.backgroundImagesLink)
        wx.setStorageSync('id', sres.data.id)
        wx.setStorageSync('management', sres.data.management)
        wx.setStorageSync('personalSign', sres.data.personalSign)
        wx.setStorageSync('qq', sres.data.qq)
        wx.setStorageSync('qrCodeImagesLink', sres.data.qrCodeImagesLink)
        if (sres.data.sex == 1) {
          wx.setStorageSync('sex', '男')
        } else if (sres.data.sex == 2) {
          wx.setStorageSync('sex', '女')
        } else if (sres.data.sex == 0) {
          wx.setStorageSync('sex', '未知')
        }
        wx.setStorageSync('shareWebsite', sres.data.shareWebsite)
        wx.setStorageSync('userCoverLink', sres.data.userCoverLink)
        wx.setStorageSync('userEmail', sres.data.userEmail)
        wx.setStorageSync('userFax', sres.data.userFax)
        wx.setStorageSync('userName', sres.data.userName)
        wx.setStorageSync('userNickName', sres.data.userNickName)
        wx.setStorageSync('userPhone', sres.data.userPhone)
        wx.setStorageSync('userPhoneNumber', sres.data.userPhoneNumber)
        wx.setStorageSync('userPosition', sres.data.userPosition)
        wx.setStorageSync('wechat', sres.data.wechat)
      }
    })
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
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
  },
  //选择照片
  choose: function () {
    app.setAppid();
    app.ossInfo();
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());
        // 此处截取url的后缀  从临时路径截取 临时路径会保存后缀不会改变后缀
        var str = tempFilePaths[0].substring(90, 160);
        var fileType = str.split('.')[1];

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], fileType, 'images/' + nowTime + '/',
            function (result) {
             
              //  这里要把上传成功的图片截取一下 把域名截取掉 放置换域名转移文件
              let filnamePath = result.split('.com/')[1];
              return;
              let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
              let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
              request.request("post", app.globalData.api + "editVisitingCardDataV1", {
                'field_name': 'backgroundImagesLink', 'backgroundImagesLink'
                  : filnamePath
              }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
                console.log(sres)
                if (sres.code !== 200) {
                  app.code0(sres.msg)
                } else {
                  console.log(result)
                  console.log(_this)
                  _this.setData({
                    userImg: '../../../image/home8.png',
                  })

                }

              })
              //做你具体的业务逻辑操作

              wx.hideLoading();
            }, function (result) {
              console.log("======上传失败======", result);
              //做你具体的业务逻辑操作

              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  // oss 读取图片


})