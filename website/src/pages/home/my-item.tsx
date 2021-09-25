import { motion } from 'framer-motion'

export const MyItem = ({ onClick, children, visible, color }) => (
  <motion.div
    style={{
      width: 'fit-content',
      fontSize: 60,
      opacity: visible ? 1 : 0.3,
      borderBottom: visible ? '4px solid ' + color : '0px solid black',
      cursor: visible ? 'default' : 'pointer',
    }}
    whileHover={{
      opacity: 0.6,
    }}
    onClick={onClick}
  >
    {children}
  </motion.div>
)
