
var app = getApp();
const request = function request(methods, urls, datas,header) {
  let that = this;
  let method = methods;//请求方法名
  let url = urls;//请求地址
  let data = datas;//请求数据
  let _header = header ? header : {
    'content-type': 'application/x-www-form-urlencoded'
  }
  var promise = new Promise(function (success, fail) {
    wx.request({
      header: _header,
      url: url,
      data: data,
      method: method,
      success: function (sres) {
        if (sres.data.code == "200") {
          //处理公共部分业务逻辑
          success(sres.data);
        } else if (sres.data){
          if (sres.data.msg == "token不存在！" || sres.data.msg == "登录失效，请重新登录！" || sres.data.msg == "登录状态已失效，请重新登录！"){
            app.denglu(sres.data.msg)
            app.globalData.state="0"
          }else{
            app.code0(sres.data.msg)
            // wx.showModal({
            //   title: '请登陆',
            //   content: sres.data.msg,
            //   success(res) {
            //     if (res.confirm) {
            //       wx.navigateTo({
            //         url: '/pages/logs/logs',
            //       })
            //     }
            //   }
            // })
          }        
        }
      },
      fail: (fres) => {
        fail(fres);
console.log(fres)
        wx.showModal({
          title: '请求失败',
          content: fres,
        })
      }
    })
  })
  return promise;
};
// 图片  次数是获取真实
let filePath= function  filePath(addlink) {
  let _this = this;
  let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
  let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
  // var promise = new Promise(function (success, fail) {
     var pic_url = new Promise (function (success, fail) {
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token },
      url: app.globalData.api + "getMediaLinkUrlV1",
      data: { 'filePath': addlink },
      method: "post",
      success: function (res) {
        success(res.data);
      },
      fail: function (res) {
        code0()
      }
    })
  })
  return pic_url;
};
// 获取图片的真实路径 （上面的是单图  这个是多图 用数组）
let filePathArray = function filePathArray(pathArray){
    let _this = this;
  // console.log(pathArray)
  let appid = wx.getStorageSync("appid") ? wx.getStorageSync("appid") : app.globalData.appid;
  let token = wx.getStorageSync("token") ? wx.getStorageSync("token") : app.globalData.token;
  var pic_url = new Promise(function (success, fail) {
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded', "uniqueDeviceId": appid, "token": token },
      url: app.globalData.api + "getMultipleMediaLinkUrlV1",
      data: { 'filePath': pathArray },
      method: "post",
      success: function (res) {
        success(res.data);
      },
      fail: function (res) {
        code0()
      }
    })
  })
  return pic_url;
};

module.exports = {
  request: request,
  filePath,
  filePathArray,
}
 // 获取oss上传用的 appid和密钥（临时的）
// const ossInfo = function wx.request({
//   url: '',
//   data: '',
//   header: {},
//   method: 'GET',
//   dataType: 'json',
//   responseType: 'text',
//   success: function(res) {},
//   fail: function(res) {},
//   complete: function(res) {},
// })

