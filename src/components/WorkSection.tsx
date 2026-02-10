import { motion } from "framer-motion";
import EditableText from "./EditableText";
import { FileText, Download } from "lucide-react";

const projects = [
  { title: "CleanSwift Marketing Plan", desc: "Comprehensive PowerPoint presentation showcasing marketing strategy and business planning" },
  { title: "Laundry App Marketing Plan", desc: "Detailed marketing strategy and business plan for mobile laundry application" },
  { title: "Logo Guidelines", desc: "Brand identity guidelines and logo usage specifications for consistent branding" },
  { title: "Marketing Research Methodology", desc: "Research framework and methodology for comprehensive market analysis" },
  { title: "Volunteer at Work Leadership", desc: "Presentation showcasing leadership skills and volunteer experience in professional competition" },
  { title: "Graphic Design Portfolio", desc: "Creative design portfolio showcasing visual identity, branding, and digital artwork" },
];

const WorkSection = () => {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <EditableText tag="h2" defaultValue="My Work" className="text-4xl md:text-5xl font-bold text-foreground" />
          <EditableText tag="p" defaultValue="Projects & Documents" className="mt-4 text-lg text-muted-foreground" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:glow-pink transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <EditableText tag="h3" defaultValue={project.title} className="text-lg font-bold text-foreground mb-2" />
              <EditableText tag="p" defaultValue={project.desc} className="text-sm text-muted-foreground leading-relaxed" />
              <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4" />
                <span>View Project</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
