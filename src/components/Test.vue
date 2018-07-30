<template>
  <button @click="clickMe">点我</button>
</template>
<script>
  export default {
    name: "Test",
    methods: {
      clickMe() {
        share("http://www.baidu.com", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532965486051&di=40b4a54011a8b4f147a9f04d2d7c448b&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201410%2F27%2F20141027161430_2wvYR.thumb.700_0.jpeg", "这是个标题", "这是个描述");
      }
    },
    data() {

    }
  }
</script>

<style scoped>

</style>
