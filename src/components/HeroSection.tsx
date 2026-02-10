import { motion } from "framer-motion";
import EditableText from "./EditableText";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center particle-bg overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <EditableText
            tag="h1"
            defaultValue="Turning Ideas Into"
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-foreground"
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient mt-2">
            <EditableText tag="span" defaultValue="Impact" className="text-gradient" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 space-y-2"
        >
          <EditableText
            tag="p"
            defaultValue="E-Commerce & Digital Marketing Specialist"
            className="text-lg md:text-xl text-foreground/80 font-medium"
          />
          <EditableText
            tag="p"
            defaultValue="Creative Strategist | Designer | Web Builder"
            className="text-base md:text-lg text-muted-foreground"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 text-muted-foreground text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
