import { GoodsModel } from "../../models/goods.js"
const goodsModel = new GoodsModel();
Page({

  data: {
    content: '',
  },

  onLoad: async function (options) {
    const good = await goodsModel.getDetail(options.id);
    const content = good.data.length === 0 ? "没有介绍" : good.data[0].content
    this.setData({
      content
    })
  },


})