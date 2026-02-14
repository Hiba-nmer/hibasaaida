import { motion } from "framer-motion";
import EditableText from "./EditableText";
import { Mail, Phone, MapPin } from "lucide-react";
import crownImage from "@/assets/crown.png";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <EditableText tag="h2" defaultValue="Let's Create Something Amazing" className="text-4xl md:text-5xl font-bold text-foreground" />
          <EditableText tag="p" defaultValue="Ready to transform your brand? Let's collaborate and make magic happen." className="mt-4 text-lg text-muted-foreground" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:bg-card transition-all duration-300"
          >
            <Mail className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <EditableText tag="p" defaultValue="hibanmers@gmail.com" className="text-sm text-foreground font-medium" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:bg-card transition-all duration-300"
          >
            <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Phone</p>
            <EditableText tag="p" defaultValue="+972 59 834 9117" className="text-sm text-foreground font-medium" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:bg-card transition-all duration-300"
          >
            <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Location</p>
            <EditableText tag="p" defaultValue="Tulkarm, Palestine" className="text-sm text-foreground font-medium" />
          </motion.div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 space-y-4 hover:bg-card transition-all duration-300"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Crown image - large and visible */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mt-20"
      >
        <img src={crownImage} alt="Crown" className="w-80 md:w-[28rem] h-auto object-contain" />
      </motion.div>
    </section>
  );
};

export default ContactSection;
