<template>
  <div>
    <mt-header fixed title="固定在顶部"></mt-header>
    <mt-navbar name="god">
      <mt-tab-item id="1">选项一</mt-tab-item>
      <mt-tab-item id="2">选项二</mt-tab-item>
      <mt-tab-item id="3">选项三</mt-tab-item>
    </mt-navbar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Toast, Header,Navbar, TabItem} from "mint-ui";
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(Header.name, Header);
  import {Indicator} from "mint-ui";

  export default {
    name: "Home",
    data() {
      return {
        message: '',
        input: ''
      }
    },
    methods: {
      clickBtn() {
        Indicator.open({
          text: '加载中...',
          spinnerType: '',
        });
        setTimeout(this.success, 3000);
      },
      success() {
        Indicator.close();
        Toast({
          message: '操作成功',
          iconClass: 'icon icon-success'
        });
      }
    }
  }
</script>

<style scoped>
  label {
    background: red;
  }
</style>
