import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditableText from "./EditableText";
import { Download, ExternalLink, X } from "lucide-react";
import workCleanswift from "@/assets/work-cleanswift.jpg";
import workLaundry from "@/assets/work-laundry.jpg";
import workLogo from "@/assets/work-logo.jpg";
import workResearch from "@/assets/work-research.jpg";
import workVolunteer from "@/assets/work-volunteer.jpg";
import workProposal from "@/assets/work-proposal.jpg";
import designLvBag from "@/assets/design-lv-bag.jpg";
import designYoyoso from "@/assets/design-yoyoso.jpg";
import designLibre from "@/assets/design-libre.jpg";
import designBoeing from "@/assets/design-boeing.jpg";
import designChanel from "@/assets/design-chanel.png";

const projects = [
  { title: "CleanSwift Marketing Plan", desc: "Comprehensive PowerPoint presentation showcasing marketing strategy and business planning", file: "/files/CleanSwift_Marketing_Plan.pptx", image: workCleanswift },
  { title: "Laundry App Marketing Plan", desc: "Detailed marketing strategy and business plan for mobile laundry application", file: "/files/Laundry_App_Marketing_Plan.pdf", image: workLaundry },
  { title: "Logo Guidelines", desc: "Brand identity guidelines and logo usage specifications for consistent branding", file: "/files/Logo_Guidelines.pdf", image: workLogo },
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
  const [lightbox, setLightbox] = useState<string | null>(null);

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

        {/* Project cards with 3D perspective */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group cursor-pointer [perspective:1000px]"
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
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:[transform:rotateY(-5deg)_rotateX(3deg)_scale(1.02)] group-hover:shadow-[0_20px_60px_-15px_hsl(330_85%_60%/0.3)] [transform-style:preserve-3d]">
                <div className="w-full h-48 overflow-hidden bg-secondary/50">
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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {designWorks.map((work, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group cursor-pointer [perspective:1000px]"
              onClick={() => setLightbox(work.image)}
            >
              <div className="relative rounded-xl overflow-hidden border border-border transition-all duration-500 group-hover:border-primary/40 group-hover:[transform:rotateY(-4deg)_rotateX(2deg)_scale(1.03)] group-hover:shadow-[0_20px_60px_-15px_hsl(330_85%_60%/0.3)] [transform-style:preserve-3d]">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-sm font-bold text-foreground">{work.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightbox}
              alt="Design work"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkSection;
