import pixelAndResolution from './pixelAndResolution'
import RGB from './rgb'

window.addEventListener('load', () => {
  const srcImage = document.getElementById('source-image')
  pixelAndResolution(srcImage)
  RGB();
})