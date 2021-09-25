import { motion } from 'framer-motion'

export const ControlsTab = ({ title, setSetting, setting }) => (
  <motion.a
    className='text-xl font-medium text-primary'
    style={{
      opacity: setting === title ? 1 : 0.3,
      textTransform: 'capitalize',
      lineHeight: '1.7em',
    }}
    whileHover={{
      opacity: 1,
      transition: { duration: 0.3 },
    }}
    onClick={() => {
      if (setting !== title) {
        setSetting(title)
      } else {
        setSetting('none')
      }
    }}
  >
    {title}
  </motion.a>
)
