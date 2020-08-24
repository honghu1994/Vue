<template>
    <div>
        <h1>我是子组件</h1>
        <p> 这是从父组件传过来的数据 {{ fromFatherMsg }} </p>

        <button @click='toFather'>给父组件传值</button>
    </div>
</template>

<script>

export default {
    // 需要父组件传几个值，就在这个数组里写几个元素
    props:[ 'fromFatherMsg' ],

    methods: {
        toFather(){

            // console.log(this.$parent)
            // 这个官方不推荐
            // this.$parent.test = '给值过来了';

            // 参数1：事件名（可以随便起）
            // 参数2：传递的数据
            this.$emit('change','子组件过来的数据')
        }
    },
}
</script>

<style>

</style>