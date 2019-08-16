 // pages/homePage/homePgae.js
const app = getApp();
var request = require("../../utils/api");
var ossConfig = require("../../utils/oss.js");
var uploadImage = require('../../utils/upload.js');//地址换成你自己存放文件的位置
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgSrc: '../../image/home18.png',
    userImg: '../../image/bg-d.png',
    height: '',
    headerImg:'../../image/default.png',
    qrcode:'',
    footArr: [
      { imgsrc: '../../image/home8.png', mes: '2', text: '最近' },
      { imgsrc: '../../image/home9.png', mes: '', text: '名片夹' },
      { imgsrc: '../../image/home11.png', mes: '', text: '圈子' },
    ],
    // ==============================开关====================================
    // 点击加号弹出
    home_code: true,
    // false显示选择图片
    choose_back: true,
    // 详情
    detailed_box: true,
    // ======================数据================================
    name: "您的姓名",
    position: "您的职位",
    Corporate_name: "您的公司",
    Company_address: "您的地址",
    // 详细联系
    detailed: [{ img: "../../image/sinx.png", title: "性别：", txt: wx.getStorageSync('sex'), fun: "复制"},
      { img: "../../image/tep.png", title: "手机：", txt: (wx.getStorageSync('userPhone') !== '') ? wx.getStorageSync('userPhone') :'暂无', fun:"拨号" },
      { img: "../../image/tel2.png", title: "电话：", txt: (wx.getStorageSync('userPhoneNumber') !== '') ? wx.getStorageSync('userPhoneNumber') : '暂无', fun: "拨号" },
      { img: "../../image/dayin.png", title: "传真：", txt: (wx.getStorageSync('userFax') !== '') ? wx.getStorageSync('userFax'):'暂无', fun: "复制" },
      { img: "../../image/qq.png", title: "QQ ：", txt: (wx.getStorageSync('qq') !== '') ? wx.getStorageSync('qq') : '暂无', fun: "复制" },
      { img: "../../image/weixin.png", title: "微信：", txt: (wx.getStorageSync('wechat') !== '') ? wx.getStorageSync('wechat') :'暂无', fun: "复制" },
      { img: "../../image/mailbox.png", title: "邮箱：", txt: (wx.getStorageSync('userEmail') !== '') ? wx.getStorageSync('userEmail') :'暂无', fun: "复制" },
      { img: "../../image/web.png", title: "网址：", txt: (wx.getStorageSync('shareWebsite') !== '') ? wx.getStorageSync('shareWebsite') :'暂无', fun: "复制" },
      { img: "../../image/JINGYING.png", title: "经营范围：", txt: (wx.getStorageSync('management') !== '') ? wx.getStorageSync('management') : '暂无', fun: "复制" }],
      // 开始距离
    startX:"",
    startY:"",
    firendCount:"0",  // 好友总数
    zan: "0", // 点赞
    masonry: "0", // 砖石图标
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
  // 点击加号弹出切换
  scan_back: function () {
    let _this=this
    this.err_request().then(()=>{
      _this.setData({
        home_code: !this.data.home_code
      })
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
  //脚步
  footCircle: function (e) {
    let _this=this;
    this.err_request().then(()=>{
      console.log(e.currentTarget.dataset.index)
      if (e.currentTarget.dataset.index === 0) {
        wx.navigateTo({
          url: './chat/chat?page=最近',
        })
      } else if (e.currentTarget.dataset.index === 2) {
        wx.navigateTo({
          url: './selfMedia/selfMedia',
        })
      } else {
        wx.navigateTo({
          url: './chat/chat?page=文件夹',
        })
      }
    })
   
  },
  // 留言
  message:function(){
    this.err_request().then(()=>{
 wx.navigateTo({
      url: './chat/chat?page=留言',
    })
    })
   
  },
  add: function () {
    wx.navigateTo({
      url: './search/search',
    })
  },
  // 
  choose_fun: function () {
    let _this=this;
    this.err_request(()=>{
      _this.setData({
        choose_back: !this.data.choose_back
      })
    })
  },
  // 点击扫码
  scanCode: function () {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  // 
  headPhone: function () {
    let _this=this;
    this.err_request(()=>{
      wx.navigateTo({
        url: '../my/my?page="homeoage',
      })
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
  
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    let startX=this.data.startX;
    let startY = this.data.startY;
    
    if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
      console.log(startX, endX, startY, endY)
        wx.navigateTo({
          url: './mySelfMedia/mySelfMedia',
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
  
    // app.showUserCardinfo(168)
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
        // 判断一下 如果用户头像已经提交了的话 就显示 否则就显示默认
        if (sres.data.userCoverLink !== ''){
          request.filePath(sres.data.userCoverLink).then((userCoverLink) => {
            _this.setData({
              headerImg: userCoverLink.data
            })
          })
        }
        // 判断一下 如果背景图已经提交了的话 就显示 否则就显示默认
        if (sres.data.backgroundImagesLink !== ''){
          request.filePath(sres.data.backgroundImagesLink).then((backgroundImagesLink) => {
            _this.setData({
              userImg: backgroundImagesLink.data
            })
          })
        }
        // 判断一下 如果用户二维码已经提交了的话 就显示 否则就显示默认
        if (sres.data.qrCodeImagesLink !== ''){
          request.filePath(sres.data.qrCodeImagesLink).then((qrCodeImagesLink) => {
            _this.setData({
              qrcode: qrCodeImagesLink.data
            })
          })
        }

        this.setData({
          name: (sres.data.userName !== '') ? sres.data.userName : '您的名字',
        
          position: (sres.data.industry !== '') ? sres.data.industry : '您的职位',
          Corporate_name: (sres.data.companyName !== '') ? sres.data.companyName: '您的公司',
          Company_address: (sres.data.companyAddress !== '') ? sres.data.companyAddress:'您的地址',
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
        wx.setStorageSync('userId', sres.data.id)
        wx.setStorageSync('management', sres.data.management)
        wx.setStorageSync('personalSign', sres.data.personalSign)
        wx.setStorageSync('qq', sres.data.qq)
        wx.setStorageSync('qrCodeImagesLink', sres.data.qrCodeImagesLink)
        if (sres.data.sex == 1) {
          wx.setStorageSync('sex', '男')
        } else if (sres.data.sex == 0) {
          wx.setStorageSync('sex', '女')
        } else if (sres.data.sex == 2) {
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
    let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
    let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
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
          //上传图片你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          request.request("get", app.globalData.api + "getFileLinkUrlV1", {
            'type': '2', 'suffix'
              : fileType
          }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
            console.log(sres)
            if (sres.code !== 200) {
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 2000
              })
            } else {
              var urlfilePath = sres.data.uploadFileLink;
             
              //  tempFilePaths[0] 代表第一张图片 本地临时路径[0] 是因为可以上传多张 只用第一张  
              // urlfilePath 指定路径 fileType后缀
              uploadImage(tempFilePaths[0], urlfilePath, fileType, 'images/' + nowTime + '/',
                function (result) {
                  //  这里要把上传成功的图片截取一下 把域名截取掉 放置换域名转移文件
                  let filnamePath = result.split('.com/')[1];
                    console.log(filnamePath);
                  request.request("post", app.globalData.api + "editVisitingCardDataV1", {
                    'field_name': 'backgroundImagesLink', 'backgroundImagesLink'
                      : filnamePath
                  }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
                    console.log(sres)
                    if (sres.code !== 200) {
                      app.code0(sres.msg)
                    } else {
                      request.filePath(filnamePath).then((filnamePath) => {
                        _this.setData({
                          userImg: filnamePath.data
                        })
                      })
                      console.log(result)
                      console.log(_this)
                      _this.setData({
                        userImg: '../../image/home8.png',
                      })
                    }
                  })
                  //做你具体的业务逻辑操作

                  wx.hideLoading();
                }, function (result) {
                  console.log("======上传失败======", result);
                  //做你具体的业务逻辑操作

                  wx.hideLoading()
                })

                ////
        }
      })
        }
      }
    })
  },
  // oss 读取图片
err_request:function(){
  var err = new Promise(function (success, fail) {
  if (wx.getStorageSync("appid")){
    app.denglu("请登录后再试")
  }
  })
  return err
}

})