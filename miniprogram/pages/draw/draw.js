// miniprogram/pages/draw/draw.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel();
Page({

  data: {
    selectedImg: null,
    selectedStroke: null,
    selectedSample: null,
    defaultUrl: "../../images/2.png",
    height: 0
  },

  onLoad: function(options) {
    wx.getSystemInfo({
      success: res => {
        const { windowWidth, windowHeight } = res;
        const height = 375 / windowWidth * windowHeight * 2;
        this.setData({
          height
        })
      }
    })
  },

  onSelect: function(e) {
    const type = e.target.dataset.type;
    wx.navigateTo({
      url: `../discover/discover?type=${type}`
    })
  },


  draw: function(e) {
    if (this.data.selectedImg === null) {
      wx.lin.showMessage({
        content: '请选择一张图片',
        type: "error"
      })
      return
    } else if (this.data.selectedStroke === null) {
      wx.lin.showMessage({
        content: '请选择一种绘画风格',
        type: "error"
      })
      return
    } else if (this.data.selectedSample === null) {
      wx.lin.showMessage({
        content: '请选择一种绘制手段',
        type: "error"
      })
      return
    }

    wx.setStorageSync('data', {
      img: this.data.selectedImg,
      stroke: this.data.selectedStroke,
      sample: this.data.selectedSample
    })
    
    wx.navigateTo({
      url: `../brush/brush`
    })
  }
})