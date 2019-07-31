// miniprogram/pages/draw/draw.js
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel();
Page({

  data: {
    imgs: [],
    strokes: [],
    samples: [],
    selectedImg: null,
    selectedStroke: null,
    selectedSample: null
  },

  onLoad: async function(options) {
    const imgs = await goodsModel.get('img');
    const strokes = await goodsModel.get('stroke');
    const samples = await goodsModel.get('sample');
    console.log(imgs, strokes, samples)
    this.setData({
      imgs: imgs.data,
      strokes: strokes.data,
      samples: samples.data
    })
  },

  imgChange: function(e) {
    this.data.selectedImg = e.detail.value;
  },

  strokeChange: function(e) {
    this.data.selectedStroke = e.detail.value;
  },

  sampleChange: function(e) {
    this.data.selectedSample = e.detail.value;
  },

  draw: function(e) {
    wx.navigateTo({
      url: `../brush/brush?url=${this.data.selectedImg}&stroke=${this.data.selectedStroke}&sample=${this.data.selectedSample}`
    })
  }
})