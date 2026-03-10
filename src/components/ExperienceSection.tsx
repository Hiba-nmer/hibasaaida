import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import bankCertificate from "@/assets/bank-certificate.png";

const experiences = [
  {
    num: "01",
    company: "Bank of Palestine",
    role: "Marketing Training Program",
    period: "April 2025 – Present",
    tags: ["Marketing", "Events", "Banking"],
    desc: "Completed an intensive training program and represented the Bank in promotional events. Attracted and engaged potential clients by distributing materials, explaining services, and delivering tailored marketing messages. Achieved outstanding results during one promotional day by successfully opening 35 new accounts.",
    certificate: bankCertificate,
  },
  {
    num: "02",
    company: "Roya Palestinian Organization",
    role: "Life Skills Trainer",
    period: "July 2025 – Present",
    tags: ["Training", "Youth Development", "Communication"],
    desc: "Completed a six-day training program specializing as a youth life skills trainer. Currently working with community organizations to train teenagers in communication, self-confidence, and time management. Redesigned the training program to include practical communication simulations.",
  },
  {
    num: "03",
    company: "Career Readiness Training",
    role: "EFE Palestine & Palestine Technical University",
    period: "2024",
    tags: ["Career Ready", "Employability", "Professional Growth"],
    desc: "Participated in a career readiness program aimed at preparing graduating students for the labor market. Acquired practical employability skills such as communication, teamwork, problem-solving, and professional ethics.",
  },
  {
    num: "04",
    company: "Yes Style Marketing Company",
    role: "Marketing Intern – Tulkarm",
    period: "April 2024 – 2025",
    tags: ["SWOT", "PESTEL", "Campaign Planning"],
    desc: "Created a full marketing plan using SWOT and PESTEL analysis. Applied segmentation, targeting, and positioning strategies. Helped develop new approaches to engage customers and expand market reach.",
  },
  {
    num: "05",
    company: "Social Media Manager",
    role: "Freelance Digital Marketing",
    period: "Mar 2021 – Dec 2022",
    tags: ["Social Media", "Project Management", "Client Relations"],
    desc: "Enhanced social media engagement by 10% and optimized audience interaction, boosting customer satisfaction. Managed project timelines effectively, reducing delivery times by 30%.",
  },
  {
    num: "06",
    company: "English Teacher",
    role: "Teaching Institute – Tulkarm",
    period: "Jan 2023 – 2024",
    tags: ["Education", "Communication", "Leadership"],
    desc: "Developed innovative support systems for students to boost confidence and improve grades. Successfully maintained full class attendance through engaging teaching strategies.",
  },
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Professional Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground">Building Skills Through Real-World Impact</p>
        </motion.div>

        {/* CV-style timeline */}
        <div className="relative">
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
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background transform -translate-x-1.5 md:-translate-x-1.5 mt-8 z-10" />

                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card hover:border-primary/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{exp.period}</span>
                        <span className="text-3xl font-serif font-bold text-primary/15">{exp.num}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
                      <p className="text-primary text-sm mt-1">{exp.role}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{exp.desc}</p>
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
