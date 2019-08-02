import { DBModel } from "./db.js"

class ArtworksModel extends DBModel {
  get(openid) {
    return this.db.collection('artworks').where({
      _openid: openid
    }).get();
  }

  delete(id) {
    return this.db.collection('artworks').doc(id).remove();
  }

  add(fileid, rotate) {
    return this.db.collection('artworks').add({
      data: {
        fileid,
        rotate
      }
    })
  }
}

export { ArtworksModel }