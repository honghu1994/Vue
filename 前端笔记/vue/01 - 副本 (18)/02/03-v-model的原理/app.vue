<template>
    <div>
        <h1>app.vue</h1>

        <son v-model='chk'></son>
         {{ msg }}

        <myinput v-model='msg'></myinput>

    </div>
</template>

<script>
import son from './son.vue'
import myinput from './myinput.vue'
export default {

    components:{

        son,
        myinput
    },

    data() {
        return {
            chk:true,
            msg:'',
        }
    },
}
</script>

<style>

</style>