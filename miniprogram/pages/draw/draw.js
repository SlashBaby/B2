// miniprogram/pages/draw/draw.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel();
Page({

  data: {
    selectedImg: null,
    selectedStroke: null,
    selectedSample: null,
    defaultUrl: "../../images/2.png"
  },

  onLoad: function(options) {
  },

  onSelect:function(e){
    const type = e.target.dataset.type;
    wx.navigateTo({
      url: `../discover/discover?type=${type}`
    })
  },
  

  draw: function(e) {
    if(this.data.selectedImg === null || this.data.selectedStroke === null || this.data.selectedSample === null){
      wx.showToast({
        title: '三个都要选择',
        icon: 'none'
      })
      return
    }

    wx.setStorageSync('data', {
      img: this.data.selectedImg,
      stroke: this.data.selectedStroke,
      sample: this.data.selectedSample
    })
    wx.navigateTo({
      url: `../brush/brush?url=${this.data.selectedImg.url}&stroke=${this.data.selectedStroke.name}&sample=${this.data.selectedSample.name}`
    })
  }
})