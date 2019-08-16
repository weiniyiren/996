const app = getApp();
const env = require('config.js'); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;

const base64 = require('base64.js');//Base64,hmac,sha1,crypto相关算法
require('hmac.js');
require('sha1.js');
const Crypto = require('crypto.js');

/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
 *@param - dir:表示要传到哪个目录下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */
const uploadFile = function (filePath, aliyunFileKey,type, dir, successc, failc) {
  
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }
  // console.log(aliyunFileKey);
  // const aliyunFileKey = type + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.' + type;
  const aliyunServerURL = env.uploadImageUrl;//OSS地址，需要https
  const accessid = wx.getStorageSync('AccessKeyId');
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);//获取签名
  const token = wx.getStorageSync('SecurityToken');
  // console.log('111111111');
  console.log(accessid);
  console.log(token);
  console.log(filePath);

  // console.log(wx.getStorageSync('AccessKeySecret'));
  //  此处为私密上传  如果不需要 就把 token对应的哪一行注释  就可以变成公告上传
  //  'x-oss-security-token': token
  wx.uploadFile({
    url: aliyunServerURL,//开发者服务器 url
    filePath: filePath,//要上传文件资源的路径
    name: 'file',//必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
      'x-oss-security-token': token
    },
    success: function (res) {
      if (res.statusCode != 200) {
        console.log(res)
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }

      successc(aliyunServerURL + aliyunFileKey);
    },
    fail: function (err) {
      console.log(err)
      err.wxaddinfo = aliyunServerURL;
      failc(err);
      
    },
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };

  const policyBase64 = base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64) {
  const accesskey = wx.getStorageSync('AccessKeySecret');
  // console.log(accesskey)
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

module.exports = uploadFile;