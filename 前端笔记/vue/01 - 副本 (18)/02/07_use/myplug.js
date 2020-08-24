export default {

    install(Vue){

        console.log('....');
        console.log(Vue);

        Vue.prototype.$plug = 'xxx'
        Vue.component('el-table',{ template:'<table></table>' })
        
    }
}