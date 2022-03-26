import * as React from 'react'
import { UI } from '../..'
import cx from 'classnames'

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
      className={cx(
        'w-screen h-[fit-content] overflow-y-scroll bg-controls-panel-mobile text-primary mx-auto p-3.5 md:bg-controls-panel md:w-[470px] md:h-full md:p-4 relative'
      )}
      style={{
        paddingBottom: activeTab === 'shape' ? 55 : 20,
      }}
    >
      {activeTab === 'shape' && <UI.ShapeControls />}
      {activeTab === 'colors' && <UI.ColorControls />}
      {activeTab === 'effects' && <UI.EffectControls />}
      {activeTab === 'view' && <UI.ViewControls />}
      {activeTab === 'background' && <UI.BackgroundControls />}
    </div>
  )
}
