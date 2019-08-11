import { DetailModel } from "../../models/details.js"
import { LearnModel } from "../../models/learns.js"
import { login } from "../../util/util.js"
import { FileModel } from "../../models/files.js"
import { Towxml } from "../../towxml/main"
const detailModel = new DetailModel();
const learnModel = new LearnModel();
const fileModel = new FileModel();
Page({

  data: {
    content: '',
    read: false,
    openid: '',
    did: '',
    loading: true,
    type: '',
    article: {}
  },

  onLoad: function(options) {
    const did = options.id;
    const detail = detailModel.get(did);
    const openid = login();
    let content;

    Promise.all([detail, openid]).then(res => {
      const detail = res[0];
      this.data.openid = res[1].result.openid;
      this.data.did = detail.data[0]._id;
      this.data.type = detail.data[0].type;
      content = detail.data[0].content;
      const fileId = 'cloud://wechatcloud-79m2p.7765-wechatcloud-79m2p/1.md';
      this.renderContent(fileId);
      return learnModel.get(this.data.openid, this.data.did);
    }).then(res => {
      const data = res.data;
      this.setData({
        content,
        read: data.length === 0 ? false : true,
        loading: false
      })
    })
  },

  onConfirm(e) {
    wx.showLoading({
      title: "确定中"
    })
    learnModel.add(this.data.openid, this.data.did, this.data.type)
      .then(res => {
        this.setData({
          read: true
        })
        wx.hideLoading();
      })
  },

  renderContent(fileId) {
    fileModel.get(fileId)
      .then(res => {
        return new Promise((resolve, reject) => {
          const FileSystemManager = wx.getFileSystemManager();
          FileSystemManager.readFile({
            filePath: res.tempFilePath,
            encoding: "utf-8",
            success: res => {
              resolve(res)
            }
          });
        })
      })
      .then(res => {
        console.log(res);
        const towxml = new Towxml();
        let data = towxml.toJson(res.data, 'markdown');
        data = towxml.initData(data, {
          base: 'https://xxx.com/',
          app: this
        });
        this.setData({
          article: data
        })
      })
  },

  onCancel(e) {
    wx.showLoading({
      title: "修改中"
    })
    learnModel.delete(this.data.openid, this.data.did)
      .then(res => {
        this.setData({
          read: false
        })
        wx.hideLoading();
      })
  }
})