<template>
  <div>
    <home-header></home-header>
    <swiper id="notice" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback"
            style="margin-left: 20px;margin-right: 20px;height: 55px">
      <swiper-slide>
        <p style="line-height: 55px;margin: 0;text-align: center">第一条消息</p>
      </swiper-slide>
      <swiper-slide>
        <p style="line-height: 55px;margin: 0;text-align: center">第二条消息</p>
      </swiper-slide>
      <swiper-slide>
        <p style="line-height: 55px;margin: 0;text-align: center">第三条消息</p>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Header, Button, Swipe, SwipeItem} from "mint-ui";
  import home_message from '@/assets/home_message.png'
  import head_male_small from '@/assets/head_male_small.png'

  //头部导航
  const header = {
    template: '<mt-header style="height: 64px;background-color: white" title="导航">\n' +
    '      <mt-button slot="right">\n' +
    '        <img :src="home_message" height="17" width="21" slot="icon">\n' +
    '      </mt-button>\n' +
    '      <mt-button slot="left">\n' +
    '        <img :src="head_male_small" height="38" width="38" slot="icon">\n' +
    '      </mt-button>\n' +
    '    </mt-header>',
    data() {
      return {
        home_message: home_message,
        head_male_small: head_male_small
      }
    }
  };
  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component('home-header', header);

  export default {
    name: "Home",
    components: [],
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          autoplay:{
            disableOnInteraction: false
          },
          loop:true,
        },
        message: '',
        input: ''
      }
    },
  }
</script>

<style scoped>
  #notice {
    /*-moz-border-radius: 1em;*/
    /*-webkit-border-radius: 1em;*/
    border-radius: 1em;

    -webkit-box-shadow: 3px 3px 6px #666;
    -moz-box-shadow: 3px 3px 6px #666;
    box-shadow: 3px 3px 6px #666;
  }
</style>
