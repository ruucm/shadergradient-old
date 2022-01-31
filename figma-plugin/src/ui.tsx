import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { UI, PRESETS } from '../../dist'
import '../../ui-styles-compiled.css'
import { Controls } from './components/Controls'
import './global.css'
import { useState } from 'react'
import { initialCurrent } from './consts'
import { LCanvas } from './components/LCanvas'
import { GradientScene } from './components/GradientScene'

function Arrow(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='block cursor-pointer h-[16px]'
      {...props}
    >
      <path d='M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z'></path>
    </svg>
  )
}

function App() {
  const [currentTheme, setCurrentTheme] = useState(initialCurrent)
  console.log('currentTheme', currentTheme)

  return (
    <div className='bg-white h-full'>
      <LCanvas currentTheme={currentTheme}>
        <GradientScene />
      </LCanvas>
      <div className='bg-controls-sub-panel text-white font-semibold text-sm flex justify-center items-center gap-3 py-1'>
        Theme
        <div className='bg-controls-sub-panel-button w-[150px] flex justify-between items-center p-1 rounded'>
          <Arrow
            onClick={() => {
              if (currentTheme === 0) setCurrentTheme(PRESETS.length - 1)
              else setCurrentTheme(currentTheme - 1)
            }}
          />
          {PRESETS[currentTheme].title}
          <div className='rotate-180'>
            <Arrow
              onClick={() => {
                if (currentTheme === PRESETS.length - 1) setCurrentTheme(0)
                else setCurrentTheme(currentTheme + 1)
              }}
            />
          </div>
        </div>
      </div>
      <Controls />
      <div className='flex gap-0.5 p-3 absolute w-full bottom-0'>
        <UI.Button>Extract GIF</UI.Button>
        <UI.Button kind='secondary' onClick={insertCanvasAsImage}>
          Snapshot
        </UI.Button>
      </div>
    </div>
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
