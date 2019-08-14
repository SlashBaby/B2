import { noise } from "../noise.js"

const map = (value, start, end, min, max) => {
  if (end != value) {
    const left = (value - start) / (end - value);
    return (min + left * max) / (1 + left);
  } else {
    return max;
  }
}

const line = (ctx, data, progress) => {
  const noiseScale = 0.01,
    strokeLength = 35,
    strokeWidth = map(progress, 0, 1, 25, 0),
    lengthVariation = map(Math.random(), 0, 1, 0.75, 1.25);
  // 开始绘制
  ctx.beginPath();
  ctx.save();

  // 坐标变换
  ctx.translate(data.x, data.y);
  const seed = noise(data.x * noiseScale, data.y * noiseScale);
  const angle = map(seed, 0, 1, -Math.PI, Math.PI);
  ctx.rotate(angle)

  ctx.strokeStyle = `rgba(${data.r}, ${data.g}, ${data.b}, ${50})`;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = "round";

  ctx.moveTo(0, 0);
  ctx.lineTo(strokeLength * lengthVariation, 0);
  ctx.stroke();

  // 画一个高亮
  const {r, g, b, a} = {
    r: Math.min(data.r * 3, 255),
    g: Math.min(data.g * 3, 255),
    b: Math.min(data.b * 3, 255),
    a: Math.random()
  }
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  ctx.lineWidth = strokeWidth * 0.3;
  ctx.moveTo(0, -strokeWidth * 0.15);
  ctx.lineTo(strokeLength * lengthVariation, -strokeWidth * 0.15);
  ctx.stroke();

  ctx.restore();
}

export { line }