import * as React from "react"
import { useContext, useState } from "react"
import { FormContext } from "../../helpers/form-provider"
import { UI } from "shadergradient"
import { CameraControls } from "./camera-controls"
import { ShapeControls } from "./shape-controls"

export function PropertyControls({ onSubmit }) {
  const [activeTab, setActiveTab] = useState("shape")

  return (
    <>
      <div className="h-[66px] flex justify-around items-center">
        <UI.ControlTypeTitle
          title="Shape"
          active={activeTab === "shape"}
          onClick={() => setActiveTab("shape")}
        />

        <UI.ControlTypeTitle
          title="Colors"
          active={activeTab === "colors"}
          onClick={() => setActiveTab("colors")}
        />

        <UI.ControlTypeTitle
          title="Light"
          active={activeTab === "light"}
          onClick={() => setActiveTab("light")}
        />

        <UI.ControlTypeTitle
          title="Camera"
          active={activeTab === "camera"}
          onClick={() => setActiveTab("camera")}
        />
      </div>
      <div className="inline-block p-4 bg-controls-panel">
        {activeTab === "shape" && <ShapeControls />}
        {activeTab === "camera" && <CameraControls />}
      </div>
    </>
  )
}
