<template>
    <div>
        <h1>app.vue</h1>
        <!-- <son>
            <a href="#">我是a标签</a>
            <h3>我是h3</h3>
        </son> -->

    <!-- 具名插槽 -->
         <!-- <son2>
             
           <template v-slot:one>
               <a href="#">我是a标签</a>
           </template>

           <template v-slot:two>
               <h3>我是h3</h3>
           </template>

        </son2> -->

        <!-- 作用域插槽 -->

        <son3>
            <template slot-scope='scope'>
                {{ scope.row.name }}
                {{ scope.row.age }}
            </template>
        </son3>

    </div>
</template>

<script>
import son from './son.vue'
import son2 from './son2.vue'
import son3 from './son3.vue'
export default {
    components:{
        son,
        son2,
        son3
    }
}
</script>

<style>

</style>