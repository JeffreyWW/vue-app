/**
 * Created by jeffrey on 2017/5/15.
 */
/**写入发送数据的js,全局可用*/
document.write("<script src='/static/sendResponseToApp.js'></script>");

/**------------------------------------------------iOS交互框架基础(勿动)-------------------------------------------------*/
/**
 * 原始方法，两个注册都需要调用这个方法才能使用
 * @param callback
 * @returns {*}
 */
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  /**注意，git上原来的readme文档上下面的资源有问题，会导致交互不能正常记性，下面这个是正常的*/
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

/**----------------------------------------------监听基础(勿动)----------------------------------------------------*/
/**
 * 注册iOS,进行监听,App在发送消息后会给一个responseAppToWeb,本地进行处理后可以通过
 * 这里调用bridgeCallBackDispenser方法来继续对监听进行分发
 * 安卓则直接可以调用bridgeCallBackDispenser方法并传入数据。
 * */
setupWebViewJavascriptBridge(function (bridge) {
  bridge.registerHandler('iOS', function (responseAppToWeb) {
    bridgeCallBackDispenser(responseAppToWeb);
  });
});

/**
 * 回调分发器,将移动端传的数据通过此方法分发
 * iOS通过registerHandler注册后监听并间接进入到此方法
 * 安卓则直接调用此方法
 * @param responseAppToWeb 移动端传入的数据,为json字符串,解析后会包含一个method字段和data字段,method需要对应去找分发的单独的方法名
 * data则为传的数据值
 */
function bridgeCallBackDispenser(responseAppToWeb) {
  /**解析移动端发过来的数据为JsonResponse,里面包含method和data两个字段*/
  var JsonResponse = JSON.parse(responseAppToWeb);
  /**获取app传过来的函数名method*/
  var functionName = JsonResponse.method;
  /**函数名找到对应的函数*/
  var fn = window[functionName];
  if (fn) {
    /**获取app传过来的参数*/
    var data = JsonResponse.data;
    /**调用函数并传参,可以理解为进行结果处理操作(即,进入对应的回调方法),在使用的地方对整个fn函数进行定义即可监听到数据的传入*/
    fn(data);
  }
}

/**--------------------------------------------发送数据给移动端基础(勿动)----------------------------------------------*/
/**
 * 其它向iOS发送消息的方法均基于此方法
 * 网页向app发送信息,发送一个responseWebToApp,之后App在处理完responseWebToApp后
 * 执行function responseCallback(responseAppToWeb)函数,函数内部这里定制为执行
 * callbackAfterReceiveResponseAppToWeb方法,参数为App返回的responseAppToWeb
 * @param responseWebToApp 向app发送的数据
 */
function sendResponseToAppiOS(responseWebToApp, responseCallback) {
  setupWebViewJavascriptBridge(
    function (bridge) {
      /**去找网页里的iOS注册信息,并传给App,传入的数据为data,App在处理完后返回一个responseAppToWeb*/
      bridge.callHandler('iOS', responseWebToApp, responseCallback);
    })
}

/**传数据给安卓*/
function sendResponseToAppAndroid(method, data, fun) {
  //SHUndo 这里需要实现安卓在原生代码里写某个类,web在这里调用这个类并把方法名和data传给它处理
  window.lifeLoans.handlerMethod(method, data);
  fun();
}

/**传数据给App(包括iOS和安卓)*/
function sendResponseToApp(method, data, responseCallback) {
  var responseWebToApp = {
    method: method,
    data: data
  };
  sendResponseToAppiOS(responseWebToApp, responseCallback);
  sendResponseToAppAndroid(method, data, responseCallback);
}
