import { motion } from 'framer-motion'

export const MenuItem = ({ title, link }) => (
  <motion.a
    className='font-medium text-primary text-xl block'
    initial={{ paddingLeft: 0 }}
    whileHover={{
      paddingLeft: 7,
      transition: { duration: 0.3 },
    }}
    style={{ lineHeight: '1.7em' }}
    href={link}
    target='_blank'
  >
    {title}
  </motion.a>
)
