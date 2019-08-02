const point = (ctx, data) => {
  ctx.beginPath();
  ctx.fillStyle = `rgb(${data.r}, ${data.g}, ${data.b})`
  ctx.arc(data.x, data.y, 5, 0, Math.PI * 2);
  ctx.fill();
}

export { point }