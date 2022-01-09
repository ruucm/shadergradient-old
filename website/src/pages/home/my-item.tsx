import { motion } from 'framer-motion'
import Link from 'next/link'

export const MyItem = ({
  onClick,
  children,
  visible,
  color,
  isMobile = false,
  btnOn = false,
}) => (
  <div style={{ position: 'relative', overflow: 'visible' }}>
    <motion.div
      style={{
        width: isMobile ? '100vw' : 'fit-content',
        fontSize: isMobile ? 30 : 60,
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
      animate={{
        opacity: visible ? 1 : 0.3,
        transition: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 5 }}
      transition={{
        repeatType: 'reverse',
        repeat: Infinity,
        duration: 1,
      }}
      style={{
        display:
          visible === true && isMobile === false && btnOn === true
            ? 'block'
            : 'none',
        fontWeight: 500,
        fontSize: '1.15em',
        marginTop: 7,
      }}
      whileHover={{ x: 10 }}
    >
      <Link href="/customize">Customize →</Link>
    </motion.div>
  </div>
)
