import { motion } from "framer-motion";
import EditableText from "./EditableText";

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

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 hover:glow-pink transition-shadow duration-500 group"
            >
              <span className="text-5xl font-serif font-bold text-primary/20 group-hover:text-primary/40 transition-colors">{card.num}</span>
              <EditableText tag="h3" defaultValue={card.title} className="text-xl font-bold text-foreground mt-4 mb-3" />
              <EditableText tag="p" defaultValue={card.desc} className="text-muted-foreground leading-relaxed text-sm" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
