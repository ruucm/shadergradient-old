import * as React from 'react'
import { UI } from '../..'

type Props = {
  // All other props
  [x: string]: any
}

export const PropertyControls: React.FC<Props> = ({
  // isMobile,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className={
        'w-screen h-[fit-content] bg-controls-panel-mobile text-primary mx-auto p-3.5 md:bg-controls-panel md:w-[470px] md:h-full md:p-4'
      }
      // style={{ padding: activeTab === "none" ? 0 : null }}
    >
      {activeTab === 'shape' && <UI.ShapeControls />}
      {activeTab === 'colors' && <UI.ColorControls />}
      {activeTab === 'effects' && <UI.EffectControls />}
      {activeTab === 'camera' && <UI.CameraControls />}
    </div>
  )
}
