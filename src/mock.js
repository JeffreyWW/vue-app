import Mock from 'mockjs';//es6语法引入mock模块
let CustomMock = Mock.mock('ttt', {//输出数据
  products: [
    {title: '极速普惠', subTitle: '极速申请,自动审核', desc: '额度高至3万元', subDesc: '快至5分钟下款,日息低至5%', show: true},
    {title: '大额通道', subTitle: '专人服务,申请无忧', desc: '额度高至20万元', subDesc: '日息低至3%', show: true},
  ],
  notices: [{title: '第一条消息'}, {title: '第二条消息'}],
  //还可以自定义其他数据
});
export default CustomMock;
