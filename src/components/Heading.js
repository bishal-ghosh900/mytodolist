import React from "react";
import { motion } from "framer-motion";

function Heading(props) {
  return (
    <motion.div animate={{ scale: [0, 1, 0.5, 1.1, 1] }} className="heading">
      {props.children}
    </motion.div>
  );
}

export default Heading;
