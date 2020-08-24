<template>
  <div>
      <h1>父组件app.vue</h1>


      <son @change='getData' fromFatherMsg="父组件传递来的值"></son>

      <p>子组件给过来的值是：{{test}}</p>

      <page @current-change='changePage'></page>

  </div>
</template>

<script>
import son from './son.vue'
import page from './page.vue'

export default {

    name:"app",

    data() {
        return {
            test:''
    
        }
    },

    methods: {
        getData(val){

            // console.log(val)
            this.test = val;
        },

        changePage(page){

            alert(page);
        }
    },
    components: {
        son,
        page
    }
}
</script>

<style>

</style>