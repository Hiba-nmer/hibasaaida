import { motion } from "framer-motion";
import EditableText from "./EditableText";
import { Download, ExternalLink } from "lucide-react";
import logoLarge from "@/assets/logo-large.webp";
import workCleanswift from "@/assets/work-cleanswift.jpg";
import workLaundry from "@/assets/work-laundry.jpg";
import workResearch from "@/assets/work-research.jpg";
import workVolunteer from "@/assets/work-volunteer.jpg";
import workDesign from "@/assets/work-design.jpg";
import workProposal from "@/assets/work-proposal.jpg";

const projects = [
  { title: "CleanSwift Marketing Plan", desc: "Comprehensive PowerPoint presentation showcasing marketing strategy and business planning", file: "/files/CleanSwift_Marketing_Plan.pptx", image: workCleanswift },
  { title: "Laundry App Marketing Plan", desc: "Detailed marketing strategy and business plan for mobile laundry application", file: "/files/Laundry_App_Marketing_Plan.pdf", image: workLaundry },
  { title: "Logo Guidelines", desc: "Brand identity guidelines and logo usage specifications for consistent branding", file: "/files/Logo_Guidelines.pdf", image: logoLarge },
  { title: "Marketing Research Methodology", desc: "Research framework and methodology for comprehensive market analysis", file: "/files/Marketing_Research_Methodology.pdf", image: workResearch },
  { title: "Volunteer at Work Leadership", desc: "Presentation showcasing leadership skills and volunteer experience in professional competition", image: workVolunteer },
  { title: "Graphic Design Portfolio", desc: "Creative design portfolio showcasing visual identity, branding, and digital artwork", image: workDesign },
  { title: "Project Proposal Presentation", desc: "AI-powered project proposal presentation showcasing innovative business ideas", link: "https://app.presentations.ai/view/Q5ysg6", image: workProposal },
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
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:bg-card hover:border-primary/40 transition-all duration-300 group cursor-pointer"
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
              {/* Card Image */}
              <div className="w-full h-48 overflow-hidden bg-secondary/50 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
