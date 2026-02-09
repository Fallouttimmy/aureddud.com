import { Link } from "wouter";
import { SiDiscord, SiYoutube } from "react-icons/si";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl font-display font-bold text-gray-900 tracking-widest hover:opacity-70 transition-opacity">
            AUREDDUD
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#videos" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider">
            Latest Videos
          </Link>
          <a 
            href="https://discord.gg/Fns2xa65Yc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#5865F2] transition-colors uppercase tracking-wider"
          >
            <SiDiscord className="w-5 h-5" />
            Discord
          </a>
          <a 
            href="https://www.youtube.com/channel/UCzpAriEqlUU34cP5CtXmBYw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#FF0000] transition-colors uppercase tracking-wider"
          >
            <SiYoutube className="w-5 h-5" />
            Channel
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
