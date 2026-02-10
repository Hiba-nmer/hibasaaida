import { useState } from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "About", "Experience", "Work", "Skills", "Contact"];

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <span className="font-serif text-xl font-bold text-primary">Portfolio</span>
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className={`text-sm font-medium transition-colors duration-300 ${
              active === item ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
