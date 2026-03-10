import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import debateCertificate from "@/assets/debate-certificate.jpg";

const achievements = [
  {
    title: "National Debate Champion",
    subtitle: "Palestinian Universities Debate Competition",
    desc: "Winner at the National Level – Selected as one of the top six debaters to represent the university. Praised for exceptional persuasion skills and sharp analytical thinking.",
    image: debateCertificate,
  },
];

const AchievementsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Achievements</h2>
          <p className="mt-4 text-lg text-muted-foreground">Recognition & Awards</p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 hover:bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-primary text-sm mt-1">{item.subtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
              {item.image && (
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity border border-border"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImage(item.image)}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Certificate"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AchievementsSection;
