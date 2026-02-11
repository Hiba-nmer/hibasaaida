import { motion } from "framer-motion";
import EditableText from "./EditableText";

const skillGroups = [
  { title: "E-Commerce", skills: ["Online Store Management", "SEO Optimization", "Data Analysis", "Digital Marketing"] },
  { title: "Business", skills: ["Project Management", "Strategic Planning", "Market Analysis", "Business Management"] },
  { title: "Technical", skills: ["Java Programming", "JavaScript & CSS", "Python & SQL", "Graphic Design"] },
  { title: "Tools I Master", skills: ["Canva", "Adobe Photoshop", "Adobe Illustrator", "AI Tools"] },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <EditableText tag="h2" defaultValue="Skills & Tools" className="text-4xl md:text-5xl font-bold text-foreground" />
          <EditableText tag="p" defaultValue="My Creative Arsenal" className="mt-4 text-lg text-muted-foreground" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card transition-all duration-300"
            >
              <EditableText tag="h3" defaultValue={group.title} className="text-lg font-bold text-primary mb-4" />
              <div className="space-y-3">
                {group.skills.map((skill, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary/60 shrink-0" />
                    <EditableText tag="span" defaultValue={skill} className="text-sm text-muted-foreground" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
