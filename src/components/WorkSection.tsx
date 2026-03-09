import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
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
import designFlowers from "@/assets/design-flowers.jpg";

const projects = [
  { title: "CleanSwift Marketing Plan", desc: "Comprehensive PowerPoint presentation showcasing marketing strategy and business planning", file: "/files/CleanSwift_Marketing_Plan.pptx", image: workCleanswift },
  { title: "Laundry App Marketing Plan", desc: "Detailed marketing strategy and business plan for mobile laundry application", file: "/files/Laundry_App_Marketing_Plan.pdf", image: workLaundry },
  { title: "Logo Guidelines", desc: "Brand identity guidelines and logo usage specifications for consistent branding", file: "/files/Logo_Guidelines.pdf", image: workLogo },
  { title: "Marketing Research Methodology", desc: "Research framework and methodology for comprehensive market analysis", file: "/files/Marketing_Research_Methodology.pdf", image: workResearch },
  { title: "Volunteer at Work Leadership", desc: "Presentation showcasing leadership skills and volunteer experience in professional competition", image: workVolunteer },
  { title: "Project Proposal Presentation", desc: "AI-powered project proposal presentation showcasing innovative business ideas", link: "https://app.presentations.ai/view/Q5ysg6", image: workProposal },
];

const designImages = [designLvBag, designYoyoso, designLibre, designBoeing, designChanel, designFlowers];
const designTitles = ["LV Capucines — Product Ad", "YOYOSO — Product Promotion", "YSL Libre — Perfume Ad", "Boeing — Vintage Poster", "Chanel Coco Noir — Ad Design", "Flowers — Photography"];

const WorkSection = () => {
  const [showDesigns, setShowDesigns] = useState(false);
  const [currentDesign, setCurrentDesign] = useState(0);

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">My Work</h2>
          <p className="mt-4 text-lg text-muted-foreground">Projects & Documents</p>
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
                  <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
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

        {/* Graphic Design - Single Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div
            className="group cursor-pointer [perspective:1000px] max-w-md mx-auto"
            onClick={() => { setShowDesigns(true); setCurrentDesign(0); }}
          >
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:[transform:rotateY(-5deg)_rotateX(3deg)_scale(1.02)] group-hover:shadow-[0_20px_60px_-15px_hsl(330_85%_60%/0.3)] [transform-style:preserve-3d]">
              <div className="w-full h-56 overflow-hidden bg-secondary/50 relative">
                <img
                  src={designLvBag}
                  alt="Graphic Design Portfolio"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Graphic Design Portfolio</h3>
                    <p className="text-sm text-muted-foreground mt-1">Click to view {designImages.length} designs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Design Gallery Popup */}
      <AnimatePresence>
        {showDesigns && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setShowDesigns(false)}
          >
            <button onClick={() => setShowDesigns(false)} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10">
              <X className="w-8 h-8" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentDesign((prev) => (prev - 1 + designImages.length) % designImages.length); }}
              className="absolute left-4 md:left-8 text-foreground hover:text-primary transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentDesign((prev) => (prev + 1) % designImages.length); }}
              className="absolute right-4 md:right-8 text-foreground hover:text-primary transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={currentDesign}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={designImages[currentDesign]}
                alt={designTitles[currentDesign]}
                className="max-w-full max-h-[75vh] rounded-xl shadow-2xl mx-auto"
              />
              <p className="text-foreground font-medium mt-4">{designTitles[currentDesign]}</p>
              <p className="text-muted-foreground text-sm mt-1">{currentDesign + 1} / {designImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkSection;
