import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type VideoInput } from "@shared/routes";

export function useVideos() {
  return useQuery({
    queryKey: [api.videos.list.path],
    queryFn: async () => {
      const res = await fetch(api.videos.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch videos");
      return api.videos.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: VideoInput) => {
      const validated = api.videos.create.input.parse(data);
      const res = await fetch(api.videos.create.path, {
        method: api.videos.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.videos.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create video");
      }
      return api.videos.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.videos.list.path] });
    },
  });
}
