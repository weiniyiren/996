// var fileHost = "https://aliydm.oss-cn-beijing.aliyuncs.com/";//你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
// var config = {
//    //aliyun OSS config
//   uploadImageUrl: 'https://aliydm.oss-cn-beijing.aliyuncs.com', // 默认存在根目录，可根据需求改
//   AccessKeySecret: '8JfDEYSpi6Ph9qq3hlYZWzReeQzfci',        // AccessKeySecret 去你的阿里云上控制台上找
//   OSSAccessKeyId: 'LTAIFF2N4QuW5JcP',         // AccessKeyId 去你的阿里云上控制台上找
//    timeout: 87600 //这个是上传文件时Policy的失效时间
// };

//   这里是公司的配置 自己的已经成功
var fileHost = "https://mp996public.oss-cn-shenzhen.aliyuncs.com/";//你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
// var time = wx.getStorageSync('AccessKeySecret');
var config = {
  //aliyun OSS config
  uploadImageUrl: 'https://mp996public.oss-cn-shenzhen.aliyuncs.com/', // 默认存在根目录，可根据需求改
  AccessKeySecret: wx.getStorageSync('AccessKeySecret'),        // AccessKeySecret 去你的阿里云上控制台上找
  OSSAccessKeyId: wx.getStorageSync('AccessKeyId'),         // AccessKeyId 去你的阿里云上控制台上找
  timeout: 87600, //这个是上传文件时Policy的失效时间,
  token: wx.getStorageSync('SecurityToken')

};
module.exports = config