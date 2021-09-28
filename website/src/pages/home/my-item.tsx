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
)
