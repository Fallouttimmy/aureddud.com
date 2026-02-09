import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VideoGrid } from "@/components/VideoGrid";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import osnLogo from "@assets/image_1770474437846.png";

export default function Home() {
  const [showAgreement, setShowAgreement] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-gray-200 selection:text-gray-900">
      <AnimatePresence>
        {showAgreement && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Welcome</h2>
              <p className="text-gray-600">by pressing agree you agree to all OSN policy's.</p>
              <button 
                onClick={() => setShowAgreement(false)}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-colors"
              >
                Agree
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      
      <main className="relative z-10">
        <Hero />
        <VideoGrid />
      </main>

      <footer className="relative z-10 py-24 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6 group">
            <span className="text-xs font-display uppercase tracking-[0.3em] font-bold text-gray-400">Powered by</span>
            <img 
              src={osnLogo} 
              alt="OSN" 
              className="h-20 w-auto object-contain transition-all duration-500" 
            />
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              agreement to OSN ROW rules accepted.
            </p>
            <div className="flex justify-center gap-4 text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold">
              <span>Official Hub</span>
              <span>•</span>
              <span>Network</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
