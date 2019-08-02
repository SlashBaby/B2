import { DBModel } from "./db.js"
class LabelsModel extends DBModel {

  get(type) {
    return this.db.collection('labels').where({
      type
    }).get();
  }
}

export { LabelsModel }