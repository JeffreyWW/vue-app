//导航配置
let nav = [
  {text: '首页', link: '/'},
  {text: 'AppCode', link: '/appCode/'},
  {text: 'iOS开发', link: '/iOS/tableView'},
];
//侧边栏配置

module.exports = {
  base: "/",
  title: 'Jeffrey的个人博客',
  description: ' ',
  head: [
    ['link', {rel: 'icon', href: `/logo.png`}]
  ],
  themeConfig: {
    nav: nav,
    sidebar: {
      '/appCode/': [{
        collapsable: false,
        title: "AppCode",
        children: ['','simpleUse']
      }],
      '/iOS/': [{
        collapsable: false,
        title: "iOS开发",
        children: ['tableView','animation'],
      }]
    }
  },
};
