// pages/homePage/Editing/Editing.js
const app = getApp();

var request = require("../../../utils/api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    header: "名片编辑",
    nav: [
      { name: "名片号", text: wx.getStorageSync('visitingCard'), type_name: 'visitingCard' },
      { name: "昵称", text: wx.getStorageSync('userNickName'), type_name: 'userNickName' },
      { name: "姓名", text: wx.getStorageSync('userName'), type_name: 'userName' },
      { name: "性别", text: wx.getStorageSync('sex'), type_name: 'sex' },
      { name: "地址", text: '深圳市', type_name: 'companyAddress' },
      { name: "电话号码", text: wx.getStorageSync('userPhone'), type_name: 'userPhone' },
      { name: "固定电话", text: wx.getStorageSync('userPhoneNumber'), type_name: 'userPhoneNumber' },
      { name: "传真", text: wx.getStorageSync('userFax'), type_name: 'userFax' },
      { name: "微信号", text: wx.getStorageSync('wechat'), type_name: 'wechat' },
      { name: "QQ号", text: wx.getStorageSync('qq'), type_name: 'qq' },
      { name: "邮箱", text: wx.getStorageSync('userEmail'), type_name: 'userEmail' },
      { name: "公司", text: wx.getStorageSync('companyName'), type_name: 'companyName' },
      { name: "职位", text: wx.getStorageSync('userPosition'), type_name: 'userPosition' },
      { name: "介绍网址", text: wx.getStorageSync('shareWebsite'), type_name: 'shareWebsite' },
      { name: "个性签名", text: wx.getStorageSync('personalSign'), type_name: 'personalSign' },
      { name: "经营范围", text: wx.getStorageSync('management'), type_name: 'management' },
      { name: "所属行业", text: wx.getStorageSync('industry'), type_name: 'industry' },
    ],
    touxian:"../../../image/mode.png"
  },
  // 返回
  navigateBack: function () {
    wx.navigateBack({
      delta: "1"
    })
  },
  nav: function (e) {
    app.setAppid();
    let keydata = e.currentTarget.dataset.keydata;
    let type_name = e.currentTarget.dataset.typename;
    if (e.currentTarget.dataset.index == 4 ){
      this.map()
    } else if (e.currentTarget.dataset.index == 3){
      wx.navigateTo({
        url: '/pages/homePage/Editing/gender/gender?index=' + e.currentTarget.dataset.index + '&keydata=' + keydata + '&type_name=' + type_name,
      })
    } else if (e.currentTarget.dataset.index == 16){
      wx.navigateTo({
        url: '/pages/homePage/Editing/industry/industry?index=' + e.currentTarget.dataset.index + '&keydata=' + keydata + '&type_name=' + type_name,
      })
    }else{
        wx.navigateTo({
          url: '/pages/homePage/Editing/edit_inp/edit_inp?index=' + e.currentTarget.dataset.index + '&keydata=' + keydata + '&type_name=' + type_name,
        })
    }
  },
  // 地图
  map:function(){
    let _this=this
    let nav=this.data.nav
    
    // 地图选择
    wx.chooseLocation({
      success: function (res) {
        // success
        nav[4].text = res.address
        _this.setData({
          nav: nav
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  touxian:function(){
    let _this=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res.tempFilePaths[0])
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths[0];
  _this.setData({
    touxian: res.tempFilePaths[0]
  })
      }
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
  let _this=this
    if (wx.getStorageSync("edit") === 1 && wx.getStorageSync("field_index")) {
      console.log(1)
      let nav=_this.data.nav
      nav[wx.getStorageSync("field_index")].text = wx.getStorageSync(wx.getStorageSync("field_name"))
      _this.setData({
        nav:nav
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