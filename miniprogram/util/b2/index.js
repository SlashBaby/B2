import { strokerManager } from "./strokers/index.js"
import { samplerManager } from "./samplers/index.js"
import { promisic } from "../util.js"

class B2 {
  constructor(canvasId, sample, stroke, url) {
    this.canvasId = canvasId;
    this.ctx = wx.createCanvasContext(canvasId);
    this.sampler = samplerManager.get(sample);
    this.stroker = strokerManager.get(stroke);
    this.url = url;
    this.framCount = 0;
  }

  getCanvasInfo() {
    return promisic(wx.getImageInfo)({ src: this.url })
      .then(res => {
        [this.width, this.height, this.ratio] = this.getContextSize(res.width, res.height);
        this.path = res.path;
        if (res.width > res.height) {
          this.rotate = true;
        } else {
          this.rotate = false;
        }
        return this.sendCanvasInfoBack();
      })

  }

  sendCanvasInfoBack() {
    return new Promise((resolve, reject) => {
      // 转换成rpx
      const canvasWidth = this.width * this.ratio;
      const canvasHeight = this.height * this.ratio;
      const rotate = this.rotate;
      resolve({ canvasWidth, canvasHeight, rotate });
    })
  }

  loadingImageData() {
    return promisic(wx.canvasGetImageData)({
      canvasId: this.canvasId,
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    }).then(res => {
      this.pixelsData = res.data;
      return new Promise((resolve, reject) => {
        resolve();
      })
    })
  }

  drawImage() {
    let width = this.width,
      height = this.height;
    this.ctx.save();
    if (this.rotate) {
      this.ctx.translate(this.width, 0);
      this.ctx.rotate(90 * Math.PI / 180);
      width = this.height;
      height = this.width;
    }
    this.ctx.drawImage(this.path, 0, 0, width, height);
    this.ctx.restore();
    return new Promise((resolve, reject) => {
      this.ctx.draw(false, res => {
        resolve(res);
      });
    })

  }

  getContextSize(width, height) {
    const res = wx.getSystemInfoSync();
    const { windowWidth, windowHeight } = res;
    const ratio = 375 / windowWidth * 2;
    const imgRatio = width > height ? width / height : height / width;
    const screenRtio = windowHeight / windowWidth;
    const scale = 0.95;
    let canvasHeight, canvasWidth;
    if (imgRatio > screenRtio) {
      canvasHeight = windowHeight * scale;
      canvasWidth = canvasHeight / imgRatio;
    } else {
      canvasWidth = windowWidth * scale;
      canvasHeight = canvasWidth * imgRatio;
    }
    // 都转换成整数
    // 这里太坑人了！！！
    return [Math.floor(canvasWidth), Math.floor(canvasHeight), ratio];
  }

  run(maxFramCount, sampleRate) {
    this.maxFramCount = maxFramCount;
    this.sampleRate = sampleRate;
    this.setup();
    return this.draw();
  }

  setup() {
    const total = this.maxFramCount * this.sampleRate;
    this.data = this.sampler(total, this.width, this.height, this.pixelsData);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw() {
    return new Promise((resolve, reject) => {
      this.timer = setInterval(() => {
        this.loop()
        this.frameCount++;
        if (this.data.length <= 0) {
          this.stop();
          resolve();
        }
      }, 30);
    })
  }

  loop() {
    let i = 0;
    while (this.data.length > 0 && i < this.sampleRate) {
      i++;
      const d = this.data.pop();
      this.stroker(this.ctx, d);
    }
    this.ctx.draw(true);
  }

  stop() {
    clearInterval(this.timer);
  }

  getTempFilePath() {
    return promisic(wx.canvasToTempFilePath)({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      destWidth: this.width,
      destHeight: this.height,
      canvasId: this.canvasId
    })
  }
}

export { B2 }