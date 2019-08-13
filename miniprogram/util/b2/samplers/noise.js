class Noise {
  static lerp(t, a, b) {
    return a + t * (b - a);
  }
  static grad2d(i, x, y) {
    const v = (i & 1) === 0 ? x : y;
    return (i & 2) === 0 ? -v : v;
  }
  constructor(octaves = 1) {
    this.p = new Uint8Array(512);
    this.octaves = octaves;
    this.init();
  }
  init() {
    for (let i = 0; i < 512; ++i) {
      this.p[i] = Math.random() * 256;
    }
  }
  noise2d(x2d, y2d) {
    const X = Math.floor(x2d) & 255;
    const Y = Math.floor(y2d) & 255;
    const x = x2d - Math.floor(x2d);
    const y = y2d - Math.floor(y2d);
    const fx = (3 - 2 * x) * x * x;
    const fy = (3 - 2 * y) * y * y;
    const p0 = this.p[X] + Y;
    const p1 = this.p[X + 1] + Y;
    return Noise.lerp(
      fy,
      Noise.lerp(
        fx,
        Noise.grad2d(this.p[p0], x, y),
        Noise.grad2d(this.p[p1], x - 1, y)
      ),
      Noise.lerp(
        fx,
        Noise.grad2d(this.p[p0 + 1], x, y - 1),
        Noise.grad2d(this.p[p1 + 1], x - 1, y - 1)
      )
    );
  }
  noise(x, y) {
    let e = 1,
      k = 1,
      s = 0;
    for (let i = 0; i < this.octaves; ++i) {
      e *= 0.5;
      s += e * (1 + this.noise2d(k * x, k * y)) / 2;
      k *= 2;
    }
    return s;
  }
}

const map = (value, start, end, min, max) => {
  if (end != value) {
    const left = (value - start) / (end - value);
    return (min + left * max) / (1 + left);
  } else {
    return max;
  }
}

const noise = function(width, height, pixelsData, ratio) {
  const perlin = new Noise(3);
  //开始取样
  const res = [];
  const base = 4000;
  const cnt = base * ratio | 0;
  const length = width * height;
  // 移动一下让点尽量充满屏幕
  for (let i = 0; i < cnt; i++) {

    const seedX = perlin.noise(i, Math.random());
    const seedY = perlin.noise(i + 10, Math.random());
    let x = parseInt(map(seedX, 0.3, 0.6, 0, width));
    let y = parseInt(map(seedY, 0.3, 0.6, 0, height));
    x = Math.min(width, x);
    y = Math.min(height, y);
    const index = y * width + x;
    const data = {
      x: index % width,
      y: Math.floor(index / width),
      r: pixelsData[index * 4 + 0],
      g: pixelsData[index * 4 + 1],
      b: pixelsData[index * 4 + 2],
      a: pixelsData[index * 4 + 3]
    }
    res.push(data);
  }
  // console.log(min, max);
  return {
    data: res,
    sampleRate: 10 * ratio | 0
  };
}
export { noise }