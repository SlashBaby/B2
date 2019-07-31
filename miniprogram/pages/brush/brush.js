import { Brush } from '../../util/b2/brush.js'
import { GoodsModel } from '../../models/goods.js'
const goodsModel = new GoodsModel();
Page({

  data: {
    isDone: false,
    isRunning: false,
    url: '',
    sample: '',
    stroke: '',
    canvasWidth: '',
    canvasHeight: '',
    brush: null
  },

  onLoad: function(options) {
    this.data.brush = new Brush();
    this.data.sample = options.sample;
    this.data.stroke = options.stroke;
    this.setData({
      url: options.url
    })
  },

  draw(e) {
    const [canvasWidth, canvasHeight] = this.getContainer(e.detail.width, e.detail.height);
    this.setData({
      canvasWidth,
      canvasHeight
    })
    this.data.brush.init('canvas', this.data.url, this.data.sample, this.data.stroke);
    this.data.brush.size(canvasWidth / 2, canvasHeight / 2);
    this.data.brush.run(this.finish);
  },

  finish() {
    this.setData({
      isDone: true
    });
  },

  start(e) {
    this.data.brush.start();
    this.setData({
      isRunning: true
    })
  },

  async onSaveImage(e) {
    console.log('save1');
    let res = await this.data.brush.getTmpUrl();
    console.log('2');
    const tempFilePath = res.tempFilePath;
    res = await this.uploadImg(tempFilePath);
    const fileID = res.fileID;
    console.log('1')
    goodsModel.addArtWork(fileID);
  },

  uploadImg(url) {
    return new Promise((resovle, reject) => {
      wx.cloud.uploadFile({
        cloudPath: this.getFileName(),
        filePath: url,
        success: res => {
          resovle(res);
        },
        fail: console.error
      })
    })

  },

  getFileName() {
    const date = new Date();
    const name = this.formatTime(date);
    const index = Math.random(1000);
    return `${name}.png`
  },

  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(this.formatNumber).join('-') + [hour, minute, second].map(this.formatNumber).join('-')
  },

  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  onCancel(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  getContainer(width, height) {
    return [500, 500]
  }
})