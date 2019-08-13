const map = (value, start, end, min, max) => {
  if (end != value) {
    const left = (value - start) / (end - value);
    return (min + left * max) / (1 + left);
  } else {
    return max;
  }
}

const arc = (ctx, data, progress) => {
  let len, swidth;
  const seed1 = Math.random(),
    seed2 = Math.random();

  if (progress < 0.03) {
    len = map(seed1, 0, 1, 150, 250);
    swidth = map(seed2, 0, 1, 20, 40);
  } else if (progress < 0.1) {
    len = map(seed1, 0, 1, 75, 125);
    swidth = map(seed2, 0, 1, 8, 12);
  } else if (progress < 0.5) {
    len = map(seed1, 0, 1, 30, 60);
    swidth = map(seed2, 0, 1, 1, 4);
  } else if (progress < 0.6) {
    len = map(seed1, 0, 1, 5, 20);
    swidth = map(seed2, 0, 1, 5, 15);
  } else {
    len = map(seed1, 0, 1, 1, 10);
    swidth = map(seed2, 0, 1, 1, 7);
  }

  // 开始绘制
  ctx.beginPath();
  ctx.save();

  // 坐标变换
  ctx.translate(data.x, data.y);
  const seed = Math.random();
  const angle = map(seed, 0, 1, -Math.PI / 2, Math.PI / 2)
  ctx.rotate(angle)

  // 画一条粗的线
  ctx.strokeStyle = `rgba(${data.r}, ${data.g}, ${data.b}, ${50})`;
  ctx.lineWidth = swidth;
  ctx.lineCap = "round";
  ctx.moveTo(0, -len / 2);
  ctx.quadraticCurveTo(len / 2, 0, 0, len / 2);
  ctx.stroke();
  ctx.restore();
}

export { arc }