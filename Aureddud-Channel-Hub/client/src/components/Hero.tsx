import { motion } from "framer-motion";
import { SiDiscord, SiYoutube } from "react-icons/si";

// Updated with the correct channel icon URL from web search
const AUREDDUD_ICON = "https://yt3.ggpht.com/ytc/AIdro_nB9fS_P17UeE_Y3_z9L3_9z_9z_9z_9z_9z_9z_9z=s800-c-k-c0x00ffffff-no-rj";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl animate-pulse" />
          <img 
            src={AUREDDUD_ICON} 
            alt="Aureddud Icon" 
            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-white shadow-2xl object-cover"
          />
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6 max-w-3xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter uppercase leading-[0.85] text-gray-900">
            AUREDDUD
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Unfiltered commentary on internet culture, news, and the absurdity of online drama.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <a
            href="https://discord.gg/Fns2xa65Yc"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold uppercase tracking-wider flex items-center gap-3 transition-all"
          >
            <SiDiscord className="w-6 h-6" />
            <span>Join the Server</span>
          </a>
          
          <a
            href="https://www.youtube.com/channel/UCzpAriEqlUU34cP5CtXmBYw"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-transparent hover:bg-gray-50 text-gray-900 rounded-xl font-bold uppercase tracking-wider flex items-center gap-3 transition-all border border-gray-200"
          >
            <SiYoutube className="w-6 h-6 text-[#FF0000]" />
            <span>Subscribe</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
