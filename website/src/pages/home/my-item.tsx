import { motion } from 'framer-motion'

export const MyItem = ({
  onClick,
  children,
  visible,
  color,
  isMobile = false,
}) => (
  <motion.div
    style={{
      width: isMobile ? '100vw' : 'fit-content',
      fontSize: isMobile ? 35 : 60,
      opacity: visible ? 1 : 0.3,
      borderBottom:
        visible && !isMobile ? '4px solid ' + color : '0px solid black',
      cursor: visible ? 'default' : 'pointer',
      textAlign: 'center',
    }}
    whileHover={{
      opacity: 0.6,
    }}
    onClick={onClick}
  >
    {children}
  </motion.div>
)
