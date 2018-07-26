<template>
  <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" style="background-color: red">
    <div style="background-color: white">
      <div class="headerContainer">
        <home-header></home-header>
        <div id="noticeContainer" style="position: relative;margin-left: 20px;margin-right: 20px;">
          <swiper class="notice" id="notice" :options="swiperOption" @someSwiperEvent="callback"
                  style="" :style="{height: noticeHeight}">
            <swiper-slide v-for="(notice,index) in notices" :key="index">
              <p style=" margin-left: 45px;margin-top: 0;margin-bottom:0;font-size: 11px;color: #495769;"
                 :style="{lineHeight: noticeHeight}">{{notice.title}}</p>
            </swiper-slide>
          </swiper>
          <img :src="laba" height="16" width="14" style="position: absolute;top: 0;bottom: 0;margin: auto;left: 20px">
          <!--<p style="position: absolute;left: 0;top: 0;margin: 0">11111</p>-->
        </div>
        <div class="productContainer" v-for="(product,index) in products" :key="index">
        <span
          style="font-size: 16px;font-family: 'PingFangSC-Regular',cursive;font-weight: unset; margin-top: 22px;margin-left: 15px;display: inline-block;color: white">{{product.title}}</span>
          <span style="margin: 0;font-size: 14px;display: inline-block;color: white">{{'['+product.subTitle+']'}}</span>
          <p style="margin-top: 7px;margin-left:15px;margin-bottom:0;font-size: 25px;color: white;">{{product.desc}}</p>
          <span style="display: inline-block; margin-top: 5px;margin-left:15px;font-size: 13px;color: white;">{{product.subDesc}}</span>
          <img :src="tan_hao" height="12" width="12" slot="icon" @click="clickCardBtn(index)">
          <p @click="clickBtnBegin(index)"
             style="position: absolute;margin:0;text-align:center;line-height: 26px; bottom: 12px; right:12px; color: white;font-size: 15px;border: 1px solid white;border-radius: 11px;width: 112px;height:  26px">
            开始申请</p>
        </div>
      </div>
      <div class="bottom" style="position: relative">
        <div
          style="border: solid white;border-radius: 10px 10px 16px 16px;overflow: hidden;z-index: 2;position: relative;">
          <mt-cell class="cell" is-link style="">
            <span slot="title" style="background-color: white;margin: 0;line-height: 46px;">立即还款</span>
          </mt-cell>
          <mt-cell class="cell" is-link style="">
            <span slot="title" style="background-color: white;margin: 0;line-height: 46px;">借还款记录</span>
          </mt-cell>
        </div>
        <swiper ref="banner" class="banner" :options="swiperOptionBanner" style="margin-top: -30px;z-index: 1">
          <swiper-slide>
            <img :src="banner" width="100%">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </mt-loadmore>
</template>
<script>
  import Vue from 'vue'
  import {Cell, Header, Button, Swipe, SwipeItem, Loadmore, Toast, MessageBox} from "mint-ui";
  import home_message from '@/assets/home_message.png'
  import head_male_small from '@/assets/head_male_small.png'
  import home_back from '@/assets/home_back.png'
  import tan_hao from '@/assets/tan_hao.png'
  import banner from '@/assets/banner.png'
  import laba from '@/assets/laba.png'
  //头部导航
  const header = {
    template: '<mt-header style="height: 64px;background-color: white">\n' +
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
  Vue.component(Toast.name, Toast);
  Vue.component(MessageBox.name, MessageBox);
  Vue.component(Cell.name, Cell);
  let homePage = {
    name: "Home",
    components: [],
    methods: {
      clickCardBtn(index) {
        let product = this.products[index];
        MessageBox(product.subDesc);
      },
      clickBtnBegin(index) {
        this.axios.get('ttt').then((response) => {
          alert(response.data.name);
        }, err => {
          alert(err);
        });
      },
      loadTop() {
        // this.$refs.loadmore.onTopLoaded();
      },
      // allLoaded() {
      //
      // }
    },
    data() {
      return {
        banner: banner,
        tan_hao: tan_hao,
        laba: laba,
        noticeHeight: '30px',
        testData: 'good',
        notices: [{title: '第一条消息'}, {title: '第二条消息'}],
        products: [
          {title: '极速普惠', subTitle: '极速申请,自动审核', desc: '额度高至3万元', subDesc: '快至5分钟下款,日息低至5%'},
          {title: '大额通道', subTitle: '专人服务,申请无忧', desc: '额度高至20万元', subDesc: '日息低至3%'},
        ],
        items: ['1', '2'],
        list: ['fuck', 'god'],
        swiperOption: {
          direction: 'vertical',
          autoplay: {
            disableOnInteraction: false
          },

          loop: true,
        },
        swiperOptionBanner: {
          autoplay: {
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          loop: true,
        }

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

  .productContainer {
    position: relative;
    overflow: hidden;
    background-size: 100% auto;
    margin: 12px;
    width: calc(100vw - 24px);
    height: calc((100vw - 24px) * 450 / 1053);
    /*margin: 20px;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    background-image: url('../assets/home_back.png');
    background-repeat: no-repeat;
  }

  /*.homeBack:after {*/
  /*content: "";*/
  /*display: block;*/
  /*padding-top: 42.8%;*/
  /*background-color: red;*/
  /*}*/

</style>
