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
import designLvBag from "@/assets/design-lv-bag.jpg";
import designYoyoso from "@/assets/design-yoyoso.jpg";
import designLibre from "@/assets/design-libre.jpg";
import designBoeing from "@/assets/design-boeing.jpg";
import designChanel from "@/assets/design-chanel.png";

const projects = [
  { title: "CleanSwift Marketing Plan", desc: "Comprehensive PowerPoint presentation showcasing marketing strategy and business planning", file: "/files/CleanSwift_Marketing_Plan.pptx", image: workCleanswift },
  { title: "Laundry App Marketing Plan", desc: "Detailed marketing strategy and business plan for mobile laundry application", file: "/files/Laundry_App_Marketing_Plan.pdf", image: workLaundry },
  { title: "Logo Guidelines", desc: "Brand identity guidelines and logo usage specifications for consistent branding", file: "/files/Logo_Guidelines.pdf", image: logoLarge },
  { title: "Marketing Research Methodology", desc: "Research framework and methodology for comprehensive market analysis", file: "/files/Marketing_Research_Methodology.pdf", image: workResearch },
  { title: "Volunteer at Work Leadership", desc: "Presentation showcasing leadership skills and volunteer experience in professional competition", image: workVolunteer },
  { title: "Project Proposal Presentation", desc: "AI-powered project proposal presentation showcasing innovative business ideas", link: "https://app.presentations.ai/view/Q5ysg6", image: workProposal },
];

const designWorks = [
  { title: "LV Capucines — Product Ad", image: designLvBag },
  { title: "YOYOSO — Product Promotion", image: designYoyoso },
  { title: "YSL Libre — Perfume Ad", image: designLibre },
  { title: "Boeing — Vintage Poster", image: designBoeing },
  { title: "Chanel Coco Noir — Ad Design", image: designChanel },
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
              whileHover={{ rotateY: -4, rotateX: 3, scale: 1.03 }}
              style={{ perspective: 800, transformStyle: "preserve-3d" }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:bg-card hover:border-primary/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-primary/20 hover:shadow-2xl"
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
              <div className="w-full h-48 overflow-hidden bg-secondary/50 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

        {/* Graphic Design Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 mb-12"
        >
          <EditableText tag="h3" defaultValue="Graphic Design Portfolio" className="text-3xl md:text-4xl font-bold text-foreground" />
          <EditableText tag="p" defaultValue="Creative visual designs & brand advertisements" className="mt-3 text-muted-foreground" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designWorks.map((work, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ rotateY: -4, rotateX: 3, scale: 1.03 }}
              style={{ perspective: 800, transformStyle: "preserve-3d" }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:bg-card hover:border-primary/40 transition-all duration-300 group shadow-lg hover:shadow-primary/20 hover:shadow-2xl"
            >
              <div className="w-full h-56 overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <EditableText tag="h4" defaultValue={work.title} className="text-sm font-bold text-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
