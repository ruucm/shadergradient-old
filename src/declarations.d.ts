// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts').
declare module '*.scss'

// for shaders
declare module '*.glsl'

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
