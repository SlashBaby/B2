import { DBModel } from "./db.js"

class GoodsModel extends DBModel {
  get(type, labels = []) {
    if (labels.length === 0) {
      return this.db.collection('goods').where({
        type
      }).get();
    } else {
      const _ = this.db.command;
      const args = [];
      for (let l of labels) {
        args.push(_.eq(l));
      }
      return this.db.collection('goods').where({
        type,
        labels: _.and(...args)
      }).get();
    }
  }
}

export { GoodsModel }