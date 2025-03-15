import {motion} from 'framer-motion' 

 export default function Back() {
  return(  <div className=" inset-0 z-[1]">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-first blur-3xl"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-second blur-3xl"
    />
  </div>)
 }