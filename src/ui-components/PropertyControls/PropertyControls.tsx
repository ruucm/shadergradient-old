import * as React from 'react'
import cx from 'classnames'
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
      className={cx(
        'w-[100%] h-[fit-content] overflow-visible bg-controls-panel-mobile text-primary mx-auto p-3.5 md:bg-controls-panel md:h-full md:p-4 relative'
      )}
    >
      {activeTab === 'shape' && <UI.ShapeControls />}
      {activeTab === 'colors' && <UI.ColorControls />}
      {activeTab === 'effects' && <UI.EffectControls />}
      {activeTab === 'view' && <UI.ViewControls />}
      {activeTab === 'background' && <UI.BackgroundControls />}
    </div>
  )
}
