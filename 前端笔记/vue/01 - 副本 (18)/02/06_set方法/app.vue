<template>
  <div>
    <input type="text" v-model="p.msg" />
    {{ p.msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      p: {}
    };
  },

  created() {

    // 原来没有的属性，想加上，最好要用$set来加，否则，直接加，可能会影响双向绑定
    // 参数1：给那个数据加
    // 参数2：加什么属性
    // 参数3：默认属性值
    this.$set(this.p,'msg',"我是初始值")
  }
};
</script>

<style>
</style>