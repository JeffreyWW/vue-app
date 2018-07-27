/**
 * 若统一的相同逻辑的回调处理,方法写入到该文件,并在页面引入该js文件即可
 * 若特殊单独的处理,则可以不用引入此文件,单独写入script标签定义一个对应的回调方法即可
 */


/**分享完成
 * platformType:平台类型,为数字枚举值,待和安卓确定后再定如何传*/
function callBackShared(data) {
  /**仅弹提示,这里需要写回调逻辑*/
  alert(data.platformType);
}
