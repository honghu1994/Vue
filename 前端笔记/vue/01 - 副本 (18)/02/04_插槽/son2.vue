<template>
  <div>

    <h1>son.vue</h1>

    <slot name="one"></slot>
    
    <h2>我在中间</h2>

    <slot name="two"></slot>

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