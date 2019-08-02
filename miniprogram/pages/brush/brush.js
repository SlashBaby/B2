import { B2 } from '../../util/b2/index.js'
import { formatTime, formatNumber } from "../../util/util.js"
import { ArtworksModel } from "../../models/artworks.js"
import { FileModel } from "../../models/files.js"
const artworksModel = new ArtworksModel();
const fileModel = new FileModel();
Page({

  data: {
    isDone: false,
    isRunning: false,
    canvasWidth: '',
    canvasHeight: '',
    b2: null,
    loading: true,
    style: '',
    rotate: false
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '加载图片中'
    })
    this.data.b2 = new B2('canvas', options.sample, options.stroke, options.url);
    //获得上下文信息
    this.data.b2.getCanvasInfo()
      .then(res => {// 更新页面数据
        const { canvasWidth, canvasHeight, rotate } = res;
        return new Promise((resolve, reject) => {
          this.setData({
            canvasWidth,
            canvasHeight,
            rotate
          }, res => {
            resolve(res);
          })
        })
      })
      .then(res => { //画图
        return this.data.b2.drawImage();
      })
      .then(res => { //显示按钮
        this.setData({
          loading: false
        })
        wx.hideLoading();
      })
  },

  start(e) {
    this.setData({
      isRunning: true
    });

    this.data.b2.loadingImageData()
      .then(res => {
        return this.data.b2.run(100, 100);
      }).then(res => {
        this.setData({
          isDone: true
        });
      })

  },

  onSaveImage(e) {
    wx.showLoading({
      title: '正在保存'
    })
    this.data.b2.getTempFilePath().then(res => {
      return fileModel.add(res.tempFilePath, this.getFileName());
    }).then(res => {
      return artworksModel.add(res.fileID, this.data.rotate);
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功'
      })
      this.onCancel();
    })
  },

  getFileName() {
    const date = new Date();
    const name = formatTime(date);
    return `${name}.png`
  },

  onCancel(e) {
    wx.navigateBack({
      delta: 1
    })
  }
})