import { useState } from "react";
import { useCreateVideo } from "@/hooks/use-videos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertVideoSchema, type InsertVideo } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Hidden admin trigger for demonstration purposes
// Ideally this would be behind proper auth in a real app
export function AdminPanel() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createVideo = useCreateVideo();

  const form = useForm<InsertVideo>({
    resolver: zodResolver(insertVideoSchema),
    defaultValues: {
      title: "",
      videoUrl: "",
      thumbnailUrl: "",
      description: "",
    },
  });

  const onSubmit = (data: InsertVideo) => {
    createVideo.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Video Added",
          description: "The video has been successfully added to the grid.",
        });
        setOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-secondary/80 backdrop-blur border-white/10 hover:bg-primary hover:text-white transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-wide">Add New Video</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs uppercase tracking-wider text-muted-foreground">Video Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. The Truth About Internet Drama"
              {...form.register("title")} 
              className="bg-background/50 border-white/10 focus:border-primary"
            />
            {form.formState.errors.title && (
              <p className="text-red-400 text-xs">{form.formState.errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url" className="text-xs uppercase tracking-wider text-muted-foreground">Video URL</Label>
            <Input 
              id="url" 
              placeholder="https://youtube.com/watch?v=..."
              {...form.register("videoUrl")} 
              className="bg-background/50 border-white/10 focus:border-primary"
            />
            {form.formState.errors.videoUrl && (
              <p className="text-red-400 text-xs">{form.formState.errors.videoUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail" className="text-xs uppercase tracking-wider text-muted-foreground">Thumbnail URL</Label>
            <Input 
              id="thumbnail" 
              placeholder="https://img.youtube.com/vi/.../maxresdefault.jpg"
              {...form.register("thumbnailUrl")} 
              className="bg-background/50 border-white/10 focus:border-primary"
            />
            {form.formState.errors.thumbnailUrl && (
              <p className="text-red-400 text-xs">{form.formState.errors.thumbnailUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs uppercase tracking-wider text-muted-foreground">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Short description of the video..."
              {...form.register("description")} 
              className="bg-background/50 border-white/10 focus:border-primary resize-none h-24"
            />
          </div>

          <Button 
            type="submit" 
            disabled={createVideo.isPending}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider h-12"
          >
            {createVideo.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Add Video"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
