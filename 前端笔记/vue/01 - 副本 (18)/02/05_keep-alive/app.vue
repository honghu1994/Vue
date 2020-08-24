<template>
  <div class='app'>
    <h1>app.vue</h1>

    <!-- 把组件缓存起来，不会销毁！ -->
    <keep-alive>
      <son1 v-if='isShow'></son1>
    </keep-alive>

    <son2 v-if='isShow'></son2>

    <button @click='isShow = !isShow'>切换</button>

  </div>
</template>

<script>
import son1 from "./son1.vue";
import son2 from "./son2.vue";

export default {
  components: {
    son1,
    son2
  },

  data() {
    return {
      isShow:true
    }
  },
};
</script>

<style>
.app>div{
  float: left;
}
</style>