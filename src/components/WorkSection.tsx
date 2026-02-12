import { motion } from "framer-motion";
import EditableText from "./EditableText";
import { FileText, Download, ExternalLink } from "lucide-react";

const projects = [
  { title: "CleanSwift Marketing Plan", desc: "Comprehensive PowerPoint presentation showcasing marketing strategy and business planning", file: "/files/CleanSwift_Marketing_Plan.pptx" },
  { title: "Laundry App Marketing Plan", desc: "Detailed marketing strategy and business plan for mobile laundry application", file: "/files/Laundry_App_Marketing_Plan.pdf" },
  { title: "Logo Guidelines", desc: "Brand identity guidelines and logo usage specifications for consistent branding", file: "/files/Logo_Guidelines.pdf" },
  { title: "Marketing Research Methodology", desc: "Research framework and methodology for comprehensive market analysis", file: "/files/Marketing_Research_Methodology.pdf" },
  { title: "Volunteer at Work Leadership", desc: "Presentation showcasing leadership skills and volunteer experience in professional competition" },
  { title: "Graphic Design Portfolio", desc: "Creative design portfolio showcasing visual identity, branding, and digital artwork" },
  { title: "Project Proposal Presentation", desc: "AI-powered project proposal presentation showcasing innovative business ideas", link: "https://app.presentations.ai/view/Q5ysg6" },
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
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card hover:border-primary/40 transition-all duration-300 group cursor-pointer"
              onClick={() => {
                if (project.file) {
                  const a = document.createElement("a");
                  a.href = project.file;
                  a.download = project.file.split("/").pop() || "file";
                  a.click();
                } else if (project.link) {
                  window.open(project.link, "_blank");
                }
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                {project.link ? <ExternalLink className="w-6 h-6 text-primary" /> : <FileText className="w-6 h-6 text-primary" />}
              </div>
              <EditableText tag="h3" defaultValue={project.title} className="text-lg font-bold text-foreground mb-2" />
              <EditableText tag="p" defaultValue={project.desc} className="text-sm text-muted-foreground leading-relaxed" />
              {project.file && (
                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4" />
                  <span>Click to Download</span>
                </div>
              )}
              {project.link && (
                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Presentation</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
