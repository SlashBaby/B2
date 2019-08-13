const map = (value, start, end, min, max) => {
  if (end != value) {
    const left = (value - start) / (end - value);
    return (min + left * max) / (1 + left);
  } else {
    return max;
  }
}
/**
 * HSL颜色值转换为RGB. 
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  Array           RGB色值数值
 */
function hslToRgb(h, s, l) {
    var r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const color = (ctx, data, progress, global) => {
  ctx.beginPath();

  const shift = global.color * 255 | 0;
  ctx.save();
  ctx.translate(data.x, data.y);

  // 设置长短
  const len = map(progress, 0, 1, 40, 5);

  // 设置颜色
  let b = (data.a * 0.3 + data.g * 0.6 + data.b * 0.1) | 0;
  let hue = (b + shift) % 255;
  let angle = map(b, 0, 255, -Math.PI , Math.PI);
  hue = map(hue, 0, 255, 0, 1);
  b = map(b, 0, 255, 0, 1);
  const rgb = hslToRgb(hue, b, 0.5);

  // 绘制
  ctx.lineWidth = map(progress, 0, 1, 10, 2);
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  ctx.rotate(angle);
  ctx.moveTo(-len, 0);
  ctx.lineTo(len, 0);
  ctx.stroke();

  ctx.restore();
}

export { color }