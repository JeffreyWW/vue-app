<template>
  <button @click="clickMe">点我</button>
</template>

<script>
  export default {
    name: "Test",
    methods: {
      clickMe() {
        share("fuck");
        // testT();
      }

    },
    data() {

    }
  }
</script>

<style scoped>

</style>
