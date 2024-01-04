'use client'
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";


// The variants for the drawer itself
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" }
};

// The variants for the drawer backdrop overlay
const overlayVariants = {
  open: { opacity: 1, pointerEvents: "auto" as const },
  closed: { opacity: 0, pointerEvents: "none" as const }
};

type DrawerProps = {
  /**
   * Sets the default width
   */
  width?: number;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ width = 270, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  // On hammer load

  return (
    <React.Fragment>
      {/* Just a trigger to open the drawer */}
      <button
        onClick={toggleOpen}
        className="hamburger absolute top-2 right-4 py-4"
      >
        <Menu size={25} />
      </button>

      {/* Just a trigger to have a swipe right if drawer is closed */}
      <div  className="z-20 fixed inset-y-0 p-4" />

      {/* The backdrop overlay that appears behind the drawer */}
      <motion.div
        className="z-10 fixed inset-0 bg-black"
        style={
          {
            "--tw-bg-opacity": 0.4
          } as any
        }
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={overlayVariants}
        transition={{ type: "tween" }}
        onClick={toggleOpen}
      />

      {/* The element that animates in and out */}
      <motion.div
        className="fixed top-0 bottom-0 z-30"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", stiffness: 350, damping: 40 }}
      >
        {/* Adds a "card-like" look to the drawer */}
        <div
          style={{ width }}
          className="bg-white  p-4 h-full -ml-4 select-text"
        >
          {/* Aligns the close button to the end */}
          <div className="flex items-center justify-end">
            <button
              onClick={toggleOpen}
         
            >
              <X size={25} />
            </button>
          </div>
          {/* Drawer content */}
          <div onClick={toggleOpen}>
          {children}
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Drawer;
