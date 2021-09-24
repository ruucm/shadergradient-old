import * as React from "react"
import { useContext, useState } from "react"
import { FormContext } from "../../helpers/form-provider"
import { UI } from "shadergradient"
import { CameraControls } from "./camera-controls"
import { ShapeControls } from "./shape-controls"

export function PropertyControls({ onSubmit }) {
  const [activeTab, setActiveTab] = useState("shape")

  return (
    <div className="inline-block p-4 bg-controls-panel">
      {activeTab === "shape" && <ShapeControls />}
      {activeTab === "camera" && <CameraControls />}
    </div>
  )
}
