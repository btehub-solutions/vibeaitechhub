import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import vibeaiLogo from "@/assets/vibeai-logo.png";

const footerLinks = {
  Learn: ["Modules", "Projects", "Quizzes", "Study Guides"],
  Resources: ["Documentation", "Updates", "Community", "API"],
  Company: ["About", "Careers", "Blog", "Contact"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="section-container py-16">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Brand Column */}
          <motion.div 
            className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0"
            variants={itemVariants}
          >
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src={vibeaiLogo} 
                alt="VibeAI" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Learn AI the way professionals do. Structured curriculum, real projects, 
              no fluff.
            </p>
            <div className="flex gap-3">
              {["X", "GH", "DC"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs font-medium">{social}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                      whileHover={{ x: 4 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 mt-12 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            VibeAI. Built for learners who ship.
          </p>
          <div className="flex items-center gap-6">
            {["Status", "Security"].map((link) => (
              <motion.a 
                key={link}
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
