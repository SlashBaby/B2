import { DBModel } from "./db.js"

class LearnModel extends DBModel {
  get(openid, did) {
    return this.db.collection('learns').where({
      openid,
      did
    }).get();
  }

  add(openid, did, type) {
    return this.db.collection('learns').add({
      data: {
        openid,
        did,
        type
      }
    })
  }

  delete(openid, did) {
    return wx.cloud.callFunction({
      name: 'remove',
      data: {
        openid,
        did
      }
    })
  }

  getVisData(openid){
    const $ = this.db.command.aggregate;
    return this.db.collection('learns').aggregate()
      .group({
        _id: '$type',
        num: $.sum(1)
      }).end();
  }

}

export { LearnModel }