const map = (value, start, end, min, max) => {
	if(end != value){
		const left = (value - start) / (end - value);
		return (min + left * max) / (1 + left);
	}else{
		return max;
	}
}

const point = (ctx, data, progress) => {
  const r = map(progress, 0, 1, 20, 5);
  // console.log(progress, r);
  ctx.beginPath();
  ctx.fillStyle = `rgb(${data.r}, ${data.g}, ${data.b})`
  ctx.arc(data.x, data.y, r, 0, Math.PI * 2);
  ctx.fill();
}

export { point }