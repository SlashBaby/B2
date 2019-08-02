import { GoodsModel } from "../../models/goods.js"
import { LabelsModel } from "../../models/labels.js"
const goodsModel = new GoodsModel();
const labelsModel = new LabelsModel();
Page({

  data: {
    goods: [],
    labels: [],
    selectedItem: null,
    type: '',
    selectedLabels: [],
    loading: true
  },

  onLoad: function(options) {
    this.data.type = options.type;
    const goods = goodsModel.get(this.data.type);
    const labels = labelsModel.get(this.data.type);
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([goods, labels]).then(res => {
      this.setData({
        goods: res[0].data,
        labels: res[1].data,
        loading: false
      })
      wx.hideLoading();
    })
  },

  goodChange(e) {
    const index = e.detail.value;
    this.data.selectedItem = this.data.goods[index];
  },

  labelChange(e) {
    this.data.selectedLabels = e.detail.value;
  },

  updateGoods() {
    const goods = goodsModel.get(this.data.type, this.data.selectedLabels);
    wx.showLoading({
      title: '加载中',
    })
    goods.then(res => {
      this.setData({
        goods: res.data
      })
      wx.hideLoading();
    })
  },

  onConfirm(e) {
    if (!this.data.selectedItem) {
      wx.showToast({
        title: '请选择一个',
        icon: 'none'
      })
      return;
    }
    const pages = getCurrentPages();
    const prePage = pages[pages.length - 2];

    if (this.data.type === 'img') {
      prePage.setData({
        'selectedImg': this.data.selectedItem
      })
    } else if (this.data.type === 'stroke') {
      prePage.setData({
        'selectedStroke': this.data.selectedItem
      })
    } else {
      prePage.setData({
        'selectedSample': this.data.selectedItem
      })
    }

    wx.navigateBack({
      delta: 1
    })
  },

  showDetail(e) {
    const index = e.target.id;
    const id = this.data.goods[index]._id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  }
})