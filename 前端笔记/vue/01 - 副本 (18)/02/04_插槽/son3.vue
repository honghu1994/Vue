<template>
  <div>
    <h1>son3.vue</h1>

    <slot :row="p"></slot>

  </div>
</template>


<script>
export default {
  data() {
    return {
      p: { name: "jack", age: 16 }
    };
  }
};
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
  background-color: hotpink;
}
</style>