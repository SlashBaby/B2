import { ArtworksModel } from "../../models/artworks.js"
import { FileModel } from "../../models/files.js"
import { login } from "../../util/util.js"
const artworksModel = new ArtworksModel();
const fileModel = new FileModel();
Page({

  data: {
    artworks: [],
    loading: true
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })

    let artworks = null;
    login()
      // 获得openid
      .then(res => {
        const openid = res.result.openid;
        return artworksModel.get(openid);
      })
      // 根据获得openid获得fileid
      .then(res => {
        artworks = res.data;
        const files = [];
        for (let a of artworks) {
          files.push(fileModel.get(a.fileid));
        }
        return Promise.all(files)
      })
      // 根据获得fileid获得path
      .then(res => {
        artworks.map((item, index) => {
          item.path = res[index].tempFilePath;
          return item;
        })
        this.setData({
          artworks,
          loading: false
        });
        wx.hideLoading();
      })
  },

  delete(e) {
    // 获得删除数据的索引
    wx.showLoading({
      title: '删除中'
    })
    const index = e.target.dataset.index;
    const artwork = this.data.artworks[index];

    //删除数据
    const p1 = artworksModel.delete(artwork._id);
    const p2 = fileModel.delete(artwork.fileid);
    Promise.all([p1, p2]).then(res => {
      //更新数据
      this.data.artworks.splice(index, 1);
      this.setData({
        artworks: this.data.artworks
      })
      wx.hideLoading();
      wx.showToast({
        title: '删除成功'
      })
    })

  },

  saveImageToLocal(e) {
    wx.saveImageToPhotosAlbum({
      filePath: e.target.id,
      success(res) {}
    })
  },

  onCreate(e) {
    wx.switchTab({
      url: '../draw/draw'
    })
  },

  showImageInfo(e){
    console.log(e);
  },

  onShareAppMessage(e) {
    if (e.from === 'button') {
      const path = e.target.dataset.path;
      const rotate = e.target.dataset.rotate;
      return {
        title: 'hello world',
        path: `/pages/share/share?path=${path}&rotate=${rotate}`
      }
    }
  }
})