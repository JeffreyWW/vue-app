/**自定义的让app进行的事件,内部调用webCallApp方法,定制data和callback*/
function printInApp(printString) {
  /**目前app用枚举方便,也可以定制字符串来做*/
  var method = 0;
  var data = '{"message": "' + printString + '"}';
  sendResponseToApp(method, data);
}


/**点击按钮弹出分享页面*/
function share(printString) {
  alert("printString");
  /**目前app用枚举方便,也可以定制字符串来做*/
  var method = 4;
  /* var data = {
       "shareUrl": "http://www.baidu.com",
       "shareImage": "http://www.baidu.com/xxx.jpg"
   };*/
  sendResponseToApp(method, printString);
}


/**刷新页面状态*/
function updateStatus() {
  /**目前app用枚举方便,也可以定制字符串来做*/
  var method = 3;
  sendResponseToApp(method, "");
}

/**
 * 主交互入口
 * h5与原生交互接口
 * 交互以后的的代写在callback中
 */
function mainInteractive(method, data, callback) {
  sendResponseToApp(method, data, function (data) {
    callback();
  });
}
