// pages/homePage/chat_con/chat_con.js
let app=getApp();

var request = require("../../../utils/api");
var uploadImage = require('../../../utils/upload.js');//地址换成你自己存放文件的位置
import { base64src } from '../../../utils/base64src.js';
var util = require('../../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
  header:"",
    postiton:"运营经理",
    company:"阿里巴巴网络科技有限公司",
    pho:"1386889911",
    fenko:"目前最火的人工智能走向，抓住风向口，你就抓住先机，特别是经营互联网产品",
    goods_img:[],
    img:'',
    fenko:"目前最火的人工智能走向，抓住风向口，你就抓住先机，特别是经营互联网产品",
    goods_img:[],
    time:'2019-04-15 15:32',
    huo:"你有多少货，货好的话我全要了。你有多少货，货好的话我全要了。",
    // 聊天样式true自己发出，
    own:true,
    // 录音文字切换
    chat_inp:false,
    
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    this.setData({
      header: options.name,
    })
  },
// 录音文字切换
  dialogue_mode:function(){
    this.setData({
      chat_inp: !this.data.chat_inp,
    })
  },
  //按住按钮
  startHandel: function () {
    this.setData({
      sayimg: '/assets/image/demand/down.png',
      anmationShow: true,
    })
    console.log("开始")
    wx.getRecorderManager().start({
      duration: 10000
    })
    const self = this
    setTimeout(function () {
      self.setData({
        sayimg: '/assets/image/demand/sea.png',
        anmationShow: false
      })
    }, 10000);
  },
  //松开按钮
  endHandle: function () {
    // clearTimeout()
    this.setData({
      sayimg: '/assets/image/demand/sea.png',//图片样式
      anmationShow: false,
    })
    console.log("结束")
    const recorderManager = wx.getRecorderManager()
    //录音停止函数
    var that = this;
    wx.getRecorderManager().onStop((res) => {
      if (!this.data.inpvalue) {
        wx.showLoading({
          title: '语音识别中'
        })
      }
      const { tempFilePath } = res; //这里松开按钮 会返回录音本地路径
      //上传录制的音频到服务器
      wx.uploadFile({
        url: app.globalData.api+'接口地址', //接口地址
        name: 'file', //上传文件名
        filePath: tempFilePath,
        success: function (res) { //后台返回给前端识别后的文字
          var model = res.data
          var modeljson = JSON.parse(model)
          if (modeljson.status_code == 500) {
            wx.showToast({
              title: '语音转换失败',
              image: '/assets/image/icon/fail@2x.png'
            })
            return false;
          }
          if (modeljson.meta.status_code === 200 && !modeljson.data.err_msg) {
            var saymessage = modeljson.data.message;
            wx.setStorageSync('sayinfo', saymessage)
            that.setData({
              inpvalue: saymessage
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '../loding/loding'
              })

            }, 2000)
            setTimeout(() => {
              wx.hideLoading();
            }, 100)
          } else if (modeljson.data.err_msg) {
            wx.showToast({
              title: '请大声说话',
              image: '/assets/image/icon/fail@2x.png'
            })
            return false;
          }
        }
      })
    })
    //触发录音停止
    wx.getRecorderManager().stop()
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
    if (_this.data.img){

      return;
    }else{
      let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
      let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
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
                }, { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token }).then((sres) => {
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
                          _this.setData({
                            //base 64设置到页面上
                            img: imgPath
                          });
                          console.log(_this.data.img)
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

              _this.setData({
                //base 64设置到页面上
                img: img
              });
              // console.log(_this.data.img)
            }
          })
        }
      })
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