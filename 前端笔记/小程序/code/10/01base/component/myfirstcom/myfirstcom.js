Component({
  data: {
    name: '我是一个子组件'
  },
  properties: {
    abc: {
      type: String,
      value: '默认值'
    }
  },
  methods: {
    fn() {
      console.log('哎呀，我被点击了')
    },
    // 向页面传参
    passtopage() {
      this.triggerEvent('fn', this.data.name)
    }
  }
})