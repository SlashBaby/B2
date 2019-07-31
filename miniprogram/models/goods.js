import { HTTP } from "../util/http.js"

class GoodsModel extends HTTP {

  constructor() {
    super()
    this.db = wx.cloud.database({
      env: 'wechatcloud-79m2p'
    });
  }

  get(type) {
    return this.db.collection('goods').where({
      type
    }).get();
  }

  getDetail(id) {
    return this.db.collection('details').where({
      gid: id
    }).get();
  }

  addArtWork(fileid) {
    console.log('add');
    this.db.collection('artworks').add({
      data: {
        fileid
      }
    }).then(console.log)
  }

  getArtWorks(openId) {
    return this.db.collection('artworks').where({
      _openId: openId
    }).get();

  }

  deleteArtWork(aid, fileid) {
    console.log(aid, fileid);
    // 删除数据库中的数据
    this.db.collection('artworks').doc(aid).remove({
      success: function(res) {
        console.log(res);
      }
    })

    // 删除文件系统中的数据
    wx.cloud.deleteFile({
      fileList: [fileid],
      success: res => {
        console.log(res.fileList)
      },
    })
  }
}

export { GoodsModel }