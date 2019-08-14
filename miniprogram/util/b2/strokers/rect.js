const map = (value, start, end, min, max) => {
	if(end != value){
		const left = (value - start) / (end - value);
		return (min + left * max) / (1 + left);
	}else{
		return max;
	}
}

const rect = (ctx, data, progress) => {
  const r = map(progress, 0, 1, 10, 5);
  ctx.beginPath();
  ctx.fillStyle = `rgb(${data.r}, ${data.g}, ${data.b})`;
  ctx.rect(data.x, data.y, r * 2, r * 2);
  ctx.fill();
}

export { rect }