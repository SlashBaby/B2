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

  add(fileid, rotate, info) {
    return this.db.collection('artworks').add({
      data: {
        fileid,
        rotate,
        img: info.img,
        stroke: info.stroke,
        sample: info.sample
      }
    })
  }
}

export { ArtworksModel }