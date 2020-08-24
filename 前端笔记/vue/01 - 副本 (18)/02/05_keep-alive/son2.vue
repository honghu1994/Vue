<template>
  <div>
    <h1>son2.vue</h1>

    <input type="text" v-model="msg" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      msg: ""
    };
  },

  created() {
    console.log("son2--created");
  },

  destroyed() {
    console.log("son2--destroyed");
  },

  // 未激活（简单的理解是：看不到的时候会调用）
  deactivated() {
    console.log("son2--deactivated");
  },

  // 激活（看的到的时候会调用）
  activated() {
    console.log("son2--activated");
  }
};
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
  background-color: skyblue;
}
</style>