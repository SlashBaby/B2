import { GoodsModel } from "../../models/goods.js"
const goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImg: true,
    showSample: false,
    showStroke: false,
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const goods = await goodsModel.get('img');
    console.log(goods);
    this.setData({
      goods: goods.data
    })
  },

  async onShowImg(e){
    this.data.showImg = true;
    this.data.showSample = false;
    this.data.showStroke = false;
    const goods = await goodsModel.get('img');
    this.setData({
      goods: goods.data
    })
  },

  async onShowSample(e){
    console.log(e);
    this.data.showSample = true;
    this.data.showImg = false;
    this.data.showStroke = false;
    const goods = await goodsModel.get('sample');
    this.setData({
      goods: goods.data
    })
  },

  async onShowStroke(e){
    console.log(e);
    this.data.showSample = false;
    this.data.showImg = false;
    this.data.showStroke = true;
    const goods = await goodsModel.get('stroke');
    this.setData({
      goods: goods.data
    })
  },

  showDetail(e){
    const index = e.target.id;
    const id = this.data.goods[index]._id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  }
})