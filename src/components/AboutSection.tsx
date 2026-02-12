import { motion } from "framer-motion";
import EditableText from "./EditableText";
import watercolorPainting from "@/assets/watercolor-painting.webp";

const cards = [
  { num: "01", title: "The Strategist", desc: "A highly motivated E-Commerce and Business Administration student with strong skills in digital marketing, programming, and graphic design. I bring analytical thinking to creative challenges." },
  { num: "02", title: "The Communicator", desc: "Fluent in English with high emotional intelligence and excellent diplomacy. Winner at the National Level – Palestinian Universities Debate Competition, recognized for exceptional persuasion skills." },
  { num: "03", title: "The Professional", desc: "I integrate marketing strategy, visual design, and coding into one seamless workflow — from idea to fully functional digital product." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EditableText tag="h2" defaultValue="About Me" className="text-4xl md:text-5xl font-bold text-foreground" />
          <EditableText tag="p" defaultValue="The Story Behind the Vision" className="mt-4 text-lg text-muted-foreground" />
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="w-80 h-[420px] rounded-2xl overflow-hidden glow-pink border border-border">
              <img src={watercolorPainting} alt="Artistic painting" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid md:grid-cols-1 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-serif font-bold text-primary/20 group-hover:text-primary/40 transition-colors shrink-0">{card.num}</span>
                  <div>
                    <EditableText tag="h3" defaultValue={card.title} className="text-xl font-bold text-foreground mb-2" />
                    <EditableText tag="p" defaultValue={card.desc} className="text-muted-foreground leading-relaxed text-sm" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
