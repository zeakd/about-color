function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

function draw (canvas, img, resolWidth, resolHeight) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0,0, width, height);
  const imgData = ctx.getImageData(0,0, width, height);

  const wRatio = resolWidth / width;
  const hRatio = resolHeight / height;
  for (let w = 0; w < resolWidth; w++) {
    for (let h = 0; h < resolHeight; h++) {
      let count = 0;
      let allR = 0;
      let allG = 0;
      let allB = 0;
      let allA = 0;

      for (let i = Math.round(w / wRatio); i < Math.round((w + 1) / wRatio); i++) {
        for (let j = Math.round(h / hRatio); j < Math.round((h + 1) / hRatio); j++) {
          const colorIndices = getColorIndicesForCoord(i, j, canvas.width)

          const redIndex = colorIndices[0];
          const greenIndex = colorIndices[1];
          const blueIndex = colorIndices[2];
          const alphaIndex = colorIndices[3];

          allR = allR + imgData.data[redIndex]
          allG = allG + imgData.data[greenIndex]
          allB = allB + imgData.data[blueIndex]
          allA = allA + imgData.data[alphaIndex]

          count = count + 1;
        }
      }

      const r = parseInt(allR / count);
      const g = parseInt(allG / count);
      const b = parseInt(allB / count);
      const a = parseInt(allA / count);

      for (let i = Math.round(w / wRatio); i < Math.round((w + 1) / wRatio); i++) {
        for (let j = Math.round(h / hRatio); j < Math.round((h + 1) / hRatio); j++) {
          const colorIndices = getColorIndicesForCoord(i, j, canvas.width)

          const redIndex = colorIndices[0];
          const greenIndex = colorIndices[1];
          const blueIndex = colorIndices[2];
          const alphaIndex = colorIndices[3];

          imgData.data[redIndex] = r
          imgData.data[greenIndex] = g
          imgData.data[blueIndex] = b
          imgData.data[alphaIndex] = a
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

const pixelAndResolution = (img) => {
  const resolutionCanvas = document.getElementById('resolution-canvas');
  
  const widthInput = document.getElementById('resolution-width');
  const heightInput = document.getElementById('resolution-height');

  draw(resolutionCanvas, img, widthInput.value, heightInput.value);

  widthInput.addEventListener('input', function (e) {
    const width = parseInt(widthInput.value);
    const height = parseInt(width / 3 * 4);
    heightInput.value = height;

    draw(resolutionCanvas, img, width, height)
  })

  heightInput.addEventListener('input', function (e) {
    const height = parseInt(heightInput.value);
    const width = parseInt(height / 4 * 3);
    widthInput.value = width;

    draw(resolutionCanvas, img, width, height)
  })

  
}

export default pixelAndResolution