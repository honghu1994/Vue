<template>
    <div>
        <a href="javascript:void(0)" v-for="item in 10"  @click='doClick(item)'> {{ item }} </a>
    </div>
</template>

<script>
export default {

    methods: {

        doClick(page){

            this.$emit('current-change',page)
        }
    },
}
</script>

<style>

</style>