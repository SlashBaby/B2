import { GoodsModel } from "../../models/goods.js"
const goodsModel = new GoodsModel();
Page({

  data: {
    artworks: [],
    aidlist: []
  },

  onLoad: async function(options) {
    const openid = await this.login();
    const res = await goodsModel.getArtWorks();
    this.data.aidlist = res.data.map(a => a._id);
    const fileIds = res.data.map(a => a.fileid);
    this.getImg(fileIds);
  },

  login() {
    return wx.cloud.callFunction({
      name: 'login',
    })
  },

  imgByFileId(fileID) {
    return new Promise((resolve, reject) => {
      wx.cloud.downloadFile({
        fileID,
        success: res => {
          resolve(res);
        },
        fail: console.error
      })
    })
  },

  getImg(fileIds) {
    const promiseArr = [];
    for (let id of fileIds) {
      promiseArr.push(this.imgByFileId(id))
    }
    Promise.all(promiseArr).then(res => {
      this.setData({
        artworks: res.map((item, index) => ({
          path: item.tempFilePath,
          fileid: fileIds[index]
        }))
      })
    });
  },

  delete(e){
      const fileid = e.target.dataset.fileid;
      const index = e.target.dataset.index;
      const aid = this.data.aidlist[index];
      goodsModel.deleteArtWork(aid,fileid);
      this.data.artworks.splice(index, 1);
      this.setData({
        artworks: this.data.artworks
      })
  },

  saveImageToLocal(e) {
    wx.saveImageToPhotosAlbum({
      filePath: e.target.id,
      success(res) {}
    })
  },

  onShareAppMessage(e) {
    return {
      title: 'hello world'
    }
  }
})