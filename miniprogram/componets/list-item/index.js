// componets/list-picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    labels: Array,
    index: Number,
    name: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onEye(e){
      const index = this.properties.index;
      this.triggerEvent('detail',{
        index
      })
    }
  }
})
