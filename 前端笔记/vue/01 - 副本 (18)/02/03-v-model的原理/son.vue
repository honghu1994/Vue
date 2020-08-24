<template>
  <div>
    <h1>son.vue</h1>
    <input type="checkbox" :checked="checked"  @change="$emit('change', $event.target.checked)"/>
  </div>
</template>


<script>
export default {

  model: {
    // 关联的是checked属性
    prop: "checked",
    // 我的值就改你外面绑定的v-model的值
    event: "change"
  },

  props: {
    // 告诉组件，checked属性是布尔类型的值
    checked: Boolean
  },

};
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
  background-color: hotpink;
}
</style>