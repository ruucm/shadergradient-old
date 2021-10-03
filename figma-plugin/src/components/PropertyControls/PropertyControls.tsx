import * as React from "react"
import { useState } from "react"
import { UI, useQueryState } from "shadergradient"

export function PropertyControls() {
  const [activeTab, setActiveTab] = useState("shape")
  const [embedMode] = useQueryState("embedMode")

  if (embedMode === "off")
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
            title="Effects"
            active={activeTab === "effects"}
            onClick={() => setActiveTab("effects")}
          />

          <UI.ControlTypeTitle
            title="Camera"
            active={activeTab === "camera"}
            onClick={() => setActiveTab("camera")}
          />
        </div>
        <div className="p-4 bg-controls-panel w-full h-[340px] overflow-y-scroll">
          {activeTab === "shape" && <UI.ShapeControls />}
          {activeTab === "colors" && <UI.ColorControls />}
          {activeTab === "effects" && <UI.EffectControls />}
          {activeTab === "camera" && <UI.CameraControls />}
        </div>
      </>
    )
  else return <></>
}
