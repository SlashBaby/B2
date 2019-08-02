import { DetailModel } from "../../models/details.js"
const detailModel = new DetailModel();
Page({

  data: {
    content: '',
  },

  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中'
    })
    const detail = await detailModel.get(options.id);
    const content = detail.data.length === 0 ? "没有介绍" : detail.data[0].content
    this.setData({
      content
    })
    wx.hideLoading();
  },


})