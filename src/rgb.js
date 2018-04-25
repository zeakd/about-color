function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function draw (canvas, hex) {
  console.log(canvas.height)
  const height = canvas.height;
  const width = canvas.width;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, width, height);
}

export default () => {
  const rgbCanvas = document.getElementById('rgb-canvas')

  const rInput = document.getElementById('r-input');
  const gInput = document.getElementById('g-input');
  const bInput = document.getElementById('b-input');
  const hexInput = document.getElementById('hex-input');
  
  draw(rgbCanvas, rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value))) 

  rInput.addEventListener('input', function (e) {
    const hex = rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value))
    hexInput.value = hex;
    draw(rgbCanvas, hex);
  })

  gInput.addEventListener('input', function (e) {
    const hex = rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value))
    hexInput.value = hex;
    draw(rgbCanvas, hex);
  })

  bInput.addEventListener('input', function (e) {
    const hex = rgbToHex(Number(rInput.value), Number(gInput.value), Number(bInput.value))
    hexInput.value = hex;
    draw(rgbCanvas, hex);
  })

  hexInput.addEventListener('input', function (e) {
    const hex = hexInput.value;
    const rgb = hexToRgb(hex);
    rInput.value = rgb.r;
    gInput.value = rgb.g;
    bInput.value = rgb.b;

    draw(rgbCanvas, hex);
  })
}