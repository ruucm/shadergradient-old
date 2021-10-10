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
    <>
      <div
        className={
          'flex w-screen justify-between h-[fit-content] p-3.5 md:w-[fit-content] md:grid md:grid-rows-2'
        }
      >
        <UI.ControlTypeTitle
          title='Shape'
          active={activeTab === 'shape'}
          onClick={() => {
            activeTab === 'shape' ? setActiveTab('none') : setActiveTab('shape')
          }}
        />

        <UI.ControlTypeTitle
          title='Colors'
          active={activeTab === 'colors'}
          onClick={(e) => {
            e.stopPropagation() // ignore parent click

            activeTab === 'colors'
              ? setActiveTab('none')
              : setActiveTab('colors')
          }}
        />

        <UI.ControlTypeTitle
          title='Effects'
          active={activeTab === 'effects'}
          onClick={(e) => {
            e.stopPropagation() // ignore parent click

            activeTab === 'effects'
              ? setActiveTab('none')
              : setActiveTab('effects')
          }}
        />

        <UI.ControlTypeTitle
          title='Camera'
          active={activeTab === 'camera'}
          onClick={(e) => {
            e.stopPropagation() // ignore parent click

            activeTab === 'camera'
              ? setActiveTab('none')
              : setActiveTab('camera')
          }}
        />
        {/* <PreviewSwitch mode={mode} setMode={setMode} display={!isMobile} /> */}
      </div>

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
    </>
  )
}
