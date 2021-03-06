import * as React from 'react'
import cx from 'classnames'
import * as UI from '..'
import { updateGradientState, usePropertyStore } from '../../store'

type ControlTypeTitlePropsT = {
  title?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ToolsFooter: React.FC<ControlTypeTitlePropsT> = ({
  title,

  ...rest
}) => {
  const toggleZoom = usePropertyStore((state: any) => state.toggleZoom)
  const toggleAxis = usePropertyStore((state: any) => state.toggleAxis)
  const [copyUrlText, setCopyUrl] = React.useState('copy url')
  const [isMobile, setIsMobile] = React.useState(false)

  const handleResize = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={cx(
        'text-sm font-medium justify-between absolute items-center'
      )}
      style={{
        display: isMobile ? 'none' : 'flex',
        borderTop: '1px solid #D9D9D9',
        color: '#D9D9D9',
        paddingTop: 5,
        width: 'calc(100% - 26px * 2)',
        bottom: 0,
        marginBottom: 5,
      }}
    >
      <p>Tools</p>
      <div className={cx('flex')} style={{ gap: 6 }}>
        <UI.IconButtons
          icon='CornerUpLeft'
          content='undo'
          onClick={() => {
            const prevUrls = window.history.state.prevUrls || []

            if (prevUrls.length > 1) {
              prevUrls.pop() // remove current url

              const lastURL = prevUrls[prevUrls.length - 1]
              updateGradientState(lastURL)

              prevUrls.pop() // remove the updated url(lastURL)
              window.history.pushState({ prevUrls }, document.title, '') // sync the prevUrls
            } else alert('no history')
          }}
        />
        <UI.IconButtons
          icon='Box'
          content='3d axis'
          active={toggleAxis}
          onClick={() => {
            usePropertyStore.setState({ toggleAxis: !toggleAxis })
          }}
        />
        <UI.IconButtons
          icon='Minimize2'
          content='zoom out'
          active={toggleZoom}
          onClick={() => {
            usePropertyStore.setState({ toggleZoom: !toggleZoom })
          }}
        />
        <UI.IconButtons
          icon='Copy'
          content={copyUrlText}
          onClick={async () => {
            window.navigator.clipboard.writeText(window.location.href)
            setCopyUrl('copied!')
            await setTimeout(() => {
              setCopyUrl('copy url')
            }, 1000)
          }}
        />
      </div>
    </div>
  )
}
