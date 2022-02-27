import { motion } from 'framer-motion'
import Link from 'next/link'
import { TextAnimation } from '@/components/dom/TextAnimation'

export const MyItem = ({
  onClick,
  children,
  visible,
  color,
  isMobile = false,
  btnOn = false,
  index,
}) => (
  <div style={{ position: 'relative', overflow: 'visible' }}>
    <motion.div
      style={{
        width: isMobile ? '100vw' : 'fit-content',
        // fontSize: isMobile ? 30 : 60,
        borderBottom:
          visible && !isMobile ? '4px solid ' + color : '0px solid black',
        cursor: visible ? 'default' : 'pointer',
        textAlign: 'center',
      }}
      whileHover={{
        opacity: 1,
        y: !visible ? -5 : 0,
      }}
      onClick={onClick}
      // initial={{ opacity: 0 }}
      animate={{
        opacity: visible ? 1 : 0.4,
        // transition: { duration: 0.5, delay: index * 0.1 },
      }}
    >
      <TextAnimation
        content={children.toString()}
        fontSize={isMobile ? 30 : 60}
        color={color}
        delay={index * 500}
      />
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
      <Link href='/customize'>Customize →</Link>
    </motion.div>
  </div>
)
