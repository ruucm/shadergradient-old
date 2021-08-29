import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Gradient } from "shadergradient"
import "./ui.scss"

function App() {
  return (
    <div>
      <button
        onClick={insertCanvasAsImage}
        style={{
          position: "absolute",
          zIndex: 1,
        }}
      >
        Insert
      </button>
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          background: "green",
        }}
        gl={{ preserveDrawingBuffer: true }} // to capture the canvas
        id="3d-canvas"
      >
        <OrbitControls />
        <Gradient environment={<Environment preset="city" />} />
      </Canvas>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("react-page"))

async function insertCanvasAsImage() {
  const bytes = await captureCanvas()
  parent.postMessage({ pluginMessage: { type: "CANVAS_TO_IMAGE", bytes } }, "*")
}

async function captureCanvas() {
  const image = new Image()

  const canvas = document.getElementById("3d-canvas")
    .children[0] as HTMLCanvasElement
  console.log("canvas", canvas)

  var dataURL = canvas.toDataURL("image/jpeg", 1.0) // full quality
  image.src = dataURL

  const canvas2 = document.createElement("canvas")
  const context2 = canvas2.getContext("2d")

  const res = await addImageProcess(image.src)

  if (res > 0) {
    const view: any = await imageToUint8Array(image, context2)
    return view
  }
}

function addImageProcess(src) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img.height)
    img.onerror = reject
    img.src = src
  })
}

async function imageToUint8Array(image, context) {
  return new Promise((resolve, reject) => {
    // context.width = image.width;
    // context.height = image.height;
    context.width = 1000
    context.height = 1000
    context.drawImage(image, 0, 0)
    context.canvas.toBlob((blob) =>
      blob
        .arrayBuffer()
        .then((buffer) => resolve(new Uint8Array(buffer)))
        .catch(reject)
    )
  })
}
