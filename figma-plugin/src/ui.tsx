import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { UI } from 'shadergradient'
import '../../ui-styles-compiled.css'
import { GradientScene } from './components/GradientScene'
import { Controls } from './components/Controls'
import { defaultProperties } from './consts'
import './global.css'
import { FormContext } from './helpers/form-provider'

function App() {
  const formProps = useForm({
    defaultValues: defaultProperties,
  })

  return (
    <FormContext.Provider value={formProps}>
      <GradientScene />
      <Controls />
      <div className='flex gap-0.5 p-3 absolute w-full bottom-0'>
        <UI.Button>Extract GIF</UI.Button>
        <UI.Button kind='secondary' onClick={insertCanvasAsImage}>
          Snapshot
        </UI.Button>
      </div>
    </FormContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('react-page'))

async function insertCanvasAsImage() {
  const bytes = await captureCanvas()
  parent.postMessage({ pluginMessage: { type: 'CANVAS_TO_IMAGE', bytes } }, '*')
}

async function captureCanvas() {
  return new Promise((resolve, reject) => {
    const image = new Image()

    const r3fCanvas = document.getElementById('r3f-canvas')
      .children[0] as HTMLCanvasElement

    const dataURL = r3fCanvas.toDataURL('image/png', 1.0) // full quality
    image.src = dataURL

    image.onload = async () => {
      const view: any = await imageToUint8Array(image)
      console.log(`${view.length} bytes`)
      resolve(view)
    }
  })
}

async function imageToUint8Array(image) {
  return new Promise((resolve, reject) => {
    // create a canvas for converto image to uint8array
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    context.canvas.width = image.width
    context.canvas.height = image.height
    context.drawImage(image, 0, 0)

    context.canvas.toBlob((blob) =>
      blob
        .arrayBuffer()
        .then((buffer) => resolve(new Uint8Array(buffer)))
        .catch(reject)
    )
  })
}
