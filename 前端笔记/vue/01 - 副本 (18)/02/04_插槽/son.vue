<template>
  <div>

    <h1>son.vue</h1>

    <slot></slot>
    
    <h2>我在中间</h2>

    <slot></slot>

  </div>
</template>


<script>
export default {


};
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
  background-color: hotpink;
}
</style>