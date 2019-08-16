// pages/my/my.js
let app = getApp();

var request = require("../../utils/api");
var uploadImage = require('../../utils/upload.js');//地址换成你自己存放文件的位置
import { base64src } from '../../utils/base64src.js';
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 自媒体组件
    media:{
      library: "34",
      commodity:[],
      page:""
    },
    indexData:[],
    backgroundImagesLink:'../../image/back_19.png',
    imgPath:'',
    mode_show:true,
  },
return_btn:function(){
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
// 右上角。。。弹框tab
  mode_show:function(){
      this.setData({
        mode_show:!this.data.mode_show
      })
  },
  business:function(e){
      wx.navigateTo({
        url: '/pages/homePage/Editing/Editing',
      })
  },
  jurisdiction:function(){
    wx.navigateTo({
      url: './set/set',
    })
  },
  nav:function(e){
    console.log(e.currentTarget.dataset.name)
    if (e.currentTarget.dataset.name ==="自媒体库"){
        wx.navigateTo({
          url: './graph/graph',
        })
    }
  },
  binderrorimg:function(e){
      console.log(e)
    var errorImg = e.target.dataset.errimg;
    var strImg = "'" + errorImg + "'";
      var errObj = {};
      errObj[errorImg] = "../../image/default.png";
      console.log(e.detail.errMsg , errObj [errorImg] , strImg);
      this.setData(errObj);//注意这里的赋值方式...  
    
  },
  about:function(){
    wx.navigateTo({
      url: './about/about',
    })
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
      url: url + 'getUserPersonalCenterV1',
      header: header,
      method: 'get',
      success: function (res) {
        if (res.data.code == "200") {
            console.log(res.data.data)
            // 把所有的图片放在一个数组里面
          if (res.data.data.mediaTotal !== 0){
            console.log('ewqeqwe')
            var pathDataArray = [];
            for (var i = 0; i <= res.data.data.mediaInfo.length - 1; i++) {
              // console.log(res.data.data.mediaInfo[i].mediaCoverAddress);
              pathDataArray[i] = res.data.data.mediaInfo[i].mediaCoverAddress;
            }
            request.filePathArray(pathDataArray).then((ress) => {
              console.log(res.data.data)
              for (var i = 0; i <= ress.data.length - 1; i++) {
                // for 循环调取接口 获取所有 oss有关图片或者视频的真实路径
                res.data.data.mediaInfo[i].mediaCoverAddress = ress.data[i]
              }
            })
            
          }else{
              
          }
          // 判断用户有没有上传背景图
          if (res.data.data.backgroundImagesLink !== ''){
            request.filePath(res.data.data.backgroundImagesLink).then((backgroundImagesLink) => {
              _this.setData({
                backgroundImagesLink: backgroundImagesLink.data
              })
            })
          }else{

          }
          // 判断用户有没有上传头像
          if (res.data.data.userCoverLink !== '' ){
            request.filePath(res.data.data.userCoverLink).then((userCoverLink) => {
              res.data.data.userCoverLink = userCoverLink.data
              _this.setData({
                indexData: res.data.data,
              })
            })
          }else{
            res.data.data.userCoverLink = '../../image/default.png'
            _this.setData({
              indexData: res.data.data,
            })
          }
         
          // request.filePathArray(pathDataArray).then((ress) => {
          //   console.log(res.data.data)
          //   for (var i = 0; i <= ress.data.length - 1; i++) {
          //     // for 循环调取接口 获取所有 oss有关图片或者视频的真实路径
          //     res.data.data.mediaInfo[i].mediaCoverAddress = ress.data[i]
          //   }
            console.log(res.data.data.qrCodeImagesLink)
            if (res.data.data.qrCodeImagesLink){
             
              request.filePath(res.data.data.qrCodeImagesLink).then((qrCodeImagesLink) => {
                console.log(qrCodeImagesLink.data)
                _this.setData({
                  imgPath: qrCodeImagesLink.data
                })
              })
            }else{
              if (res.data.data.qrCodeImagesLink == '') {
                console.log(11);
                app.ossInfo();
                wx.request({
                  url: 'https://api.weixin.qq.com/cgi-bin/token',
                  data: {
                    grant_type: 'client_credential',
                    appid: 'wxb2ed66b5dad02cfc', //不能缺少
                    secret: '69033e7c56f2c1b475e30cabc2601138' //不能缺少
                  },
                  success: function (res) {
                    wx.request({
                      // url 此处的url代表永久的小程序二维码链接  适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
                      url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + res.data.access_token,
                      data: {
                        "path": "pages/index/index", //默认跳转到主页:pages/index/index，可指定
                        "width": 430,
                        "scene": wx.getStorageSync('userId')
                      },
                      responseType: 'arraybuffer', // 这行很重要,转为二进制数组
                      header: {
                        'content-type': 'application/json;charset=utf-8'
                      },
                      method: 'POST',
                      success(res) {
                        //转为base64
                        var bin64 = wx.arrayBufferToBase64(res.data);
                        var nowTime = util.formatTime(new Date());
                        var img = "data:image/png;base64," + bin64  // 此处转的路径 可以直接访问 
                        // console.log(img);

                        base64src(img, res => {  // 此处js 是用 base64编码生成一张图片（生成的是临时路径）
                          // console.log(res) // 返回图片地址，直接赋值到image标签即可
                          var imgPath = res;

                          request.request("get", app.globalData.api + "getFileLinkUrlV1", {
                            'type': '1', 'suffix'
                              : 'png'
                          }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": uniqueDeviceId, "token": token }).then((sres) => {
                            if (sres.code !== 200) {
                              app.code0(sres.msg)
                            } else {
                              var urlfilePath = sres.data.uploadFileLink
                              uploadImage(imgPath, urlfilePath, 'png', 'images/' + nowTime + '/',
                                function (result) {
                                  //  这里要把上传成功的图片截取一下 把域名截取掉 放置换域名转移文件
                                  let filnamePath = result.split('.com/')[1];
                                  console.log(filnamePath);
                                  request.filePath(urlfilePath).then((urlfilePath) => {
                                    var imgPath = urlfilePath.data
                                    console.log(imgPath)
                                    wx.setStorageSync('qrcode', imgPath)
                                    // 上传完成之后 调用编辑接口 吧用户的分享二维码地址 编辑进用户表里面
                                    request.request("post", app.globalData.api + "editVisitingCardDataV1", { field_name: 'qrCodeImagesLink', qrCodeImagesLink: filnamePath }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": uniqueDeviceId, "token": token }).then((sres) => {
                                      if (sres.code !== 200) {
                                        app.code0(sres.msg)
                                      } else {
                                        console.log(imgPath); 
                                        _this.setData({
                                          //base 64设置到页面上
                                          imgPath: imgPath
                                        });
                                        console.log(_this.data.imgPath)
                                      }
                                    })

                                  })
                                  //做你具体的业务逻辑操作

                                  wx.hideLoading();
                                }, function (result) {
                                  console.log("======上传失败======", result);
                                  //做你具体的业务逻辑操作
                                  wx.hideLoading()
                                })
                            }
                          })

                        });
                      }
                    })
                  }
                })
            }
           
            
            }
            // console.log(res.data.data.mediaInfo)
            _this.setData({
              indexData: res.data.data,
            })
            console.log(_this.data.indexData)
          
          // })
          console.log(_this.data.indexData)
          // var indexarray = _this.data.indexData;
          // console.log(indexarray)
            // 调取成功之后 在吧头像和背景图获取读取路径
         
        }
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