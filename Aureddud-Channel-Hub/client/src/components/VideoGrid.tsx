import { useVideos } from "@/hooks/use-videos";
import { motion } from "framer-motion";
import { Play, Loader2 } from "lucide-react";
import { format } from "date-fns";

export function VideoGrid() {
  const { data: videos, isLoading, error } = useVideos();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-red-400 font-mono">
        Failed to load videos. Please try again later.
      </div>
    );
  }

  return (
    <section id="videos" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 uppercase tracking-tight">
            Latest Uploads
          </h2>
          <div className="hidden md:block w-32 h-[1px] bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos?.map((video, index) => (
            <motion.a
              key={video.id || video.videoUrl}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm shadow-lg transform scale-50 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 font-bold">
                    NEW
                  </span>
                  {video.publishedAt && (
                    <span className="text-xs font-mono text-muted-foreground font-medium">
                      {format(new Date(video.publishedAt), 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {video.description || "No description available."}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {(!videos || videos.length === 0) && (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
            <p className="text-muted-foreground font-mono">No videos found. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
