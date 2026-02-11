import { motion } from "framer-motion";
import EditableText from "./EditableText";

const experiences = [
  { num: "01", company: "Bank of Palestine", role: "Marketing Training Program", tags: ["Marketing", "Events", "Banking"], desc: "Completed comprehensive training program and actively participated in marketing events, gaining valuable industry experience in banking sector marketing." },
  { num: "02", company: "Social Media Manager", role: "Freelance Digital Marketing", tags: ["Social Media", "Project Management", "Client Relations"], desc: "Enhanced social media engagement by 10% and optimized audience interaction. Managed project timelines effectively, reducing delivery times by 30%." },
  { num: "03", company: "English Teacher", role: "Rowad Al-Ghad Institute", tags: ["Education", "Communication", "Leadership"], desc: "Developed innovative support systems for students to boost confidence and improve grades. Successfully maintained full class attendance through engaging teaching strategies." },
  { num: "04", company: "Career Preparation", role: "University Training Program", tags: ["Career Ready", "Digital Skills", "Professional Growth"], desc: "Completed essential workplace preparation courses: Internet Safety, Introduction to Gen AI, Self-Control Development, and Self-Confidence Enhancement." },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <EditableText tag="h2" defaultValue="Professional Experience" className="text-4xl md:text-5xl font-bold text-foreground" />
          <EditableText tag="p" defaultValue="Building Skills Through Real-World Impact" className="mt-4 text-lg text-muted-foreground" />
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 hover:bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <span className="text-4xl font-serif font-bold text-primary/30 shrink-0">{exp.num}</span>
                <div className="flex-1">
                  <EditableText tag="h3" defaultValue={exp.company} className="text-xl font-bold text-foreground" />
                  <EditableText tag="p" defaultValue={exp.role} className="text-primary text-sm mt-1" />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <EditableText tag="p" defaultValue={exp.desc} className="text-muted-foreground text-sm mt-4 leading-relaxed" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
