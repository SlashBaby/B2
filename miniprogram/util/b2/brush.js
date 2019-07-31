import { HTTP } from "../http.js"
class Brush extends HTTP {

  init(canvasId, url, sample, stroke) {
    this.url = url;
    this.ctx = wx.createCanvasContext(canvasId);
    this.sample = sample;
    this.stroke = stroke;
    this.canvasId = canvasId;
    this.timer = null;
    this.frameCount = 0;
  }

  size(width, height) {
    this.width = width;
    this.height = height;
  }

  run(callback) {
    this.callback = callback;
    this.rotate();
    wx.getImageInfo({
      src: this.url,
      success: res => {
        this.ctx.drawImage(res.path, 0, 0, this.width, this.height);
        this.ctx.draw();
      }
    })
  }

  async start() {
    this.pixels = await this.loadImage(this.canvasId);
    this.pixels = this.pixels.data;
    this.sampler = this.getSampler();
    this.stroker = this.getStroker();
    this.setup();
    this.ctx.draw();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.timer = setInterval(() => {
      this.draw()
      this.frameCount++;
    }, 30);
  }

  setup() {
    this.indexlist = this.sampler();
  }

  draw() {
    if (this.indexlist.length <= 0) {
      this.stop();
    }
    const index = this.indexlist.pop();
    this.stroker(index);
  }

  getSampler() {
    const random = function() {
      const cnt = 500;
      const res = [];
      for (let i = 0; i < cnt; i++) {
        const index = parseInt(Math.random() * this.width * this.height);
        res.push(index)
      }
      return res;
    }
    return random;
  }

  getStroker() {
    const point = (index) => {
      const row = Math.floor(index / this.width);
      const col = index % this.width;
      const r = this.pixels[index * 4 + 0];
      const g = this.pixels[index * 4 + 1];
      const b = this.pixels[index * 4 + 2];

      this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      this.ctx.arc(col, row, 10, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.draw(true);
    }
    return point
  }

  stop() {
    clearInterval(this.timer);
    this.callback();
  }

  rotate() {
    if (this.height > this.width) {
      this.ctx.translate(this.height, 0);
      this.ctx.rotate(90 * Math.PI / 180);
    }
  }

  loadImage(canvasId) {
    return new Promise((resolve, reject) => {
      wx.canvasGetImageData({
        canvasId: canvasId,
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        success: res => {
          resolve(res);
        }
      })
    })
  }

  getTmpUrl() {
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        destWidth: this.width,
        destHeight: this.height,
        canvasId: this.canvasId,
        success: (res) => {
          resolve(res);
        }
      })
    })
  }

}

export { Brush }