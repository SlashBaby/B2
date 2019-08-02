// pages/share/share.js
Page({

  data: {
    path: null,
    rotate: false,
  },

  onLoad: function(options) {
    console.log(options);
    this.setData({
      path: options.path,
      path: options.rotate
    })
  },

  onShareAppMessage(e) {
    
  }
})