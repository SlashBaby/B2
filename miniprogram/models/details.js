import { DBModel } from "./db.js"
class DetailModel extends DBModel {
  get(id) {
    return this.db.collection('details').where({
      gid: id
    }).get();
  }
}

export { DetailModel }