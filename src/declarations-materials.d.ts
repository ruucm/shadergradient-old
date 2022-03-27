// for material tags (https://stackoverflow.com/a/57449556/4047204)
import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      item: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      lineMaterial: any
      gradientMaterial: any
    }
  }
}
