<template>
  <div>
    <div class="test"></div>
    <div class="headerContainer">
      <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style="height: 300px; background-color: red">-->
      <home-header></home-header>
      <swiper class="notice" id="notice" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback"
              style="margin-left: 20px;margin-right: 20px;" :style="{height: noticeHeight}">
        <swiper-slide v-for="(notice,index) in notices" :key="index">
          <p style=" margin: 0;text-align: center;font-size: 22px;color: #495769;"
             :style="{lineHeight: noticeHeight}">{{notice.title}}</p>
        </swiper-slide>
      </swiper>
      <div style="margin: 20px;" class="homeBack">
        <!--<img src="../assets/home_back.png" style="width: 100%;"/>-->
        <span style="margin: 0;font-size: 16px;">急速普惠</span>
        <span style="margin: 0;font-size: 14px;">[急速申请,自动审核]</span>
        <p style="margin: 0;font-size: 16px;">换行</p>
      </div>
      <!--</mt-loadmore>-->
    </div>
    <div class="banner">this place show banners</div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Header, Button, Swipe, SwipeItem, Loadmore} from "mint-ui";
  import home_message from '@/assets/home_message.png'
  import head_male_small from '@/assets/head_male_small.png'
  import home_back from '@/assets/home_back.png'
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
        head_male_small: head_male_small,
        home_back: home_back,
      }
    }
  };
  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component('home-header', header);
  Vue.component(Loadmore.name, Loadmore);
  let homePage = {
    name: "Home",
    components: [],
    methods: {
      clickButton() {
        this.notices.push({title: 'fuckYou'})
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        // this.allLoaded = true;// if all data are loaded
        this.$refs.loadmore.onBottomLoaded();
      },
      // allLoaded() {
      //
      // }
    },
    data() {
      return {
        noticeHeight: '36px',
        notices: [{title: 'fuck'}, {title: 'ok'}],
        items: ['1', '2'],
        list: ['fuck', 'god'],
        swiperOption: {
          direction: 'vertical',
          autoplay: {
            disableOnInteraction: false
          },
          loop: true,
        },
      }
    },
  };
  // let itemNew = {title: 'fuck'};
  // homePage.notices.push({title: 'fuckYouHere'});
  // homePage.items.push({title: 'what'});
  // homePage.addItem();
  // homePage.items.push('fuck');
  export default homePage;

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

  .homeBack {
    width: 100%;
    height: auto;
    background-size: 100% 100%;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    background-image: url('../assets/home_back.png');
    background-repeat: no-repeat;
  }
</style>
