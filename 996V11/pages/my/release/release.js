  // pages/my/release/release.js
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
      header:"发表自媒体",
      tempFilePath:false,
      filePath:'',
      connect:'',
      photoPath:'',
      circle:'', // 是否发布到圈子
      top:''
    },
    // 返回
    navigateBack: function () {
      wx.navigateBack({
        delta: "1"
      })
    },
    other:function(e){
      console.log(e.detail.value)
      this.setData({
        circle: e.detail.value
      })
    },
    roof:function(e){

      this.setData({
        top: e.detail.value
      })
    },
    releasebtn:function(){
      app.ossInfo();
      let _this=this;
      var filePath = ''
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          // console.log(res.tempFilePath)
          var tempFilePath = res.tempFilePath;
          var nowTime = util.formatTime(new Date());
          // 此处截取url的后缀  从临时路径截取 临时路径会保存后缀不会改变后缀
          var str = tempFilePath.substring(90, 160);
          var fileType = str.split('.')[1];

          var token = wx.getStorageSync('token');
          var uniqueDeviceId = wx.getStorageSync("appid");
          request.request("get", app.globalData.api + "getFileLinkUrlV1", {
            'type': '2', 'suffix'
              : fileType
          }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": uniqueDeviceId, "token": token }).then((sres) => {
            console.log(sres)
            if (sres.code !== 200) {
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 2000
              })
            } else {
              var urlfilePath = sres.data.uploadFileLink;
            
              uploadImage(tempFilePath, urlfilePath, fileType, 'images/' + nowTime + '/',
                function (result) {
                  var user_id = wx.getStorageSync('userId');
                  // 这个接口是为了获取视频的第一帧 用作视频的封面图 
                  request.request("get", app.globalData.api + "uploadWeChatMediaImagesV1", {
                     'filePath': urlfilePath
                  }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": uniqueDeviceId, "token": token }).then((sres) => {
                    console.log(sres)
                    if (sres.code !== 200) {
                      wx.showToast({
                        title: '上传失败',
                        icon: 'none',
                        duration: 2000
                      })
                    } else {
                      // console.log('urlfilePath');
                      // console.log(urlfilePath);
                      _this.setData({
                        filePath: urlfilePath,
                        photoPath: sres.file_path
                      })
                    }
                  })
                })
            }
          })

          _this.setData({
            tempFilePath: res.tempFilePath
          })
              }
            })
    },
    del_video:function(){
      this.setData({
        tempFilePath: false
      })
    },
    connect:function(e){
      this.setData({
        connect: e.detail.value
      })
    },
    preview:function(e){
      var filePath = this.data.filePath;
      console.log(filePath)
      var connect = this.data.connect;
      var photoPath = this.data.photoPath;
      var circle = this.data.circle;
      var top = this.data.top;
     
      if (this.data.circle == '') {
        var circle = 2;
      } else {
        var circle = 1;
      }
      if (this.data.top == '') {
        var top = 2;
      } else {
        var top = 1;
      }
      console.log('开始提交');
      console.log(photoPath);
      console.log(circle);
      console.log(top);
      if(filePath == ''){
        wx.showToast({
          title: '请上传视频',
          icon: 'none',
          duration: 2000
        })
      }
      if (connect == '') {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 2000
        })
      }
      // 获取用户的地理位置
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          // console.log(res)
          const latitude = res.latitude;
          const longitude = res.longitude;
        
          const geography = latitude + ',' + longitude // 拼接用户的经纬度.
          // 获取用户的唯一标识  和token +"?x-oss-process=video/snapshot,t_50000,f_jpg,w_800,h_600"
          let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
          let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;

          console.log(geography);
          console.log(filePath);
          request.request("post", app.globalData.api + "getMediaLinkUrlV1", { 'filePath': filePath  }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
            if (sres.code !== 200) {
              app.code0(sres.msg)
            } else {
              console.log(sres.data); 
              //  这里提交视频 调取上传用户自媒体接口
              request.request("post", app.globalData.api + "publishMediaWorksV1", { 'title': connect, 'linkAddress': filePath, 'cover_address': photoPath, 'openStatus': circle, 'type': 2, 'topStatus': top, 'lotAndLat': geography,}, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
                if (sres.code !== 200) {
                  wx.showToast({
                    title: '提交失败',
                    icon: 'none',
                    duration: 2000
                  })
                } else {
                  console.log(sres);
                  wx.showToast({
                    title: '提交成功 ',
                     icon: 'success',
                     duration: 800,
                     mask: true
                  });
                  // let filePath_arr = _this.data.filePath_arr
                  // filePath_arr[i] = sres.data
                  // _this.setData({
                  //   filePath_arr: filePath_arr
                  // })

                }
              })
              // let filePath_arr = _this.data.filePath_arr
              // filePath_arr[i] = sres.data
              // _this.setData({
              //   filePath_arr: filePath_arr
              // })

            }
          })
        }
      })
  
      return;
      wx.navigateTo({
        url: '/pages/homePage/mySelfMedia/mySelfMedia?page=' + e.currentTarget.dataset.e,
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