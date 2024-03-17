import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const FramerMotion = ({ children }) => {
  const router = useRouter();

  return (
    <AnimatePresence mode="out-in">
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100vh" }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FramerMotion;
