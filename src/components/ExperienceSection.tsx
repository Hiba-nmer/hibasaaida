import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditableText from "./EditableText";
import { X, Download } from "lucide-react";
import bankCertificate from "@/assets/bank-certificate.png";

const experiences = [
  { num: "01", company: "Bank of Palestine", role: "Marketing Training Program", period: "2024", tags: ["Marketing", "Events", "Banking"], desc: "Completed comprehensive training program and actively participated in marketing events, gaining valuable industry experience in banking sector marketing.", certificate: bankCertificate },
  { num: "02", company: "Social Media Manager", role: "Freelance Digital Marketing", period: "2023 – Present", tags: ["Social Media", "Project Management", "Client Relations"], desc: "Enhanced social media engagement by 10% and optimized audience interaction. Managed project timelines effectively, reducing delivery times by 30%." },
  { num: "03", company: "English Teacher", role: "Rowad Al-Ghad Institute", period: "2023", tags: ["Education", "Communication", "Leadership"], desc: "Developed innovative support systems for students to boost confidence and improve grades. Successfully maintained full class attendance through engaging teaching strategies." },
  { num: "04", company: "Career Preparation", role: "University Training Program", period: "2024", tags: ["Career Ready", "Digital Skills", "Professional Growth"], desc: "Completed essential workplace preparation courses: Internet Safety, Introduction to Gen AI, Self-Control Development, and Self-Confidence Enhancement." },
];

const ExperienceSection = () => {
  const [showCertificate, setShowCertificate] = useState<string | null>(null);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <EditableText tag="h2" defaultValue="Professional Experience" className="text-4xl md:text-5xl font-bold text-foreground" />
          <EditableText tag="p" defaultValue="Building Skills Through Real-World Impact" className="mt-4 text-lg text-muted-foreground" />
        </motion.div>

        {/* CV-style timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 transform md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background transform -translate-x-1.5 md:-translate-x-1.5 mt-8 z-10" />

                  {/* Content card */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card hover:border-primary/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{exp.period}</span>
                        <span className="text-3xl font-serif font-bold text-primary/15">{exp.num}</span>
                      </div>
                      <EditableText tag="h3" defaultValue={exp.company} className="text-lg font-bold text-foreground" />
                      <EditableText tag="p" defaultValue={exp.role} className="text-primary text-sm mt-1" />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <EditableText tag="p" defaultValue={exp.desc} className="text-muted-foreground text-sm mt-4 leading-relaxed" />
                      {exp.certificate && (
                        <button
                          onClick={() => setShowCertificate(exp.certificate!)}
                          className="mt-4 text-sm text-primary hover:text-primary/80 font-medium transition-colors underline underline-offset-4"
                        >
                          View Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Download CV button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/files/Hiba_CV.pdf"
              download="Hiba_CV.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download My CV
            </a>
          </motion.div>
        </div>
      </div>

      {/* Certificate Popup */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setShowCertificate(null)}
          >
            <button onClick={() => setShowCertificate(null)} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={showCertificate}
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

export default ExperienceSection;
