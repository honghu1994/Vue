<template>
  <div>
      <h1>专用文本框</h1>
      <input type="text" :value='value' @input='$emit("xx",$event.target.value)'>
  </div>
</template>

<script>
export default {

    model:{
        prop:'value',
        event:'xx'
    },
    props:{

        value: String,
    }
}
</script>

<style scoped>
    div{

        width: 300px;
        height: 300px;
        background-color: skyblue;
    }
</style>