import { motion } from 'framer-motion'
import Link from 'next/link'

export const MyItem = ({
  onClick,
  children,
  visible,
  color,
  isMobile = false,
}) => (
  <div style={{ display: 'relative' }}>
    <motion.div
      style={{
        width: isMobile ? '100vw' : 'fit-content',
        fontSize: isMobile ? 30 : 60,
        // opacity: ,
        borderBottom:
          visible && !isMobile ? '4px solid ' + color : '0px solid black',
        cursor: visible ? 'default' : 'pointer',
        textAlign: 'center',
      }}
      whileHover={{
        opacity: 0.6,
      }}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0.3, transition: { duration: 0.5 } }}
    >
      {children}
    </motion.div>
    {/* {visible ? (
      <span
        style={{
          background: 'red',
          display: 'absolute',
          height: '1em',
          overflow: 'visible',
        }}
      >
        <Link href='/customize'>Customize →</Link>
      </span>
    ) : null} */}
  </div>
)
