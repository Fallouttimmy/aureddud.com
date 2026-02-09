import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const YOUTUBE_RSS_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCzpAriEqlUU34cP5CtXmBYw";

async function fetchYoutubeVideos() {
  try {
    const response = await axios.get(YOUTUBE_RSS_URL);
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const result = parser.parse(response.data);
    const entries = result.feed.entry;

    if (!entries) return [];

    const videoEntries = Array.isArray(entries) ? entries : [entries];
    
    return videoEntries.slice(0, 6).map((entry: any) => ({
      title: entry.title,
      thumbnailUrl: `https://i.ytimg.com/vi/${entry['yt:videoId']}/maxresdefault.jpg`,
      videoUrl: entry.link['@_href'],
      description: entry.content || "",
      publishedAt: new Date(entry.published)
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.videos.list.path, async (req, res) => {
    // Attempt to sync from YouTube
    const latestVideos = await fetchYoutubeVideos();
    
    if (latestVideos.length > 0) {
      // Simple sync logic: clear and replace or just serve live
      // For a real app, we'd upsert into DB. For this request, let's serve live data
      // mixed with storage if needed, but primary is live.
      return res.json(latestVideos);
    }
    
    const videos = await storage.getVideos();
    res.json(videos);
  });

  app.post(api.videos.create.path, async (req, res) => {
    try {
      const input = api.videos.create.input.parse(req.body);
      const video = await storage.createVideo(input);
      res.status(201).json(video);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
